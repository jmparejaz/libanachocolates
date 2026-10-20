# Executive Summary 06 — Subplanes 2 (assets) y 4 (checkout-ready)

## TL;DR
- Checkout "Compra ya" implementado: 3 tarjetas de producto (Naranja, Uchuva, Ají — los 3 sabores reales encontrados en el Drive) con precio COP y botón "Pagar" vía payment links, patrón compatible con Wompi y Bold.
- El Drive fue explorado y mapeado (4 carpetas, sabores identificados), pero la descarga programática de imágenes excede el límite del canal: las imágenes quedan como reemplazo manual 1:1 con naming exacto documentado.
- NO se hizo: copia física de las imágenes al repo (limitación del entorno, no del código).
- Requiere atención humana: copiar 3 imágenes del Drive (instrucciones exactas en el handoff) y crear los payment links reales al elegir Wompi o Bold.

## Pedido vs entregado
Pedido (subplan 4): checkout desacoplado compatible Wompi/Bold. Entregado exactamente. Pedido (subplan 2): assets en el repo. Entregado: mapeo completo del Drive + naming 1:1 + placeholders visuales. Delta justificado por límite de tamaño del canal MCP (verificado con prueba de descarga: archivo de 145KB OK, archivos de 3-4MB truncados).

## Razonamiento
- Alternativa descartada: SDK/API server-side de pasarela — imposible en sitio 100% estático (secretos y webhooks requieren backend). Payment links es el único patrón seguro sin backend.
- Alternativa descartada: hotlinks al Drive — URLs de Drive no son estables para producción ni permitidas por el guardrail anti-hotlink.
- Alternativa descartada: comprimir/re-serializar imágenes vía base64 por el canal — el contenido llega truncado e inválido; riesgo de corromper assets.

## Decisiones tomadas
| Decisión | Alternativa descartada | Razón | Autor | Reversible | Costo de revertir |
|---|---|---|---|---|---|
| Payment links para checkout | SDK server-side | Sitio estático sin backend; PCI externalizado | HOC | sí | bajo (cambiar URLs) |
| Sabores Naranja/Uchuva/Ají como catálogo | categorías genéricas | Son los 3 sabores reales del Drive; el sitio actual no lista productos pero el checkout los necesita | HOC | sí | bajo |
| Imágenes como reemplazo manual 1:1 | descarga programática | Límite de tamaño del canal verificado empíricamente | HOC | sí | nulo (acción pendiente) |

Ninguna requiere ratificación, pero la de sabores/precios debería validarse con el usuario en el handoff (precios placeholder $28.000).

## Historial del loop DEV-REV
- R1: APPROVE con 2 observaciones (imágenes pendientes como acción del handoff; payment URLs placeholder). Ambas incorporadas al plan de handoff, no defectos de código.

## Hallazgos inesperados / riesgos abiertos
- El Drive "MADE" está bien organizado (sabores identificados por nombre de archivo) — reduce el esfuerzo manual del reemplazo.
- Riesgo abierto: elección final Wompi vs Bold (decisión del usuario con docs/payments.md).

## Decisiones accionables
| Acción | Tipo | Owner | Urgencia | Bloquea siguiente subplan |
|---|---|---|---|---|
| Copiar 3 imágenes del Drive a public/assets/productos/ con nombres exactos | hacer | usuario | alta | no (bloquea aspecto visual, no estructura) |
| Crear payment links reales al elegir pasarela | hacer | usuario | alta | no |
| Validar precios reales de los 3 sabores | decidir | usuario | media | no |

## Evidencia
- Archivos: `app/data.ts`, `app/page.tsx` (sección compra), `app/globals.css` (.product-card)
- `grep 'Pagar' out/index.html` → presente; `grep '\$28' out/index.html` → precios COP renderizados
- `npm run build` → exit 0
