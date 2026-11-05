# Fallos conocidos - abuel-os 1.0.4

Fallos presentes en esta versión según la auditoría QA (2026-11-05).
Bloque de auditoría: 19. Otros fallos y limitaciones previos: 20. Total: 39.

## Fallos de la auditoría QA

### ABL-001 — La configuracion del responsable no es legible por el usuario mayor: tema, idioma y apps nunca se aplican

- **Severidad:** alta
- **Componente:** permisos / abuelo-apply-settings / help
- **Descripción:** El panel guarda tema, idioma y lista de aplicaciones en /etc/abuelo-os/config.json con permisos 0640 root:root dentro de un directorio 0750 root:root. abuelo-apply-settings se ejecuta como la persona mayor desde ~/.config/autostart, no puede atravesar /etc/abuelo-os ni leer el fichero, y su funcion load() devuelve {} por el except OSError. Por eso siempre se aplican los valores por defecto: tema claro, espanol y todas las aplicaciones permitidas. El arreglo del idioma tampoco funciona porque el idioma leido es siempre el valor por defecto, y apply_apps puede fallar si ~/.local no es escribible.
- **Impacto:** Las opciones del panel son cosmeticas. El arreglo del idioma tampoco funciona porque el idioma leido es siempre el valor por defecto. Ademas, apply_apps puede fallar si ~/.local no es escribible.
- **Evidencia:**
  - `config/hooks/normal/100-abuelo-setup.chroot:4  -> install -d -m 0750 /var/log/abuelo-os /etc/abuelo-os`
  - `config/hooks/normal/100-abuelo-setup.chroot:7  -> chmod 0640 /etc/abuelo-os/config.json`
  - `abuelo-apply-settings (autostart del usuario) abre /etc/abuelo-os/config.json y captura OSError -> {}`
  - `common.save_config() crea/actualiza el fichero como root con 0640`
- **Propuesta:** Hacer legible el fichero por el usuario mayor (p. ej. 0644 root:root, o grupo 'abuelos' 0640 y usuario en el grupo) o exponer una copia en ~/.config/abuel-os/settings.json gestionada por root. Verificar con 'sudo -u abuelo cat /etc/abuelo-os/config.json'.

### ABL-002 — help.py tampoco puede leer el nombre del responsable desde config.json

- **Severidad:** baja
- **Componente:** help.py / permisos
- **Descripción:** La pantalla de Ayuda intenta mostrar el nombre del responsable, pero el usuario mayor no puede abrir el fichero; el except (OSError, ValueError) devuelve el texto generico 'la persona responsable del equipo'.
- **Impacto:** Perdida de personalizacion; no rompe la aplicacion.
- **Evidencia:**
  - `help.py abre CONFIG_FILE=/etc/abuelo-os/config.json como usuario`
  - `100-abuelo-setup.chroot:4/7 deja /etc/abuelo-os en 0750 y config.json en 0640 root:root`
- **Propuesta:** Mismo arreglo de permisos que ABL-001 o guardar solo el nombre visible en un fichero legible.

### ABL-003 — Travesia de rutas en Archivos > Nueva carpeta ('../' o ruta absoluta)

- **Severidad:** media
- **Componente:** files.py on_new_folder
- **Descripción:** El dialogo 'Nueva carpeta' no valida el nombre introducido. os.path.join descarta self.current si el nombre es absoluto, y los '..' permiten salir de HOME. Se puede crear cualquier directorio donde el usuario tenga permiso, rompiendo el confinamiento que anuncia Archivos.
- **Impacto:** Escritura fuera del area permitida por el usuario mayor (p. ej. /tmp, carpetas ajenas accesibles). No es escalada a root por si mismo, pero rompe el modelo de aislamiento.
- **Evidencia:**
  - `files.py: os.makedirs(os.path.join(self.current, name), exist_ok=False)`
  - `Prueba unitaria: name='../../../fuera-del-home' crea una carpeta fuera de HOME (escaped_home=true)`
- **Propuesta:** Rechazar nombres con '/', '\\' o '..', resolver con os.path.realpath y comprobar que el destino sigue estando dentro de self.current.

### ABL-004 — Tar-slip al restaurar copias de seguridad (extractall sin filtro)

