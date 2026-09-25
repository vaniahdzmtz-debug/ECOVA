-- Run this in Supabase: Project > SQL Editor > New query > paste this > Run
-- Only needed if your core_items table doesn't already exist from Module 1.

create table if not exists core_items (
  id bigint generated always as identity primary key,
  name text not null,
  category text,
  impact_level text not null check (impact_level in ('low', 'medium', 'high')),
  price_level text not null,
  convenience_level text not null check (convenience_level in ('low', 'medium', 'high')),
  price_note text
);

alter table core_items enable row level security;

create policy "Public read access"
  on core_items
  for select
  using (true);

insert into core_items (name, category, impact_level, price_level, convenience_level)
values
  ('Reusable water bottle', 'water', 'low', '$250 MXN one-time', 'medium'),
  ('Bottled water (disposable bottles/jugs)', 'water', 'high', '$20-30 MXN each, adds up over time', 'high'),
  ('Second-hand clothing (thrift/flea market)', 'clothing', 'low', '$100-200 MXN per item', 'medium'),
  ('New fast-fashion item (online order)', 'clothing', 'high', '$300-500 MXN per item', 'high'),
  ('Public transit (Metro, Metrobús, or bus)', 'transport', 'low', '$5-13 MXN per ride', 'medium'),
  ('Rideshare app (Uber or DiDi)', 'transport', 'high', '$80-150+ MXN per ride', 'high');
