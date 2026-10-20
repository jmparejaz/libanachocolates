# Strategic Plan --- LC-1: Sitio web codificado para Líbana Chocolates

| Field | Value |
|-------|-------|
| **Ticket** | LC-1 (GitHub Issue #1) |
| **Title** | Migración de libanachocolates.com desde Hostinger Web Designer a sitio codificado |
| **Date** | 2026-10-20 |
| **Author** | Head of Council |
| **Status** | Confirmed (decisiones resueltas por el usuario 2026-10-20) |
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

## 6. Decisiones Resueltas (GO de @jmparejaz, 2026-10-20)

1. **Stack:** **Next.js con `output: 'export'`** (elección del usuario). Build estático → HTML/CSS/JS puro desplegable en Hostinger por upload/FTP.
2. **Estructura:** **One-page con secciones** (recomendación aceptada por el usuario). Catálogo pequeño = un solo scroll hacia la conversión; patrón graza.co.
3. **Pasarela objetivo:** **Wompi o Bold, únicamente esas dos** (restricción del usuario). El checkout se diseña genérico vía enlace/botón de pago, compatible con ambas; la elección final entre ellas queda documentada como decisión abierta del handoff.
4. **Tipografía:** **Logo tipográfico actual de Líbana se mantiene tal cual** (se extrae del sitio/Drive); fuentes públicas libres que sigan la vibra artesanal y divertida de la identidad actual.

> Nota de runtime: este entorno no dispone de dispatch a subagents independientes; la mecánica DEV→REV se adapta como dos pasadas estructuradas y documentadas por separado (dispatch-log + review-report), según la cláusula de adaptación del harness-prompt.
