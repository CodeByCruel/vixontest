import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  username: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  avatar_url: string | null;
  phone_verified: boolean;
  kyc_status: string;
  status: "active" | "suspended" | "banned";
}

interface AuthCtx {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  reloadProfile: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({} as AuthCtx);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (uid: string) => {
    try {
      const [{ data: prof }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", uid),
      ]);
      setProfile((prof as any) || null);
      setIsAdmin(!!roles?.some((r: any) => r.role === "admin"));
    } catch {
      setProfile(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    let active = true;

    const applySession = (s: Session | null) => {
      if (!active) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setLoading(true);
        setTimeout(() => {
          loadProfile(s.user.id).finally(() => active && setLoading(false));
        }, 0);
      } else {
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      applySession(s);
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      applySession(s);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try { await (window as any).__clerkSignOut?.(); } catch {}
    await supabase.auth.signOut();
    setProfile(null);
    setIsAdmin(false);
  };

  const reloadProfile = async () => {
    if (user) await loadProfile(user.id);
  };

  return (
    <Ctx.Provider value={{ session, user, profile, isAdmin, loading, signOut, reloadProfile }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
