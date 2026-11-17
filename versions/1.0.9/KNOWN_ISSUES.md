# Fallos y limitaciones conocidas - abuel-os 1.0.9

Lista honesta de lo que no funciona o está incompleto **en esta versión**.

## Bloqueantes

- Ninguno confirmado en live: el sistema llega a LightDM y permite entrar con
  `abuelo` y `responsable`.

## Importantes

- **Primer arranque instalado**: la cuenta `abuelo` se crea desde el asistente
  del responsable; hasta completarlo no existe.
- **Rollback**: falta probar la vuelta a 1.0.8 con el paquete anterior.
- **`thunar`**: sigue en 0755 por el servicio D-Bus de xfdesktop; no da root
  ni abre ajustes, pero permite navegar por el sistema en lectura.
- **Instalador personalizado**: las imágenes y el QML están integrados, pero
  falta abrir Calamares en una sesión gráfica real y validar todas las
  pantallas.
- **Arranque**: se han recortado servicios, pero en QEMU el login tarda unos
  34 s; sigue siendo mejorable y depende del hardware.
- **VirtualBox 7.2.8**: con esta ISO se alcanzó el login por consola, pero el
  kernel entró en un panic (`dentry_unlink_inode`, kswapd) y la pantalla se
  quedó en el logo. Con QEMU el mismo ISO funciona. Pendiente confirmar si es
  un fallo de VirtualBox o del kernel 6.1.0-56 en ese host.

## Menores

- Varias cadenas internas siguen diciendo `1.0.5`/`1.0.6` (docstrings y `User-Agent`).
- `abuelo-sandbox` construye argumentos sin citar rutas de USB con espacios.

- La contraseña de live para `abuelo` y `responsable` sigue siendo `live`.
- El modo live no conserva cambios al reiniciar.
- El icono de actualizaciones del responsable requiere que
  `abuelo-desktop-trust` lo marque como de confianza en la primera sesión.
- El estado de comprobación vive en `/var/lib/abuelo-os/update-state.json`;
  `abuelo` puede leerlo pero no escribirlo.
- La clave de auditoría no se rota automáticamente al clonar una instalación
  ya marcada como instalada.
- Los drivers propietarios pueden ignorar los modos `cvt`.
- `crypt` sigue usándose para verificar contraseñas; migrar antes de Python 3.13.