- **Severidad:** alta
- **Componente:** common.backup_restore / panel.restore
- **Descripción:** Cualquier archivo .tar.gz elegido desde el panel (root) se extrae sin validar rutas ni enlaces. En Python 3.11 (Debian 12) extractall no aplica el filtro 'data'; un archivo manipulado escribe fuera de stage. Como el panel corre como root, el impacto es escritura arbitraria como root.
- **Impacto:** Escalada local a root si el responsable restaura un archivo malicioso (o si un USB preparado se presenta como copia). Tambien permite sobrescribir ficheros del sistema.
- **Evidencia:**
  - `common.py: tar.extractall(stage) sin filter ni comprobacion de miembros`
  - `Prueba unitaria: un tar con '../escape.txt' escribe fuera de stage (escaped_path fuera del directorio temporal)`
  - `El panel ejecuta backup_restore como root`
- **Propuesta:** Usar tar.extractall(stage, filter='data') en Python >= 3.12 o validar cada TarInfo (sin rutas absolutas, sin '..', sin enlaces fuera de stage) antes de extraer; ejecutar la extraccion como el usuario destino y no como root.

### ABL-005 — La clave de auditoria es identica en todas las instalaciones y no se regenera

- **Severidad:** media
- **Componente:** audit.key / hook de construccion
- **Descripción:** La clave AES-GCM que cifra los campos sensibles de la auditoria se genera en el chroot de construccion y viaja dentro del squashfs. Todas las instalaciones de la misma ISO comparten la misma clave, y nunca se regenera en el primer arranque como afirma el comentario.
- **Impacto:** Quien tenga la ISO (publica) y acceso al audit.db de un equipo puede descifrar el historial de navegacion y rutas. La confidencialidad de la auditoria queda anulada entre instalaciones.
- **Evidencia:**
  - `100-abuelo-setup.chroot genera /etc/abuelo-os/audit.key una sola vez durante la construccion de la imagen`
  - `audit.py dice 'en un sistema instalado se regenera en el primer arranque'`
  - `No existe ningun script/servicio que regenere audit.key (busqueda en todo el arbol)`
- **Propuesta:** Generar la clave en el primer arranque del sistema instalado (servicio oneshot root, solamente si no existe) y en live por sesion; documentar la rotacion. No incluirla en la ISO.

### ABL-006 — verify() marca la auditoria como manipulada si falta la clave o python3-cryptography

- **Severidad:** media
- **Componente:** audit.py _encrypt/_decrypt/verify
- **Descripción:** El encadenado se calcula con el detalle en claro, pero la verificacion lo recalcula con el valor descifrado. Si el cifrado no esta disponible (paquete ausente o clave borrada), el valor 'sha256:...' no coincide con el original y verify() reporta una cadena rota aunque no haya manipulacion.
- **Impacto:** Falso positivo de manipulacion; el responsable puede creer que la auditoria fue alterada. Ademas el detalle sensible se guarda solo como hash irreversible.
- **Evidencia:**
  - `_encrypt sin clave/criptografia devuelve 'sha256:<hash>'`
  - `_decrypt deja pasar ese valor tal cual (no empieza por 'v1:')`
  - `verify() recalcula el hash con el valor descifrado, no con el original`
  - `Prueba unitaria: verify_ok=false en el evento sensible id=2 con detail 'sha256:...'`
- **Propuesta:** Guardar de forma explicita el modo (v1/sha256) y verificar el hash usando el mismo valor que se persistio; o rechazar la escritura de eventos sensibles si no hay cifrado disponible.

### ABL-007 — El socket de auditoria es 0666: cualquier usuario puede inyectar eventos y llenar la base

- **Severidad:** media
- **Componente:** audit-daemon.py
- **Descripción:** El demonio escucha en un socket UNIX con permisos 0666. Cualquier proceso local puede enviar eventos arbitrarios (incluido sensitive=true), falsificar la actividad mostrada al responsable y llenar /var/lib/abuelo-os/audit.db sin limite.
- **Impacto:** La auditoria no es confiable como evidencia: se pueden insertar eventos falsos o inundar el disco. La cadena de hashes no detecta inserciones legitimas.
- **Evidencia:**
  - `audit-daemon.py: os.chmod(SOCKET_PATH, S_IRUSR|S_IWUSR|S_IRGRP|S_IWGRP|S_IROTH|S_IWOTH)`
  - `Handler acepta cualquier JSON, sin limite de tamano ni de frecuencia`
  - `El usuario se toma de SO_PEERCRED, pero event/detail/sensitive son libres`
