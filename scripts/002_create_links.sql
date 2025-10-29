-- Create links table for user links
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  category text not null,
  is_archived boolean default false,
  position integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on links table
alter table public.links enable row level security;

-- RLS Policies for links
create policy "links_select_own"
  on public.links for select
  using (auth.uid() = user_id or is_archived = false);

create policy "links_insert_own"
  on public.links for insert
  with check (auth.uid() = user_id);

create policy "links_update_own"
  on public.links for update
  using (auth.uid() = user_id);

create policy "links_delete_own"
  on public.links for delete
  using (auth.uid() = user_id);
