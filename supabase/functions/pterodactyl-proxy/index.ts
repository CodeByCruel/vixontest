// VixonCloud admin settings proxy.
// Handles get/save of public settings (discord_invite, status_redirect_url)
// using a hardcoded admin token (insecure, per user choice).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN_TOKEN  = "vixon-admin-token-67";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "");
    const adminToken = body.adminToken as string | undefined;
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    if (action === "get_settings") {
      const { data } = await supabase.from("vc_settings").select("key, value");
      const map: Record<string, string> = {};
      (data || []).forEach((r: any) => { map[r.key] = r.value; });
      return json({
        discord_invite: map.discord_invite || "https://discord.gg/nFvnxwmsAS",
        status_redirect_url: map.status_redirect_url || "",
      });
    }

    if (adminToken !== ADMIN_TOKEN) return json({ error: "Unauthorized" }, 401);

    if (action === "save_settings") {
      const updates: Array<{ key: string; value: string; updated_at: string }> = [];
      const now = new Date().toISOString();
      if (typeof body.discord_invite === "string")
        updates.push({ key: "discord_invite", value: body.discord_invite, updated_at: now });
      if (typeof body.status_redirect_url === "string")
        updates.push({ key: "status_redirect_url", value: body.status_redirect_url, updated_at: now });
      if (updates.length === 0) return json({ ok: true });
      const { error } = await supabase.from("vc_settings").upsert(updates, { onConflict: "key" });
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