- **Propuesta:** Socket 0660 root:adm (o grupo especifico), validar event/detail, limitar rate y tamano, y separar el flag sensitive para que solo lo fije root.

### ABL-008 — Lanzadores privilegiados eligen la primera /home/*/.Xauthority, no la del usuario que invoca pkexec

- **Severidad:** media
- **Componente:** panel-launcher / setup-launcher / install-launch
- **Descripción:** Con dos cuentas (abuelo y responsable) hay dos ~/.Xauthority. El bucle coge la primera por orden alfabetico (abuelo) aunque el responsable haya lanzado el panel desde su propia sesion. Si la cookie no corresponde al servidor X activo, GTK no puede conectar y el panel/asistente/instalador no abren o muestran un error generico.
- **Impacto:** El responsable puede quedarse sin panel o sin instalador; el diagnostico es dificil porque el error de X se pierde.
- **Evidencia:**
  - `for candidate in /home/*/.Xauthority /run/user/*/gdm/Xauthority /root/.Xauthority`
  - `Los tres lanzadores usan el mismo bloque`
  - `PKEXEC_UID esta disponible pero no se usa para localizar el home`
- **Propuesta:** Resolver el home con pwd.getpwuid(int(os.environ['PKEXEC_UID'])) y usar XAUTHORITY=$home/.Xauthority; como respaldo, usar la cookie del servidor X activo (/run/lightdm/root/:0).

### ABL-009 — Carpetas personales duplicadas por usar nombres fijos en vez de xdg-user-dir

- **Severidad:** baja
- **Componente:** files.py SHORTCUTS/ensure_dirs
- **Descripción:** Archivos muestra y crea nombres sin tilde ademas de los que crea xdg-user-dirs, de modo que el usuario ve Desktop/Escritorio, Imagenes/Imágenes, etc.
- **Impacto:** Confusion y carpetas vacias; el usuario puede guardar archivos en la carpeta equivocada.
- **Evidencia:**
  - `SHORTCUTS fija 'Imagenes', 'Musica', 'Videos', 'Escritorio'`
  - `ensure_dirs crea esas carpetas aunque el locale use 'Imágenes', 'Música', 'Vídeos'`
- **Propuesta:** Resolver cada acceso con 'xdg-user-dir DESKTOP|DOCUMENTS|DOWNLOAD|PICTURES|MUSIC|VIDEOS' y no crear duplicados.

### ABL-010 — La cuenta 'responsable' del modo live tiene contrasena conocida ('live') y sudo

- **Severidad:** media
- **Componente:** live-setup
- **Descripción:** En live se crea una cuenta administrativa 'responsable' con la contrasena publica 'live'. Aunque el panel pida esa contrasena, cualquiera que conozca el modo live puede abrir una consola virtual (Ctrl+Alt+F2), entrar como responsable y usar sudo, anulando la separacion de cuentas.
- **Impacto:** La separacion mayor/responsable no es real en live; cualquier persona con acceso fisico puede administrar el equipo.
- **Evidencia:**
  - `live-setup: LIVE_PASSWORD=live; printf '%s:%s\n' responsable live | chpasswd`
  - `usermod --append --groups sudo,adm,responsables responsable`
  - `La misma contrasena se aplica al usuario mayor`
- **Propuesta:** No crear 'responsable' con sudo en live, o generar una contrasena aleatoria mostrada solo al responsable; documentar que el live no es un entorno seguro.

### ABL-011 — Reiniciar la sesion del mayor desde el panel mata el servidor X del propio panel

- **Severidad:** media
- **Componente:** panel.py restart_elder_session
- **Descripción:** loginctl terminate-user termina toda la sesion del usuario mayor, incluido su servidor X/Wayland. El panel (proceso root en ese mismo display) pierde la conexion y no puede mostrar la confirmacion; puede quedar como proceso huerfano.
- **Impacto:** Cierre brusco del panel y mensajes de error; el responsable no ve confirmacion. En el peor caso, el autologin reabre la sesion antes de que el panel termine.
- **Evidencia:**
  - `restart_elder_session(): subprocess.run(['/usr/bin/loginctl','terminate-user', user])`
  - `El panel se abre desde la sesion grafica (normalmente la del propio usuario mayor) y corre en el mismo DISPLAY`
  - `Despues intenta mostrar common.info(...), que ya no tiene servidor X`
