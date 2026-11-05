# Ecova

A sustainability guidance website for university students in Mexico.

## What's live

- `/` — Homepage
- `/core` — Compare two everyday choices (impact, price, convenience)
- `/research` — Research and benchmarking dashboard
- `/product` — Product architecture and feature map (Week 3)
- `/pricing` — Pricing tiers and revenue simulator (Week 3)
- `/marketing` — Marketing engine: brand system, persona, copy, 10 posts, 3 video scripts, 14-day calendar, A/B headline tests, saved assets (Week 4)
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

`/core` and `/research` read from Supabase tables. To create and fill
them:

1. Open your Supabase project
2. Go to **SQL Editor > New query**
3. Paste the contents of `supabase_seed_core_items.sql`, click **Run**
4. New query again, paste `supabase_seed_research_items.sql`, click **Run**
5. New query again, paste `supabase_pricing_scenarios.sql`, click **Run** (creates the `pricing_scenarios` table used by `/pricing`)
6. New query again, paste `supabase_marketing.sql`, click **Run** (creates the `marketing_assets` and `ab_votes` tables used by `/marketing`)

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

## Week 4: /marketing and the upgraded homepage

- The homepage is now a product landing page (new blue and green accents).
- `/marketing` holds the brand system, persona (Dana, 21), landing copy, 10 social posts, 3 video scripts and a 14-day campaign calendar. All content is written ahead of time in `lib/marketingContent.js`. There is no AI at runtime.
- Copy and Export buttons work in the browser. Save stores a post or script in `marketing_assets`. A/B votes are stored in `ab_votes` (one vote per browser per test).
- Supabase variables are optional for browsing: without them the content still shows, and Save and Vote show a friendly message.

### Self-test results (Week 4)

1. **A/B Test 1 (homepage headline)** — 12 votes: A 11, B 1. Headline A stayed on the homepage.
2. **A/B Test 2 (social hook)** — 12 votes: A 2, B 10. Post 3 now uses hook B.
3. **S1** — Home and /marketing load and fit a phone screen.
4. **S2** — Copy and Export copy the right text.
5. **S3** — Save adds a row to `marketing_assets` and it is still listed after a refresh.
6. **Bug found and fixed** — voting repeatedly was allowed; now one vote per browser per test.
