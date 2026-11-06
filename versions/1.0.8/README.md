# abuel-os 1.0.8

Versión de separación de cuentas, actualizaciones del responsable y terminal
root controlada.

## Contenido de esta carpeta

| Fichero | Qué es |
|---|---|
| `CHANGELOG.md` | Todo lo que incluye esta versión |
| `KNOWN_ISSUES.md` | Fallos y limitaciones reales de esta versión |
| `RELEASE.md` | Artefacto, tamaño, SHA256 y enlace de descarga |
| `UPDATES.md` | Flujo de actualización desde 1.0.7 |

## Resumen

- `abuelo` ya no puede abrir el panel, el instalador, el asistente de cuentas
  ni el actualizador como root.
- El responsable tiene icono de actualizaciones y botón de terminal root en
  el panel.
- Los ajustes XFCE, el editor de red y las herramientas de impresión/Bluetooth
  quedan restringidos al grupo `responsables`.
- El socket de auditoría deja de ser 0666.

Probada en live con VirtualBox; pendiente la prueba de rollback y del primer
arranque instalado.