- **Propuesta:** Reiniciar la sesion con un servicio/helper que no dependa del display (systemd-run --scope), o cerrar el panel antes de terminar la sesion y notificar por otro canal.

### ABL-012 — abuelo-sandbox rompe rutas con espacios (USB con etiqueta con espacios)

- **Severidad:** baja
- **Componente:** abuelo-sandbox
- **Descripción:** La lista de puntos de montaje se divide por espacios y se acumula en una cadena sin comillas; un USB montado en '/media/abuelo/Mi USB' se pasa como dos argumentos y bwrap falla o monta rutas incorrectas.
- **Impacto:** Chrome/Evolution no arrancan con USB de etiqueta con espacios; error opaco para el usuario.
- **Evidencia:**
  - `for target in $(findmnt -rno TARGET | grep -E '^/(media|run/media)/')`
  - `opts="$opts --ro-bind $target $target" y exec bwrap $opts (sin comillas)`
- **Propuesta:** Construir un array de argumentos en bash y pasarlo con "${args[@]}"; usar findmnt -0 o IFS=$'\n'.

### ABL-013 — El confinamiento de Archivos acepta cualquier ruta bajo /media y /run/media

- **Severidad:** baja
- **Componente:** files.py is_allowed
- **Descripción:** Ademas de los puntos USB realmente montados, se permite navegar por cualquier directorio bajo /media o /run/media. Si otro paquete deja ahi un montaje o un directorio con datos, Archivos lo muestra como si fuera un USB.
- **Impacto:** Fuga de informacion potencial (p. ej. /media/cdrom con datos) y ampliacion innecesaria del area visible.
- **Evidencia:**
  - `for root in USB_ROOTS: if real.startswith(root + os.sep): return True`
  - `No se comprueba os.path.ismount`
- **Propuesta:** Permitir solo los paths devueltos por usb_places() (comprobando ismount) y no por prefijo.

### ABL-014 — help.py capitaliza el nombre y destroza mayusculas (p. ej. 'MARÍA' -> 'María') y nombres compuestos

- **Severidad:** muy baja
- **Componente:** help.py
- **Descripción:** str.capitalize() pone en minusculas el resto del nombre.
- **Impacto:** Cosmetico.
- **Evidencia:**
  - `self.status.set_text(f"... {responsable().capitalize()} ...")`
- **Propuesta:** No transformar el nombre o usar solo la primera letra sin tocar el resto.

### ABL-015 — Bytecode .pyc de CPython 3.15 versionado y empaquetado en la imagen

- **Severidad:** baja
- **Componente:** repositorio / imagen
- **Descripción:** Se han commiteado caches de bytecode generados en Windows con Python 3.15. En el destino no se usan (la etiqueta cpython-315 no coincide con 3.11), pero ocupan espacio y pueden confundir auditorias.
- **Impacto:** Higiene de repositorio y de imagen; sin impacto funcional directo.
- **Evidencia:**
  - `config/includes.chroot/usr/local/lib/abuelo-os/__pycache__/*.cpython-315.pyc`
  - `tools/__pycache__/*.cpython-315.pyc`
  - `Debian 12 usa Python 3.11: los .pyc no se cargan pero se instalan en la ISO`
- **Propuesta:** Anadir __pycache__/ y *.pyc al .gitignore, borrarlos del indice y no copiarlos al chroot.

### ABL-016 — El asistente crea la cuenta del mayor con una contrasena aleatoria que nunca muestra si se deja en blanco

- **Severidad:** baja
- **Componente:** setup.py
- **Descripción:** Si el responsable no escribe contrasena para la persona mayor, se genera una segura pero no se comunica; solo queda el codigo de recuperacion.
- **Impacto:** El usuario mayor no conoce su contrasena; si el autologin falla no puede entrar sin recuperacion.
- **Evidencia:**
  - `common.add_user(mayor_user, mayor_name, password or self.random_password(), admin=False)`
  - `No se muestra random_password() en ningun dialogo`
- **Propuesta:** Exigir contrasena o mostrar la generada antes de crearla; guardar el codigo de recuperacion de forma visible.

### ABL-017 — Restaurar la misma copia dos veces mueve archivos dentro de la carpeta .antes-de-restaurar existente

