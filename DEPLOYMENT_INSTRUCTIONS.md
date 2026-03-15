# Deploy to Vercel (Manual - 2 minutes)

## Prerequisites
- GitHub account with access to: https://github.com/connekz-team/connekz-product
- Vercel account (free tier works): https://vercel.com

## Steps

1. Go to **https://vercel.com/new**
2. Sign in with **GitHub**
3. Click **"Import"** next to `connekz-team/connekz-product`
4. Configure Project:
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `.` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
   - **Install Command:** `npm ci` (default)
5. Add environment variables if needed:
   - `VITE_SITE_URL` — your production URL (e.g., `https://connekz-product.vercel.app`)
   - `VITE_SITE_NAME` — site display name
   - `VITE_SITE_DESCRIPTION` — meta description
   - `VITE_TWITTER_HANDLE` — Twitter handle for OG tags
6. Click **"Deploy"**

## After Deployment

- Site will be live at: **https://connekz-product.vercel.app** (or similar)
- Auto-deploys on every push to `main` branch
- Preview deployments created for pull requests
- Custom domain can be added in Vercel project settings

## Tech Stack
- Vue 3 + Vite 8 (SPA)
- Vuetify 4 (UI framework)
- Client-side routing with SPA rewrites configured in `vercel.json`

## Troubleshooting
- If routing returns 404: Verify `vercel.json` rewrites are applied
- If build fails: Run `npm run build` locally to check for errors
- If env vars missing: Add them in Vercel Dashboard > Project Settings > Environment Variables
