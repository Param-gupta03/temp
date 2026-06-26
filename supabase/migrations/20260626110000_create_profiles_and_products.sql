-- Create Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null default 'buyer' check (role in ('buyer', 'seller', 'admin')),
  eco_coins integer not null default 0,
  wallet numeric not null default 0,
  created_at timestamptz not null default now()
);

-- Disable RLS on profiles to allow client-side wallet updates and local admin reads
alter table public.profiles disable row level security;


-- Trigger function to auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, eco_coins, wallet)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'buyer'),
    0,
    0
  );
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Create Products Table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  admin_price numeric,
  category text,
  seller_id uuid references public.profiles(id) on delete cascade not null,
  image_url text,
  material_used text,
  weight text,
  is_verified boolean not null default false,
  number_of_item integer not null default 0,
  created_at timestamptz not null default now()
);

-- Disable RLS on products to allow local admin verification/editing and buyer stock updates
alter table public.products disable row level security;
