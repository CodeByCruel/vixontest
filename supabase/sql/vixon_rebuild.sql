-- VixonCloud rebuild migration
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New query)

CREATE TABLE IF NOT EXISTS public.vc_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.vc_settings TO anon, authenticated;
GRANT ALL ON public.vc_settings TO service_role;
ALTER TABLE public.vc_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "vc_settings_read" ON public.vc_settings;
CREATE POLICY "vc_settings_read" ON public.vc_settings FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.vc_nodes (
  ptero_node_id int PRIMARY KEY,
  display_name text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.vc_nodes TO anon, authenticated;
GRANT ALL ON public.vc_nodes TO service_role;
ALTER TABLE public.vc_nodes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "vc_nodes_read" ON public.vc_nodes;
CREATE POLICY "vc_nodes_read" ON public.vc_nodes FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.vc_node_pings (
  id bigserial PRIMARY KEY,
  ptero_node_id int NOT NULL,
  online boolean NOT NULL,
  checked_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS vc_node_pings_idx ON public.vc_node_pings(ptero_node_id, checked_at DESC);
GRANT SELECT ON public.vc_node_pings TO anon, authenticated;
GRANT ALL ON public.vc_node_pings TO service_role;
ALTER TABLE public.vc_node_pings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "vc_node_pings_read" ON public.vc_node_pings;
CREATE POLICY "vc_node_pings_read" ON public.vc_node_pings FOR SELECT USING (true);

INSERT INTO public.vc_settings (key, value) VALUES
  ('discord_invite', 'https://discord.gg/wDKTvVPh4d'),
  ('ptero_url', ''),
  ('ptero_api_key', '')
ON CONFLICT (key) DO NOTHING;
