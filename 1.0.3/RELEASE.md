# Publicación - abuel-os 1.0.3

- **Fecha:** 2026-11-03
- **Etiqueta:** `v1.0.3` (publicada)
- **Release:** https://github.com/ericsnet/Abuel-os/releases/tag/v1.0.3
- **Ficheros:** `abuelo-os-amd64.iso` y `abuelo-os-amd64.iso.sha256`
- **Tamaño:** 1.947.598.848 bytes
- **SHA256:** `c9636d05b124391c094077d543df9bba7d3e1f8af5ada2641bef62c6e79f2fae`

Los dos ficheros están subidos como adjuntos de la release. GitHub calculó el mismo SHA256 para el adjunto (`sha256:c9636d05...f2fae`).

## Comprobaciones de la imagen

- [x] `PRETTY_NAME="abuel-os 1.0.3"` en `/etc/os-release` (leído en la VM).
- [x] `/etc/motd` dice 1.0.3.
- [x] Arranque UEFI con autologin; escritorio sin pantalla de acceso.
- [x] Escritorio sin icono del medio de arranque «Debian…».
- [x] `Panel.desktop` abre la petición de contraseña del responsable
      (antes: «requiere un servicio de gestión de archivos»).
- [x] `Internet.desktop` abre Chrome dentro del confinamiento
      (`/opt/google/chrome/chrome` visible en el sandbox).
- [x] `Correo.desktop` abre Evolution dentro del confinamiento.
- [x] `~/.local` pertenece a `abuelo` y admite escritura.
- [x] Servicio D-Bus `org.xfce.FileManager` activo con UID 1000.
- [x] Ventanas ajustadas: `abuelo-files` cabe en 800x600 sin botones fuera.

## Capturas y registros

En `project/artifacts/1.0.3/`:

- `screenshots/01-desktop-panel-error.png` (1.0.2, fallo original).
- `screenshots/02-panel-ask-responsable.png` (1.0.3, arreglado).
- `screenshots/03-internet-click.png`, `04-headless-chrome-evolution.png`.
- `screenshots/05-800x600-archivos.png`.
- `logs/serial-*.log` y `logs/probe*-1.0.3-serial.log`.
- `scripts/serial-console.ps1` (consola serial por TCP usada en las pruebas).
