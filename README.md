# Líbana Chocolates — sitio web

Tienda de una página hecha con Next.js 15 y export estático. La nueva dirección visual usa fotografía propia de **MADE** en Google Drive, un catálogo más claro y diseño adaptable para móvil, sin hotlinks a imágenes del sitio anterior.

## Desarrollo

```bash
npm install
npm run dev
```

## Build estático

```bash
npm run build
```

El build genera la carpeta `out/`. La configuración actual funciona en GitHub Pages y puede subirse como archivos estáticos a un hosting web.

## Publicación en Hostinger

1. Genera y valida `out/` con `npm run build`.
2. En hPanel, entra a **Archivos → Administrador de archivos → public_html**.
3. Sube el contenido de `out/` (incluidos `_next/` e `index.html`) directamente a `public_html`.
4. Confirma que el dominio entregue el nuevo `index.html` y que el Web Designer anterior ya no controle el dominio.

No se ha publicado ningún cambio en producción desde esta rama.

## Fotos y video

Las rendiciones web de las fotos están en `public/assets/drive-origin/`; el loop optimizado está en `public/assets/videos/`. Todos los archivos seleccionados provienen de `LIBANA CHOCOLATES/MADE` en Google Drive. El inventario y la correspondencia con los originales están en [`ASSET-MAP.md`](./ASSET-MAP.md).

La portada usa el video definitivo **3 Sabores_ ALTA_SINTEXTO**, de la carpeta compartida `Libana/VÍDEOS`, en una versión web de unos 1,4 MB. `app/HeroFilm.tsx` gestiona la reproducción silenciosa, el control de pausa, la suspensión fuera de pantalla y el respaldo estático. No se descarga automáticamente con movimiento reducido o ahorro de datos. En móvil, el video aparece antes del texto.

Las fuentes tipográficas están alojadas localmente en `app/fonts/` y sus licencias OFL acompañan los archivos; el build no necesita descargar fuentes externas.

## Catálogo y checkout

Los productos y precios viven en `app/data.ts`. Los precios mostrados se tomaron de la página pública actual y deben confirmarse antes del lanzamiento.

Los botones de pedido abren WhatsApp mientras se prepara el checkout propio con Wompi. Esta exportación estática no genera firmas de integridad por pedido; no se debe exponer la llave de integridad en el navegador ni guardar secretos en GitHub. Revisa [`docs/payments.md`](./docs/payments.md) antes de activar pagos.
