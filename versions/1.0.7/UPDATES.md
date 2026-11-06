# Actualizaciones dinámicas de abuel-os 1.0.7

## Modelo

Dos capas independientes:

1. **Debian (base)**: seguridad y errores del sistema mediante
   `unattended-upgrades` y `apt`. No cambia la versión de abuel-os.
2. **Capa abuel-os**: scripts, panel, temas, unidades, branding y `/etc/skel`
   empaquetados como `abuelo-os-core_<versión>_all.deb`. Es lo que hace que
   1.0.6 pase a 1.0.7 sin reinstalar.

La ISO completa queda para cambios de base Debian o instalaciones nuevas.

## Flujo probado 1.0.6 → 1.0.7

1. `abuelo-update --check` consulta la última release de
   `https://api.github.com/repos/ericsnet/Abuel-os-Downloads/releases/latest`.
2. Con 1.0.6 arrancado desde la ISO publicada, detectó `1.0.7` y mostró
   `Hay una version nueva: 1.0.7 (tiene 1.0.6).`
3. `sudo abuelo-update --install` descargó `abuelo-os-core_1.0.7_all.deb`,
   verificó SHA256 y firma Ed25519, instaló con `apt-get` y terminó con
   `Actualizado a abuel-os 1.0.7.`
4. Verificación posterior:
   - `PRETTY_NAME="abuel-os 1.0.7"`
   - `/etc/abuelo-os/version`: `1.0.7`
   - `dpkg-query`: `abuelo-os-core 1.0.7 install ok installed`

## Firma

- Clave Ed25519. La pública vive en el repo y en la imagen; la privada **no se
  versiona**.
- `tools/make-update-package.py` genera el `.deb`, el `.sha256` y la firma.
- `abuelo-update` falla cerrado si falta la clave pública o la firma.
- Paquete 1.0.7: `a2d3c5323d4715d3947e4d89b20c79440b7f3b1d4d4fc172612b3fb42f06df65`.

## Pendiente

- Rollback a 1.0.6 con el paquete anterior conservado en
  `/var/cache/abuelo-os/updates/`.
