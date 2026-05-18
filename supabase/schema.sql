-- =============================================
-- GAUGAU Ecommerce — Supabase Schema
-- Run this in: Supabase Dashboard > SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ========================
-- CATEGORIES
-- ========================
create table if not exists categories (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  slug        text not null unique,
  parent_id   uuid references categories(id) on delete set null,
  description text,
  image_url   text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create index on categories(slug);
create index on categories(parent_id);

-- ========================
-- PRODUCTS
-- ========================
create table if not exists products (
  id               uuid primary key default uuid_generate_v4(),
  title            text not null,
  slug             text not null unique,
  description      text,
  price            int  not null,            -- stored in cents (e.g. 1999 = $19.99)
  compare_at_price int,                      -- original price for sale items
  category_id      uuid references categories(id) on delete set null,
  tags             text[] not null default '{}',
  is_active        boolean not null default true,
  is_featured      boolean not null default false,
  stock_quantity   int not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index on products(slug);
create index on products(category_id);
create index on products(is_active);
create index on products(is_featured);
create index on products using gin(tags);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- ========================
-- PRODUCT IMAGES
-- ========================
create table if not exists product_images (
  id          uuid primary key default uuid_generate_v4(),
  product_id  uuid not null references products(id) on delete cascade,
  url         text not null,
  alt         text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create index on product_images(product_id);

-- ========================
-- PROFILES (extends auth.users)
-- ========================
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  first_name  text,
  last_name   text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ========================
-- ADDRESSES
-- ========================
create table if not exists addresses (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  address1    text not null,
  address2    text,
  city        text not null,
  state       text not null,
  zip         text not null,
  country     text not null default 'US',
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

create index on addresses(user_id);

-- ========================
-- ORDERS
-- ========================
create type order_status as enum (
  'pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
);

create table if not exists orders (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid references auth.users(id) on delete set null,
  status           order_status not null default 'pending',
  subtotal         int not null,
  shipping_cost    int not null default 0,
  tax              int not null default 0,
  total_price      int not null,
  shipping_address jsonb not null,
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index on orders(user_id);
create index on orders(status);

create trigger orders_updated_at
  before update on orders
  for each row execute function update_updated_at();

-- ========================
-- ORDER ITEMS
-- ========================
create table if not exists order_items (
  id              uuid primary key default uuid_generate_v4(),
  order_id        uuid not null references orders(id) on delete cascade,
  product_id      uuid references products(id) on delete set null,
  product_title   text not null,
  product_image   text,
  quantity        int not null,
  unit_price      int not null,
  total_price     int not null,
  created_at      timestamptz not null default now()
);

create index on order_items(order_id);
create index on order_items(product_id);

-- ========================
-- NEWSLETTER SUBSCRIBERS
-- ========================
create table if not exists newsletter_subscribers (
  id          uuid primary key default uuid_generate_v4(),
  email       text not null unique,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create index on newsletter_subscribers(email);

-- ========================
-- ROW LEVEL SECURITY
-- ========================

alter table profiles               enable row level security;
alter table addresses              enable row level security;
alter table orders                 enable row level security;
alter table order_items            enable row level security;
alter table products               enable row level security;
alter table categories             enable row level security;
alter table product_images         enable row level security;
alter table newsletter_subscribers enable row level security;

-- Products & Categories: public read
create policy "Public read products"
  on products for select using (is_active = true);

create policy "Public read categories"
  on categories for select using (true);

create policy "Public read product_images"
  on product_images for select using (true);

-- Profiles: users manage own
create policy "Users read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on profiles for update using (auth.uid() = id);

-- Addresses: users manage own
create policy "Users manage own addresses"
  on addresses for all using (auth.uid() = user_id);

-- Orders: users read own
create policy "Users read own orders"
  on orders for select using (auth.uid() = user_id);

create policy "Users insert own orders"
  on orders for insert with check (auth.uid() = user_id);

create policy "Users read own order items"
  on order_items for select
  using (exists (
    select 1 from orders where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  ));

-- Newsletter: insert only
create policy "Anyone can subscribe"
  on newsletter_subscribers for insert with check (true);

-- ========================
-- SEED DATA — Categories
-- ========================
insert into categories (name, slug, sort_order) values
  ('New & Featured', 'new',          1),
  ('Play',           'play',         2),
  ('Home',           'home',         3),
  ('Kitchen',        'kitchen',      4),
  ('Wellness',       'wellness',     5),
  ('On-The-Go',      'on-the-go',    6),
  ('Tech',           'tech',         7),
  ('Stationery',     'stationery',   8),
  ('Cool Tools',     'cool-tools',   9),
  ('Gifts',          'gifts',       10)
on conflict (slug) do nothing;
