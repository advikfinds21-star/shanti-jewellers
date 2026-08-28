-- Supabase schema for Shanti Jewellers starter
-- Run this in your Supabase SQL editor to create tables and seed basic data.

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  product_id text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  description text,
  price numeric,
  images text[],
  availability boolean DEFAULT true,
  new_arrival boolean DEFAULT false,
  featured boolean DEFAULT false,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admins
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

-- Customers (voluntary info)
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text,
  email text,
  phone text,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Festivals
CREATE TABLE IF NOT EXISTS festivals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  start_date date,
  end_date date,
  theme jsonb,
  enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Posters
CREATE TABLE IF NOT EXISTS posters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  festival_id uuid REFERENCES festivals(id) ON DELETE CASCADE,
  image_url text,
  mobile_image_url text,
  start_date date,
  end_date date,
  link text,
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Visits (simple privacy-friendly counters)
CREATE TABLE IF NOT EXISTS visits (
  id bigserial PRIMARY KEY,
  path text,
  event_type text,
  created_at timestamptz DEFAULT now()
);

-- Login activity
CREATE TABLE IF NOT EXISTS login_activity (
  id bigserial PRIMARY KEY,
  user_id uuid,
  user_type text,
  event text,
  ip text,
  created_at timestamptz DEFAULT now()
);

-- Seed categories
INSERT INTO categories (name, slug) VALUES
('Gold Jewellery','gold-jewellery') ON CONFLICT DO NOTHING,
('Diamond Jewellery','diamond-jewellery') ON CONFLICT DO NOTHING,
('Rings','rings') ON CONFLICT DO NOTHING,
('Necklaces','necklaces') ON CONFLICT DO NOTHING,
('Earrings','earrings') ON CONFLICT DO NOTHING,
('Bangles','bangles') ON CONFLICT DO NOTHING,
('Bridal Jewellery','bridal-jewellery') ON CONFLICT DO NOTHING,
('Other Designs','other-designs') ON CONFLICT DO NOTHING;

-- Seed a sample product (without real images)
INSERT INTO products (name, product_id, description, images, category_id, price, new_arrival, featured) 
SELECT
  'Classic Latkan Earrings', 'SJ-LE-001', 'Traditional latkan-style earrings, matte & textured finish.', ARRAY['/placeholder/latkan-1.jpg','/placeholder/latkan-2.jpg']::text[], c.id, 0, true, true
FROM categories c WHERE c.slug = 'earrings' LIMIT 1
ON CONFLICT DO NOTHING;

-- Seed admin user row (no password stored here; use Supabase Auth to link)
INSERT INTO admins (email, name, role) VALUES ('owner@example.com','Owner','admin') ON CONFLICT DO NOTHING;

-- Note: Connect Supabase Auth users to admins table via user metadata and RLS policies in production.
