-- Data API access grants for existing public tables
GRANT SELECT ON public.plans TO anon;
GRANT SELECT ON public.coupons TO anon;
GRANT SELECT ON public.site_settings TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.cart_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coupons TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoices TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.plans TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_tickets TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_activity_logs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_suspensions TO authenticated;

GRANT ALL ON public.cart_items TO service_role;
GRANT ALL ON public.coupons TO service_role;
GRANT ALL ON public.invoices TO service_role;
GRANT ALL ON public.notifications TO service_role;
GRANT ALL ON public.order_items TO service_role;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.plans TO service_role;
GRANT ALL ON public.profiles TO service_role;
GRANT ALL ON public.site_settings TO service_role;
GRANT ALL ON public.support_tickets TO service_role;
GRANT ALL ON public.user_activity_logs TO service_role;
GRANT ALL ON public.user_roles TO service_role;
GRANT ALL ON public.user_suspensions TO service_role;

-- Profile privacy hardening: profiles contain emails/phone/address, so remove public read-all.
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Site settings can be managed by admins as well as the existing secure settings proxy.
CREATE POLICY "Admins manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admins should be able to remove profiles from the admin panel.
CREATE POLICY "Admins delete profiles"
ON public.profiles
FOR DELETE
TO authenticated
USING (is_admin());