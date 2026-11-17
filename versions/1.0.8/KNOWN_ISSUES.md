# Fallos y limitaciones conocidas - abuel-os 1.0.8

Lista honesta de lo que no funciona o está incompleto **en esta versión**.

## Bloqueantes

- Ninguno confirmado que impida arrancar el sistema en live.

## Importantes

- **Autologin forzado**: `abuelo` entra solo y LightDM vuelve a entrar como
  `abuelo` tras cerrar sesión. No hay una forma cómoda de elegir
  `responsable`; además `abuelo` está en el grupo `nopasswdlogin`.
- **Arranque live lento**: `live-config`, `console-setup`,
  `plymouth-quit-wait`, `e2scrub_reap`, `NetworkManager-wait-online` y
  `blueman-mechanism` alargan el arranque por encima de un minuto.
- **Instalador sin marca real**: `branding.desc` sigue con la versión 1.0.7,
  referencia `abuelo-os.png`/`welcome.png` que no existen en la carpeta de
  marca y no tiene la presentación QML personalizada.
- **Correo personalizado**: “Correo” abre Evolution con Exchange/EWS en vez
  de `https://outlook.live.com/mail/`.
- **Primer arranque instalado**: `autologin-user=abuelo` apunta a una cuenta
  que aún no existe hasta que el responsable complete el asistente.
- **Rollback de actualizaciones**: falta probar la vuelta a 1.0.7 con el
  paquete anterior conservado en `/var/cache/abuelo-os/updates/`.
- **`thunar` sigue en 0755**: es necesario para el servicio D-Bus de
  xfdesktop; no da root ni abre ajustes, pero permite navegar por el sistema
  de archivos en lectura.
- **Restauración de copias**: `tar.extractall` en Python 3.11 mantiene la
  validación manual; falta una prueba adversarial con PAX, hardlinks y enlaces.

## Menores

- El icono de actualizaciones del responsable requiere que
  `abuelo-desktop-trust` lo marque como de confianza en la primera sesión.
- El estado de comprobación vive en `/var/lib/abuelo-os/update-state.json`;
  `abuelo` puede leerlo pero no escribirlo.
- La clave de auditoría no se rota automáticamente al clonar una instalación
  ya marcada como instalada.
- Los avisos de PulseAudio/udisks/colord del journal son ruido de la VM y de
  hardware ausente, no fallos de abuel-os.

- Varias cadenas internas siguen diciendo `1.0.5`/`1.0.6` (docstrings y `User-Agent`).
- `abuelo-sandbox` construye argumentos sin citar rutas de USB con espacios.
## Heredados de versiones anteriores

- El modo live mantiene la contraseña conocida `live` para `responsable`.
- Los drivers propietarios pueden ignorar los modos `cvt`.
- `crypt` sigue usándose para verificar contraseñas; migrar a PAM/`crypt_r`
  antes de Python 3.13.
- Calamares no tiene validación completa de traducciones/stylesheet.
