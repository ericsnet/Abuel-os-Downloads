# Cambios — abuel-os 1.0.1

## 1.0.1 — 2026-10-25

### Cambios respecto a la 1.0.0

- **Renombrado visible** de «Abuelo's OS» a **abuel-os** en:
  - `os-release`, `lsb-release`, `issue` y mensaje de bienvenida (motd),
  - título del menú de arranque, entradas de arranque y splash,
  - fondo de escritorio y logotipo,
  - títulos de ventana del panel y del asistente,
  - entradas de escritorio y del menú de aplicaciones.
- **Hostname** `abuel-os` (antes `abuelo-os`), incluidos `hosts` y el parámetro de
  arranque.
- `ID=abuel-os` en `os-release`.
- Rutas internas sin cambios: `/etc/abuelo-os`, `/var/log/abuelo-os`,
  `/usr/local/lib/abuelo-os`, grupo `responsables`.
- Organización del repositorio por versiones: `versions/<versión>/` con cambios,
  fallos y datos de publicación; plantilla y script `tools/new-version.py`.

### Incluido (heredado de la 1.0.0)

- Debian 12 (bookworm) `amd64`, kernel 6.1, systemd, XFCE.
- Arranque BIOS y UEFI, menú en español y splash propio.
- Chrome oficial, Outlook como aplicación web, VLC, Evince, Ristretto,
  File Roller, Firefox ESR, impresoras, Bluetooth, red y USB.
- Panel del responsable con polkit: resumen, espacio, configuración, actividad y cuentas.
- Explorador propio limitado a carpetas personales y USB.
- Aislamiento básico: grupo `responsables`, binarios de sistema `0750`, kiosco XFCE,
  retirada de `sudo` al usuario live y menú curado.
- Ayuda y problemas con aviso para el responsable.
- Auditoría con `auditd`, registro propio y retención de 365 días.

### Fallos corregidos

- Ninguno de los fallos de la 1.0.0. El autologin sigue abierto (ver `KNOWN_ISSUES.md`).

### Artefacto

- Pendiente de construir y publicar.
