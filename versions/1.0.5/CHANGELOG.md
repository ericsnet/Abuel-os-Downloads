# Cambios - abuel-os 1.0.5

## 1.0.5 - 2026-11-04

Versión de **corrección de la QA de 1.0.4**. Arregla los fallos encontrados
probando la ISO en una máquina virtual y añade adaptación automática de
pantalla. El informe completo está en
`artifacts/qa-1.0.4/INFORME_QA_1.0.4.md`.

### Seguridad y privacidad

1. **La configuración del responsable ya se aplica.** `/etc/abuelo-os` pasa a
   0755 y `config.json` a 0644: `abuelo-apply-settings` corre como la persona
   mayor y antes no podía leerlo. Esto arregla de golpe el cambio de idioma,
   el tema oscuro y las aplicaciones permitidas (los tres se quedaban en los
   valores por defecto).
2. **Restaurar copias ya no permite salir del `home`.** Se validan los
   miembros del tar (rutas absolutas, `..`, dispositivos y enlaces) y se usa
   `filter="data"` cuando está disponible.
3. **Clave de auditoría por instalación.** `abuelo-firstboot.service` genera
   una clave nueva en el primer arranque de un sistema instalado y descarta la
   base de la imagen. Antes todas las instalaciones compartían la clave de la
   ISO.
4. **Eventos de auditoría privilegiados.** El socket sigue disponible para que
   las apps registren sus acciones, pero un usuario normal ya no puede falsificar
   «acceso del responsable», «cuenta creada», «configuración cambiada», etc.
5. **La columna «Quién» es real.** El daemon usa `auid`/`uid` de auditd y, para
   las herramientas del panel, el usuario declarado por el responsable. Antes
   todo salía como `root` o `sistema`.

### Auditoría

1. **`archivo_modificado` vuelve a registrarse.** El evento se cierra en
   `PROCTITLE`, no en `CWD`: auditd emite `CWD` antes de los `PATH`, así que
   antes se perdían todas las rutas.
2. **Retención diaria de la base de datos.** `abuelo-audit-retention.timer`
   ejecuta `retention.py` (365 días) y conserva la cadena de hashes. Antes solo
   se purgaba si el daemon llevaba 24 h seguido encendido.

### Pantalla y accesibilidad

1. **`abuelo-display` reescrito**: `--auto`, `--list` y `--set WxH`. Elige el
   mejor modo disponible, prueba una lista de resoluciones habituales
   (1920x1080, 1680x1050, 1600x900, 1440x900, 1366x768, 1280x800, 1280x720,
   1024x768, 800x600) y crea el modo con `cvt` si el monitor no lo anuncia.
2. **Adaptación automática**: el panel (44/52/56/64 px), los iconos del
   escritorio (48/64/96 px) y el DPI de Xft se ajustan al alto de la pantalla.
3. **El panel incluye «Ajustar pantalla y resolución»** en Sistema, con la
   lista real de modos que ofrece el monitor.
4. **Ventanas adaptativas**: `fit_window` usa el área útil del monitor y
   márgenes proporcionales; el resumen del panel pasa a 2 columnas en pantallas
   de menos de 1100 px.

### Correcciones de la QA

1. **El instalador sigue abriendo**: se mantiene la corrección de
   `branding.desc` de 1.0.4 y el panel muestra un error si `abuelo-install` no
   puede lanzarse, en vez de fallar en silencio. Verificado abriendo Calamares
   en la ISO.
2. **Reloj con hora y fecha**: `digital-layout=1` (hora arriba, fecha abajo).
   El valor 2 mostraba solo la fecha.
3. **`en_US.UTF-8` generado** junto a `es_ES.UTF-8`; elegir English ya no deja
   un locale inválido. `LANGUAGE` usa el par completo (`es_ES:es`, `en_US:en`).
4. **Marca del usuario live**: GECOS «Persona mayor» en lugar de «Debian Live
   user» en el diálogo de apagado y en Cuentas.
5. **Informe desde el panel** se guarda en `~/Avisos` de la persona mayor (y se
   le asigna la propiedad), no en `/root/Avisos`.
6. **Archivos**: los iconos se ven (la columna del `Gtk.ListStore` era `bool`);
   usa las rutas XDG reales y ya no crea `Imagenes`/`Musica`/`Videos` junto a
   `Imágenes`/`Música`/`Vídeos`; «Nueva carpeta» rechaza `/` y `..`.
7. **Actividad**: contador «N de M», exportación de lo filtrado y no de los 800
   primeros; el panel ya no reinicia la sesión desde dentro de ella (avisa,
   se cierra y lanza `loginctl` en un proceso separado).
8. **Cuentas**: no se puede borrar la cuenta del responsable configurado ni la
   última cuenta administradora.
9. **Aplicaciones permitidas de verdad**: `abuelo-allowed` comprueba la lista en
   los lanzadores (Internet, Correo, Archivos, documentos/multimedia) y los
   iconos del escritorio se retiran (se guardan, no se borran).
10. **Permisos de autostart**: `.desktop` a 0644 (ya no avisa systemd); los
   iconos del escritorio siguen a 0755.
11. **Asistente**: la contraseña de la persona mayor es obligatoria (mínimo 10);
    antes se generaba una aleatoria que nadie veía.

### Artefacto

ISO construida: `5de7fd5384cc4a84ec798e25aa547e6c62902d464c849756995ec4ee04177c07`.
Ver [RELEASE.md](RELEASE.md).
