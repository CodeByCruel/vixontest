// VixonCloud admin settings proxy.
// Reads/writes public site settings via service role (bypasses RLS).
// Keys: discord_invite, status_redirect_url.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN_TOKEN  = "vixon-admin-token-67";

const DEFAULTS: Record<string, string> = {
  discord_invite: "https://discord.gg/TtV26hZEJx",
  status_redirect_url: "",
};

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
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["discord_invite", "status_redirect_url"]);
      const map: Record<string, string> = { ...DEFAULTS };
      (data || []).forEach((r: any) => { if (r.value) map[r.key] = r.value; });
      return json(map);
    }

    if (adminToken !== ADMIN_TOKEN) return json({ error: "Unauthorized" }, 401);

    if (action === "save_settings") {
      const now = new Date().toISOString();
      const keys: Array<[string, string]> = [];
      if (typeof body.discord_invite === "string") keys.push(["discord_invite", body.discord_invite]);
      if (typeof body.status_redirect_url === "string") keys.push(["status_redirect_url", body.status_redirect_url]);

      for (const [key, value] of keys) {
        // Try update first, insert if missing (site_settings.id is uuid, key is unique).
        const { data: existing } = await supabase
          .from("site_settings").select("id").eq("key", key).maybeSingle();
        if (existing) {
          const { error } = await supabase
            .from("site_settings")
            .update({ value, updated_at: now })
            .eq("key", key);
          if (error) return json({ error: error.message }, 500);
        } else {
          const { error } = await supabase
            .from("site_settings")
            .insert({ key, value, updated_at: now });
          if (error) return json({ error: error.message }, 500);
        }
      }
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
