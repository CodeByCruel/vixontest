import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_INVITE = "https://discord.gg/nFvnxwmsAS";

let cachedInvite: string | null = null;
const listeners = new Set<(v: string) => void>();

export const getDiscordInviteSync = () => cachedInvite || DEFAULT_INVITE;

export const refreshDiscordInvite = async (): Promise<string> => {
  try {
    const { data } = await (supabase as any)
      .from("vc_settings")
      .select("value")
      .eq("key", "discord_invite")
      .maybeSingle();
    const v = (data?.value as string) || DEFAULT_INVITE;
    cachedInvite = v;
    listeners.forEach((l) => l(v));
    return v;
  } catch {
    return DEFAULT_INVITE;
  }
};

export const useDiscordInvite = () => {
  const [invite, setInvite] = useState<string>(cachedInvite || DEFAULT_INVITE);
  useEffect(() => {
    listeners.add(setInvite);
    if (!cachedInvite) refreshDiscordInvite();
    return () => { listeners.delete(setInvite); };
  }, []);
  return invite;
};

export const ADMIN_TOKEN_KEY = "vixon-admin-token";
export const HARDCODED_ADMIN_USER = "vixonadmin";
export const HARDCODED_ADMIN_PASS = "vixon@67";
export const ADMIN_TOKEN_VALUE = "vixon-admin-token-67";

export const isAdminLoggedIn = () => {
  try { return localStorage.getItem(ADMIN_TOKEN_KEY) === ADMIN_TOKEN_VALUE; } catch { return false; }
};

export const useIsAdmin = () => {
  const [v, setV] = useState(isAdminLoggedIn());
  useEffect(() => {
    const h = () => setV(isAdminLoggedIn());
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);
  return v;
};

export const PANEL_URL = "https://dash.vixoncloud.com";
export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/vixoncloud.com";

export const callPteroProxy = async <T = any>(body: Record<string, any>): Promise<T> => {
  const { data, error } = await (supabase as any).functions.invoke("pterodactyl-proxy", { body });
  if (error) throw error;
  return data as T;
};
