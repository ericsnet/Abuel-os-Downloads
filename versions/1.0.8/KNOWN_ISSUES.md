# Fallos y limitaciones conocidas - abuel-os 1.0.8

Lista honesta de lo que no funciona o está incompleto **en esta versión**.

## Bloqueantes

- Ninguno confirmado en las pruebas live.

## Importantes

- **Primer arranque instalado**: `autologin-user=abuelo` apunta a una cuenta
  que aún no existe hasta que el responsable complete el asistente. Hasta
  entonces se ve el greeter; es el comportamiento esperado de esta versión.
- **Rollback de actualizaciones**: falta probar la vuelta a 1.0.7 con el
  paquete anterior conservado en `/var/cache/abuelo-os/updates/`.
- **`thunar` sigue en 0755**: es necesario para el servicio D-Bus que usa
  xfdesktop para los iconos. No da root ni abre los ajustes, pero permite
  navegar por el sistema de archivos en lectura. Pendiente de sustituir por
  un helper específico sin exponer el explorador completo.
- **Restauración de copias**: la ruta de `tar.extractall` en Python 3.11
  mantiene la validación manual; falta una prueba adversarial completa con
  PAX, hardlinks y enlaces.

## Menores

- El icono de actualizaciones del responsable requiere que el autostart
  `abuelo-desktop-trust` haya marcado el lanzador como de confianza en la
  primera sesión.
- Los avisos de PulseAudio/udisks/colord del journal son ruido de la VM y de
  hardware ausente, no fallos de abuel-os.
- El estado de comprobación de actualizaciones sigue viviendo en
  `/var/lib/abuelo-os/update-state.json`; `abuelo` puede leerlo pero no
  escribirlo.
- La clave de auditoría no se rota automáticamente al clonar una instalación
  ya marcada como instalada.

## Heredados de versiones anteriores

- El modo live mantiene la contraseña conocida `live` para `responsable`.
- Los drivers propietarios pueden ignorar los modos `cvt` de pantalla.
- `crypt` sigue usándose para verificar contraseñas; migrar a PAM/`crypt_r`
  antes de Python 3.13.
- Calamares no tiene validación completa de traducciones/stylesheet.
