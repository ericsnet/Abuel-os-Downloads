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

- El autologin ya no impide cambiar a la cuenta del responsable.
- Se elimina el `nopasswdlogin` de la cuenta mayor.
- Se evita el arranque de más de un minuto por servicios live innecesarios.
- El instalador deja de apuntar a imágenes de marca inexistentes.
- El correo deja de depender de un cliente/configuración personal.

### Artefacto

- ISO 1.0.9 construida.
- SHA-256: `94ba77d110f3ed71b119c4fbe3ed401ab1ef29a356740c591513c5f023bb8969`
- Paquete: `abuelo-os-core_1.0.9_all.deb`
- SHA-256 del paquete: `191f0d171a46acf6bb0e99ed37c55f73d49ca93273d679cfe723a00ba458bf1f`
