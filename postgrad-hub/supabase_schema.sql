-- ============================================================
-- The Postgraduate Data Hub, Kenya — COMPLETE Supabase schema
-- Version: 2026-07-01 (matches current app v4 features)
-- Safe to re-run: uses `create table if not exists`
-- ============================================================

-- ------------- PROFILES (extends auth.users) -------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  phone text,
  institution text,
  course_of_study text,
  year_of_study text,
  role text not null default 'student',    -- 'student' or 'admin'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------- SUBMISSIONS (questionnaire refinement) -------------
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  research_type text,
  target_population text,
  objectives text,
  variables text,
  file_url text,
  status text not null default 'submitted', -- submitted, under_review, being_refined, survey_ready
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------- UNLOCKS (paid access to lessons + tests) -------------
create table if not exists unlocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  item_key text not null,          -- e.g. 'lesson:basics-1:notes' or 'test:mann-whitney'
  item_type text not null,         -- 'lesson' or 'test'
  item_name text not null,
  format text,                     -- 'notes' or 'video' for lessons
  payment_status text not null default 'unpaid',  -- unpaid, claimed, confirmed
  status text not null default 'pending',          -- pending, unlocked
  requested_at timestamptz not null default now(),
  claimed_at timestamptz,
  approved_at timestamptz
);

-- ------------- ANALYSIS ORDERS (done-for-you analysis) -------------
create table if not exists analysis_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  tier text not null,              -- tables, interpretation, full
  research_type text,
  outcome_summary text,
  deadline_note text,
  data_files_url text,
  status text not null default 'submitted', -- submitted, in_progress, ready, delivered
  admin_notes text,
  deliverable_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------- BOOKINGS (expert consultations) -------------
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  service text not null,
  slot_date date not null,
  slot_time text not null,
  status text not null default 'pending', -- pending, confirmed, completed, cancelled
  notes text,
  created_at timestamptz not null default now()
);

-- ------------- COURSE PROGRESS -------------
create table if not exists course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  lesson_id text not null,
  completed boolean not null default false,
  quiz_score int,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- ------------- PAYMENTS -------------
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  amount numeric,
  method text not null default 'mpesa',
  phone text,
  reference text,          -- unlock id or booking id
  status text not null default 'pending',  -- pending, confirmed, failed
  created_at timestamptz not null default now()
);

-- ------------- ACTIVITIES (audit log) -------------
create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  kind text not null,      -- login, unlock, lesson_complete, submission, booking, payment
  message text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
--  ROW LEVEL SECURITY — students see only their own data
-- ============================================================

alter table profiles           enable row level security;
alter table submissions        enable row level security;
alter table unlocks            enable row level security;
alter table analysis_orders    enable row level security;
alter table bookings           enable row level security;
alter table course_progress    enable row level security;
alter table payments           enable row level security;
alter table activities         enable row level security;

-- Drop old policies if re-running
drop policy if exists "profiles_read_own" on profiles;
drop policy if exists "profiles_update_own" on profiles;
drop policy if exists "profiles_insert_own" on profiles;
drop policy if exists "submissions_own" on submissions;
drop policy if exists "unlocks_own" on unlocks;
drop policy if exists "analysis_orders_own" on analysis_orders;
drop policy if exists "bookings_own" on bookings;
drop policy if exists "course_progress_own" on course_progress;
drop policy if exists "payments_own" on payments;
drop policy if exists "activities_own" on activities;

-- Profile policies
create policy "profiles_read_own"   on profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on profiles for insert with check (auth.uid() = id);

-- Own-data policies for everything else
create policy "submissions_own"      on submissions      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "unlocks_own"          on unlocks          for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "analysis_orders_own"  on analysis_orders  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "bookings_own"         on bookings         for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "course_progress_own"  on course_progress  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "payments_own"         on payments         for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "activities_own"       on activities       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
--  Auto-create profile row when a new user signs up via auth.users
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    case when new.email like 'admin@%' then 'admin' else 'student' end
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
--  DONE. Verify by running: select * from profiles;
--  (Will be empty until first user signs up.)
-- ============================================================
