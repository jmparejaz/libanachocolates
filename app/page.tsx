import { products, site } from "./data";
import { asset } from "./utils";

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function orderLink(flavor: string) {
  const message = `Hola, quiero pedir el chocolate Líbana sabor ${flavor}. ¿Me comparten disponibilidad y opciones de pago?`;
  return `https://wa.me/${site.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  return (
    <>
      <div className="announcement">
        <span>Chocolate de origen</span>
        <span aria-hidden="true">·</span>
        <span>Hecho con propósito</span>
      </div>

      <header className="site-header">
        <div className="header-inner container">
          <a className="wordmark" href="#inicio" aria-label="Líbana Chocolates, inicio">
            <span className="wordmark-name">líbana</span>
            <span className="wordmark-tagline">chocolates con propósito</span>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#sabores">Sabores</a>
            <a href="#historia">Nuestra historia</a>
            <a href="#ritual">El ritual</a>
          </nav>

          <a className="header-order" href="#sabores">
            Descubrir sabores <span aria-hidden="true">↗</span>
          </a>

          <details className="mobile-nav">
            <summary aria-label="Abrir menú de navegación">Menú <span aria-hidden="true">＋</span></summary>
            <nav aria-label="Navegación móvil">
              <a href="#sabores">Sabores</a>
              <a href="#historia">Nuestra historia</a>
              <a href="#ritual">El ritual</a>
            </nav>
          </details>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">Líbana · chocolate con propósito</p>
            <h1>
              Sabor intenso,
              <br />
              <em>hecho con intención.</em>
            </h1>
            <p className="hero-intro">
              Chocolate oscuro de un solo origen, elaborado con cacao orgánico
              colombiano. Tres sabores para disfrutar sin prisa.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#sabores">
                Encuentra tu sabor <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#historia">
                Conoce Líbana <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-facts" aria-label="Detalles del chocolate">
              <span><strong>60%</strong> cacao</span>
              <span><strong>85 g</strong> por barra</span>
              <span>Un solo origen</span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src={asset("/assets/drive-origin/hero-hands-sharing.jpg")}
              alt="Manos parten una barra de chocolate Líbana para compartir"
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero-detail">
              <img
                src={asset("/assets/drive-origin/hero-blue-plate.jpg")}
                alt="Chocolate Líbana sobre un plato azul"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="hero-photo-note">
              <span>Una pausa que sabe a cacao</span>
              <span aria-hidden="true">01 / 03</span>
            </div>
            <div className="hero-stamp" aria-label="Chocolate 60% cacao, 85 gramos">
              <span>60%</span>
              <small>cacao</small>
            </div>
          </div>
        </section>

        <div className="ingredient-ribbon" aria-label="Nuestra propuesta">
          <span>Cacao orgánico</span>
          <span aria-hidden="true">✳</span>
          <span>Fruta y sabor colombiano</span>
          <span aria-hidden="true">✳</span>
          <span>Chocolate con propósito</span>
        </div>

        <section id="sabores" className="products-section section-space">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Tres sabores, una misma intención</p>
                <h2>Conoce la familia.</h2>
              </div>
              <p className="section-heading-note">
                Chocolate oscuro al 60% de cacao, en barras de 85 g. Elige el
                que va con tu momento.
              </p>
            </div>

            <div className="products-grid">
              {products.map((product, index) => (
                <article
                  className="product-card"
                  data-flavor={product.id}
                  key={product.id}
                >
                  <div className="product-art">
                    <span className="product-index">0{index + 1}</span>
                    <img
                      src={product.image}
                      alt={`Empaque de ${product.name}`}
                      width={540}
                      height={810}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="product-cacao">60% cacao · 85 g</span>
                  </div>
                  <div className="product-copy">
                    <p className="product-kicker">Chocolate oscuro</p>
                    <h3>{product.flavor}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-purchase">
                      <div className="price-block">
                        <span className="current-price">{formatPrice(product.price)}</span>
                        {product.compareAtPrice ? (
                          <span className="previous-price">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        ) : null}
                      </div>
                      <a
                        className="button button-outline"
                        href={orderLink(product.flavor)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Pedir chocolate sabor ${product.flavor} por WhatsApp`}
                      >
                        Pedir <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="price-note">
              ¿Tienes dudas sobre disponibilidad o envío? Escríbenos por WhatsApp.
            </p>
          </div>
        </section>

        <section id="ritual" className="ritual-section section-space">
          <div className="container ritual-grid">
            <div className="ritual-photo">
              <img
                src={asset("/assets/drive-origin/hot-chocolate-ritual.jpg")}
                alt="Una bebida de chocolate se mezcla lentamente en una taza"
                loading="lazy"
                decoding="async"
              />
              <span className="image-caption">Que el día baje el ritmo.</span>
            </div>
            <div className="ritual-copy">
              <p className="eyebrow">Del cacao a tu pausa</p>
              <h2>Haz espacio para disfrutar.</h2>
              <p>
                Una barra para partir y compartir. Una bebida caliente para
                quedarte un rato más. Líbana está hecha para convertir lo
                cotidiano en un momento que sí se siente.
              </p>
              <a className="text-link text-link-dark" href="#sabores">
                Elige tu chocolate <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section id="historia" className="purpose-section section-space">
          <div className="container purpose-grid">
            <div className="purpose-copy">
              <p className="eyebrow">Chocolate con propósito</p>
              <h2>Una barra que también cuida.</h2>
              <p>
                Cada compra aporta a fundaciones de rescate animal en Colombia.
                Porque disfrutar algo bueno también puede ayudar a construir
                algo mejor.
              </p>
              <p className="pet-note">
                El chocolate es para las personas; nunca se lo des a una mascota.
              </p>
              <a
                className="button button-light"
                href={`https://wa.me/${site.whatsappPhone}?text=${encodeURIComponent("Hola, quiero conocer más sobre Líbana y su propósito.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hablemos de Líbana <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="purpose-photo">
              <img
                src={asset("/assets/drive-origin/flatlay-chocolate.jpg")}
                alt="Chocolate Líbana, una barra y ajíes secos sobre una mesa"
                loading="lazy"
                decoding="async"
              />
              <span className="purpose-photo-label">Hecho para compartir.</span>
            </div>
          </div>
        </section>

        <section className="moving-chocolate section-space" aria-labelledby="moving-title">
          <div className="container moving-grid">
            <div className="moving-copy">
              <p className="eyebrow">Mira de cerca</p>
              <h2 id="moving-title">El cacao también tiene su ritmo.</h2>
              <p>
                Textura, brillo y ese primer quiebre. Un pequeño adelanto de lo
                que te espera al abrir la barra.
              </p>
              <a className="text-link text-link-dark" href="#sabores">
                Descubrir los sabores <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="moving-video">
              <img
                className="moving-video-poster"
                src={asset("/assets/drive-origin/ritual-pour.jpg")}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <video
                src={asset("/assets/videos/mvi-0920.mp4")}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              />
              <span className="video-caption">Una pausa, en movimiento.</span>
            </div>
          </div>
        </section>

        <section className="closing-cta">
          <div className="container closing-content">
            <p className="eyebrow">Tu próximo momento favorito</p>
            <h2>¿Naranja, uchuva o ají?</h2>
            <p>Elige tu sabor. Nosotros te ayudamos con el pedido.</p>
            <a
              className="button button-light"
              href={`https://wa.me/${site.whatsappPhone}?text=${encodeURIComponent("Hola, quiero pedir chocolate Líbana. ¿Me ayudan a elegir un sabor?")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escríbenos por WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="wordmark footer-wordmark" href="#inicio">
            <span className="wordmark-name">líbana</span>
            <span className="wordmark-tagline">chocolates con propósito</span>
          </a>
          <p className="footer-note">
            Cacao de origen. Sabor intenso. Un propósito que importa.
          </p>
          <div className="footer-links" aria-label="Contacto">
            <a href={`https://wa.me/${site.whatsappPhone}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={`mailto:${site.email}`}>Correo</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Líbana Chocolates</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>
    </>
  );
}
