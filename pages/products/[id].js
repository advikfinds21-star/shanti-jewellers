import { useRouter } from 'next/router';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then(r => r.json()).then(j => j.data);

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/products/${id}` : null, fetcher);

  if (error) return <div className="container">Failed to load</div>;
  if (!data) return <div className="container">Loading...</div>;

  const p = data;
  return (
    <main className="container">
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
        <div>
          <img src={(p.images && p.images[0]) || '/placeholder/product.jpg'} alt={p.name} style={{width:'100%',borderRadius:10}} />
        </div>
        <div>
          <h1>{p.name}</h1>
          <p>{p.description}</p>
          <p><strong>Product ID:</strong> {p.product_id}</p>
          <p><strong>Availability:</strong> {p.availability ? 'Available' : 'Out of stock'}</p>
          <a href={`https://wa.me/919039664990?text=Enquiry%20about%20${encodeURIComponent(p.name)}`} style={{background:'#C9A74C',padding:'10px 12px',borderRadius:8,color:'#081018',display:'inline-block'}}>Enquire Now</a>
        </div>
      </div>
    </main>
  );
}
