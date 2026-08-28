import Head from 'next/head'

export default function Home(){
  return (
    <>
      <Head>
        <title>Shanti Jewellers — Elegance That Lasts Forever</title>
        <meta name="description" content="Shanti Jewellers — elegant jewellery showroom in Dalli Rajhara. Explore collections, new arrivals and contact us." />
      </Head>

      <main className="container">
        <header className="header">
          <div className="logo">
            <div style={{fontSize:18}}>SHANTI JEWELLERS</div>
            <div style={{fontSize:12,color:'#d6c79a'}}>Elegance That Lasts Forever</div>
          </div>
          <nav style={{display:'flex',gap:12}}>
            <a href="#collections">Collections</a>
            <a href="#new">New Arrivals</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="/admin" style={{padding:'8px 12px',background:'#C9A74C',color:'#081018',borderRadius:8}}>Customer Login</a>
          </nav>
        </header>

        <section style={{marginTop:28}} className="hero">
          <div style={{flex:1}}>
            <h1 style={{fontSize:28,margin:0}}>Elegance That Lasts Forever</h1>
            <p style={{color:'#bfc6d0'}}>Shanti Jewellers — Main Road, New Market, Dalli Rajhara. Explore our curated jewellery collections and new arrivals. Contact: 9039664990 • shantijewellers05@gmail.com</p>

            <div style={{marginTop:14,display:'flex',gap:12}}>
              <a href="#collections" style={{background:'#C9A74C',color:'#081018',padding:'10px 14px',borderRadius:8,fontWeight:700}}>Explore Collection</a>
              <a href="https://wa.me/919039664990" style={{background:'transparent',color:'#C9A74C',padding:'10px 14px',borderRadius:8,border:'1px solid rgba(201,167,76,0.15)'}}>WhatsApp Us</a>
            </div>
          </div>

          <div style={{width:320}} className="card">
            <div style={{height:220,display:'flex',alignItems:'center',justifyContent:'center',background:'#0b0b0e',borderRadius:8}}>
              <div style={{color:'#777'}}>Product image / hero</div>
            </div>
            <div style={{marginTop:12}}>
              <strong>Featured Jewellery</strong>
              <p style={{margin:0,color:'#bfc6d0'}}>Sample featured product. Image placeholders used for the starter scaffold.</p>
            </div>
          </div>
        </section>

        <section id="collections" style={{marginTop:30}}>
          <h2>Collections</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12,marginTop:10}}>
            <div className="card">Gold Jewellery</div>
            <div className="card">Diamond Jewellery</div>
            <div className="card">Rings</div>
            <div className="card">Necklaces</div>
            <div className="card">Earrings</div>
            <div className="card">Bangles</div>
            <div className="card">Bridal Jewellery</div>
            <div className="card">Other Designs</div>
          </div>
        </section>

        <section id="new" style={{marginTop:28}}>
          <h2>New Arrivals</h2>
          <p className="card" style={{padding:12}}>New arrivals are automatically shown here when products are marked as New Arrival in the admin panel.</p>
        </section>

        <section id="about" style={{marginTop:28}}>
          <h2>About Us</h2>
          <p className="card" style={{padding:12}}>Shanti Jewellers is a jewellery showroom located in Dalli Rajhara. We offer elegant, high-quality designs and trusted service. Contact us to enquire about any design.</p>
        </section>

        <section id="contact" style={{marginTop:28}}>
          <h2>Contact</h2>
          <div className="card" style={{padding:12}}>
            <p style={{margin:0}}>Phone / WhatsApp: <a href="tel:9039664990">9039664990</a></p>
            <p style={{margin:0}}>Email: <a href="mailto:shantijewellers05@gmail.com">shantijewellers05@gmail.com</a></p>
            <p style={{margin:0}}>Address: Shanti Jewellers, Main Road, New Market, Dalli Rajhara</p>
            <p style={{marginTop:8}}><a href="https://www.instagram.com/shanti.jewellers.dalli?igsi=MWVnNm83ajdmNmFvbw==" target="_blank" rel="noreferrer">Instagram</a></p>
          </div>
        </section>

        <footer style={{marginTop:28,textAlign:'center',color:'#9aa4b2'}}>
          © {new Date().getFullYear()} Shanti Jewellers — Elegance That Lasts Forever
        </footer>
      </main>
    </>
  )
}
