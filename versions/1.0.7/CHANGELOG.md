# Cambios - abuel-os 1.0.7

## Objetivo

Corregir los fallos de pantalla que quedaron abiertos en 1.0.6 y seguir
preparando las actualizaciones dinámicas.

## Incluido

1. **Persistencia de resolución** (corregido): `abuelo-display --set` guarda el modo en
   `~/.config/abuelo-os/display`; `--auto` lo recupera al iniciar sesión y
   `--reset` vuelve al modo preferido y borra la preferencia.
2. **Ajuste desde el panel** (corregido): el panel ejecuta `abuelo-display` como la persona
   mayor (`runuser` + `DISPLAY`/`XAUTHORITY`/bus de sesión), para que `xfconf`
   adapte panel, iconos y DPI además de xrandr.
3. **Primer arranque instalado**: pendiente de decidir entre crear `abuelo`
   antes de LightDM o abrir el asistente desde el greeter.
4. **Actualizaciones**: probar rollback y publicación de paquetes firmados de
   forma reproducible.

## Artefacto

ISO 1.0.7 construida: `eb87d71e87a115541c81b4aa683c8d7e83ae9c6a415b31f5776e34350ebcfec5`. Ver [RELEASE.md](RELEASE.md).
