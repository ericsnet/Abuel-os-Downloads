# abuel-os 1.0.5

Versión de **corrección de la QA de 1.0.4**: la configuración del responsable
vuelve a aplicarse (idioma, tema y apps), la auditoría de archivos funciona, las
copias ya no permiten salir del `home`, la clave de auditoría es por instalación
y la pantalla se adapta sola con más resoluciones.

## Contenido de esta carpeta

| Fichero | Qué es |
|---|---|
| `CHANGELOG.md` | Qué se corrige y por qué |
| `KNOWN_ISSUES.md` | Fallos y limitaciones abiertas |
| `RELEASE.md` | Artefacto, tamaño, SHA256 y comprobaciones |

## Resumen

- Configuración legible por el usuario mayor: idioma, tema y apps se aplican.
- Auditoría: archivos modificados, usuario real y clave única por instalación.
- Copias: extracción segura de tar (sin path traversal).
- Pantalla: `--auto/--list/--set`, DPI y panel/iconos adaptativos.
- Reloj con hora y fecha; locale inglés generado; marca «Persona mayor».
- Archivos sin carpetas duplicadas y con iconos correctos.
- Restricciones de aplicaciones efectivas en lanzadores e iconos.

## Credenciales del modo live

- Persona mayor: `abuelo` / `live` (autologin, no se pide).
- Responsable: `responsable` / `live`.

Cambia la contraseña del responsable en el panel la primera vez.
