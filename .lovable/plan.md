## Done already (this turn)
- Removed the screenshot tab section; "built-in features" is now text/icon cards only.
- Created the `site_settings` table in the new Cloud backend and deployed the admin proxy edge function. **Saving the Discord invite and status URL from the admin panel now works.**

## The big rebuild — please pick auth first

You added Clerk keys, but Lovable Cloud is now active and uses Supabase under the hood for the database, storage, and edge functions. Mixing them has real consequences. I need one answer before building.

### Option A — Use Clerk for auth (uses your keys)
- Clerk handles email/password, Google, **Discord** login, sessions, profile dropdown.
- Supabase still stores profiles/cart/orders, but RLS becomes harder: Supabase doesn't know about Clerk users. Either:
  - we disable RLS on user tables and enforce auth in code (less safe), or
  - we set up the Clerk → Supabase JWT template (more setup, you'd need to paste a JWKS URL into Cloud).
- Discord login works natively.

### Option B — Use Lovable Cloud auth (recommended)
- Email/password + Google work out of the box, real RLS, nothing to wire up.
- **Discord login is NOT supported** in Lovable Cloud — you'd lose that.
- Your Clerk keys would sit unused (no harm, can be deleted later).

If Discord login is mandatory, go with A. If you can live without Discord login, B is significantly simpler and safer.

## What gets built after you pick (same scope either way)

### Database (Cloud)
Tables: `profiles`, `user_roles` (admin/user enum + `has_role` security-definer fn), `plans`, `cart_items`, `orders`, `coupons`, `invoices`, `support_tickets`, `notifications`, `user_activity_logs`. RLS on every table. Avatars storage bucket.

### User-facing
- `/sign-in`, `/sign-up`, `/reset-password` pages styled to match the site.
- Navbar profile dropdown (avatar, name, links, sign out).
- `/dashboard` with overview, active services, recent orders, notifications, billing summary, profile-completion meter.
- `/dashboard/profile` — full name, username, email, phone, address, city/state/country/postal, avatar upload. Backend columns reserved for phone-verified + KYC status (UI later).
- `/dashboard/billing` — invoice history, pending/paid.
- `/dashboard/settings` — profile, avatar, security, notification prefs.
- `/cart` + cart sidebar — add/remove/qty, totals, coupon input, persistent per-user.
- Order flow: submit → generates ID + pending invoice → shows "Open Discord ticket" + "Copy Order ID" → status badge (Pending/Awaiting Verification/Paid/Active/Suspended/Cancelled).
- Notifications dropdown in navbar.

### Admin (`/adminpagemeow/panel`, role-gated)
- Users list (name, username, email, phone, address, joined date, status).
- Per-user drawer: orders, activity log, suspend / ban / delete.
- Manage: plans, coupons, orders (change status), invoices, notifications (broadcast).
- Keeps the existing Discord invite + status URL settings.
- Hardcoded `vixonadmin` / `vixon@67` becomes a real admin user with the admin role (more secure).

### Security
- RLS everywhere, role check via `has_role()` security-definer function.
- All inputs validated with Zod (client + edge functions).
- No passwords, secrets, or tokens ever rendered.

## Heads up
This is roughly a full day of build work and will touch most of the app. I'll do it in one go once you pick A or B, but expect a long change list. Reply with **A** or **B** (and if A, confirm you want me to wire the Clerk→Supabase JWT bridge or just skip RLS).
