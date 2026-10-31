# Mapa de recursos — Líbana Chocolates

El origen maestro de las fotografías y los videos es la carpeta **LIBANA CHOCOLATES / MADE** de Google Drive. Los archivos dentro de `public/assets/drive-origin/` son versiones web locales; el sitio no carga imágenes desde Drive ni desde el CDN de otro proveedor.

## Fotografías usadas en el sitio

| Archivo en el repo | Archivo original en Drive | Uso |
|---|---|---|
| `drive-origin/hero-hands-sharing.jpg` | `MADE/PRODUCT/IMG_0586.jpg` | Imagen social; conservada para futuras composiciones |
| `drive-origin/hero-blue-plate.jpg` | `MADE/PRODUCT/IMG_0415 (2).jpg` | Recurso editorial conservado |
| `drive-origin/product-naranja.jpg` | `MADE/PRODUCT/IMG_0914 (3).jpg` | Tarjeta Naranja |
| `drive-origin/product-uchuva.jpg` | `MADE/PRODUCT/IMG_0905 (2).jpg` | Tarjeta Uchuva |
| `drive-origin/product-aji.jpg` | `MADE/PRODUCT/IMG_0919 (2).jpg` | Tarjeta Ají |
| `drive-origin/hot-chocolate-ritual.jpg` | `MADE/PRODUCT/IMG_0428 (1).jpg` | Sección de ritual |
| `drive-origin/flatlay-chocolate.jpg` | `MADE/PRODUCT/IMG_0222 (1).jpg` | Sección “Chocolate con propósito” |
| `drive-origin/ritual-pour.jpg` | `MADE/PRODUCT/IMG_0655.jpg` | Poster del video |

Las fotografías son rendiciones JPEG de hasta 1600 px del contenido original en Drive. Se sirven desde el propio sitio para evitar hotlinks y conservar buena nitidez sin enviar los originales de cámara de varios megabytes al navegador.

## Video

| Archivo en el repo | Archivo original en Drive | Uso |
|---|---|---|
| `videos/three-flavors-hero.mp4` | `MADE/Libana` (acceso directo) → `VÍDEOS/3 Sabores_ ALTA_SINTEXTO.mp4` | Apertura de marca: Uchuva, Naranja y Ají |
| `videos/three-flavors-poster.jpg` | Fotograma a 0,5 s del mismo original | Respaldo estático de la apertura |
| `videos/mvi-0920.mp4` | `MADE/MINI VIDEOS/MVI_0920.MP4` | Loop breve en la sección “Mira de cerca” |

El maestro definitivo de “3 Sabores” es [este archivo de Drive](https://drive.google.com/file/d/1qHvQS2u1jUF6pUZzvCpKMj6P8nTdb0ae/view): 1080 × 1920, 11,66 s, unos 53 MB. La versión web conserva la duración y el encuadre vertical completo, en H.264, 720 × 1280, 30 fps, sin pista de audio y con fast-start. No se hace hotlink a Drive.

La apertura carga el video solo cuando está visible y se permite la reproducción automática. Respeta movimiento reducido y ahorro de datos; en esos casos muestra el poster y permite reproducción manual. Se pausa fuera de pantalla, al ocultar la pestaña o mediante su control visible.

El archivo local es una versión web optimizada del video original. La fotografía de poster queda visible si el navegador o la persona prefiere movimiento reducido.

## Carpetas fuente

- [MADE](https://drive.google.com/drive/folders/1fKhc946Ihzx7GGzPIbviJzCFb_qq3ner)
- [PRODUCT](https://drive.google.com/drive/folders/10_QufHUqTXYQo9ygsw86TKq41LoBoQ1H)
- [MINI VIDEOS](https://drive.google.com/drive/folders/1SVsGEc2PGiMNVqcXSpnCKOwgLJcc_cre)
- [Libana / VÍDEOS definitivos](https://drive.google.com/drive/folders/1n8yxZaK2uZ1_QMTkAalQ4YowhqzYs6Qa)

Se quitaron de `public/assets/` las copias antiguas de imágenes obtenidas del CDN del sitio anterior y los medios oficiales que ya no se usan en esta página. Los originales siguen en Drive.
