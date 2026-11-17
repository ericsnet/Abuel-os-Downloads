# Fallos y limitaciones conocidas - abuel-os 1.0.9

## Bloqueantes

- Ninguno confirmado en las pruebas live.

## Importantes

- **Primer arranque instalado**: la cuenta `abuelo` se crea desde el asistente
  del responsable; hasta completarlo no existe.
- **Rollback**: falta probar la vuelta a 1.0.8 con el paquete anterior.
- **`thunar`**: sigue en 0755 por el servicio D-Bus de xfdesktop; no da root
  ni abre ajustes, pero permite navegar por el sistema en lectura.
- **Instalador personalizado**: el QML y las imágenes de marca están
  integrados, pero falta abrir Calamares en una sesión gráfica real y validar
  todas las pantallas.
- **Arranque**: se han recortado servicios, pero el tiempo exacto depende del
  hardware; en la VM de pruebas sigue siendo mejorable.

## Menores

- La contraseña de live para `abuelo` y `responsable` sigue siendo `live`.
- El modo live no conserva cambios al reiniciar.
- Los drivers propietarios pueden ignorar los modos `cvt`.
- `crypt` sigue usándose para verificar contraseñas; migrar antes de Python 3.13.
