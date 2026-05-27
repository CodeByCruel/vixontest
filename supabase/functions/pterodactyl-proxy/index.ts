// VixonCloud Pterodactyl proxy + status logger
// Edge function that reads ptero_url + ptero_api_key from vc_settings,
// fetches nodes from Pterodactyl admin API, pings each, logs to vc_node_pings,
// returns merged node list with display_name overrides and uptime stats.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Hardcoded admin token — matches client-side admin auth (insecure, by user choice)
const ADMIN_TOKEN = "vixon-admin-token-67";

interface PteroNode {
  id: number;
  name: string;
  fqdn: string;
  scheme: string;
  daemon_listen: number;
  maintenance_mode: boolean;
}

async function getSetting(client: ReturnType<typeof createClient>, key: string): Promise<string> {
  const { data } = await client.from("vc_settings").select("value").eq("key", key).maybeSingle();
  return (data as any)?.value || "";
}

async function setSetting(client: ReturnType<typeof createClient>, key: string, value: string) {
  await client.from("vc_settings").upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
}

async function pingNode(node: PteroNode): Promise<boolean> {
  if (node.maintenance_mode) return false;
  const url = `${node.scheme}://${node.fqdn}:${node.daemon_listen}/`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, { method: "GET", signal: controller.signal });
    clearTimeout(timer);
    return res.status < 500;
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const action = body.action as string;
    const adminToken = body.adminToken as string | undefined;
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // ===== Public actions =====
    if (action === "get_invite") {
      const invite = await getSetting(supabase, "discord_invite");
      return new Response(JSON.stringify({ invite }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "status") {
      const pteroUrl = await getSetting(supabase, "ptero_url");
      const apiKey = await getSetting(supabase, "ptero_api_key");
      if (!pteroUrl || !apiKey) {
        return new Response(JSON.stringify({ nodes: [], error: "Not configured" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Fetch nodes from Pterodactyl
      const nodesRes = await fetch(`${pteroUrl.replace(/\/$/, "")}/api/application/nodes?per_page=100`, {
        headers: { "Authorization": `Bearer ${apiKey}`, "Accept": "Application/vnd.pterodactyl.v1+json" },
      });
      if (!nodesRes.ok) {
        const t = await nodesRes.text();
        return new Response(JSON.stringify({ nodes: [], error: `Pterodactyl ${nodesRes.status}: ${t.slice(0, 200)}` }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const data = await nodesRes.json();
      const nodes: PteroNode[] = (data.data || []).map((d: any) => d.attributes);

      // Ping each in parallel
      const results = await Promise.all(nodes.map(async (n) => ({ node: n, online: await pingNode(n) })));

      // Log pings (throttle: only insert if last entry > 4 min old)
      const now = new Date();
      for (const r of results) {
        const { data: last } = await supabase
          .from("vc_node_pings")
          .select("checked_at")
          .eq("ptero_node_id", r.node.id)
          .order("checked_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        const lastTime = last ? new Date((last as any).checked_at).getTime() : 0;
        if (now.getTime() - lastTime > 4 * 60 * 1000) {
          await supabase.from("vc_node_pings").insert({ ptero_node_id: r.node.id, online: r.online });
        }
      }

      // Fetch overrides
      const { data: overrides } = await supabase.from("vc_nodes").select("*");
      const overrideMap = new Map<number, any>();
      (overrides || []).forEach((o: any) => overrideMap.set(o.ptero_node_id, o));

      // Compute uptime windows
      const windows = [
        { label: "24h", hours: 24 },
        { label: "7d", hours: 24 * 7 },
        { label: "30d", hours: 24 * 30 },
      ];

      const nodeStatuses = await Promise.all(results.map(async (r) => {
        const override = overrideMap.get(r.node.id);
        const uptimes: Record<string, number> = {};
        for (const w of windows) {
          const since = new Date(Date.now() - w.hours * 3600 * 1000).toISOString();
          const { data: logs } = await supabase
            .from("vc_node_pings")
            .select("online")
            .eq("ptero_node_id", r.node.id)
            .gte("checked_at", since);
          const list = (logs || []) as { online: boolean }[];
          if (list.length === 0) {
            uptimes[w.label] = r.online ? 100 : 0;
          } else {
            const up = list.filter((l) => l.online).length;
            uptimes[w.label] = Math.round((up / list.length) * 1000) / 10;
          }
        }
        return {
          id: r.node.id,
          displayName: override?.display_name || r.node.name,
          location: r.node.fqdn,
          online: r.online,
          maintenance: r.node.maintenance_mode,
          uptime: uptimes,
        };
      }));

      nodeStatuses.sort((a, b) => {
        const ao = overrideMap.get(a.id)?.sort_order ?? 999;
        const bo = overrideMap.get(b.id)?.sort_order ?? 999;
        return ao - bo;
      });

      return new Response(JSON.stringify({ nodes: nodeStatuses }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ===== Admin actions (require ADMIN_TOKEN) =====
    if (adminToken !== ADMIN_TOKEN) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "save_config") {
      await setSetting(supabase, "ptero_url", String(body.pteroUrl || ""));
      await setSetting(supabase, "ptero_api_key", String(body.apiKey || ""));
      return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "save_invite") {
      await setSetting(supabase, "discord_invite", String(body.invite || ""));
      return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "get_config") {
      const pteroUrl = await getSetting(supabase, "ptero_url");
      const apiKey = await getSetting(supabase, "ptero_api_key");
      const invite = await getSetting(supabase, "discord_invite");
      return new Response(JSON.stringify({ pteroUrl, apiKey, invite }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "rename_node") {
      const id = Number(body.nodeId);
      const name = String(body.displayName || "");
      await supabase.from("vc_nodes").upsert({ ptero_node_id: id, display_name: name, updated_at: new Date().toISOString() }, { onConflict: "ptero_node_id" });
      return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
