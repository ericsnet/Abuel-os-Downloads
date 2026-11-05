# Actualizaciones dinámicas de abuel-os

## Modelo

Dos capas independientes:

1. **Debian (base)**: seguridad y errores del sistema mediante
   `unattended-upgrades` y `apt`. No cambia la versión de abuel-os.
2. **Capa abuel-os**: scripts, panel, temas, unidades, branding y `/etc/skel`
   empaquetados como `abuelo-os-core_<versión>_all.deb`. Es lo que hace que
   1.0.6 pase a 1.0.7 sin reinstalar.

La ISO completa queda para cambios de base Debian o instalaciones nuevas.

## Flujo 1.0.6 → 1.0.7

1. `abuelo-update --check` consulta la última release de
   `https://api.github.com/repos/ericsnet/Abuel-os-Downloads/releases/latest`.
2. Compara `VERSION_ID` con `/etc/abuelo-os/version`.
3. Si hay una versión mayor, descarga de la release:
   - `abuelo-os-core_<v>_all.deb`
   - `abuelo-os-core_<v>_all.deb.sha256`
   - `abuelo-os-core_<v>_all.deb.sig` (Ed25519, base64)
4. Verifica:
   - SHA256 del `.deb`.
   - Firma Ed25519 de la suma con la clave pública
     `/etc/abuelo-os/update-ed25519.pub`.
   - Si algo falla: **no se instala** y se registra en auditoría.
5. `apt-get install -y ./abuelo-os-core_<v>_all.deb`, que aplica ficheros y
   ejecuta `postinst` (daemon-reload, unidades nuevas, cachés de iconos).
6. Si la actualización necesita reinicio, se avisa. El sistema conserva el
   `.deb` anterior en `/var/cache/abuelo-os/updates/` para volver con
   `apt install abuelo-os-core=<versión anterior>`.

## Firma

- Clave Ed25519. La pública vive en el repo y en la imagen; la privada **no se
  versiona** (variable `ABUELO_UPDATE_KEY` o fichero custodiado).
- `tools/make-update-package.py` genera el `.deb`, el `.sha256` y la firma.
- `abuelo-update` falla cerrado si falta la clave pública o la firma.

## Qué incluye el paquete

- `/usr/local/bin`, `/usr/local/lib/abuelo-os`
- `/usr/share/applications`, `/usr/share/themes`, `/usr/share/backgrounds`
- `/etc/systemd/system` (unidades `abuelo-*`)
- `/etc/polkit-1`, `/etc/xdg`, `/etc/lightdm` (conffiles)
- `/etc/calamares` (branding)
- `/etc/skel` (nuevas cuentas)
- `/etc/os-release`, `/etc/lsb-release`, `/etc/issue`, `/etc/abuelo-os/version`

**No incluye** (se conservan del equipo): `/etc/abuelo-os/config.json`,
`/etc/abuelo-os/audit.key`, `/home/*`, `/var/lib/abuelo-os/*`,
`/etc/hostname`, `/etc/hosts`, `/etc/fstab`.

## Primer paso desde 1.0.5

1.0.5 no tiene `abuelo-update`. Se publica `abuelo-os-updater_1.0.6_all.deb`
como instalador único (o se instala la ISO). Tras eso, 1.0.6 ya se actualiza
sola a 1.0.7.

## Seguridad

- HTTPS + SHA256 + Ed25519.
- El paquete se instala como root solo tras verificar.
- Registro en la auditoría (`actualizacion_disponible`, `actualizacion_instalada`,
  `actualizacion_fallida`).
- `abuelo-update` no acepta URLs arbitrarias; solo el repositorio configurado.
- Sin firma válida no hay instalación (fail closed).
