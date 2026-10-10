-- Run this in Supabase: Project > SQL Editor > New query > paste this > Run

create table if not exists pricing_scenarios (
  id bigint generated always as identity primary key,
  name text not null,
  scenario text not null check (scenario in ('conservative', 'expected', 'optimistic', 'custom')),
  students integer not null,
  students_pct numeric not null,
  others integer not null,
  others_pct numeric not null,
  yearly_pct numeric not null,
  monthly_revenue integer not null,
  annual_revenue integer not null,
  created_at timestamptz default now()
);

-- Anyone can read and add scenarios (no accounts). No editing or deleting.
alter table pricing_scenarios enable row level security;

create policy "Public read access"
  on pricing_scenarios
  for select
  using (true);

create policy "Public insert access"
  on pricing_scenarios
  for insert
  with check (true);
