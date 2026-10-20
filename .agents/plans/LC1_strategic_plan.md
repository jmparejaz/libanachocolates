# Strategic Plan --- LC-1: Sitio web codificado para Líbana Chocolates

| Field | Value |
|-------|-------|
| **Ticket** | LC-1 (GitHub Issue #1) |
| **Title** | Migración de libanachocolates.com desde Hostinger Web Designer a sitio codificado |
| **Date** | 2026-10-20 |
| **Author** | Head of Council |
| **Status** | Draft (pendiente GO del usuario en Decisiones Abiertas) |
| **Source** | [Issue #1](https://github.com/jmparejaz/libanachocolates/issues/1), [PR #2](https://github.com/jmparejaz/libanachocolates/pull/2), KB de Notion "Líbana Chocolates" |

---

## 1. Context & Objective

libanachocolates.com opera hoy en el Web Designer de Hostinger. La única pasarela de pagos integrada con esa plataforma (dLocalGo) rechazó prestar servicio, de modo que cualquier campaña publicitaria generaría pedidos no cobrables pero con envíos obligatorios: el negocio de venta online está bloqueado. La salida es recrear el sitio como código propio, desplegado en el hosting de Hostinger (stack estático, deploy manual por upload/FTP), replicando la estructura y las imágenes actuales, con una estética inspirada en graza.co (cálida, tipografía grande, copy casual, "everyday premium") que ha demostrado atractivo viral.

**Goal:** Un sitio estático codificado, desplegable en Hostinger sin Web Designer, que replique libanachocolates.com con estética graza.co y deje el checkout listo para integrar una pasarela colombiana.

## 2. Scope

### In scope
- One-page en español con secciones actuales: Hero, Sabores Únicos (Cacao Fino de Aroma / Barras de Chocolate Oscuro / Regalos), Newsletter, Storytelling (cacao de ritual, fundaciones de rescate animal), Footer.
- Estética graza.co: paleta cálida (chocolate/crema/acento), tipografía display grande (Google Fonts libres), copy casual, microanimaciones CSS ligeras.
- Assets: descarga desde el Google Drive del proyecto → `assets/` del repo (sin hotlinks).
- Responsive (móvil/tablet/desktop), accesibilidad AA básica, SEO preservado (title/description actuales), Open Graph.
- Estructura de checkout desacoplada (CTA de compra → sección/página de checkout placeholder, sin integración real).
- Actualización del KB de Notion por subplan.

### Out of scope
- Integración real de la pasarela de pagos (requiere selección de proveedor y credenciales — se documenta y escala).
- Deploy real en Hostinger (requiere credenciales del panel; se entregan instrucciones).
- Blog/contenido nuevo, campañas, copywriting profesional (se reutiliza el copy actual).
- Modificar el harness `.agent/` o el sitio en el Web Designer.

## 3. Commit Subplanes (breakdown)

| # | Name | Description | Risk | Depends on |
|---|------|-------------|------|------------|
| 1 | `scaffold` | Estructura del sitio estático (index.html, css, js, assets/), head SEO/OG, fuentes, paleta y tokens de diseño graza-esca | low | none |
| 2 | `assets` | Descarga e integración de imágenes del Drive a assets/ (con fallback documentado si el Drive no es accesible programáticamente) | medium | 1 |
| 3 | `sections` | Implementación de todas las secciones (Hero, Sabores, Newsletter, Storytelling, Footer) con copy actual y estética graza | medium | 2 |
| 4 | `checkout-ready` | Sección de compra desacoplada + decisión de pasarela documentada | low | 3 |
| 5 | `qa-seo` | Verificación responsive, accesibilidad, rutas de assets, SEO; correcciones | medium | 3, 4 |
| 6 | `handoff` | Instrucciones de deploy en Hostinger (upload/FTP), retrospective, actualización Notion, cierre del PR | low | 5 |

### Execution order
Secuencial 1→6; `sections` y `checkout-ready` podrían solaparse parcialmente. Cada subplan cierra con loop DEV→REV + executive summary.

## 4. Workers

| Role | Worker | Activado | Skill BMAD |
|------|--------|----------|------------|
| Head of Council | (yo) | siempre | bmad-orchestrator |
| Worker Developer | dev-1 | siempre | bmad-quick-dev |
| Worker Reviewer | rev-1 | siempre | bmad-code-review |

## 5. Risks & Mitigations

| Riesgo | Prob. | Impacto | Mitigación |
|--------|-------|---------|------------|
| El Drive de imágenes no es descargable programáticamente | media | alto | Subplan 2 aísla el riesgo: fallback a placeholders con nombre de archivo documentado para reemplazo manual |
| Pasarela elegida complica el futuro checkout | media | medio | Checkout 100% desacoplado; decisión de pasarela queda como decisión abierta con recomendación |
| Estética graza mal calibrada (copy/paste vs adaptación) | media | medio | Tokens de diseño propios de Líbana inspirados en graza, no clon; review adversarial del Reviewer en subplan 3 |
| Hostinger limita algún aspecto del estático | baja | medio | Vanilla HTML/CSS/JS: cero dependencia runtime |

## 6. Decisiones Abiertas (requieren GO de @jmparejaz)

1. **Stack:** vanilla HTML/CSS/JS (recomendado) vs Astro estático vs Next.js export.
2. **Estructura:** one-page con anclas (recomendado) vs multi-página.
3. **Pasarela objetivo:** Mercado Pago o PayU (recomendado) vs Wompi/Stripe — define la forma del checkout-ready.
4. **Tipografía:** Google Fonts libres estilo display chunky (recomendado) vs licencia de fuente comercial.

> **Estado:** Detenido en FASE 1 esperando GO del usuario sobre las 4 decisiones (o aceptación de las recomendaciones por defecto).
