# Publicación - abuel-os 1.0.8

- **Fecha:** 2026-11-06
- **Estado:** publicada
- **Etiqueta:** `v1.0.8`
- **Release:** https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.8
- **ISO:** `abuelo-os-amd64.iso` (1.951.432.704 bytes)
- **SHA256:** `584cb3b2c71d4fd458b3541464fe27af8b0ec38c8580e7bf3774b619f0627c57`
- **Paquete de actualización:** `abuelo-os-core_1.0.8_all.deb`
- **SHA256 del paquete:** `2cd4d3f42f959524dff1e9f149c7cf0a4f9bde94907c9cf18f3c1bc1afb31b0b`

Artefacto para adjuntar a la release, no dentro del repositorio.

## Comprobaciones realizadas

- [x] ISO 1.0.8 arranca en VirtualBox y muestra `PRETTY_NAME="abuel-os 1.0.8"`.
- [x] `systemctl --failed` vacío en live.
- [x] `abuelo` no autorizado para `panel-launcher`, `setup-launcher`,
  `install-launch` ni `update-launcher` (`pkcheck` rc=1).
- [x] `responsable` autorizado para esas cuatro herramientas (`pkcheck` rc=0).
- [x] Escritorio de `abuelo` sin `Panel.desktop` ni `Actualizar.desktop`.
- [x] Escritorio del responsable con `Panel.desktop` y `Actualizar.desktop`.
- [x] `nm-connection-editor` y `xfce4-terminal` en 0750 root:responsables.
- [x] Socket de auditoría 0660 root:abuelo.
- [x] `abuelo-update --check` funciona como `abuelo`; instalar queda reservado
  al responsable.
- [x] Paquete 1.0.8 instala su `postinst` sobre live 1.0.8.

## Pendiente

- [ ] Probar actualización real 1.0.7 → 1.0.8 y rollback.
- [ ] Probar primer arranque instalado con el asistente como responsable.
- [ ] Validar el botón de terminal root con ratón en la sesión del responsable.
- [ ] Publicar la release.
