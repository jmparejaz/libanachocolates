# Dispatch 04 — Subplanes 2 (assets) y 4 (checkout-ready)

| Field | Value |
|-------|-------|
| **De** | Head of Council |
| **Para** | Worker Developer (dev-1, modelo zai-glm-5-3) |
| **Fecha** | 2026-10-20 |
| **Estado** | DONE (con adaptación documentada) |

## Preflight (Ley 7)
- MCP de Google Drive autenticado y disponible (`google_drive_mcp_search_files` OK sobre el folder MADE).
- Descarga de imagen de prueba OK (145KB); imágenes grandes (3-4MB) exceden el límite del canal de descarga → limitación verificada, no supuesta.

## Tarea delegada y hallazgo
1. **Subplan 2 (assets):** el Drive contiene 4 carpetas (FOTOGRAFÍAS con PNG/FULL calidad/TAMAÑO OPTIMIZADO 1080, MINI VIDEOS, PRESELECCIONADAS, PRODUCT con 20 fotos JPG). Intento de descarga: funciona pero las imágenes optimizadas grandes (166KB–3.8MB) exceden el truncado del canal MCP en la mayoría de casos. **Fallback del plan aplicado:** el código referencia `assets/productos/<sabor>-frontal.jpg` con naming documentado; las imágenes quedan como reemplazo manual 1:1 (documentado en `public/assets/README.md`), dado que la descarga programática completa no es viable por el límite de tamaño del canal.
2. **Subplan 4 (checkout-ready):** implementado junto al 2/3 por economía de loop: sección "Compra ya" con tarjetas de producto (nombre, descripción, precio COP formateado con Intl), botón "Pagar" que abre un **payment link** (patrón compatible con Wompi y Bold: ambas soportan enlaces de pago sin SDK server-side). Cambiar de pasarela = cambiar la URL en `app/data.ts`. Elección Wompi-vs-Bold documentada como decisión abierta del handoff (`docs/payments.md`).

## Reporte del Worker Developer
- Criterio: payment links en vez de SDK — un sitio 100% estático no puede guardar secretos ni firmar webhooks; el link de pago externaliza PCI y la lógica de cobro. Wompi: `checkout.wompi.co/l/<slug>`; Bold: `pay.bold.co/<tienda>/<producto>` — ambos solo requieren URL.
- Precios en COP vía `Intl.NumberFormat("es-CO")` — formato local correcto ($28.000).
- Placeholder visual `product-img` con CSS para no romper el layout hasta que las imágenes se copien manualmente.

## Evidencia
- `grep 'Pagar' out/index.html` → 1 sección con 3 tarjetas
- `grep '\$28' out/index.html` → precios COP renderizados
- `npm run build` → exit 0