- **Severidad:** baja
- **Componente:** common.backup_restore
- **Descripción:** La segunda restauracion encuentra el directorio .antes-de-restaurar y mete el archivo actual dentro, dejando una jerarquia confusa y dificil de deshacer.
- **Impacto:** Perdida de trazabilidad de la copia anterior.
- **Evidencia:**
  - `if os.path.exists(target): shutil.move(target, target + '.antes-de-restaurar')`
  - `shutil.move hacia un directorio existente mueve DENTRO en vez de reemplazar`
- **Propuesta:** Usar un nombre con marca de tiempo o eliminar/renombrar el backup previo antes de mover.

### ABL-034 — En un sistema instalado, el responsable (sudo) puede sufrir doble autenticacion y el primer autologin puede ser el suyo

- **Severidad:** media
- **Componente:** polkit + calamares users.conf
- **Descripción:** El usuario creado por Calamares es administrador por sudo, pero la regla polkit solo devuelve YES para el grupo responsables o para los usuarios abuelo/responsable; pkexec cae en la politica por defecto y pide contrasena (si hay agente). Ademas autologinGroup nopasswdlogin hace que, si Calamares configura autologin, el primer arranque entre en la cuenta administrativa hasta completar el asistente.
- **Impacto:** Primera experiencia confusa (dos contrasenas) y arranque inicial en la cuenta administrativa hasta completar el asistente.
- **Evidencia:**
  - `49-abuelo-panel.rules solo devuelve YES para grupo responsables o usuarios abuelo/responsable`
  - `Calamares users.conf: defaultGroups sin 'responsables'; sudoersGroup sudo; autologinGroup nopasswdlogin`
  - `En el primer arranque el asistente se lanza con pkexec: pide contrasena (default policy) y despues la contrasena del responsable otra vez`
- **Propuesta:** Incluir 'sudo' en la regla polkit (o anadir el usuario creado al grupo responsables) y no configurar autologin para el administrador; dejar autologin al mayor tras el asistente.

### ABL-035 — El servicio de auditoria se puede inundar sin limite (denegacion de servicio local)

- **Severidad:** media
- **Componente:** audit-daemon.py
- **Descripción:** Cualquier usuario local puede enviar eventos en bucle y llenar /var/lib/abuelo-os/audit.db o consumir CPU del demonio.
- **Impacto:** La auditoria deja de ser fiable y el disco puede llenarse.
- **Evidencia:**
  - `Handler.handle() lee lineas sin limite de tamano ni de frecuencia`
  - `detail se trunca a 4000 pero no hay cuota por usuario`
  - `Un socket 0666 permite abrir muchas conexiones`
- **Propuesta:** Limitar conexiones/eventos por uid y minuto, limitar el tamano de la base y alertar al superar umbrales.

## Otros fallos y limitaciones ya documentados en esta versión

### PREV-C2 — archivo_modificado nunca se registra (previo)

- **Severidad:** alta
- **Componente:** audit-daemon.py
- **Descripción:** El daemon cierra el evento en la línea CWD, que auditd emite antes de los PATH; cuando llegan las rutas el estado ya se borró.
- **Impacto:** La auditoría no registra los archivos modificados.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (C2)
  - Consulta de archivo_modificado sin filas; orden SYSCALL -> CWD -> PATH -> PROCTITLE
- **Propuesta:** Finalizar el evento en PROCTITLE y conservar el estado hasta recibir los PATH.
- **Origen:** previo

### PREV-A3 — La columna «Quién» atribuye mal los eventos (previo)

- **Severidad:** alta
- **Componente:** panel / auditoría
- **Descripción:** El panel corre como root y sus eventos se registran como root; los execve de auditd se registran siempre como sistema (no se usa auid/uid).
- **Impacto:** La actividad mostrada al responsable atribuye los eventos a usuarios incorrectos.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (A3)
  - `artifacts/qa-1.0.4/shots/panel-page4.png`
  - Eventos `aplicacion_ejecutada|sistema`
- **Propuesta:** Usar auid/uid y la identidad real en los eventos del panel.
- **Origen:** previo

### PREV-A4 — Falta el locale en_US.UTF-8 (previo)

- **Severidad:** alta
- **Componente:** locales / sesión
- **Descripción:** Solo se genera es_ES.utf8; elegir English deja LANG=en_US.UTF-8 inválido y avisos Cannot set LC_*.
- **Impacto:** El idioma inglés no funciona correctamente y la sesión muestra avisos.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (A4)
  - `localedef --list-archive` solo muestra es_ES.utf8
- **Propuesta:** Generar en_US.UTF-8 y es_ES.UTF-8 y fijar LANGUAGE.
- **Origen:** previo

