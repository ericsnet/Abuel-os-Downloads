# Publicación - abuel-os 1.0.5

- **Fecha:** 2026-11-05
- **Etiqueta:** `v1.0.5` (construida, pendiente de publicar)
- **Ficheros:** `abuelo-os-amd64.iso` y `abuelo-os-amd64.iso.sha256`
- **Tamaño:** 1.951.432.704 bytes
- **SHA256:** `5de7fd5384cc4a84ec798e25aa547e6c62902d464c849756995ec4ee04177c07`

El ISO está en `project/dist/abuelo-os-amd64.iso` y una copia de trabajo en
`work/vm-iso/abuelo-os-1.0.5.iso`.

## Comprobaciones de la imagen

- [x] `PRETTY_NAME="abuel-os 1.0.5"` en `/etc/os-release` (verificado en live).
- [x] El arranque live conserva `hostname=abuel-os username=abuelo locales=es_ES.UTF-8 keyboard-layouts=es console=ttyS0,115200 ... noeject noprompt`.
- [x] Sesión en español (`LANG=es_ES.UTF-8`) y escritorio con los iconos (Panel, Correo, Internet, Archivos).
- [x] Reloj con hora y fecha (`digital-layout=1`): «17:12 / jue 05 nov».
- [x] Calamares abre desde el lanzador real `abuelo-install` con la marca 1.0.5 (probado en el build de 1.0.5; el cambio posterior solo afecta al reloj).
- [ ] Instalación completa a disco y primer arranque del asistente.
- [ ] Prueba en hardware real.
