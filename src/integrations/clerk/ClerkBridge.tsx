import { useEffect, useRef } from "react";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { exchangeClerkForSupabase } from "./bootstrap";

/**
 * Watches Clerk session and keeps Supabase auth in sync.
 * Runs inside ClerkProvider; sits above AuthProvider so AuthContext sees the session.
 */
export const ClerkBridge = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn, getToken, signOut: clerkSignOut } = useClerkAuth();
  const { user } = useUser();
  const exchangedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    (async () => {
      if (!isSignedIn) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) await supabase.auth.signOut();
        exchangedFor.current = null;
        return;
      }
      if (!user?.id || exchangedFor.current === user.id) return;
      try {
        const token = await getToken();
        if (!token || cancelled) return;
        await exchangeClerkForSupabase(token);
        exchangedFor.current = user.id;
      } catch (e) {
        console.error("Clerk→Supabase bridge failed", e);
      }
    })();
    return () => { cancelled = true; };
  }, [isLoaded, isSignedIn, user?.id, getToken]);

  // Expose a global helper so non-React code can trigger Clerk sign-out
  useEffect(() => {
    (window as any).__clerkSignOut = clerkSignOut;
  }, [clerkSignOut]);

  return <>{children}</>;
};
