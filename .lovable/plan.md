## Goal

Get the uploaded `web-main.zip` (ZeyronCloud — a Vite + React + React Router + Tailwind v3 + Supabase app) running inside this Lovable project so you can preview it here and also deploy it to Vercel.

## Approach

The uploaded repo is a standard Vite SPA. This Lovable project is currently a TanStack Start template (different routing, different Tailwind, different server runtime). Rather than rewriting your repo into TanStack Start (very large effort, would change every route file), I'll **replace this project's scaffolding with your repo as-is**. The result behaves like your original repo, runs in the Lovable preview as a Vite app, and is ready for `vercel deploy` (your `vercel.json` is already in the zip).

## Steps

1. **Remove TanStack Start scaffolding** that conflicts with a plain Vite app:
   - `src/routes/`, `src/routeTree.gen.ts`, `src/router.tsx`, `src/server.ts`, `src/start.ts`
   - `wrangler.jsonc`, `src/styles.css` (replaced by your `src/index.css`)
   - Old root `package.json`, `vite.config.ts`, `tsconfig*.json`, `components.json`, `eslint.config.js`, `index.html`, `bun.lock`

2. **Copy uploaded repo into project root**:
   - All `src/**` (App.tsx, main.tsx, components, pages, assets, hooks, lib, integrations, etc.)
   - `public/**` (favicon, robots.txt, placeholder.svg)
   - `supabase/config.toml`
   - Config files: `index.html`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig*.json`, `components.json`, `eslint.config.js`, `vercel.json`, `vitest.config.ts`, `.gitignore`, `package.json`

3. **Install dependencies** from the uploaded `package.json` (Tailwind v3, react-router-dom, framer-motion, three.js, @supabase/supabase-js, etc.).

4. **Environment variables**: the uploaded `.env` references Supabase. I'll surface what keys it needs and you can provide values (or connect Lovable Cloud if you'd rather use Lovable's managed Supabase). Without these, the app will load but Supabase-backed features (orders, admin, auth) won't work.

5. **Verify in preview** — build should pass, landing page should render.

6. **Vercel deploy** is then a separate step you run from your own machine / Vercel dashboard against your GitHub fork; nothing extra to wire on this side because `vercel.json` is already included.

## Things to confirm before I run this

- This wipes the current TanStack starter (nothing of value there — it's just placeholder).
- For Supabase: do you want to **paste your existing Supabase URL + anon key** (from your `.env`), or **enable Lovable Cloud** and switch the client to use it? The former matches your repo exactly; the latter is Lovable-native.

Reply "go" (and tell me the Supabase choice) and I'll execute.