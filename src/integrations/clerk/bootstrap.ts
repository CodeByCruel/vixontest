import { supabase } from "@/integrations/supabase/client";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/clerk-bootstrap`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let cachedKey: string | null = null;
export const fetchClerkPublishableKey = async (): Promise<string> => {
  if (cachedKey) return cachedKey;
  const res = await fetch(FN_URL, { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } });
  if (!res.ok) throw new Error("Failed to load auth config");
  const j = await res.json();
  cachedKey = j.publishableKey;
  return cachedKey!;
};

// Exchange a Clerk session JWT for a Supabase session
export const exchangeClerkForSupabase = async (clerkToken: string) => {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({ token: clerkToken }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(j.error || "Auth bridge failed");
  const { error } = await supabase.auth.verifyOtp({ type: "magiclink", token_hash: j.token_hash });
  if (error) throw error;
};
