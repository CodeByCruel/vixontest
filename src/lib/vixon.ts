import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_INVITE = "https://discord.gg/wDKTvVPh4d";

interface VixonSettings {
  discord_invite: string;
  status_redirect_url: string;
}

let cached: VixonSettings = { discord_invite: DEFAULT_INVITE, status_redirect_url: "" };
const listeners = new Set<(v: VixonSettings) => void>();

export const refreshSettings = async (): Promise<VixonSettings> => {
  try {
    const { data, error } = await (supabase as any).functions.invoke("pterodactyl-proxy", {
      body: { action: "get_settings" },
    });
    if (!error && data) {
      cached = {
        discord_invite: data.discord_invite || DEFAULT_INVITE,
        status_redirect_url: data.status_redirect_url || "",
      };
      listeners.forEach((l) => l(cached));
    }
  } catch { /* ignore */ }
  return cached;
};

// Back-compat alias used in App.tsx
export const refreshDiscordInvite = refreshSettings;

export const useVixonSettings = () => {
  const [v, setV] = useState<VixonSettings>(cached);
  useEffect(() => {
    listeners.add(setV);
    refreshSettings();
    return () => { listeners.delete(setV); };
  }, []);
  return v;
};

export const useDiscordInvite = () => useVixonSettings().discord_invite;
export const useStatusRedirect = () => useVixonSettings().status_redirect_url;

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

export const saveAdminSettings = async (payload: Partial<VixonSettings>) => {
  const { data, error } = await (supabase as any).functions.invoke("pterodactyl-proxy", {
    body: { action: "save_settings", adminToken: ADMIN_TOKEN_VALUE, ...payload },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  await refreshSettings();
  return data;
};
