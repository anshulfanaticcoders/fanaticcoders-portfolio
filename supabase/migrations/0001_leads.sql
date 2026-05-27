-- Leads table: stores incoming contact form submissions.
-- Public can insert; only service_role / admin can read (RLS denies SELECT by default).

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  budget text,
  service_interest text[] not null default '{}',
  message text not null,
  source_page text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_email_idx
  on public.leads (email);

alter table public.leads enable row level security;

-- Public can submit. No SELECT/UPDATE/DELETE policy — RLS denies by default,
-- so only the service role (server-side admin) can read/manage these rows.
drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

comment on table public.leads is 'Contact form submissions. Insert-only for anon; readable via service role.';
comment on column public.leads.service_interest is 'Array of service tags chosen on the contact form.';
comment on column public.leads.source_page is 'Page path that produced the submission.';
