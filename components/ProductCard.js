export default function ProductCard({ product }) {
  const img = (product.images && product.images[0]) || '/placeholder/product.jpg';
  return (
    <article className="card" style={{padding:12}}>
      <div style={{height:180,background:'#0b0b0e',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8}}>
        <img src={img} alt={product.name} style={{maxHeight:'100%',maxWidth:'100%'}} />
      </div>
      <h3 style={{marginTop:8}}>{product.name}</h3>
      <p style={{color:'#bfc6d0',margin:0}}>{product.product_id}</p>
      <p style={{marginTop:8}}>{product.description?.slice(0,100)}</p>
      <div style={{marginTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <a href={`/products/${product.id}`} style={{color:'#C9A74C'}}>View</a>
        <div style={{fontWeight:700}}>{product.price ? `₹${product.price}` : ''}</div>
      </div>
    </article>
  );
}
