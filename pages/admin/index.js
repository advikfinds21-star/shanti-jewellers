import Head from 'next/head'

export default function Admin(){
  return (
    <>
      <Head>
        <title>Admin — Shanti Jewellers</title>
      </Head>

      <main className="container">
        <header className="header">
          <div className="logo">SHANTI JEWELLERS — Admin</div>
          <nav style={{display:'flex',gap:12}}>
            <a href="/">Public site</a>
          </nav>
        </header>

        <section style={{marginTop:28}}>
          <h2>Admin Panel (Starter)</h2>
          <p className="card">This is a starter admin scaffold. Authentication and protected APIs will be implemented with Supabase. For now use this page as a placeholder while the admin features are integrated.</p>

          <div style={{marginTop:14}} className="card">
            <strong>Next steps</strong>
            <ul>
              <li>Wire Supabase Auth for admin login</li>
              <li>Implement product CRUD and image uploads</li>
              <li>Implement festival manager and poster uploads</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
