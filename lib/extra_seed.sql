-- Extra seed data for Shanti Jewellers
-- Run this in Supabase SQL editor after lib/supabase.sql to add a couple more sample products.

-- Polished Solitaire Ring
INSERT INTO products (name, product_id, description, images, category_id, price, new_arrival, featured, published)
SELECT
  'Polished Solitaire Ring',
  'SJ-R-001',
  'Elegant polished solitaire ring in 18K gold with a brilliant cut center stone.',
  ARRAY['/placeholder/solitaire-1.jpg','/placeholder/solitaire-2.jpg']::text[],
  c.id,
  25000,
  true,
  false,
  true
FROM categories c
WHERE c.slug = 'rings'
  AND NOT EXISTS (SELECT 1 FROM products p WHERE p.product_id = 'SJ-R-001');

-- Heritage Necklace
INSERT INTO products (name, product_id, description, images, category_id, price, new_arrival, featured, published)
SELECT
  'Heritage Temple Necklace',
  'SJ-N-001',
  'Traditional temple-style necklace with hand-carved motifs and kundan inlay.',
  ARRAY['/placeholder/necklace-1.jpg']::text[],
  c.id,
  45000,
  false,
  true,
  true
FROM categories c
WHERE c.slug = 'necklaces'
  AND NOT EXISTS (SELECT 1 FROM products p WHERE p.product_id = 'SJ-N-001');

-- Optional: a simple poster entry for a festival (commented out, enable if you use festival themes)
-- INSERT INTO festivals (name, start_date, end_date, theme, enabled)
-- VALUES ('Spring Festival', '2026-09-01', '2026-09-15', '{"primary":"#C9A74C","accent":"#081018"}', true)
-- ON CONFLICT DO NOTHING;
