# abuel-os 1.0.3

Versión de **corrección** sobre la 1.0.2, centrada en los fallos encontrados al
probar la imagen en máquina virtual.

## Contenido de esta carpeta

| Fichero | Qué es |
|---|---|
| `CHANGELOG.md` | Qué se corrigió y por qué |
| `KNOWN_ISSUES.md` | Fallos abiertos (ninguno) |
| `RELEASE.md` | Artefacto, tamaño, SHA256 y comprobaciones |

## Resumen

- Los iconos del escritorio vuelven a abrirse (el servicio de archivos de Xfce
  ya puede arrancar para el usuario `abuelo`).
- Fuera el icono del medio de arranque «Debian…».
- Chrome y Correo funcionan desde la barra: el confinamiento monta `/opt` y
  `/sys` como necesita cada aplicación.
- Las ventanas se ajustan al monitor; no quedan botones fuera de pantalla.
- `os-release` y enlaces del producto apuntan a `ericsnet/Abuel-os`.

## Credenciales del modo live

- Persona mayor: `abuelo` / `live` (autologin, no se pide).
- Responsable: `responsable` / `live`.

Cambia la contraseña del responsable en el panel la primera vez.
