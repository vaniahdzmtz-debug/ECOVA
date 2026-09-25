-- Run this in Supabase: Project > SQL Editor > New query > paste this > Run

create table if not exists research_items (
  id bigint generated always as identity primary key,
  name text not null,
  type text not null check (type in ('competitor', 'substitute')),
  scope text not null check (scope in ('global', 'mexico')),
  category text,
  notes text,
  is_global_example boolean default false
);

-- Allow the app to read this table using the public anon key
alter table research_items enable row level security;

create policy "Public read access"
  on research_items
  for select
  using (true);

insert into research_items (name, type, scope, category, notes, is_global_example)
values
  ('Good On You', 'competitor', 'global', 'fashion',
   'Rates fashion brands from 1-5 based on their impact on people, the planet, and animals.', true),
  ('Yuka', 'competitor', 'global', 'food & beauty',
   'Scans product barcodes and rates ingredients for health and environmental impact.', true),
  ('Think Dirty', 'competitor', 'global', 'beauty',
   'Rates beauty products based on potentially toxic or harmful ingredients.', true),
  ('Ecoly', 'competitor', 'global', 'lifestyle',
   'A gamified app where users complete environmental challenges.', true),
  ('Ethical Consumer', 'competitor', 'global', 'multi-category',
   'UK-based research site rating companies on ethics and sustainability across categories.', true),
  ('Google or social media search', 'substitute', 'global', 'informal research',
   'The most common substitute — searching manually instead of using a dedicated app.', false),
  ('Asking friends or family', 'substitute', 'global', 'social validation',
   'Relying on personal recommendations instead of independent research.', false),
  ('Buying based on price alone', 'substitute', 'global', 'default behavior',
   'No research at all — sustainability isn''t factored into the decision.', false);
