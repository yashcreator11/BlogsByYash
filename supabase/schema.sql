-- Run this in the Supabase SQL editor for your project.

create table subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamp with time zone default now(),
  is_active boolean default true,
  unsubscribe_token uuid default gen_random_uuid()
);

-- Index for fast lookups
create index on subscribers(email);
create index on subscribers(unsubscribe_token);