### PREV-A5 — El reloj muestra solo la fecha (previo)

- **Severidad:** alta
- **Componente:** panel / reloj
- **Descripción:** digital-layout=2 es «solo fecha»; el CHANGELOG promete hora y fecha.
- **Impacto:** El reloj no muestra la hora.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (A5)
  - `artifacts/qa-1.0.4/shots/clock-crop.png`
  - Probados los valores 0 a 3: 2 es solo fecha
- **Propuesta:** Usar digital-layout=1 (hora arriba, fecha abajo).
- **Origen:** previo

### PREV-M1 — «Debian Live user» en el diálogo de apagado y en Cuentas (previo)

- **Severidad:** media
- **Componente:** live-setup / cuentas
- **Descripción:** live-setup no actualiza el GECOS del usuario creado por live-config.
- **Impacto:** La interfaz muestra un nombre genérico en lugar de la persona.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (M1)
  - `artifacts/qa-1.0.4/shots/acpi.png`
  - `getent passwd abuelo` muestra Debian Live user
- **Propuesta:** Actualizar el GECOS en live-setup.
- **Origen:** previo

### PREV-M2 — El informe de diagnóstico se escribe en /root/Avisos (previo)

- **Severidad:** media
- **Componente:** panel / abuelo-report
- **Descripción:** El panel es root y escribe el informe en /root/Avisos, no en la carpeta del responsable.
- **Impacto:** El responsable no encuentra el informe en su carpeta.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (M2)
  - `abuelo-report` como root escribe en `/root/Avisos/informe-...`
- **Propuesta:** Escribir en el home del usuario que invoca la acción.
- **Origen:** previo

### PREV-M3 — Los iconos de Archivos aparecen como imagen no encontrada (previo)

- **Severidad:** media
- **Componente:** files.py
- **Descripción:** El Gtk.ListStore declara la última columna como bool pero guarda el nombre del icono.
- **Impacto:** Todos los iconos de Archivos se muestran rotos.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (M3)
  - `artifacts/qa-1.0.4/shots/files-app.png`
- **Propuesta:** Declarar la columna como str.
- **Origen:** previo

### PREV-M7 — Se puede borrar al responsable configurado (previo)

- **Severidad:** media
- **Componente:** panel.delete_user
- **Descripción:** delete_user solo protege root y al mayor; no protege la cuenta configurada ni al último administrador.
- **Impacto:** El panel puede dejar el equipo sin administrador.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (M7)
  - Revisión de código de `delete_user`
- **Propuesta:** Proteger la cuenta configurada y el último administrador.
- **Origen:** previo

### PREV-M8 — Los .desktop de autostart se instalan 0755 (previo)

- **Severidad:** media
- **Componente:** autostart / systemd
- **Descripción:** Los .desktop de autostart se instalan ejecutables y systemd avisa en cada arranque.
- **Impacto:** Avisos repetidos en el journal.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (M8)
  - `journalctl`: avisos de systemd-xdg-autostart-generator
- **Propuesta:** Instalarlos 0644.
- **Origen:** previo

### PREV-M9 — apps_permitidas solo oculta entradas de menú (previo)

- **Severidad:** media
- **Componente:** apply_apps / lanzadores
- **Descripción:** La restricción solo oculta entradas de menú; los lanzadores del escritorio y los binarios siguen abriendo la aplicación.
- **Impacto:** La restricción de aplicaciones no es efectiva aunque se arregle el acceso a la configuración.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (M9)
  - Revisión de código de `apply_apps` y `abuelo-browser`
- **Propuesta:** Comprobar la lista en los lanzadores y ocultar los iconos de escritorio.
- **Origen:** previo

### PREV-B1 — La actividad se corta en 800 eventos sin indicarlo (previo)

- **Severidad:** baja
- **Componente:** panel / actividad
- **Descripción:** El panel corta la lista en 800 eventos; el contador sigue diciendo 800 aunque haya más.
- **Impacto:** El responsable ve una lista incompleta sin saberlo.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (B1)
  - `artifacts/qa-1.0.4/shots/panel-page4.png`; base con 1520 eventos
- **Propuesta:** Mostrar el total real y paginar o avisar del corte.
- **Origen:** previo

### PREV-B2 — «Exportar» exporta todo, no lo filtrado (previo)

