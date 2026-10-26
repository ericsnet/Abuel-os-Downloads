# Publicación - abuel-os 1.0.2

- **Fecha:** 2026-10-25
- **Etiqueta:** `v1.0.2` (publicada)
- **Descargas públicas:** https://github.com/ericsnet/Abuel-os-Downloads/releases
- **Estado en este repositorio:** ISO pendiente de publicación
- **Ficheros:** `abuelo-os-amd64.iso` y `abuelo-os-amd64.iso.sha256`
- **Tamaño:** 1.946.157.056 bytes
- **SHA256:** `bb0b42ca5f3acd4694263906e296d0b2cac9ab33da4cf6760ce83335551cfb98`

La ISO y su fichero SHA256 todavía están pendientes de publicación en el repositorio público de descargas. Cuando estén disponibles, aparecerán en [Releases](https://github.com/ericsnet/Abuel-os-Downloads/releases).

## Comprobaciones de la imagen

- [x] `PRETTY_NAME="abuel-os 1.0.2"` en `/etc/os-release`.
- [x] Arranque BIOS sin pantalla de acceso (autologin a `abuelo`).
- [x] Arranque UEFI sin pantalla de acceso (autologin a `abuelo`).
- [x] Menú GRUB con espera de 5 s (arranca solo).
- [x] Grupos `responsables` (990) y `nopasswdlogin` (991); GID 1000 libre.
- [x] Shim firmado por Microsoft UEFI CA (2011 y 2023).
- [x] Calamares con marca `abuel-os` presente en la imagen.
- [x] `abuelo-sandbox` oculta `/root` y las carpetas de otros usuarios.
- [x] Auditoría SQLite con cadena de integridad correcta y campo cifrado.
- [x] `abuelo-persist` crea LUKS2 + ext4 `persistence` + `persistence.conf`.
- [x] Sin unidades `abuelo-diag` en la imagen.
- [x] Compilación de todos los módulos Python correcta.

## Capturas y registros

En `project/artifacts/1.0.2/`: `boot-bios2.png`, `boot-uefi2.png`,
`serial-bios2.log`, `serial-uefi2.log`.
