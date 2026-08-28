import { useState } from 'react';

export default function AdminProducts() {
  const [loading, setLoading] = useState(false);
  const [name,setName] = useState('');
  const [productId,setProductId] = useState('');
  const [desc,setDesc] = useState('');
  const [images,setImages] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    const payload = {
      name, product_id: productId, description: desc,
      images: images ? images.split(',').map(s=>s.trim()) : []
    };

    const resp = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': prompt('Enter admin secret to proceed') || ''
      },
      body: JSON.stringify(payload)
    });

    const json = await resp.json();
    if (resp.ok) {
      alert('Created: ' + json.data.name);
      setName(''); setProductId(''); setDesc(''); setImages('');
    } else {
      alert('Error: ' + (json.error || 'Failed'));
    }
    setLoading(false);
  }

  return (
    <main className="container">
      <h1>Admin — Products</h1>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:10,maxWidth:640}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Product name" />
        <input value={productId} onChange={e=>setProductId(e.target.value)} placeholder="Product ID" />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" rows={4} />
        <input value={images} onChange={e=>setImages(e.target.value)} placeholder="Comma-separated image URLs (upload to Supabase storage separately)" />
        <button type="submit" disabled={loading} style={{background:'#C9A74C',padding:10,borderRadius:8}}>Create product</button>
      </form>
    </main>
  );
}
