# abuel-os 1.0.2

Versión de **corrección**: 15 de 15 fallos documentados en 1.0.0 y 1.0.1
corregidos, más 2 incidencias encontradas en las pruebas. **0 fallos abiertos.**

## Contenido de esta carpeta

| Fichero | Qué es |
|---|---|
| `CHANGELOG.md` | Resumen de cambios y recuento de fallos |
| `KNOWN_ISSUES.md` | Fallos abiertos (ninguno) |
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
