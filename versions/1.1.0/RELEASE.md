# Publicación — abuel-os 1.1.0

- **Fecha de versión:** 2026-11-21
- **Fecha de construcción:** 2026-11-22
- **Estado:** ISO construida; pendiente de probar el arranque y de publicar
- **Etiqueta:** `v1.1.0` (pendiente de crear)
- **Release:** (pendiente)
- **Fichero:** `abuelo-os-amd64.iso` / `abuelo-os-1.1.0.iso`
- **Tamaño:** 1.767.964.672 bytes (1,77 GB)
- **SHA256:** `937be4559ac62884eb53d021f09781921b36080b56963630d78dc72821c8582b`

Artefacto construido en Debian 13 (WSL) con live-build 20250505 y chroot Debian
12 bookworm. Se subirá como adjunto de la release (no dentro del repositorio,
por tamaño).

## Comprobaciones

- [x] Build completado sin errores.
- [x] squashfs zstd generado (zstd, 1.611.122 KB de sistema de archivos).
- [x] SHA256 calculado.
- [ ] Arranque en VM (BIOS y UEFI).
- [ ] Arranque en hardware real.
- [ ] Medición de tiempos contra 1.0.9.
- [ ] Firma del paquete de actualización.
