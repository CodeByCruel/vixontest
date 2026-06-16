# AGENTS.md - VixonCloud Project

## Auto-Deploy Rule (CRITICAL)

After completing ANY code changes, ALWAYS run these commands:

```bash
git add .
git commit -m "description of changes"
git push origin main
```

This triggers Vercel auto-deploy (~30 seconds).

**NEVER skip the git push.** The website only updates when changes are pushed to GitHub.

## Before Making Changes

Always run `git pull origin main` first to get the latest changes from Lovable or other contributors.

## Project Info

- **Framework:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Custom Domain:** Connected via Vercel
- **Lovable:** Also connected to this repo — always pull before editing

## Brand

- **Company:** VixonCloud
- **Owned by:** Deepak and Akshit
- **Tagline:** "We host whatever you want"
- **Domain:** vixoncloud.com
- **Discord:** https://discord.gg/TtV26hZEJx
- **Game Panel:** https://dash.vixoncloud.com
- **Billing:** https://billing.vixoncloud.com
