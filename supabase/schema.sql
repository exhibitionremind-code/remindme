create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '', age integer, gender text, phone text,
  about text, avatar_url text, created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null, due_date date, due_time time,
  priority text not null default 'Sedang' check (priority in ('Tinggi', 'Sedang', 'Rendah')),
  note text, completed boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.mood_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mood text not null, sleep_hours numeric,
  stress_level integer check (stress_level between 0 and 100),
  influences text, created_at timestamptz not null default now()
);
create table if not exists public.screenings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  answers jsonb not null, phq2_score integer not null,
  gad2_score integer not null, created_at timestamptz not null default now()
);
create table if not exists public.emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null, relation text, phone text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      ''
    ),
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.mood_entries enable row level security;
alter table public.screenings enable row level security;
alter table public.emergency_contacts enable row level security;

drop policy if exists "profiles own rows" on public.profiles;
drop policy if exists "tasks own rows" on public.tasks;
drop policy if exists "moods own rows" on public.mood_entries;
drop policy if exists "screenings own rows" on public.screenings;
drop policy if exists "contacts own rows" on public.emergency_contacts;
create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "tasks own rows" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "moods own rows" on public.mood_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "screenings own rows" on public.screenings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "contacts own rows" on public.emergency_contacts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists tasks_user_id_idx on public.tasks(user_id);
create index if not exists mood_entries_user_id_idx on public.mood_entries(user_id);
create index if not exists screenings_user_id_idx on public.screenings(user_id);
create index if not exists emergency_contacts_user_id_idx on public.emergency_contacts(user_id);
