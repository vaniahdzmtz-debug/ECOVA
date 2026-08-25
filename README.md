# Ecova

A sustainability guidance website for university students. This is the
Week 0 build: homepage, shared navigation, a docs placeholder, and the
infrastructure (GitHub, Vercel, Supabase) that later weeks will build on.

## What's live this week

- `/` — Homepage
- `/docs` — Placeholder page
- Supabase is connected but not yet storing or serving any real data

## Environment variables

Copy `.env.example` to a new file called `.env.local` and fill in your
Supabase values (found in your Supabase project under **Settings > API
Keys**):

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

These same two values also need to be added in **Vercel > Project
Settings > Environment Variables** so the live deployed site works too.

## Running locally (optional — only if you have Node.js installed)

```
npm install
npm run dev
```

Then open http://localhost:3000

## Deploying

1. Push this project to a GitHub repository.
2. In Vercel, import that GitHub repository as a new project.
3. Add the two environment variables above in Vercel's project settings.
4. Deploy. Vercel will give you a live URL.

## Self-test results (Week 0)

Record the outcome of these three checks after each deploy:

1. **Deployment test** — Opened the live Vercel URL, homepage loaded fully,
   no console errors. Result: _pending_
2. **Navigation test** — Clicked Docs from Home, clicked Home from Docs,
   current page is visually indicated in the nav. Result: _pending_
3. **Responsive test** — Checked layout at 375px width and desktop width,
   no overlap or breakage. Result: _pending_

## What's next

See `ROADMAP.md` for planned future work (Explore page with real Supabase
data, About page).
