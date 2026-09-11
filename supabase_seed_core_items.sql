-- Run this in Supabase: Project > SQL Editor > New query > paste this > Run

create table if not exists core_items (
  id bigint generated always as identity primary key,
  name text not null,
  category text,
  impact_level text not null check (impact_level in ('low', 'medium', 'high')),
  price_level text not null,
  convenience_level text not null check (convenience_level in ('low', 'medium', 'high')),
  price_note text
);

-- Allow the app to read this table using the public anon key
alter table core_items enable row level security;

create policy "Public read access"
  on core_items
  for select
  using (true);

insert into core_items (name, category, impact_level, price_level, convenience_level)
values
  ('Termo o botella reutilizable', 'agua', 'low', '$250 MXN una vez', 'medium'),
  ('Garrafón y botellas de agua desechables', 'agua', 'high', '$20-30 MXN c/u, suma con el tiempo', 'high'),
  ('Ropa de segunda mano (tianguis o bazar)', 'ropa', 'low', '$100-200 MXN por prenda', 'medium'),
  ('Ropa nueva de fast fashion (compra en línea)', 'ropa', 'high', '$300-500 MXN por prenda', 'high'),
  ('Transporte público (Metro, Metrobús o camión)', 'transporte', 'low', '$5-13 MXN por viaje', 'medium'),
  ('Viaje en app (Uber o DiDi)', 'transporte', 'high', '$80-150+ MXN por viaje', 'high');
