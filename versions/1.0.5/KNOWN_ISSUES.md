# Fallos conocidos - abuel-os 1.0.5

- **0 fallos abiertos** conocidos al publicar.
- Pendiente: probar en equipo real y completar una instalación a disco.



## Limitaciones conocidas

- **Primer arranque instalado**: LightDM tiene `autologin-user=abuelo`, pero esa
  cuenta la crea el asistente en el primer inicio. Hasta que el responsable
  entra una vez, se ve el greeter; después el autologin funciona.
- **Persistencia cifrada**: probada sobre dispositivos de bucle en el proyecto;
  falta una prueba con un USB físico y distintos fabricantes.
- **Modos de pantalla**: `abuelo-display --set` crea modos con `cvt` si el
  monitor no los anuncia, pero algunos drivers propietarios ignoran esos modos.
  La opción Automática siempre usa los modos EDID/preferidos.
- **Socket de auditoría**: sigue siendo escribible por el usuario mayor para que
  las apps registren sus acciones; los eventos privilegiados se filtran por uid,
  pero un usuario puede generar eventos no privilegiados (ruido/DoS de la base).
- **`crypt`**: `common.verify_password` usa el módulo `crypt` (presente en
  bookworm/Python 3.11; eliminado en Python 3.13). Habrá que migrar a
  `crypt_r`/PAM antes de cambiar de base.
- **Calamares**: la marca no incluye traducciones ni `stylesheet.qss`; son
  avisos, no errores. La instalación completa sigue pendiente de validar.

## Cómo informar de un fallo

Incluye el modelo del equipo, si arranca en BIOS o UEFI, la resolución de
pantalla y el informe generado con `abuelo-report` (Ayuda → «Generar informe
técnico»).

## Detectados después de publicar (2026-11-05)

- **La Papelera del escritorio salta el aislamiento.** El icono integrado de
  xfdesktop abre Thunar; desde esa ventana se puede navegar por todo el sistema
  de archivos, fuera de `abuelo-files` y del sandbox. Es el mismo binario
  Thunar que se dejó ejecutable para que funcionen los iconos del escritorio.
- **Listas con un espacio en blanco enorme.** En el panel, al abrir una lista
  (por ejemplo la de resolución en «Ajustar pantalla»), aparece un área blanca
  grande sin contenido visible. Pendiente de reproducir y corregir; apunta a
  tamaño del popup/tema GTK o a filas sin renderizar.
- **La resolución elegida no se guarda.** `abuelo-display --set` solo cambia
  xrandr para la sesión; al reiniciar, `--auto` vuelve a la preferida.
- **Ajustar pantalla desde el panel no adapta panel/iconos/DPI.** El panel corre
  como root sin el bus de sesión (`DBUS_SESSION_BUS_ADDRESS`/`XDG_RUNTIME_DIR`),
  así que `xfconf` falla en silencio aunque xrandr cambie el modo.
- **VirtualBox no recupera 1280x800 desde 1024x768** (`Configure crtc 0 failed`);
  `--auto` tampoco lo detecta y devuelve éxito.
- **`abuelo-allowed` falla abierto** si no puede leer `config.json`: permite las
  aplicaciones en lugar de bloquearlas.
- **`abuelo-report` ejecutado a mano como root** escribe en `/root/Avisos`;
  desde el panel ya se pasa la ruta del mayor.
- **Ruido de journal**: `gkr-pam` al hacer `chpasswd`, cookies de PulseAudio,
  plugin `mdraid` ausente en udisks, aviso de compositing de xfwm4, blueman sin
  adaptador y EDID vacío de colord. Son de entorno/VM, no bloquean.
- **`abuelo-firstboot`** (clave por instalación) solo se puede probar en un
  sistema instalado.
