# Dispatch 09 — Subplan 7: minivideos + análisis de competencia

| Field | Value |
|-------|-------|
| **De** | Head of Council |
| **Para** | Worker Developer (dev-1, zai-glm-5-3) |
| **Fecha** | 2026-10-20 |
| **Estado** | DONE |

## Preflight (Ley 7)
- Carpeta MINI VIDEOS listada vía MCP: 18 MP4 (28-220MB, 1080p60, 3.7-24.8s).
- PyAV 19.0.1 disponible (no ffmpeg binario); pip pillow instalado para extracción de frames.
- Descarga directa validada (endpoint uc + confirm para >100MB).

## Tarea delegada
1. Descargar los 18 minivideos del Drive. 2. Recomprimir web-ready (720x404, crf28, 30fps, sin audio para loops). 3. Analizar contenido con visión (frame medio). 4. Integrar la mejor selección en el sitio.

## Hallazgos del Developer
- 17/18 comprimidos con éxito (MVI_1254 falla: muxer rechaza timestamps del contenedor original; requiere ffmpeg real — documentado).
- Reducción total: ~1.5GB → 8.9MB (99.4%).
- Clasificación por visión: PRODUCTO (0407 barra plato, 0408 barra superficie oscura, 0911 barra trozos, 0915 barra+naranja, 0920/0921 barra Líbana) y LIFESTYLE/CAUSA (1255 gato+chocolate, 0466-0475 tazas/plantas/personas — refuerzan "con propósito").
- Integración: 6 loops de producto en nueva sección "Sabores en movimiento" + 1 loop lifestyle (gato) en la sección Historia. `prefers-reduced-motion` respetado.

## Análisis de competencia (researcher, para el Executive Summary)
- **Magno** (Medellín, 82K IG): posicionamiento lujo, bombones con oro 24K, experiencias de cata. Lección: storytelling de arte + precio premium justificado por diseño.
- **Tibitó** (Bogotá, exporta): bean to bar serio, contenido educativo (ritual del chocolate santafereño), colaboraciones (chocolate+cerveza). Lección: contenido educativo construye autoridad.
- **Sagu / Bean to Bar SAS** (aliado productor actual): chocolate+café, marca familiar cálida. Lección: cercanía familiar ya es territorio de Líbana por el gato/rescate animal — diferenciador defendible.
- **Kilimbo** (aliado de maquila): bean to bar multiorigen, e-commerce Shopify, blog educativo. Lección: el blog educativo y el multiorigen son complementos futuros; la maquila con Kilimbo habilita escalar catálogo sin cambiar la identidad.

## Evidencia
- `ls public/assets/videos/` → 17 mp4; build OK; out/assets/videos 17 archivos.
- Análisis visual por frame: ver arriba.
