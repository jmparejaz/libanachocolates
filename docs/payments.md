# Checkout propio con Wompi

## Estado actual

- Wompi es el proveedor elegido para la nueva versión.
- Esta rama todavía no procesa pagos en línea. Los botones de producto abren un pedido prellenado por WhatsApp para no enviar clientes a los enlaces de prueba que estaban en `app/data.ts`.
- El sitio usa `output: "export"` y no tiene servidor ni almacenamiento de pedidos.

## Requisito de seguridad

El Widget de Wompi usa una referencia de transacción, monto en centavos, moneda y firma de integridad. La firma depende del secreto de integridad del comercio, por lo que debe generarse en un servidor y nunca incluirse en el JavaScript del navegador, en `NEXT_PUBLIC_*` ni en GitHub. Consulta la [documentación oficial del Widget de Wompi](https://docs.wompi.co/docs/colombia/widget-checkout-web/).

El backend debe calcular el monto desde el catálogo confiable del servidor, emitir una referencia única, generar la firma y verificar el resultado de la transacción antes de marcar un pedido como pagado. El navegador no debe poder escoger un monto arbitrario.

## Arquitectura por decidir

Un sitio exportado a HTML estático no puede crear una firma segura y distinta para cada pedido. Para completar el checkout personalizado se necesita:

1. Un endpoint de servidor o una función serverless para generar la sesión de pago.
2. Secretos de Wompi configurados en el entorno de despliegue; nunca en el repositorio.
3. Un webhook verificado y un registro de pedido si se requiere confirmación automática.
4. Un entorno de producción con runtime de servidor. GitHub Pages no ejecuta rutas de Next.js y el hosting de Hostinger debe confirmar soporte para Node o funciones serverless.

No se debe retirar el pedido por WhatsApp ni activar pagos hasta probar la integración en modo de pruebas y confirmar que el estado final llega al sistema de pedidos.

## Antes de publicar

- Confirmar precio y vigencia de la promoción de cada barra en `app/data.ts`.
- Definir costos y cobertura de envío, tratamiento de pedidos y devoluciones.
- Probar los métodos de pago habilitados en la cuenta Wompi.
- Configurar llaves únicamente en el gestor de secretos del entorno que ejecute el backend.
