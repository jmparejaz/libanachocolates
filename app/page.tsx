import { products, site } from "./data";
import { asset } from "./utils";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(cents);
}

const marqueeItems = [
  "Cacao de ritual",
  "Hecho en Colombia",
  "Naranja",
  "Uchuva",
  "Ají",
  "Chocolate con propósito",
  "Rescate animal",
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav aria-label="Navegación principal">
          <a href="#inicio" className="logo">
            Líbana<span className="logo-dot">.</span>
          </a>
          <ul>
            <li>
              <a href="#sabores">Sabores</a>
            </li>
            <li>
              <a href="#movimiento">Míralo</a>
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
          <div
            className="hero-photo"
            aria-hidden="true"
            style={{ backgroundImage: `url(${asset("/assets/site/img_0655.jpg")})` }}
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="container hero-content">
            <p className="hero-kicker">
              <span className="sticker">Chocolate con propósito</span>
            </p>
            <h1>
              Sabor
              <br />
              intenso
              <br />
              <em>y puro</em>
            </h1>
            <p className="hero-sub">
              Chocolate oscuro de un solo origen, hecho con cacao orgánico
              colombiano. Cada barra aporta a fundaciones de rescate animal.
            </p>
            <div className="hero-ctas">
              <a href="#compra" className="btn btn-primary">
                Compra ya →
              </a>
              <a href="#sabores" className="btn btn-ghost">
                Ver sabores
              </a>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((t, i) => (
              <span key={i}>
                {t} <i>✦</i>
              </span>
            ))}
          </div>
        </div>

        <section id="sabores" className="section flavors">
          <div className="container">
            <p className="eyebrow">Lo que hacemos</p>
            <h2 className="section-title">Sabores únicos</h2>
            <div className="flavors-grid">
              <article className="card">
                <div className="card-img">
                  <img
                    src={asset("/assets/site/store-cacao.jpg")}
                    alt="Cacao fino de aroma Líbana"
                    loading="lazy"
                  />
                </div>
                <h3>Cacao Fino de Aroma</h3>
                <p>
                  Granos seleccionados para un sabor intenso con perfiles
                  sensoriales únicos.
                </p>
                <a href="#compra" className="card-link">
                  Ver cacao →
                </a>
              </article>
              <article className="card">
                <div className="card-img">
                  <img
                    src={asset("/assets/site/store-chocolate-1.jpg")}
                    alt="Barras de chocolate oscuro Líbana"
                    loading="lazy"
                  />
                </div>
                <h3>Barras de Chocolate Oscuro</h3>
                <p>
                  Un solo origen, notas intensas y suaves. Naranja, uchuva y
                  ají.
                </p>
                <a href="#compra" className="card-link">
                  Ver barras →
                </a>
              </article>
              <article className="card">
                <div className="card-img">
                  <img
                    src={asset("/assets/site/store-chocolate-2.jpg")}
                    alt="Regalos Líbana"
                    loading="lazy"
                  />
                </div>
                <h3>Regalos</h3>
                <p>Presentaciones perfectas para cualquier ocasión.</p>
                <a href="#compra" className="card-link">
                  Ver regalos →
                </a>
              </article>
            </div>
          </div>
        </section>

        <section id="historia" className="section story">
          <div className="container story-grid">
            <div className="story-text">
              <p className="eyebrow light">Nuestra historia</p>
              <h2 className="section-title">
                Del cacao puro
                <br />a tu paladar
              </h2>
              <p className="story-lead">
                Cada barra cuenta su historia. Cada compra aporta a
                fundaciones de rescate animal en Colombia.
              </p>
              <a href="#compra" className="btn btn-primary">
                Únete al propósito →
              </a>
            </div>
            <div className="story-video">
              <video
                src={asset("/assets/videos/mvi-1255.mp4")}
                autoPlay
                muted
                loop
                playsInline
                aria-label="Nuestro chocolate acompaña tus momentos"
              />
            </div>
          </div>
        </section>

        <section id="movimiento" className="section movement">
          <div className="container">
            <p className="eyebrow">Míralo de cerca</p>
            <h2 className="section-title">Sabores en movimiento</h2>
            <p className="movement-sub">
              Textura, brillo y quiebre real. Sin filtros.
            </p>
            <div className="video-grid">
              <video src={asset("/assets/videos/mvi-0408.mp4")} autoPlay muted loop playsInline aria-label="Barra de chocolate sobre superficie oscura" />
              <video src={asset("/assets/videos/mvi-0915.mp4")} autoPlay muted loop playsInline aria-label="Barra con naranja deshidratada" />
              <video src={asset("/assets/videos/mvi-0920.mp4")} autoPlay muted loop playsInline aria-label="Barra de chocolate Líbana" />
              <video src={asset("/assets/videos/mvi-0911.mp4")} autoPlay muted loop playsInline aria-label="Barra de chocolate con trozos" />
              <video src={asset("/assets/videos/mvi-0921.mp4")} autoPlay muted loop playsInline aria-label="Barra Líbana con el gato del empaque" />
              <video src={asset("/assets/videos/mvi-0407.mp4")} autoPlay muted loop playsInline aria-label="Barra de chocolate en plato" />
            </div>
          </div>
        </section>

        <section id="galeria" className="section galeria">
          <div className="container">
            <p className="eyebrow">El detalle</p>
            <h2 className="section-title">La barra por dentro</h2>
            <div className="galeria-grid">
              <img src={asset("/assets/galeria/Naranja-3-4.jpg")} alt="Barra Naranja ángulo 3/4" loading="lazy" />
              <img src={asset("/assets/galeria/Uchuva-3-4.jpg")} alt="Barra Uchuva ángulo 3/4" loading="lazy" />
              <img src={asset("/assets/galeria/Aji-3-4.jpg")} alt="Barra Ají ángulo 3/4" loading="lazy" />
              <img src={asset("/assets/galeria/Naranja-atras.jpg")} alt="Envoltura Naranja por detrás" loading="lazy" />
              <img src={asset("/assets/galeria/Uchuva-atras.jpg")} alt="Envoltura Uchuva por detrás" loading="lazy" />
              <img src={asset("/assets/galeria/Aji-atras.jpg")} alt="Envoltura Ají por detrás" loading="lazy" />
              <img src={asset("/assets/galeria/Barra-de-chocolate-sin-envoltura.jpg")} alt="Barra de chocolate sin envoltura" loading="lazy" />
              <img src={asset("/assets/galeria/Chocolate-de-mesa.jpg")} alt="Chocolate de mesa Líbana" loading="lazy" />
              <img src={asset("/assets/galeria/Chocolate-de-mesa-closeup.jpg")} alt="Chocolate de mesa en detalle" loading="lazy" />
            </div>
          </div>
        </section>

        <section id="compra" className="section checkout">
          <div className="container">
            <p className="eyebrow">Pide el tuyo</p>
            <h2 className="section-title">Compra ya</h2>
            <p className="movement-sub">
              Elige tu sabor y paga en segundos. Tarjeta, PSE o Nequi.
            </p>
            <div className="products-grid">
              {products.map((p) => (
                <article key={p.id} className="product-card">
                  <div className="product-badge">{p.flavor}</div>
                  <img
                    src={p.image}
                    alt={`Barra de chocolate Líbana sabor ${p.flavor}`}
                    width={540}
                    height={810}
                    loading="lazy"
                  />
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="product-foot">
                    <span className="product-price">{formatPrice(p.price)}</span>
                    <a
                      href={p.paymentUrl}
                      className="btn btn-primary"
                      rel="noopener noreferrer"
                    >
                      Pagar
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="checkout-note">
              Pagos procesados de forma segura vía Wompi o Bold.
            </p>
          </div>
        </section>

        <section id="newsletter" className="section newsletter">
          <div className="container">
            <h2>Únete a Líbana</h2>
            <p>Ofertas y novedades del cacao, directo a tu correo.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="logo">Líbana.</span>
          <p>© {new Date().getFullYear()} Líbana Chocolates — Cacao de ritual.</p>
        </div>
      </footer>
    </>
  );
}
