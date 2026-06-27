-- Add carbon_footprint column to products table
alter table public.products add column if not exists carbon_footprint jsonb;
