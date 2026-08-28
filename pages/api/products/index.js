// pages/api/products/index.js
import { supabaseServer } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (!supabaseServer) {
    return res.status(500).json({ error: 'Server not configured. SUPABASE_SERVICE_ROLE_KEY missing.' });
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseServer
        .from('products')
        .select('*, category:category_id(name,slug)')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  }

  if (req.method === 'POST') {
    // simple secret check; in production use authenticated sessions and RLS
    const adminSecret = req.headers['x-admin-secret'];
    if (!adminSecret || adminSecret !== process.env.ADMIN_API_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = req.body;
    try {
      const { data, error } = await supabaseServer.from('products').insert([
        {
          name: payload.name,
          product_id: payload.product_id || null,
          category_id: payload.category_id || null,
          description: payload.description || null,
          price: payload.price ?? null,
          images: payload.images || [],
          availability: payload.availability ?? true,
          new_arrival: payload.new_arrival ?? false,
          featured: payload.featured ?? false,
          published: payload.published ?? true
        }
      ]).select();

      if (error) throw error;
      return res.status(201).json({ data: data[0] });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  }

  res.setHeader('Allow', ['GET','POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
