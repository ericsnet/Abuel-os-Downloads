# Publicación - abuel-os 1.0.2

## ISO

- **Archivo:** `abuelo-os-amd64.iso`
- **Tamaño:** 1.946.157.056 bytes
- **SHA256:** `bb0b42ca5f3acd4694263906e296d0b2cac9ab33da4cf6760ce83335551cfb98`
- **Fecha:** 2026-10-25
- **Etiqueta:** `v1.0.2`
- **Descarga:** [release](https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.2) · [ISO](https://github.com/ericsnet/Abuel-os-Downloads/releases/download/v1.0.2/abuelo-os-amd64.iso)
- **Verificación:** `sha256sum abuelo-os-amd64.iso` debe devolver `bb0b42ca5f3acd4694263906e296d0b2cac9ab33da4cf6760ce83335551cfb98`.

## Fallos conocidos (resumen)

- **Total:** 28 (27 de la auditoría QA y 1 previos).
- **Severidad:** 5 alta, 12 media, 10 baja.
- **Principales:**
  - ABL-001 — La configuracion del responsable no es legible por el usuario mayor: tema, idioma y apps nunca se aplican
  - ABL-004 — Tar-slip al restaurar copias de seguridad (extractall sin filtro)
  - ABL-023 — Los iconos del escritorio no se abren porque Thunar no es ejecutable por el usuario mayor
  - ABL-026 — Chrome no arranca desde la barra porque abuelo-sandbox no monta /opt
  - ABL-027 — Correo (Evolution) no arranca porque abuelo-sandbox solo monta /sys/devices

## Auditoría completa

- [1.0.2/KNOWN_ISSUES.md](https://github.com/ericsnet/Abuel-os-Downloads/blob/main/versions/1.0.2/KNOWN_ISSUES.md)
