// Bridges Clerk auth to Supabase: exposes publishable key and exchanges
// a Clerk session token for a Supabase session via magiclink.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { createClerkClient, verifyToken } from "https://esm.sh/@clerk/backend@1.21.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const pk = Deno.env.get("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY") || Deno.env.get("CLERK_PUBLISHABLE_KEY") || "";
  const sk = Deno.env.get("CLERK_SECRET_KEY") || "";
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  try {
    const url = new URL(req.url);
    // GET /clerk-bootstrap → publishable key
    if (req.method === "GET" || url.searchParams.get("action") === "config") {
      if (!pk) return json({ error: "Missing CLERK publishable key" }, 500);
      return json({ publishableKey: pk });
    }

    // POST → exchange clerk session
    const body = await req.json().catch(() => ({}));
    const clerkToken: string | undefined = body.token;
    if (!clerkToken) return json({ error: "Missing token" }, 400);
    if (!sk) return json({ error: "Missing CLERK_SECRET_KEY" }, 500);

    // Verify the Clerk session token
    const verified = await verifyToken(clerkToken, { secretKey: sk });
    const userId = verified.sub as string;
    if (!userId) return json({ error: "Invalid Clerk token" }, 401);

    const clerk = createClerkClient({ secretKey: sk });
    const cu = await clerk.users.getUser(userId);
    const email = cu.primaryEmailAddress?.emailAddress || cu.emailAddresses[0]?.emailAddress;
    if (!email) return json({ error: "Clerk user has no email" }, 400);
    const fullName = [cu.firstName, cu.lastName].filter(Boolean).join(" ") || cu.username || "";
    const avatar = cu.imageUrl || null;

    const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

    // Ensure a supabase auth user exists for this email
    const { data: existing } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    let supaUser = existing?.users?.find((u) => (u.email || "").toLowerCase() === email.toLowerCase()) || null;

    if (!supaUser) {
      const created = await admin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { full_name: fullName, avatar_url: avatar, clerk_user_id: userId },
      });
      if (created.error) return json({ error: created.error.message }, 500);
      supaUser = created.data.user;
    }

    // Generate a magic link → return the hashed token; client verifies with verifyOtp
    const link = await admin.auth.admin.generateLink({
      type: "magiclink",
      email,
    });
    if (link.error) return json({ error: link.error.message }, 500);

    const hashed = link.data?.properties?.hashed_token;
    if (!hashed) return json({ error: "Could not generate session token" }, 500);

    // Upsert profile with latest Clerk data
    if (supaUser) {
      await admin.from("profiles").upsert(
        {
          user_id: supaUser.id,
          email,
          full_name: fullName || null,
          avatar_url: avatar,
        },
        { onConflict: "user_id" },
      );

      await admin
        .from("user_roles")
        .insert({ user_id: supaUser.id, role: "user" })
        .select("id")
        .maybeSingle()
        .then(({ error }) => {
          if (error && error.code !== "23505") console.error("role bootstrap failed", error.message);
        });
    }

    return json({ email, token_hash: hashed });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
