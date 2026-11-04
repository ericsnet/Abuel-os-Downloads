# abuel-os 1.0.2

Versión de **corrección**: 15 de 15 fallos documentados en 1.0.0 y 1.0.1
corregidos, más 2 incidencias encontradas en las pruebas.

> **Aviso (2026-11-03):** las pruebas posteriores a la publicación encontraron
> fallos no documentados en esta ficha (iconos del escritorio, Chrome, Correo y
> tamaños de ventana). Están corregidos en [1.0.3](../1.0.3/) y detallados en
> [KNOWN_ISSUES.md](KNOWN_ISSUES.md).

## Contenido de esta carpeta

| Fichero | Qué es |
|---|---|
| `CHANGELOG.md` | Resumen de cambios y recuento de fallos |
| `KNOWN_ISSUES.md` | Fallos detectados después de publicar (corregidos en 1.0.3) |
| `RELEASE.md` | Artefacto, tamaño, SHA256 y comprobaciones |

## Resumen

- Autologin real en la cuenta `abuelo` (causa: colisión del GID 1000).
- Instalador Calamares con LUKS2 y USB persistente cifrado.
- Aplicaciones confinadas con bubblewrap.
- Panel del responsable completo y protegido por su contraseña.
- Auditoría en SQLite con integridad y cifrado de campos sensibles.
- Correo nativo con Evolution/EWS.
- Escritorio con tema propio claro/oscuro, Secure Boot y arranque más rápido.

## Credenciales del modo live

- Persona mayor: `abuelo` / `live` (autologin, no se pide).
- Responsable: `responsable` / `live`.

Cambia la contraseña del responsable en el panel la primera vez.
