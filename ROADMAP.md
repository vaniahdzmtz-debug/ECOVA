# Ecova roadmap

## Week 0 — Infrastructure and homepage
- Homepage, shared nav/footer, `/docs` placeholder
- GitHub, Vercel, and Supabase connected
- Status: complete

## Module 1 — /core comparison tool
- `/core` page: pick two everyday choices, compare impact, price, and
  convenience, get a plain-language verdict
- Supabase actually storing and serving data for the first time
- Status: complete

## Week 2 — /research benchmarking dashboard (this build)
- `/research` page: research intake, 5 global examples, Mexico-specific
  findings, an 8-item searchable/filterable competitor and substitute
  table, a risk map, and a live dashboard widget
- New Supabase table: `research_items`
- Status: complete

## Week 3 — /product and /pricing
- Feature map, three pricing tiers in MXN, revenue simulator, saved scenarios
- New Supabase table: `pricing_scenarios`
- Status: complete

## Week 5 — Ecova guide chatbot (this build)
- `/chat` rule-based guided assistant with two human checkpoints
- New Supabase tables: `chat_sessions`, `chat_feedback`

## Week 4 — Marketing engine and landing page
- Upgraded homepage and `/marketing` page with brand system, persona, copy, 10 posts, 3 video scripts, 14-day calendar
- Two A/B tests with real votes, saved marketing assets
- New Supabase tables: `marketing_assets`, `ab_votes`
- Status: complete

## Later
- About page — explains how ratings are decided and sourced
- Expand the `/core` comparison list beyond the first 6 items

## Week 6 — Final integration (this build)
- `/demo`, `/dashboard`, `/docs` added; "Best balance" added to `/chat`
- No new Supabase tables
- Status: complete

## Version 2 (planned)
- Add sources for impact levels and regularly updated prices
- Add more products and brands, and more topics
- Review the /core point rule (high convenience currently scores 0)
- Link chat results to the /core comparison
- Spanish version

## Version 3 (ideas)
- Admin page to review flagged questions
- Saved history for each person
- More ways to choose
