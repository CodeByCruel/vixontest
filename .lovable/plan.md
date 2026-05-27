Massive overhaul. Let me confirm the plan before touching code.

## Scope

### Visual / Theme
- Fix "pressed text" look: remove tracking-wider/font-display uppercase styling across site, use normal weight & casing.
- Remove light/dark toggle. Lock to dark theme only. Delete `ThemeToggle.tsx`.
- Replace navbar icons with better Lucide icons.
- Remove all decorative images from pages (game backgrounds, screenshots, etc.) — use built-in CSS/icons only.
- Add tagline: "We host whatever you want."

### Branding / Content
- Founder name: "Akshit and Deepak" (Akshit first) everywhere.
- Rename to "VixonCloud" in TOS.
- Remove "international payment" notice from plan pages.
- Remove reviews section site-wide. Keep only Trustpilot link/embed.

### Navbar / Buttons
- Remove "Client Area" button → replace with "Panel" → `https://dash.vixoncloud.com`.
- Add "Status" page button.
- Add "ToS & Refund Policy" button → TOS page.
- Rename "Visit Billing" → "Visit Discord". On click: popup "Billing temporarily off, please buy via Discord" + Discord invite link.

### Pages
- **NEW**: `/services/website-plans` — "Our devs build websites like VixonCloud, starting ₹299–₹5,000 INR."
- **NEW**: `/services/vps-starter` — "Coming Soon"
- **NEW**: `/services/vps-premium` — "Coming Soon"
- **NEW**: `/status` — shows nodes from Pterodactyl API with uptime + admin-renamed labels.
- **REMOVE**: MC Configurator, Bot Configurator pages.
- **REMOVE**: News/Offers pages.

### Auth / Users
- Remove ALL user signup/signin from public site (AuthPage, ResetPassword, ProfilePage, Cart for users).
- Keep only hidden admin login at `/adminpagemeow`.
- Admin creds: username `vixonadmin` / password `vixon@67` (hardcoded check, no Supabase auth for users).

### Admin Panel (rebuild from scratch)
Hidden URL: `/adminpagemeow`. Remove old admin entirely (tickets, reviews, notifications, coupons, flash sales, triggers, webhooks, dashboard).

New admin tabs:
1. **Pterodactyl Nodes** — input Pterodactyl panel URL + admin API key. Fetches nodes, lets admin rename them (website-only label). Powers the public Status page.
2. **Site Settings** — Discord invite link input. Saving updates invite link everywhere (navbar, footer, popups, TOS).

### Backend
- Need a `site_settings` table (key/value: `discord_invite`, `ptero_url`, `ptero_api_key`, node rename map).
- Need an edge function `ptero-nodes` that proxies to Pterodactyl API (so API key stays server-side) and returns node list + status + uptime.
- Status page polls this function.

### Cleanup
Delete: `AdminTickets`, `AdminReviews`, `AdminNotifications`, `AdminCoupons`, `AdminFlashSales`, `AdminTriggers`, `AdminWebhooks`, `AdminDashboard`, `OrderChatDialog`, `NotificationCenter`, `FlashSaleBanner`, `DiscordOrderDialog`, `CheckoutDialog`, `CartPage`, `AuthPage`, `ResetPassword`, `ProfilePage`, `NewsPage`, `MinecraftTools` (configurator), bot configurator page, `ThemeToggle`, reviews components.

## Questions before I build

1. **Admin auth** — You said username `vixonadmin` / pass `vixon@67`. Storing the password in client-side code is insecure (anyone viewing source can see it). Options:
   - (a) Hardcode anyway as you wrote (fast, insecure)
   - (b) Store hash in Supabase + check via edge function (secure)
   
2. **Pterodactyl API** — I'll need the panel URL + admin API key stored as a Lovable Cloud secret (not in DB). Confirm OK?

3. **Status uptime source** — Pterodactyl doesn't track uptime natively. I'll compute "uptime %" from periodic ping checks (cron-style edge function logging to a table). OK, or just show current online/offline status?

4. **Scope confirmation** — This is ~3-4 hours of work. Want me to do it all in one shot, or stage it (Phase 1: theme/text/branding/nav cleanup, Phase 2: new admin + status page)?

Once you answer I'll build straight through.
