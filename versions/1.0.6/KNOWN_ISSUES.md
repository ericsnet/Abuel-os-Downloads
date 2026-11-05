# Fallos conocidos - abuel-os 1.0.6 (en desarrollo)

Fallos y limitaciones **abiertos en esta versión**. No se listan aquí errores
de otras versiones ni correcciones ya aplicadas; eso va en el `CHANGELOG.md`.

## Abiertos

- **Primer arranque instalado**: `autologin-user=abuelo` apunta a una cuenta que
  aún no existe; se ve el greeter hasta que el responsable entra una vez.
- **Persistencia cifrada**: probada con dispositivos de bucle, no con USB
  físico ni distintos fabricantes.
- **Modos de pantalla**: algunos drivers propietarios ignoran los modos creados
  con `cvt`; `--auto` usa EDID/preferidos.
- **Socket de auditoría**: escribible por el usuario mayor; los eventos
  privilegiados se filtran por uid, pero puede generar ruido/DoS.
- **`crypt`**: `common.verify_password` usa `crypt` (Python 3.11); eliminado en
  3.13. Migrar a PAM/`crypt_r`.
- **Calamares**: sin traducciones ni `stylesheet.qss`; instalación completa a
  disco pendiente de validar.
- **Actualizaciones**: el pipeline `.deb` + firma está en desarrollo; falta
  probar `abuelo-update --check/--install` contra una release con paquete y
  validar el rollback.
- **Bootstrap**: un sistema sin `abuelo-update` necesita instalar una vez el
  paquete `abuelo-os-updater` o la ISO; no hay autoactualización desde cero.
- **Escritorios alternativos**: la capa propia es XFCE; LXQt/MATE están
  investigados en `docs/DESKTOPS.md` pero no incluidos.
- **Listas del panel**: la corrección del hueco blanco está pendiente de
  validar en la ISO construida.
- **Resolución manual**: falta persistir la resolución elegida entre sesiones.
- **Panel como root**: al ajustar pantalla desde el panel, `xfconf` puede no
  adaptar panel/iconos/DPI por falta de bus de sesión.
- **`abuelo-allowed`**: falla abierto si no puede leer `config.json`.

## Cómo informar de un fallo

Incluye el modelo del equipo, si arranca en BIOS o UEFI, la resolución de
pantalla y el informe generado con `abuelo-report` (Ayuda → «Generar informe
técnico»).
