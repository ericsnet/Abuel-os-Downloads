# Versiones de abuel-os

Una carpeta por versión. Nada de mezclar: `KNOWN_ISSUES.md` solo enumera los
fallos **abiertos en esa versión**. Si se arreglan, se anotan en el
`CHANGELOG.md` de la versión que los corrige, no en el `KNOWN_ISSUES`.

## Estructura de cada versión

```
versions/<versión>/
  README.md         resumen de la versión
  CHANGELOG.md      qué incluye y qué cambió respecto a la anterior
  KNOWN_ISSUES.md   fallos y limitaciones de esa versión concreta
  RELEASE.md        fecha, etiqueta, tamaño, SHA256 y enlace de descarga
```

`_TEMPLATE/` contiene el esqueleto y no se publica.

## Crear una versión nueva

```sh
python tools/new-version.py 1.0.1
```

Crea la carpeta desde la plantilla, rellena la fecha y añade la fila a
`versions/INDEX.md`. Después hay que construir la ISO, completar `RELEASE.md` con el
SHA256 real y actualizar el estado en el índice.
