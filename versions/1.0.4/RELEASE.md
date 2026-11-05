# Publicación - abuel-os 1.0.4

## ISO

- **Archivo:** `abuelo-os-amd64.iso`
- **Tamaño:** 1.949.515.776 bytes
- **SHA256:** `468c8785723a63881f3828611d5d56c6282de67dddd27c2a8cfdeab476e5356e`
- **Fecha:** 2026-11-03
- **Etiqueta:** `v1.0.4`
- **Descarga:** [release](https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.4) · [ISO](https://github.com/ericsnet/Abuel-os-Downloads/releases/download/v1.0.4/abuelo-os-amd64.iso)
- **Verificación:** `sha256sum abuelo-os-amd64.iso` debe devolver `468c8785723a63881f3828611d5d56c6282de67dddd27c2a8cfdeab476e5356e`.

## Fallos conocidos (resumen)

- **Total:** 39 (19 de la auditoría QA y 20 previos).
- **Severidad:** 6 alta, 15 media, 17 baja.
- **Principales:**
  - ABL-001 — La configuracion del responsable no es legible por el usuario mayor: tema, idioma y apps nunca se aplican
  - ABL-004 — Tar-slip al restaurar copias de seguridad (extractall sin filtro)
  - PREV-C2 — archivo_modificado nunca se registra (previo)
  - PREV-A3 — La columna «Quién» atribuye mal los eventos (previo)
  - PREV-A4 — Falta el locale en_US.UTF-8 (previo)
  - PREV-A5 — El reloj muestra solo la fecha (previo)

## Auditoría completa

- [1.0.4/KNOWN_ISSUES.md](https://github.com/ericsnet/Abuel-os-Downloads/blob/main/versions/1.0.4/KNOWN_ISSUES.md)
