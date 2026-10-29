# Código de acceso por Gmail

Mientras la página está en lanzamiento, quien la abre debe pedir un código. El código le llega al dueño por Gmail y él decide si lo comparte.

## Cómo funciona

1. La persona abre la página, escribe su nombre y toca **Pedir código**.
2. A tu Gmail llega un correo: "Código de acceso: 123456 (Nombre)". El código vence en 10 minutos y sirve una sola vez.
3. Le pasas el código, lo escribe y entra. El acceso dura mientras tenga la pestaña abierta.

En tu computador (`localhost`) nunca se pide código.

## Activarlo (una sola vez, unos 5 minutos)

1. Entra a **https://script.google.com** con la cuenta de Gmail donde quieres recibir los códigos.
2. Toca **Nuevo proyecto**.
3. Borra lo que aparece y pega todo el contenido de `Codigo.gs`.
4. Arriba, cambia el nombre "Proyecto sin título" por **Acceso Con Yeison Aprendes** y guarda (ícono de disquete).
5. Toca **Implementar → Nueva implementación**.
6. En el engranaje de "Seleccionar tipo", elige **Aplicación web** y llena:
   - **Ejecutar como:** Yo (tu correo).
   - **Quién tiene acceso:** Cualquier usuario.
7. Toca **Implementar** y luego **Autorizar acceso**. Elige tu cuenta.
   - Si aparece "Google no verificó esta aplicación", toca **Configuración avanzada → Ir a Acceso Con Yeison Aprendes (no seguro)**. Es seguro: el script es tuyo y solo envía correos a ti mismo.
8. Copia la **URL de la aplicación web**. Termina en `/exec`.
9. Pégala en `public/gate-config.js` entre las comillas de `window.ACCESS_GATE_URL = '';` y publica el cambio. También puedes pasársela a Claude o a Antigravity para que lo hagan.

## Apagarlo

Deja `window.ACCESS_GATE_URL = '';` vacío y publica: la página vuelve a abrirse sin código.

## Límites (en `Codigo.gs`)

- Un pedido cada 30 segundos y máximo 40 por día, para que nadie llene tu correo.
- 5 intentos por código.

## Importante

El repositorio de GitHub es público. Esta pantalla frena a quien recibe el link, pero alguien con conocimientos técnicos podría ver el código en GitHub y saltársela. Para esta etapa de lanzamiento es suficiente, porque la página no guarda claves ni datos de nadie.
