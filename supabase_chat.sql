-- Week 5. Run in Supabase: SQL Editor > New query > paste this > Run

create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  category text,
  priority text,
  frequency text,
  recommendation text,
  status text not null default 'completed' check (status in ('completed', 'flagged')),
  flagged_text text,
  created_at timestamptz default now()
);

create table if not exists chat_feedback (
  id uuid primary key default gen_random_uuid(),
  session_id uuid,
  rating text not null check (rating in ('up', 'down')),
  comment text,
  created_at timestamptz default now()
);

-- Anyone can read and add rows (no accounts). No editing or deleting.
alter table chat_sessions enable row level security;
alter table chat_feedback enable row level security;

create policy "Public read chat_sessions" on chat_sessions for select using (true);
create policy "Public insert chat_sessions" on chat_sessions for insert with check (true);
create policy "Public read chat_feedback" on chat_feedback for select using (true);
create policy "Public insert chat_feedback" on chat_feedback for insert with check (true);
