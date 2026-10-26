# abuel-os 1.0.0

Primera versión publicada de **abuel-os** (por entonces llamada «Abuelo's OS»):
imagen live `amd64` con escritorio XFCE, identidad propia y panel del responsable.

## Contenido de esta carpeta

| Fichero | Qué es |
|---|---|
| `CHANGELOG.md` | Todo lo que incluye esta versión |
| `KNOWN_ISSUES.md` | Fallos y limitaciones reales de esta versión |
| `RELEASE.md` | Artefacto, tamaño, SHA256 y enlace de descarga |

## Resumen

- Debian 12 + XFCE, arranque **BIOS y UEFI**.
- Escritorio con marca, Chrome, Outlook web, VLC y visores.
- Panel del responsable con polkit; explorador propio; aislamiento básico.
- **No** incluye instalador, LUKS ni persistencia.
- El autologin no funciona: entrar con `user` / `live`.

## Nota de nomenclatura

Esta versión se publicó con el nombre visible «Abuelo's OS». A partir de la 1.0.1
el nombre es **abuel-os**; las rutas internas (`/etc/abuelo-os`, `/var/log/abuelo-os`)
no cambian para no romper compatibilidad.
