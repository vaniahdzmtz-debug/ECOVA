# Ecova

A sustainability guidance website for university students.

## What's live

- `/` — Homepage
- `/core` — Compare two everyday choices (impact, price, convenience)
- `/research` — Research and benchmarking dashboard
- `/docs` — Placeholder page

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase values
(found under **Settings > API Keys** in your Supabase project):

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

These same two values must also be set in **Vercel > Project Settings >
Environment Variables**.

## Setting up the database tables

Both `/core` and `/research` read from Supabase tables. To create and fill
them:

1. Open your Supabase project
2. Go to **SQL Editor > New query**
3. Paste the contents of `supabase_seed_core_items.sql`, click **Run**
4. New query again, paste `supabase_seed_research_items.sql`, click **Run**

If either table doesn't exist yet or is empty, the matching page will
automatically fall back to a small built-in set of example items, so the
page still works — but real data should come from Supabase.

## Running locally (optional)

```
npm install
npm run dev
```

Then open http://localhost:3000

## Deploying

1. Push changes to GitHub.
2. Vercel auto-deploys from the connected repository.
3. Confirm the two environment variables are set in Vercel's project
   settings.

## Self-test results (Week 2)

1. **Search test** — Typed "Yuka" in the search box, confirmed only that
   row appeared. Result: _pending_
2. **Filter test** — Filtered to "Substitute," confirmed only the 3
   substitute rows showed. Result: _pending_
3. **Data load test** — Refreshed `/research`, confirmed the table and
   dashboard widget loaded real data from Supabase. Result: _pending_
4. **Human validation conversation** — Talked to a real person in Ecova's
   target audience about the problem. Result: _pending_

## What's next

See `ROADMAP.md`.
