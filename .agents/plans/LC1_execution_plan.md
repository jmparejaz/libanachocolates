# Execution Plan --- LC-1: Sitio web codificado para Líbana Chocolates

| Field | Value |
|-------|-------|
| **Ticket** | LC-1 (GitHub Issue #1) |
| **Date** | 2026-10-20 |
| **Author** | Head of Council (co-created con workers) |
| **Status** | Confirmed |
| **Strategic plan** | `.agents/plans/LC1_strategic_plan.md` |

---

## Dependency graph

```
Subplan 1 (scaffold-nextjs) --> Subplan 2 (assets) --> Subplan 3 (sections) --+--> Subplan 5 (qa-seo) --> Subplan 6 (handoff)
                                                                              |
                                                            Subplan 4 (checkout-ready) -+
```

## Execution batches

| Batch | Subplanes | Paralelizable |
|-------|-----------|---------------|
| A | 1, 2 | parcial (2 requiere estructura de 1) |
| B | 3, 4 | si |
| C | 5 | secuencial |
| D | 6 | secuencial |

---

## Subplans

### Subplan 1: `scaffold-nextjs`

| Field | Value |
|-------|-------|
| **Depends on** | none |
| **Risk** | medium (toolchain en sandbox) |
| **Commit type** | feat |

**Files to create:**
- `package.json` --- Next.js 15 + React, scripts dev/build/export/lint
- `next.config.mjs` --- `output: 'export'`, `images.unoptimized: true` (hosting estático sin servidor de imágenes)
- `app/layout.tsx` --- head base: title/description SEO actuales, Open Graph, `lang="es"`, Google Fonts
- `app/page.tsx` --- composición de secciones (esqueleto)
- `app/globals.css` --- tokens de diseño (paleta cálida: chocolate/crema/acento naranja-miel), tipografías, utilidades responsive
- `.gitignore` --- node_modules, out/, .next

**Tests required:**
- `npm install && npm run build` → genera `out/` con index.html

**Verification steps:**
- `npm run build` → exit 0, `out/index.html` existe
- Servir `out/` con `python3 -m http.server` → página carga sin errores 404 de assets

**Acceptance criteria (para Reviewer):**
- [ ] Build estático export completo sin errores
- [ ] `out/` no requiere runtime Node
- [ ] Metadatos SEO del sitio actual preservados en layout

---

### Subplan 2: `assets`

| Field | Value |
|-------|-------|
| **Depends on** | 1 |
| **Risk** | medium (Drive posiblemente no accesible programáticamente) |
| **Commit type** | feat |

**Files to create:**
- `public/assets/` --- imágenes originales del Drive (hero, productos, sabores, logo tipográfico)

**Fallback documentado:** si el Drive no es descargable desde el sandbox, se generan placeholders con el nombre de archivo documentado en `assets/README.md` para reemplazo manual 1:1.

**Verification steps:**
- `ls public/assets/` no vacío; `out/` referencia rutas locales (grep sin hotlinks a libanachocolates.com)

**Acceptance criteria (para Reviewer):**
- [ ] Cero hotlinks a libanachocolates.com en producción
- [ ] Naming documentado y consistente

---

### Subplan 3: `sections`

| Field | Value |
|-------|-------|
| **Depends on** | 2 |
| **Risk** | medium (calidad estética) |
| **Commit type** | feat |

**Files to create:**
- `app/components/Header.tsx` --- nav con anclas, logo tipográfico Líbana
- `app/components/Hero.tsx` --- "Sabor intenso y puro" + CTAs "Compra ya" / "Ver cacao"
- `app/components/Flavors.tsx` --- Sabores Únicos: Cacao Fino de Aroma / Barras de Chocolate Oscuro / Regalos
- `app/components/Story.tsx` --- storytelling cacao de ritual + fundaciones de rescate animal
- `app/components/Newsletter.tsx` --- "Únete a Líbana" (form mailto/placeholder desacoplado)
- `app/components/Footer.tsx` --- contacto, redes, crédito
- `app/components/BuyButton.tsx` --- botón de compra reutilizable

**Estética (tokens del subplan 1):** paleta cálida chocolate/crema/miel, tipografía display grande (Google Fonts estilo Bricolage Grotesque o similar por su vibra artesanal-divertida), copy casual en español, microinteracciones CSS ligeras, sin dependencia de JS para el contenido.

**Verification steps:**
- Build OK; revisión visual por estructura semántica (h1 único, jerarquía h2/h3)
- Sin JS habilitado el contenido es legible (renderizado estático de Next)

**Acceptance criteria (para Reviewer):**
- [ ] Todas las secciones del sitio actual presentes con copy actual
- [ ] Vibra graza adaptada (no clon): cálido, tipografía grande, casual
- [ ] Responsive y accesible (contraste AA, alt en imágenes, landmarks)

---

### Subplan 4: `checkout-ready`

| Field | Value |
|-------|-------|
| **Depends on** | 3 |
| **Risk** | low |
| **Commit type** | feat |

**Files to create:**
- `app/components/Checkout.tsx` --- sección de checkout placeholder: tarjeta por producto con botón "Pagar" que abrirá el enlace de pago de la pasarela (patrón link-de-pago, compatible con **Wompi** y **Bold** sin SDK server-side)
- `docs/payments.md` --- comparativa Wompi vs Bold y pasos de integración (decision abierta para el usuario)

**Acceptance criteria (para Reviewer):**
- [ ] Checkout desacoplado: cambiar de Wompi a Bold = solo cambiar URLs
- [ ] Ninguna credencial ni integración real en el repo

---

### Subplan 5: `qa-seo`

| Field | Value |
|-------|-------|
| **Depends on** | 3, 4 |
| **Risk** | medium |
| **Commit type** | fix |

**Verification steps:**
- `npm run build` limpio; grep de hotlinks; validación de metadatos OG; revisión de contraste y alt
- Servir `out/` y smoke-test con curl de rutas de assets

**Acceptance criteria (para Reviewer):**
- [ ] 0 errores de build; 0 hotlinks; SEO/OG completos
- [ ] Breakpoints móvil (360px), tablet (768px), desktop (1200px) verificados en CSS

---

### Subplan 6: `handoff`

| Field | Value |
|-------|-------|
| **Depends on** | 5 |
| **Risk** | low |
| **Commit type** | docs |

**Files to create:**
- `README.md` --- instrucciones de deploy en Hostinger (build local → subir `out/` por File Manager/FTP), comandos exactos
- Retrospective en `.agents/communications/LC1_execution/`
- Actualización del KB de Notion (Arquitectura y Stack, Decisiones y Registro)

**Acceptance criteria (para Reviewer):**
- [ ] Un no-programador puede seguir las instrucciones de deploy
- [ ] Notion actualizado; PR listo para review

---

## Worker contributions log

| Worker | Contribution | File |
|--------|---------------|------|
| dev-1 | Estructura de subplanes, estimación de riesgos toolchain | este plan |
| rev-1 | Exigió fallback del subplan 2 y patrón link-de-pago para pasarelas | este plan |