- **Severidad:** baja
- **Componente:** panel.export_activity
- **Descripción:** Exporta self.rows (los 800 sin filtro), no lo visible tras buscar o filtrar.
- **Impacto:** El archivo exportado no coincide con lo que ve el responsable.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (B2)
  - Revisión de código de `export_activity`
- **Propuesta:** Exportar las filas visibles tras el filtro.
- **Origen:** previo

### PREV-B3 — Primer arranque instalado sin autologin a la persona mayor (previo)

- **Severidad:** baja
- **Componente:** Calamares / autologin / setup
- **Descripción:** abuelo-setup en el primer arranque instalado no puede autologin a abuelo porque la cuenta aún no existe; aparece el greeter y hay que entrar como administrador.
- **Impacto:** Primer arranque confuso.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (B3)
  - Flujo Calamares + `50-abuelo-autologin.conf`
- **Propuesta:** Configurar el autologin del mayor al terminar el asistente.
- **Origen:** previo

### PREV-B4 — Tarjetas del panel apretadas en pantallas pequeñas (previo)

- **Severidad:** baja
- **Componente:** panel.card
- **Descripción:** panel.card() fija 250 px y max_children_per_line(3); en 800x600 o 1024x600 el contenido queda apretado y hay que hacer scroll.
- **Impacto:** El resumen es incómodo en pantallas pequeñas.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (B4)
  - Revisión de código y capturas en 1280x800
- **Propuesta:** Ajustar tarjetas y columnas al tamaño de pantalla.
- **Origen:** previo

### PREV-B5 — La lista de USB puede incluir el medio live (previo)

- **Severidad:** baja
- **Componente:** abuelo-persist
- **Descripción:** Lista todos los USB extraíbles, incluido el medio live si findmnt no lo identifica por el mismo nodo.
- **Impacto:** El responsable puede elegir el medio de arranque para persistencia.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (B5)
  - Revisión de código de `persist` y `abuelo-persist`
- **Propuesta:** Identificar y excluir el medio live por nodo.
- **Origen:** previo

### PREV-B6 — El informe no incluye versión ni estado de unidades abuelo-* (previo)

- **Severidad:** baja
- **Componente:** abuelo-report / abuelo-session-check
- **Descripción:** El informe no incluye la versión de abuel-os ni el estado de las unidades abuelo-* de forma explícita.
- **Impacto:** El informe es menos útil para soporte.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (B6)
  - Salida del informe
- **Propuesta:** Añadir versión y estado de unidades.
- **Origen:** previo

### PREV-B7 — common.verify_password usa crypt (deprecado) (previo)

- **Severidad:** baja
- **Componente:** common.py
- **Descripción:** Usa crypt, deprecado y eliminado en Python 3.13; en bookworm (3.11) funciona.
- **Impacto:** Ata la aplicación a la versión de Python de Debian 12.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (B7)
  - Revisión de código de `common.py`
- **Propuesta:** Sustituir crypt por hashlib, passlib o la API de PAM.
- **Origen:** previo

### PREV-B8 — La actividad muestra el usuario, no el nombre completo (previo)

- **Severidad:** baja
- **Componente:** panel / actividad
- **Descripción:** Muestra `abuelo` en vez del nombre completo de la persona mayor.
- **Impacto:** Menos claro para el responsable.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (B8)
  - Capturas del panel
- **Propuesta:** Mostrar el nombre configurado.
- **Origen:** previo

### PREV-L1 — Depósito de claves de gnome-keyring no inicializado (previo)

- **Severidad:** baja
- **Componente:** Correo / gnome-keyring
- **Descripción:** Al abrir Correo, gnome-keyring pide una contraseña para crear el depósito.
- **Impacto:** Paso adicional confuso para el usuario.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (limitaciones)
- **Propuesta:** Inicializar el depósito en la sesión live o al primer uso.
- **Origen:** previo

### PREV-L2 — Cobertura de pruebas limitada (previo)

- **Severidad:** baja
- **Componente:** pruebas / hardware
- **Descripción:** No se probaron instalación completa a disco ni primer arranque instalado, persistencia LUKS en USB físico, UEFI/Secure Boot en hardware real, impresión, Bluetooth ni suspensión.
- **Impacto:** Puede haber fallos no detectados en hardware real.
- **Evidencia:**
  - `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md` (limitaciones)
- **Propuesta:** Ampliar la matriz de pruebas a hardware y arranque instalado.
- **Origen:** previo
