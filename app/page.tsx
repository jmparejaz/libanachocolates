import { products } from "./data";
import { asset } from "./utils";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(cents);
}

const marqueePhotos = [
  "img_0001",
  "img_0655",
  "img_0428",
  "replicate-prediction",
  "image-11",
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
          <video
            className="hero-video"
            src={asset("/assets/videos/mvi-0920.mp4")}
            poster={asset("/assets/site/img_0222.jpg")}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-tag">Cacao de ritual — hecho en Colombia</p>
            <h1>
              El chocolate
              <br />
              hace todo
              <br />
              <em>mejor.</em>
            </h1>
            <p className="hero-sub">
              Chocolate oscuro de un solo origen con cacao orgánico colombiano.
              Cada barra aporta a fundaciones de rescate animal.
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

        <div className="photo-marquee" aria-hidden="true">
          <div className="photo-marquee-track">
            {[...marqueePhotos, ...marqueePhotos].map((p, i) => (
              <img
                key={i}
                src={asset(`/assets/site/${p}.jpg`)}
                alt=""
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <section className="banner-destacado">
          <div className="container banner-grid">
            <div className="banner-text">
              <p className="eyebrow">Nuestro orgullo</p>
              <h2 className="section-title">Hecho a mano, con luz natural</h2>
              <p className="banner-lead">
                Barras de un solo origen fotografiadas como se merecen: en
                casa, con paciencia y sombras suaves. Así se ve el chocolate
                cuando se hace bien.
              </p>
            </div>
            <div className="banner-imgs">
              <img
                src={asset("/assets/site/replicate-prediction.jpg")}
                alt="Barras de chocolate Líbana sobre plato azul con sombras suaves"
                className="banner-main"
              />
              <img
                src={asset("/assets/site/image-11.jpg")}
                alt="Barra de chocolate con naranjas deshidratadas sobre tabla de madera"
                className="banner-secondary"
              />
            </div>
          </div>
        </section>

        <section id="sabores" className="section flavors">
          <div className="container">
            <p className="eyebrow">Lo que hacemos</p>
            <h2 className="section-title">Sabores únicos</h2>
            <div className="flavors-grid">
              <article className="flavor-card">
                <div className="flavor-img">
                  <img
                    src={asset("/assets/site/store-cacao.jpg")}
                    alt="Cacao fino de aroma Líbana"
                    loading="lazy"
                  />
                </div>
                <h3>Naranja</h3>
                <p>
                  Chocolate oscuro con naranja deshidratada. Cítrico, intenso,
                  puro.
                </p>
              </article>
              <article className="flavor-card">
                <div className="flavor-img">
                  <img
                    src={asset("/assets/site/store-chocolate-1.jpg")}
                    alt="Barra de chocolate oscuro Líbana"
                    loading="lazy"
                  />
                </div>
                <h3>Uchuva</h3>
                <p>
                  La fruta más colombiana bañada en chocolate oscuro 70%.
                </p>
              </article>
              <article className="flavor-card">
                <div className="flavor-img">
                  <img
                    src={asset("/assets/site/store-chocolate-2.jpg")}
                    alt="Regalos Líbana"
                    loading="lazy"
                  />
                </div>
                <h3>Ají</h3>
                <p>
                  Dulce al principio, picante al final. Un toque de ají
                  colombiano.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="historia" className="section story">
          <div className="container story-grid">
            <div>
              <p className="eyebrow">Chocolate con propósito</p>
              <h2 className="section-title">
                Del cacao puro a tu paladar
              </h2>
              <p className="story-lead">
                Cada barra cuenta su historia. Y la historia incluye a los que
                no tienen voz: cada compra aporta a fundaciones de rescate
                animal en Colombia.
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
                aria-label="Nuestro chocolate acompaña tus momentos con tu mascota"
              />
            </div>
          </div>
        </section>

        <section id="movimiento" className="section movement">
          <div className="container">
            <p className="eyebrow">Míralo de cerca</p>
            <h2 className="section-title">En movimiento</h2>
            <p className="movement-sub">
              Textura, brillo y quiebre real. Sin filtros, sin poses.
            </p>
            <div className="video-grid">
              <video src={asset("/assets/videos/mvi-0408.mp4")} autoPlay muted loop playsInline aria-label="Barra de chocolate sobre superficie oscura" />
              <video src={asset("/assets/videos/mvi-0915.mp4")} autoPlay muted loop playsInline aria-label="Barra con naranja deshidratada" />
              <video src={asset("/assets/videos/mvi-0921.mp4")} autoPlay muted loop playsInline aria-label="Barra Líbana con el gato del empaque" />
              <video src={asset("/assets/videos/mvi-0911.mp4")} autoPlay muted loop playsInline aria-label="Barra de chocolate con trozos" />
              <video src={asset("/assets/videos/mvi-0928.mp4")} autoPlay muted loop playsInline aria-label="Taza de chocolate" />
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
            <p className="checkout-sub">
              Elige tu sabor y paga en segundos: tarjeta, PSE o Nequi.
            </p>
            <div className="products-grid">
              {products.map((p) => (
                <article key={p.id} className="product-card">
                  <div className="product-img-wrap">
                    <img
                      src={p.image}
                      alt={`Barra de chocolate Líbana sabor ${p.flavor}`}
                      width={540}
                      height={810}
                      loading="lazy"
                    />
                  </div>
                  <h3>{p.flavor}</h3>
                  <p className="product-desc">{p.description}</p>
                  <span className="product-price">{formatPrice(p.price)}</span>
                  <a
                    href={p.paymentUrl}
                    className="btn btn-dark"
                    rel="noopener noreferrer"
                  >
                    Pagar
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="newsletter" className="newsletter">
          <div className="container">
            <h2>Únete a Líbana</h2>
            <p>
              Ofertas, nuevos sabores y historias del cacao — directo a tu
              correo.
            </p>
            <a href="#compra" className="btn btn-dark">
              Suscribirme
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="logo">
            Líbana<span className="logo-dot">.</span>
          </span>
          <p>© {new Date().getFullYear()} Líbana Chocolates — Cacao de ritual.</p>
        </div>
      </footer>
    </>
  );
}
