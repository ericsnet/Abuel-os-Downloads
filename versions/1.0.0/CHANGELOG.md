# Registro de cambios — abuel-os

## 1.0.0 — 2026-10-25

Primera versión publicada. Es una **imagen live** arrancable por USB (BIOS y UEFI),
con escritorio, identidad de marca y un panel de administración funcional.

### Incluido

- Base Debian 12 (bookworm) `amd64`, kernel 6.1, systemd, XFCE.
- Arranque **BIOS y UEFI** (isolinux + GRUB EFI), menú «abuel-os» en español con
  espera de 5 s y splash propio.
- Identidad: nombre del sistema, hostname `abuelo-os`, fondo 1920x1080, logo,
  pantalla de bienvenida y panel con la marca.
- Escritorio con accesos grandes: Internet (Chrome), Outlook, Archivos, Panel y Ayuda.
- Aplicaciones: Google Chrome (paquete oficial), Outlook como aplicación web,
  VLC, Evince, Ristretto, File Roller, Firefox ESR, impresoras, Bluetooth, red y USB.
- **Panel del responsable** (`abuelo-control`), protegido con polkit:
  - Resumen del equipo (sistema, almacenamiento, memoria, arranque).
  - Espacio: vaciar cachés y papeleras.
  - Configuración: nombres del responsable y del mayor.
  - Actividad: visor de registros.
  - Cuentas: asistente que crea `abuelo` (sin sudo) y `responsable` (con sudo).
- **Explorador propio** (`abuelo-files`) limitado a Documentos, Fotos, Música,
  Vídeos, Descargas, Escritorio y memorias USB: copiar aquí, nueva carpeta,
  eliminar a la papelera, abrir con la aplicación predeterminada.
- **Aislamiento básico**: grupo `responsables`, herramientas de sistema con permisos
  `0750` (no ejecutables por el usuario mayor), kiosco de XFCE, menú curado y
  retirada de `sudo` al usuario live en el arranque.
- **Ayuda y problemas**: pantalla con pasos a seguir y guardado de un aviso para el
  responsable en `~/Avisos`.
- Auditoría: `auditd` (cambios en `/home` y ejecución de procesos), registro propio,
  rotación diaria y retención de 365 días.
- Tema visual tipo Windows (GTK claro con acento azul, botones a la derecha,
  panel oscuro) y tipografía grande.

### Estado conocido

- El **inicio de sesión automático no funciona**: LightDM muestra la pantalla de
  acceso. Entrar con usuario `user` y contraseña `live`.
- No hay instalador, cifrado ni persistencia. Ver `KNOWN_ISSUES.md`.

### Artefacto

- `abuelo-os-amd64.iso` — 1.692.844.032 bytes
- SHA256 `3262da299e671020aa0268eaf076b7d0756d799d163ff90e1a2b6eec2b22eebf`
