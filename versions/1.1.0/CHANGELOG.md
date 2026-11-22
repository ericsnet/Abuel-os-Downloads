# Cambios - abuel-os 1.1.0

## 1.1.0 - 2026-11-21 (en preparación)

### Incluido

- **Pantalla de inicio `abuelo-inicio`**: saludo por hora con el nombre de la
  persona mayor, reloj y fecha grandes, y tarjetas de acceso a Archivos,
  Internet, Correo, Ayuda y Panel. Es GTK puro, sin web. Por defecto sustituye
  al escritorio lleno de iconos; el escritorio clásico queda como opción en el
  panel del responsable.
- **Tema automático por hora**: claro cálido de día (7–20) y oscuro de noche,
  configurable a claro u oscuro fijo desde el panel y desde el asistente.
- **Identidad visual nueva**: temas GTK claro y oscuro con crema, navy y ámbar,
  radios amplios y tipografía base de 12 pt; panel del responsable y login de
  LightDM con la misma paleta.
- **Fondos de día y de noche**: SVG nuevos y selección automática según el tema
  o la hora, aplicados a todos los monitores.
- **Arranque más ligero**: enmascarados `NetworkManager-wait-online`,
  `ModemManager`, `avahi`, `cups` y `cups-browsed`; desactivados los timers
  `apt-daily`; `quiet splash loglevel=3` en el arranque live.
- **Memoria comprimida más rápida**: zram con `lz4` y ajustes de `swappiness`
  y `vfs_cache_pressure` para equipos modestos.
- **Menos peso**: fuera Evolution, Evolution-EWS, CUPS y
  `system-config-printer` de la lista de paquetes. Bluetooth se mantiene.
- **Texto más grande**: opción en el panel del responsable que sube la base del
  sistema a 14 pt y agranda saludo, reloj y tarjetas de la pantalla de inicio.
- **Iconos de marca propios** para Archivos, Internet, Correo, Videollamada,
  Ayuda, Panel, Papelera e Inicio, en hicolor; el escritorio, el menú y la
  pantalla de inicio dejan de mezclar iconos de terceros. El logo de abuel-os
  pasa a navy, crema y ámbar.
- **Videollamada opcional**: el responsable pega un enlace (Jitsi, Meet…) en el
  panel y aparece una sexta tarjeta en la pantalla de inicio. Se abre en el
  navegador confinado; solo se aceptan `http` y `https`. Sin enlace, la tarjeta
  no se muestra.

### Cambios respecto a la versión anterior

- El panel del responsable usa una tarjeta de cabecera navy con línea ámbar y
  controles más grandes.
- El asistente de primer arranque ofrece tema automático por defecto y ya no
  habla de inicio de sesión automático (retirado en 1.0.9).
- El fondo del escritorio deja de ser un degradado azul con el logo centrado.

### Fallos corregidos

- (pendiente de la ronda de QA; no se anota nada como corregido sin prueba)

### Artefacto

- **ISO 1.1.0 construida** el 2026-11-22: 1.767.964.672 bytes.
  SHA256: `937be4559ac62884eb53d021f09781921b36080b56963630d78dc72821c8582b`.
  Pendiente de arranque en VM/hardware y de publicación.
- Paquete `abuelo-os-core_1.1.0_all.deb`: construido y verificado en WSL
  (contenido y permisos), sin firmar todavía.
- `abuelo-inicio` probado en headless (1366x768, claro y oscuro): arranca,
  ocupa el área útil y muestra pie y botón. Capturas en
  `artifacts/qa-1.1.0/screenshots/`.
- Medición base y comparativa: `artifacts/qa-1.1.0/`.
