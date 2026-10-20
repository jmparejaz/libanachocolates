export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav aria-label="Navegación principal">
          <a href="#inicio" className="logo">
            Líbana
          </a>
          <ul>
            <li>
              <a href="#sabores">Sabores</a>
            </li>
            <li>
              <a href="#historia">Historia</a>
            </li>
            <li>
              <a href="#compra" className="nav-cta">
                Compra ya
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="container">
            <p className="hero-kicker">Descuentos irresistibles en chocolates</p>
            <h1>Sabor intenso y puro</h1>
            <p className="hero-sub">
              Chocolate oscuro de un solo origen, hecho con cacao orgánico
              colombiano.
            </p>
            <div className="hero-ctas">
              <a href="#compra" className="btn btn-primary">
                Compra ya
              </a>
              <a href="#sabores" className="btn btn-accent">
                Ver cacao
              </a>
            </div>
          </div>
        </section>

        <section id="sabores" className="section flavors">
          <div className="container">
            <h2 className="section-title">Sabores únicos</h2>
            <div className="flavors-grid">
              <article>
                <h3>Cacao Fino de Aroma</h3>
                <p>
                  Granos seleccionados para un sabor intenso y con perfiles
                  sensoriales únicos.
                </p>
                <a href="#compra">Ver cacao →</a>
              </article>
              <article>
                <h3>Barras de Chocolate Oscuro</h3>
                <p>
                  Chocolate oscuro de un solo origen con notas intensas y
                  suaves.
                </p>
                <a href="#compra">Ver barras →</a>
              </article>
              <article>
                <h3>Regalos</h3>
                <p>Presentaciones perfectas para cualquier ocasión.</p>
                <a href="#compra">Ver regalos →</a>
              </article>
            </div>
          </div>
        </section>

        <section id="historia" className="section story">
          <div className="container">
            <h2 className="section-title">Sabor</h2>
            <p>
              Del cacao puro a tu paladar, cada barra cuenta su historia. Cada
              compra aporta a fundaciones de rescate animal en Colombia.
            </p>
          </div>
        </section>

        <section id="compra" className="section newsletter">
          <div className="container">
            <h2>Únete a Líbana</h2>
            <p>Recibe ofertas y novedades del cacao.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Líbana Chocolates — Cacao de ritual.</p>
        </div>
      </footer>
    </>
  );
}
