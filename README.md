# Líbana Chocolates — Sitio web

Recreación codificada de [libanachocolates.com](https://libanachocolates.com) con estética inspirada en [graza.co](https://graza.co). Next.js con export estático: el build produce HTML/CSS/JS puro, desplegable en cualquier hosting (Hostinger) sin runtime Node.

## Requisitos
- Node.js 18+ y npm

## Desarrollo
```bash
npm install
npm run dev        # http://localhost:3000
```

## Build de producción
```bash
npm run build
```
El sitio estático queda en `out/`.

## Deploy en Hostinger (sin Web Designer)
1. `npm run build`
2. En hPanel → **Archivos → Administrador de archivos**, entra a `public_html` (del dominio libanachocolates.com).
3. Sube el **contenido completo de la carpeta `out/`** (no la carpeta en sí): todos los archivos y la carpeta `_next`. Puedes comprimir `out/` en .zip, subirlo, extraerlo en `public_html` y eliminar el zip.
4. Verifica que `index.html` quede directamente en `public_html/index.html`.
5. Alternativa: usar FTP (FileZilla) con las credenciales de hPanel → FTP Accounts.

Nota: el sitio actual del Web Designer debe desactivarse/elimarse del dominio para que `public_html` sirva este sitio.

## Imágenes (acción manual requerida)
Las imágenes originales están en el Google Drive del proyecto (carpeta **MADE**, enlazada en Notion). Copiar a `public/assets/productos/` con estos nombres exactos:
- `naranja-frontal.jpg` ← Drive: FOTOGRAFÍAS/TAMAÑO OPTIMIZADO 1080 → `Naranja-frontal-chocolate1080.jpg` (renombrar)
- `uchuva-frontal.jpg` ← Drive: FOTOGRAFÍAS/TAMAÑO OPTIMIZADO 1080 → `Uchuva frontal.jpg` (renombrar)
- `aji-frontal.jpg` ← Drive: FOTOGRAFÍAS/TAMAÑO OPTIMIZADO 1080 → `Ají frontal.jpg` (renombrar)

Luego re-build (`npm run build`) y volver a subir `out/`.

## Pagos
Ver `docs/payments.md`. El checkout usa payment links (Wompi/Bold); las URLs están en `app/data.ts` junto con productos y precios.
