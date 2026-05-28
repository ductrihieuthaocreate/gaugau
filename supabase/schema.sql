-- go2go ecommerce schema
-- Run this in the Supabase SQL editor

-- Categories
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  image_url   text,
  created_at  timestamptz default now()
);

-- Products
create table if not exists products (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  slug              text not null unique,
  description       text,
  price             integer not null,        -- cents
  compare_at_price  integer,                 -- cents
  stock_quantity    integer not null default 0,
  category_id       uuid references categories(id) on delete set null,
  tags              text[] default '{}',
  featured          boolean default false,
  created_at        timestamptz default now()
);

-- Product images
create table if not exists product_images (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url        text not null,
  alt        text,
  position   integer default 0,
  created_at timestamptz default now()
);

-- Orders (created via Stripe webhook)
create table if not exists orders (
  id                uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  total_amount      integer default 0,       -- cents
  status            text default 'pending',
  customer_email    text,
  created_at        timestamptz default now()
);

-- Settings (key/value store for CMS)
create table if not exists settings (
  key        text primary key,
  value      jsonb,
  updated_at timestamptz default now()
);

-- Indexes
create index if not exists idx_products_slug        on products(slug);
create index if not exists idx_products_category    on products(category_id);
create index if not exists idx_products_featured    on products(featured) where featured = true;
create index if not exists idx_product_images_prod  on product_images(product_id);

-- Row Level Security
alter table categories     enable row level security;
alter table products       enable row level security;
alter table product_images enable row level security;
alter table orders         enable row level security;
alter table settings       enable row level security;

-- Public read for storefront
create policy "public read categories"     on categories     for select using (true);
create policy "public read products"       on products       for select using (true);
create policy "public read product_images" on product_images for select using (true);
create policy "public read settings"       on settings       for select using (true);

-- Service role gets full access (used by admin server actions)
-- No extra policies needed — service role key bypasses RLS

-- Seed: sample categories
insert into categories (name, slug) values
  ('Gifts',      'gifts'),
  ('Kitchen',    'kitchen'),
  ('Home Decor', 'home-decor'),
  ('Gadgets',    'gadgets'),
  ('Wellness',   'wellness'),
  ('Outdoor',    'outdoor')
on conflict (slug) do nothing;

-- Seed: sample products
insert into products (title, slug, description, price, compare_at_price, stock_quantity, featured, tags)
select
  'Bamboo Cutting Board Set',
  'bamboo-cutting-board-set',
  'Premium bamboo cutting boards in three sizes. Perfect for any kitchen.',
  4999,
  6999,
  50,
  true,
  array['best-seller', 'kitchen']
where not exists (select 1 from products where slug = 'bamboo-cutting-board-set');

insert into products (title, slug, description, price, compare_at_price, stock_quantity, featured, tags)
select
  'Ceramic Pour-Over Coffee Set',
  'ceramic-pour-over-coffee-set',
  'Handcrafted ceramic pour-over dripper with matching mug. For the coffee lover.',
  5499,
  null,
  30,
  true,
  array['gifts', 'kitchen']
where not exists (select 1 from products where slug = 'ceramic-pour-over-coffee-set');

insert into products (title, slug, description, price, compare_at_price, stock_quantity, featured, tags)
select
  'Linen Throw Blanket',
  'linen-throw-blanket',
  'Soft stonewashed linen throw in natural tones. Cozy and timeless.',
  8900,
  null,
  25,
  true,
  array['home-decor', 'gifts']
where not exists (select 1 from products where slug = 'linen-throw-blanket');

insert into products (title, slug, description, price, compare_at_price, stock_quantity, featured, tags)
select
  'Leather Cable Organizer',
  'leather-cable-organizer',
  'Genuine leather desk cable organizer. Keep your workspace tidy.',
  2499,
  3499,
  80,
  false,
  array['gadgets', 'desk-office']
where not exists (select 1 from products where slug = 'leather-cable-organizer');

insert into products (title, slug, description, price, compare_at_price, stock_quantity, featured, tags)
select
  'Aromatherapy Candle Gift Set',
  'aromatherapy-candle-gift-set',
  'Set of 3 hand-poured soy candles in calming scents. Makes a perfect gift.',
  3499,
  4500,
  60,
  true,
  array['wellness', 'gifts', 'best-seller']
where not exists (select 1 from products where slug = 'aromatherapy-candle-gift-set');

insert into products (title, slug, description, price, compare_at_price, stock_quantity, featured, tags)
select
  'Insulated Tumbler 20oz',
  'insulated-tumbler-20oz',
  'Double-wall vacuum insulated tumbler. Keeps drinks hot or cold for 24 hours.',
  3299,
  null,
  100,
  false,
  array['kitchen', 'drinkware', 'best-seller']
where not exists (select 1 from products where slug = 'insulated-tumbler-20oz');
