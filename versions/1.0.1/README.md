# abuel-os 1.0.1

Versión de **cambio de nombre**: el sistema pasa a llamarse **abuel-os** en todo lo
visible. Funcionalmente es la misma base live que la 1.0.0.

## Contenido de esta carpeta

| Fichero | Qué es |
|---|---|
| `CHANGELOG.md` | Todo lo que incluye esta versión y qué cambió |
| `KNOWN_ISSUES.md` | Fallos y limitaciones reales de esta versión |
| `RELEASE.md` | Artefacto, tamaño, SHA256 y enlace de descarga |

## Resumen

- Debian 12 + XFCE, arranque BIOS y UEFI, imagen live.
- Nombre visible `abuel-os` y hostname `abuel-os`.
- Escritorio con marca, Chrome, Outlook web, VLC y visores.
- Panel del responsable, explorador propio y aislamiento básico.
- **No** incluye instalador, LUKS ni persistencia.
- El autologin sigue sin funcionar: entrar con `user` / `live`.

## Compatibilidad de rutas

Las rutas internas no cambian (`/etc/abuelo-os`, `/var/log/abuelo-os`,
`/usr/local/lib/abuelo-os`) para no romper actualizaciones ni scripts.
