-- Run this in Supabase: Project > SQL Editor > New query > paste this > Run

create table if not exists marketing_assets (
  id bigint generated always as identity primary key,
  asset_type text not null check (asset_type in ('post', 'script')),
  title text not null,
  body text not null,
  created_at timestamptz default now()
);

create table if not exists ab_votes (
  id bigint generated always as identity primary key,
  test_id integer not null check (test_id in (1, 2)),
  choice text not null check (choice in ('A', 'B')),
  created_at timestamptz default now()
);

-- Anyone can read and add rows (no accounts). No editing or deleting.
alter table marketing_assets enable row level security;
alter table ab_votes enable row level security;

create policy "Public read access"
  on marketing_assets
  for select
  using (true);

create policy "Public insert access"
  on marketing_assets
  for insert
  with check (true);

create policy "Public read access"
  on ab_votes
  for select
  using (true);

create policy "Public insert access"
  on ab_votes
  for insert
  with check (true);
