# Versiones de abuel-os

Una carpeta por versión. Nada de mezclar: los fallos de la 1.0.0 no se editan
después; si se arreglan, se anotan como resueltos y el fallo vivo se describe en la
versión nueva.

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


## Disponibilidad en el repositorio de descargas

Esta carpeta contiene el historial documental de las versiones. Las ISO no se almacenan en Git: cuando estén publicadas, se podrán obtener desde [Releases de Abuel-os-Downloads](https://github.com/ericsnet/Abuel-os-Downloads/releases). La documentación de compilación y las herramientas de desarrollo no forman parte de este repositorio de descargas.
