# Cambios - abuel-os 1.0.4

## 1.0.4 - 2026-11-03

Versión de **mejoras de uso** para el responsable y para el primer arranque de
un equipo instalado.

### Mejoras

1. **Panel del responsable renovado.** Cabecera con la marca, pestañas con
   icono y tarjetas de resumen con el dato grande. Fondo claro propio del panel
   (no depende del tema del usuario mayor) y mejor jerarquía visual.
2. **Actividad legible.** La sección de actividad deja de ser texto monoespaciado:
   - Tabla con columnas «Cuándo / Quién / Qué / Detalle / Aviso».
   - Fechas en lenguaje natural («hoy 10:32», «ayer 18:04»).
   - Nombres de evento traducidos («Aplicación abierta», «Intento fallido»…).
   - Los errores y accesos fallidos se resaltan en rojo y los avisos en ámbar.
   - Buscador por persona, acción o detalle y contador «N eventos · X para revisar».
3. **Idioma con efecto real.** Antes solo se escribía `environment.d` y no se
   aplicaba. Ahora se escribe también `~/.xsessionrc` (el que lee Xsession de
   LightDM) y, al cambiar el idioma, el panel ofrece **reiniciar la sesión del
   usuario mayor** en el momento (`loginctl terminate-user`, con autologin).
4. **Barra más clara.** Panel de 52 px, iconos de bandeja (Wi-Fi, volumen…) a
   32 px y reloj con hora y fecha (sin segundos) y formato corto.
5. **On-boarding tras instalar.** El asistente pasa a ser un recorrido de cinco
   pasos (`Gtk.Assistant`): bienvenida, cuenta del responsable, cuenta de la
   persona mayor, aspecto e idioma, y resumen. Termina con el código de
   recuperación. Se abre solo en el primer arranque del sistema instalado
   (el modo live no lo abre).

### Artefacto

Ver [RELEASE.md](RELEASE.md).

### Correcciones añadidas tras las pruebas de la ISO

- **El instalador no abría**: Calamares 3.2.61 abortaba por un `branding.desc`
  incompatible («invalid node; first invalid key: style»). Se ha reescrito con
  el esquema de Debian 12 (`windowExpanding`, `windowSize`, `slideshowAPI`,
  `style` como mapa) y ya arranca.
- **El apagado se quedaba esperando**: live-boot pedía retirar el medio
  («Please remove the live-medium… press ENTER»). Se añaden `noeject noprompt`
  al arranque en vivo, así que apaga sin intervención.
- **Barra**: panel a 56 px, bandeja a 36 px y estilo propio de la barra
  (botones redondeados, reloj en negrita) en el tema claro y oscuro.

### Artefacto

Ver [RELEASE.md](RELEASE.md).
