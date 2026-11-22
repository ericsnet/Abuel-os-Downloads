# Fallos y limitaciones conocidas - abuel-os 1.1.0

Lista honesta de lo que no funciona o está incompleto **en esta versión**.

## Bloqueantes

- **Sin ISO ni prueba en vivo todavía.** Lo incluido hasta ahora está
  implementado y compila, pero no se ha arrancado en una VM ni en hardware. No
  se puede considerar una versión publicable.
- **Sin medición base de 1.0.9** en `artifacts/qa-1.1.0/`. Los objetivos de
  rendimiento del plan siguen sin verificar.
- **Paquete de actualización sin firma**: se ha construido para comprobar
  contenido y permisos, pero falta firmarlo con la clave Ed25519 y probar el
  salto real desde 1.0.9.

## Importantes

- **`abuelo-inicio` probado solo en headless** (Xvfb + Openbox, claro y oscuro):
  falta la sesión XFCE real con panel, bandeja y arranque automático.
- **Decoración de ventanas**: xfwm4 sigue usando los recursos de Moheli. En
  tema oscuro los marcos pueden verse claros y desentonar hasta que se cree una
  decoración propia.
- **Iconos**: ya hay set de marca en `hicolor`, pero falta comprobar en la ISO
  que el menú, el panel y el escritorio los resuelven y que la caché se genera
  bien en el primer arranque.
- **Impresora**: CUPS ya no se instala. Quien necesite imprimir tendrá que
  instalar `cups` y `system-config-printer` a mano.
- **Correo**: solo web (Outlook). Evolution se ha retirado de la imagen.
- **Videollamada**: depende de un servicio externo (Jitsi/Meet) y de que el
  responsable configure el enlace; no hay servidor propio ni prueba de cámara
  y micrófono en la ISO.

## Menores

- `live-setup` conserva una referencia heredada a la carpeta de previsualización
  de Evolution; ya no se usa, pero no se ha retirado.
- Varias cadenas internas siguen diciendo versiones antiguas (`1.0.5`, `1.0.6`)
  en docstrings y `User-Agent`.
- `abuelo-sandbox` sigue construyendo argumentos sin citar rutas de USB con
  espacios.

## Heredados de versiones anteriores

- `thunar` sigue en 0755 por el servicio D-Bus de xfdesktop (auditoría A-04).
- La clave de auditoría puede no rotarse al clonar una instalación (A-07).
- La restauración de copias con tar adversarial sigue sin prueba (A-08).
- El estado de comprobación no se escribe como `abuelo` (A-11).
- Rollback de actualización pendiente de probar.
