# Ecova

A sustainability guidance website for university students.

## What's live

- `/` — Homepage
- `/core` — Compare two everyday choices (impact, price, convenience)
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

## Setting up the /core database table

The `/core` page reads from a Supabase table called `core_items`. To
create and fill it:

1. Open your Supabase project
2. Go to **SQL Editor > New query**
3. Paste the contents of `supabase_seed_core_items.sql`
4. Click **Run**

If this table doesn't exist yet or is empty, `/core` will automatically
fall back to a small built-in set of example items, so the page still
works — but real data should come from Supabase.

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

## Self-test results (Module 1)

1. **Pairing test** — Picked two different pairs, confirmed the verdict
   sentence changed. Result: _pending_
2. **Data load test** — Refreshed `/core`, confirmed dropdowns load real
   items from Supabase. Result: _pending_
3. **Mobile test** — Checked `/core` on a phone-width screen, confirmed
   cards stack cleanly. Result: _pending_

## What's next

See `ROADMAP.md`.
