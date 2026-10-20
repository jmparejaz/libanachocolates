# Pagos — Wompi vs Bold (decisión pendiente del usuario)

El sitio es 100% estático: no puede guardar secretos ni procesar webhooks. Por eso el checkout usa **payment links** (enlaces de pago alojados por la pasarela), patrón soportado por ambas opciones autorizadas.

## Comparativa

| Criterio | Wompi | Bold |
|---|---|---|
| Enlaces de pago | ✓ (checkout.wompi.co/l/...) | ✓ (pay.bold.co) |
| Tarjetas, PSE, Nequi | ✓ | ✓ |
| Comisiones típicas | ~2.8% + $1000 COP por transacción (verificar plan actual) | ~2.5-2.99% + fijo (verificar plan actual) |
| Onboarding | Registro online, requiere banco y documentos de la empresa | Registro online, similar documentación |
| Notificación de pago | Email + webhook (requiere backend para automatizar) | Email + webhook (requiere backend para automatizar) |
| Cobertura | Amplia en Colombia, propiedad de Bancolombia | Creciente, foco en comercios pequeños |

## Cómo se cambia la pasarela en este sitio
Todas las URLs de pago están centralizadas en `app/data.ts` (campo `paymentUrl` de cada producto). Cambiar Wompi→Bold (o viceversa) = reemplazar esas 3 URLs. Sin cambios de código.

## Pasos para activar pagos
1. Crear cuenta en la pasarela elegida (Wompi o Bold) y completar verificación.
2. Crear un enlace de pago por producto (nombre, precio, descripción).
3. Copiar cada URL en `app/data.ts` → `paymentUrl`.
4. Ajustar precios reales en `app/data.ts` → `price` (valores en COP, sin decimales).
5. `npm run build` y subir `out/`.

## Nota sobre confirmación automática de pagos
Sin backend, la confirmación de pago llega por email de la pasarela. Si en el futuro se quiere automatizar (bajar stock, enviar pedido a logística), se necesitará un pequeño backend o función serverless para recibir webhooks — fuera del scope de este sitio estático.
