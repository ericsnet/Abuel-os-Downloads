# Cambios - abuel-os 1.0.9

## 1.0.9 - 2026-11-17

### Incluido

- **Sin autologin**: LightDM muestra siempre `abuelo` y `responsable`; cada
  persona elige su cuenta y escribe su contraseña.
- **Arranque más rápido**: se desactivan `live-config`, `console-setup`,
  `plymouth-quit-wait`, `e2scrub_reap`, `NetworkManager-wait-online` y
  `blueman-mechanism` en la imagen live.
- **Instalador personalizado**: nueva marca Calamares, colores, logo,
  pantalla de bienvenida y presentación QML con progreso y pasos.
- **Correo**: el acceso “Correo” abre `https://outlook.live.com/mail/` en el
  navegador confinado; ya no usa Evolution ni una cuenta local.
- Se mantiene la separación de 1.0.8: panel, instalador, asistente y
  actualizaciones solo para el responsable.

### Fallos corregidos

- **Autologin forzado**: eliminado; LightDM muestra `abuelo` y
  `responsable` para elegir cuenta y contraseña.
- **`nopasswdlogin`**: retirado de la cuenta mayor.
- **Arranque lento**: desactivados `live-config`, `console-setup`,
  `keyboard-setup`, `plymouth-quit-wait`, `e2scrub_reap`,
  `NetworkManager-wait-online` y `blueman-mechanism` en live.
- **Instalador**: versión de marca actualizada, `abuelo-os.png` y
  `welcome.png` generados, colores/ventana nuevos y `show.qml` propio.
- **Correo**: abre `https://outlook.live.com/mail/` en el navegador;
  ya no usa Evolution ni una cuenta local.
- **Autologin en `setup.py`**: eliminado para instalaciones nuevas.
- **Postinst**: retira el autologin anterior al actualizar desde 1.0.8.
- **BOM/CRLF**: normalizados `abuelo-outlook`, `branding.desc` y `show.qml`; ShellCheck ya no falla.

### Artefacto

- ISO 1.0.9 construida.
- SHA-256: `4d3545ec0b74ab6de2f7693babbafa349aba3dfd755a1e265fd65f02b9e3aca92`
- Paquete: `abuelo-os-core_1.0.9_all.deb`
- SHA-256 del paquete: `877f5b564f0511db2adb7661c1e7b34b072f700ecb959d1d8951aac45fec49bd`
