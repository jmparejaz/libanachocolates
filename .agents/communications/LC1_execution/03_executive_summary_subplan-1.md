# Executive Summary 01 — Subplan 1: scaffold-nextjs

## TL;DR
- Scaffold Next.js 15 con `output: 'export'` creado y build verificado: el sitio sale como HTML/CSS/JS 100% estático, desplegable en Hostinger por upload/FTP.
- SEO del sitio actual preservado exactamente (title + description + OG es_CO), 0 hotlinks.
- Fuentes libres (Bricolage Grotesque + DM Sans) self-hosted en el build — cero costo de licencia, cero dependencia externa en producción.
- NO se hizo: contenido visual final e imágenes (subplan 2), secciones completas (subplan 3).
- Requiere atención humana: ninguna para este subplan.

## Pedido vs entregado
Pedido: estructura Next.js export con head SEO, fuentes, tokens de diseño. Entregado exactamente eso; sin delta de scope. El esqueleto de page.tsx incluye ya el copy de secciones como preview (servirá de base al subplan 3).

## Razonamiento
- Alternativa descartada: vanilla HTML/CSS/JS — el usuario eligió explícitamente Next.js export; `output:'export'` + `images.unoptimized` garantiza compatibilidad total con hosting compartido (sin image optimization server-side).
- Alternativa descartada: cargar Google Fonts por `<link>` CDN — next/font self-hostea en el build, mejorando rendimiento y privacidad.
- Evidencia de que el camino es correcto: build exitoso con 103 kB First Load JS (ligero), index.html prerenderizado legible sin JS.

## Decisiones tomadas
| Decisión | Alternativa descartada | Razón | Autor | Reversible | Costo de revertir |
|---|---|---|---|---|---|
| Fuentes Bricolage Grotesque (display) + DM Sans (body) | Anton/Inter | Bricolage tiene la vibra artesanal-divertida del logo tipográfico Líbana; DM Sans cálida y legible | HOC con input del usuario (fuentes públicas tipo vibra artesanal) | sí | bajo (swap en layout.tsx) |
| `images.unoptimized: true` | Image Optimization API | Hosting estático no tiene servidor Next | HOC | sí | bajo |

Ninguna requiere ratificación del usuario: la de fuentes sigue su directriz explícita.

## Historial del loop DEV-REV
- R1: APPROVE con 2 observaciones menores (kicker de promo transitorio; nav móvil oculto). Ambas anotadas como input de los subplanes 3 y 5, no defectos del scaffold.

## Hallazgos inesperados / riesgos abiertos
- Node/npm disponibles en sandbox — el riesgo "toolchain" del plan estratégico queda despejado para los siguientes subplanes.
- Riesgo abierto: descargabilidad del Drive (subplan 2), sin cambio.

## Decisiones accionables
| Acción | Tipo | Owner | Urgencia | Bloquea siguiente subplan |
|---|---|---|---|---|
| Revisar copy del kicker "Descuentos irresistibles" en subplan 3 | hacer | dev-1 | media | no |
| Menú móvil accesible en subplan 3 | hacer | dev-1 | media | no |

## Evidencia
- Archivos: `package.json`, `next.config.mjs`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `.gitignore`
- Comando: `npm run build` → exit 0; `ls out/` → index.html + _next
- `<title>Líbana Chocolates: Cacao orgánico de un solo origen | Líbana Chocolates`
