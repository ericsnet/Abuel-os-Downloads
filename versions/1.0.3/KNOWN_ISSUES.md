# Fallos conocidos - abuel-os 1.0.3

Fallos presentes en esta versión según la auditoría QA (2026-11-05).
Bloque de auditoría: 21. Otros fallos y limitaciones previos: 3. Total: 24.

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

### ABL-028 — Pendiente de apagado: 'Please remove the live-medium. press ENTER'

- **Severidad:** media
- **Componente:** auto/config bootappend
- **Descripción:** live-boot pide retirar el medio y pulsar ENTER al apagar; el equipo no se apaga solo.
- **Impacto:** El usuario cree que el apagado se ha colgado.
- **Evidencia:**
  - `auto/config sin noeject/noprompt`
- **Propuesta:** Anadir 'noeject noprompt' al bootappend-live.

### ABL-029 — El idioma configurado no se aplicaba (solo environment.d)

- **Severidad:** media
- **Componente:** abuelo-apply-settings apply_language
- **Descripción:** El cambio de idioma se guardaba pero no afectaba a la sesion grafica.
- **Impacto:** El responsable cree cambiar el idioma y no cambia.
- **Evidencia:**
  - `Solo escribe ~/.config/environment.d/50-abuelo-lang.conf`
  - `environment.d solo lo lee systemd --user, no el arranque de Xsession`
- **Propuesta:** Anadir ~/.xsessionrc ademas de environment.d y comprobar que el idioma guardado se aplica.

### ABL-033 — El instalador muestra una version distinta de la release y usa URLs antiguas

- **Severidad:** baja
- **Componente:** branding.desc
- **Descripción:** El instalador muestra en Calamares una version anterior a la de la release. El branding.desc tambien conserva URLs antiguas.
- **Impacto:** Confusion en soporte y en la pantalla de instalacion.
- **Evidencia:**
  - `branding.desc con una version incorrecta y productUrl Pickeric`
- **Propuesta:** Actualizar branding.desc con la version y las URLs correctas.

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

### PREV-1.0.3-2 — Barra del panel demasiado pequeña (previo)

- **Severidad:** baja
- **Componente:** xfce4-panel
- **Descripción:** El panel se configura a 48 px y la bandeja a 22 px; los iconos y el reloj quedan justos.
- **Impacto:** La barra es incómoda de usar.
- **Evidencia:**
  - `config/includes.chroot/etc/skel/.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-panel.xml` (size=48, size-max=22)
- **Propuesta:** Aumentar el tamaño del panel y de la bandeja.
- **Origen:** previo

### PREV-1.0.3-3 — El reloj no muestra la fecha (previo)

- **Severidad:** baja
- **Componente:** reloj / xfce4-panel
- **Descripción:** digital-layout=3 muestra solo la hora.
- **Impacto:** El usuario no ve la fecha en el panel.
- **Evidencia:**
  - `config/includes.chroot/etc/skel/.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-panel.xml` (digital-layout=3, digital-time-format=%H:%M)
- **Propuesta:** Usar una disposición que muestre hora y fecha.
- **Origen:** previo

### PREV-1.0.3-4 — Cobertura de prueba del instalador incompleta (previo)

- **Severidad:** baja
- **Componente:** instalador / Calamares
- **Descripción:** La comprobación de la ISO solo confirmó que Calamares y la marca estaban presentes; la apertura de la ventana no se probó en esta versión.
- **Impacto:** Un fallo de apertura del instalador podría pasar desapercibido.
- **Evidencia:**
  - `config/includes.chroot/etc/calamares/branding/abuel-os/branding.desc`
  - Documentación previa de la release
- **Propuesta:** Probar la apertura completa de Calamares desde la ISO.
- **Origen:** previo
