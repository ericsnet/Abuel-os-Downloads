# Cambios - abuel-os 1.0.3

## 1.0.3 - 2026-11-03

Versión de corrección de los fallos encontrados por el operador al probar la
1.0.2 en la máquina virtual.

### Fallos corregidos

1. **Ningún icono del escritorio se abría** («No se ha podido ejecutar
   "Panel.desktop"» y «esta característica requiere un servicio de gestión de
   archivos»). Causa: `xfdesktop` no lanza los `.desktop` por sí mismo, se los
   pide al servicio D-Bus `org.xfce.FileManager` que presta Thunar, y el binario
   `/usr/bin/thunar` estaba en `root:responsables 0750`, así que el usuario
   `abuelo` no podía arrancarlo. Ahora Thunar es `0755` (sigue fuera del menú:
   su `.desktop` lleva `NoDisplay`) y el explorador visible sigue siendo
   `abuelo-files`. Además los lanzadores del escritorio se marcan como
   ejecutables y de confianza (chmod 0755 + metadata::trusted), porque
   Thunar exige ambas cosas y mostraba «Lanzador de aplicaciones no confiable».
2. **Icono «Debian…» en el escritorio**. Era el volumen del medio de arranque
   mostrado como unidad extraíble. Se desactiva `show-removable` en el
   escritorio; las memorias USB se siguen viendo en Archivos.
3. **Chrome no arrancaba desde la barra**. Causa: `abuelo-sandbox` no montaba
   `/opt`, donde vive `/opt/google/chrome`, y el navegador moría con
   `bwrap: execvp /usr/bin/google-chrome-stable: No such file or directory`.
   Ahora se monta `/opt` en solo lectura dentro del espacio de nombres.
4. **Correo (Evolution) no arrancaba desde la barra**. Causa: el sandbox propio
   de Evolution necesita ver `/sys` completo (por ejemplo `/sys/block`) y solo
   se montaba `/sys/devices`, con lo que abortaba en
   `Failed to fully launch dbus-proxy`. Ahora se monta `/sys` en solo lectura y
   se crea `~/.local/share/evolution/preview-plugins`.
5. **Ventanas más grandes que la pantalla**. Panel, Archivos, Configuración y
   Ayuda pedían `900x620` / `620x520` fijos; en pantallas pequeñas los botones
   quedaban fuera del área visible. Nuevo `common.fit_window()` que ajusta cada
   ventana al monitor. Se añade `abuelo-display` (autostart) que reencaja la
   resolución con `xrandr --auto` al iniciar sesión.
6. **Enlaces del sistema**. `os-release`, `issue` y `lsb-release` ya indican
   1.0.3 y apuntan a `https://github.com/ericsnet/Abuel-os`. El mensaje de
   bienvenida de consola (`/etc/motd`) también dice 1.0.3.
7. **Carpeta `~/.local` del usuario mayor**. La preparación de la sesión live la
   creaba como `root:root`, así que el usuario no podía guardar ajustes
   (aplicaciones, idioma, preferencias de Chrome). Ahora se crea y se devuelve
   al usuario.

### Artefacto

Ver [RELEASE.md](RELEASE.md).
