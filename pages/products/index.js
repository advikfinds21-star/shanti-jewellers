import useSWR from 'swr';
import ProductCard from '../../components/ProductCard';

const fetcher = (url) => fetch(url).then(r => r.json()).then(j => j.data);

export default function ProductsPage() {
  const { data, error } = useSWR('/api/products', fetcher);

  if (error) return <div className="container">Failed to load products.</div>;
  if (!data) return <div className="container">Loading...</div>;

  return (
    <main className="container">
      <h1>Collections</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {data.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}
