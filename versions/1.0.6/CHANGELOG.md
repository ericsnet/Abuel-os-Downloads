# Cambios - abuel-os 1.0.6 (en desarrollo)

## Objetivo

Actualizaciones dinámicas del sistema y corrección de los fallos detectados al
revisar la 1.0.5.

## En curso

1. **`abuelo-update`**: comprueba la última release de GitHub, descarga el
   paquete `abuelo-os-core`, verifica SHA256 y firma Ed25519, e instala con
   `apt`. Interfaz CLI y diálogo para el panel.
2. **Paquete `abuelo-os-core`**: empaqueta la capa abuel-os (`/usr/local`,
   `/usr/share`, unidades, branding y `/etc/skel`) para actualizar equipos
   instalados sin reinstalar la ISO.
3. **`tools/make-update-package.py`**: construye el `.deb`, su `.sha256` y su
   firma desde el árbol de `config/includes.chroot`.
4. **Aviso y comprobación periódica**: timer de systemd + notificación.
5. **Actualizaciones de seguridad Debian** con `unattended-upgrades`.
6. **Correcciones de 1.0.5**: persistir la resolución elegida, recuperar el modo
   preferido, adaptar el panel también cuando se lanza como root y cerrar
   `abuelo-allowed` en fallo.
7. **Papelera aislada**: se desactiva el icono de Papelera de xfdesktop (abría
   Thunar sin sandbox) y se sustituye por una Papelera dentro de `abuelo-files`,
   con restaurar. Los archivos eliminados siguen en `~/.local/share/Trash`.
8. **Listas vacías**: corregir el espacio en blanco de los desplegables del
   panel (resolución y ajustes).
9. **Más escritorios**: investigación y plan en `docs/DESKTOPS.md`; XFCE
   sigue siendo el único de la ISO. LXQt/MATE quedan para una variante.
7. **Primer arranque instalado**: crear la cuenta `abuelo` antes de LightDM o
   arrancar el asistente sin depender del autologin.

## Artefacto

ISO 1.0.6 construida: `18d62c0af617b5c89f175d993d5428ecd1ad2abf2143ac9bd6446f4e5d8a8f5a`. Ver [RELEASE.md](RELEASE.md).
