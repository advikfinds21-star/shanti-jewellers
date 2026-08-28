// pages/api/products/[id].js
import { supabaseServer } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (!supabaseServer) {
    return res.status(500).json({ error: 'Server not configured. SUPABASE_SERVICE_ROLE_KEY missing.' });
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseServer
        .from('products')
        .select('*, category:category_id(name,slug)')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  }

  if (req.method === 'PATCH' || req.method === 'PUT') {
    const adminSecret = req.headers['x-admin-secret'];
    if (!adminSecret || adminSecret !== process.env.ADMIN_API_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const payload = req.body;
    try {
      const { data, error } = await supabaseServer
        .from('products')
        .update({
          ...payload,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) throw error;
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  }

  if (req.method === 'DELETE') {
    const adminSecret = req.headers['x-admin-secret'];
    if (!adminSecret || adminSecret !== process.env.ADMIN_API_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const { error } = await supabaseServer.from('products').delete().eq('id', id);
      if (error) throw error;
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  }

  res.setHeader('Allow', ['GET','PATCH','DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
