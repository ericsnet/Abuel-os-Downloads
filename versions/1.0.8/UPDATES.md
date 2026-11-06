# Actualizaciones dinámicas de abuel-os 1.0.8

## Modelo

Dos capas independientes:

1. **Debian (base)**: seguridad y errores del sistema mediante
   `unattended-upgrades` y `apt`. No cambia la versión de abuel-os.
2. **Capa abuel-os**: scripts, panel, temas, unidades, branding y `/etc/skel`
   empaquetados como `abuelo-os-core_<versión>_all.deb`. Es lo que hace que
   1.0.7 pase a 1.0.8 sin reinstalar.

La ISO completa queda para cambios de base Debian o instalaciones nuevas.

## Flujo 1.0.7 → 1.0.8

1. `abuelo-update --check` consulta la última release de
   `https://api.github.com/repos/ericsnet/Abuel-os-Downloads/releases/latest`.
2. Con 1.0.7, debe detectar `1.0.8` y mostrar
   `Hay una version nueva: 1.0.8 (tiene 1.0.7).`
3. `sudo abuelo-update --install` descarga `abuelo-os-core_1.0.8_all.deb`,
   verifica SHA256 y firma Ed25519, instala con `apt-get` y termina con
   `Actualizado a abuel-os 1.0.8.`
4. Verificación posterior:
   - `PRETTY_NAME="abuel-os 1.0.8"`
   - `/etc/abuelo-os/version`: `1.0.8`
   - `dpkg-query`: `abuelo-os-core 1.0.8 install ok installed`

El salto real 1.0.7 → 1.0.8 está probado: descarga, firma, `postinst`,
`Actualizar.desktop` en el responsable y `abuelo` sin panel ni actualizador.

## Firma

- Clave Ed25519. La pública vive en el repo y en la imagen; la privada **no se
  versiona**.
- `tools/make-update-package.py` genera el `.deb`, el `.sha256` y la firma.
- `abuelo-update` falla cerrado si falta la clave pública o la firma.
- Paquete 1.0.8: `cef82aa89f51b9f8f8d31c5600c6678206315b91b57ed9571ddf219887d2e8f7`.

## Pendiente

- Rollback a 1.0.7 con el paquete anterior conservado en
  `/var/cache/abuelo-os/updates/`.
