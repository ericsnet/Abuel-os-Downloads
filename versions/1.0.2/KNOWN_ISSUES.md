# Fallos conocidos - abuel-os 1.0.2

> **Aviso (2026-11-03):** las pruebas posteriores a la publicación detectaron
> fallos que esta ficha daba por inexistentes. Se documentan aquí para que la
> ficha de la 1.0.2 sea exacta y quedan **corregidos en la 1.0.3**
> ([CHANGELOG](../1.0.3/CHANGELOG.md)).

## Fallos detectados después de publicar la 1.0.2

| # | Fallo | Causa | Estado |
|---|---|---|---|
| 1 | Ningún icono del escritorio se abría («No se ha podido ejecutar "Panel.desktop"» / «requiere un servicio de gestión de archivos») | `xfdesktop` delega en el servicio D-Bus de Thunar y `/usr/bin/thunar` estaba en `root:responsables 0750` | corregido en 1.0.3 |
| 2 | Icono Debian del medio de arranque en el escritorio | `show-removable=true` en el escritorio | corregido en 1.0.3 |
| 3 | Chrome no arrancaba desde la barra | `abuelo-sandbox` no montaba `/opt` | corregido en 1.0.3 |
| 4 | Correo (Evolution) no arrancaba desde la barra | el sandbox necesita `/sys` completo | corregido en 1.0.3 |
| 5 | Ventanas más grandes que la pantalla en resoluciones pequeñas | tamaños fijos 900x620 / 620x520 | corregido en 1.0.3 |

Además, la 1.0.3 corrige `~/.local` creado como `root:root` y el mensaje de
bienvenida que seguía diciendo 1.0.2.

## Cómo informar de un fallo

Incluye el modelo del equipo, si arranca en BIOS o UEFI, y el informe generado
con `abuelo-report` (Ayuda → «Generar informe técnico»).
