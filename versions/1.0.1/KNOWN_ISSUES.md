# Fallos conocidos - abuel-os 1.0.1

Fallos presentes en esta versión según la auditoría QA (2026-11-05).
Bloque de auditoría: 16. Otros fallos y limitaciones previos: 13. Total: 29.

## Fallos de la auditoría QA

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

### ABL-009 — Carpetas personales duplicadas por usar nombres fijos en vez de xdg-user-dir

- **Severidad:** baja
- **Componente:** files.py SHORTCUTS/ensure_dirs
- **Descripción:** Archivos muestra y crea nombres sin tilde ademas de los que crea xdg-user-dirs, de modo que el usuario ve Desktop/Escritorio, Imagenes/Imágenes, etc.
- **Impacto:** Confusion y carpetas vacias; el usuario puede guardar archivos en la carpeta equivocada.
- **Evidencia:**
  - `SHORTCUTS fija 'Imagenes', 'Musica', 'Videos', 'Escritorio'`
  - `ensure_dirs crea esas carpetas aunque el locale use 'Imágenes', 'Música', 'Vídeos'`
- **Propuesta:** Resolver cada acceso con 'xdg-user-dir DESKTOP|DOCUMENTS|DOWNLOAD|PICTURES|MUSIC|VIDEOS' y no crear duplicados.

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

### ABL-018 — Autologin roto (pantalla de acceso en vez de sesion)

- **Severidad:** alta
- **Componente:** lightdm / live-restrict
- **Descripción:** LightDM arranca antes de que live-config cree el usuario, o el autologin no coincide con el usuario real.
- **Impacto:** El usuario no entra solo; se queda en la pantalla de login con contrasena que no conoce.
- **Evidencia:**
  - `Registro de LightDM al arrancar: "Can't login unknown user 'user'"`
  - `El autologin no coincide con el usuario creado por live-config`
- **Propuesta:** Ordenar live-config -> cuentas -> lightdm y fijar username= en el arranque.

### ABL-019 — Posible interbloqueo de systemd: abuelo-live-restrict ejecuta 'systemctl start lightdm' estando ordenado Before=lightdm

- **Severidad:** alta
- **Componente:** abuelo-live-restrict.service
- **Descripción:** El servicio esta ordenado antes de lightdm y, dentro de el, pide arrancar lightdm de forma bloqueante. El trabajo de lightdm no puede completarse hasta que termine live-restrict, que espera a systemctl; se produce una espera de hasta el timeout de trabajo.
- **Impacto:** Arranque grafico retrasado o fallido. Se marca como riesgo alto no verificado en runtime.
- **Evidencia:**
  - `Unit: Before=lightdm.service, Wants=lightdm.service`
  - `Ultimo ExecStart: /bin/sh -c 'systemctl start lightdm.service || true'`
- **Propuesta:** No ejecutar systemctl start de una unidad ordenada despues; usar --no-block o dejar que graphical.target la arranque.

### ABL-020 — El explorador 'Copiar aqui' usa el FileChooser GTK sin restriccion

- **Severidad:** media
- **Componente:** files.py on_copy
- **Descripción:** El dialogo de seleccion permite navegar por todo el sistema de archivos y copiar desde cualquier ruta legible, contradiciendo el confinamiento anunciado.
- **Impacto:** El usuario mayor puede extraer archivos de fuera de su area (los que sus permisos permitan).
- **Evidencia:**
  - `Gtk.FileChooserDialog(... OPEN) + dialog.get_filenames()`
  - `El dialogo de seleccion permite navegar por todo el sistema de archivos y copiar desde cualquier ruta legible`
- **Propuesta:** Sustituir el dialogo por una lista propia de origenes permitidos.

### ABL-021 — Polkit daba root sin contrasena al usuario live y el panel no pedia autenticacion

- **Severidad:** alta
- **Componente:** polkit + panel.py
- **Descripción:** Cualquier proceso del usuario live podia lanzar el panel y el asistente como root sin credencial. El panel no volvia a autenticar.
- **Impacto:** El usuario mayor disponia de control administrativo completo (cuentas, limpieza, instalacion).
- **Evidencia:**
  - `49-abuelo-panel.rules: if (subject.user === 'user') return polkit.Result.YES`
  - `panel.py solo comprueba os.geteuid()==0, sin pedir contrasena`
- **Propuesta:** Anadir confirm_responsable() y restringir el programa a los usuarios autorizados.

### ABL-022 — Temporizador de diagnostico activo en la imagen

- **Severidad:** baja
- **Componente:** abuelo-diag.timer
- **Descripción:** Herramienta de depuracion que quedaba activa en produccion y escribe datos de sesion en el log y por serial.
- **Impacto:** Ruido, consumo y posible exposicion de informacion por el puerto serie.
- **Evidencia:**
  - `abuelo-diag.timer OnBootSec=35 y abuelo-diag.service volcando journal a /var/log y ttyS0`
- **Propuesta:** Eliminar las unidades de diagnostico y desactivar el timer.

### ABL-023 — Los iconos del escritorio no se abren porque Thunar no es ejecutable por el usuario mayor

- **Severidad:** alta
- **Componente:** thunar + xfdesktop
- **Descripción:** xfdesktop no ejecuta los lanzadores por si mismo: pide a Thunar que los abra. Si Thunar es 0750 root:responsables y el usuario mayor no esta en el grupo, todos los iconos fallan.
- **Impacto:** El escritorio queda inservible para el usuario (salvo el menu).
- **Evidencia:**
  - `100-abuelo-setup.chroot pone /usr/bin/thunar en chgrp responsables + chmod 0750`
  - `xfdesktop delega la apertura de .desktop en org.xfce.FileManager (Thunar)`
- **Propuesta:** Instalar Thunar como root:root 0755 y marcar los .desktop como trusted.

### ABL-024 — Icono 'Debian.' de volumen extraible en el escritorio

- **Severidad:** baja
- **Componente:** xfce4-desktop.xml
- **Descripción:** xfdesktop muestra el volumen del medio de arranque como unidad extraible.
- **Impacto:** Confusion visual.
- **Evidencia:**
  - `show-removable=true en xfce4-desktop.xml`
- **Propuesta:** Poner show-removable=false en xfce4-desktop.xml.

### ABL-025 — Ventanas de tamano fijo se salen de pantallas pequenas (800x600/640x480)

- **Severidad:** media
- **Componente:** panel/files/help/setup
- **Descripción:** En pantallas pequenas los botones quedan fuera del area visible y no se pueden pulsar.
- **Impacto:** Aplicaciones inutilizables en equipos modestos o VM con ventana reducida.
- **Evidencia:**
  - `set_default_size(900,620), (620,520), (760,520), (600,480)`
- **Propuesta:** Usar common.fit_window() en panel/files/help/setup y ajustar la pantalla con abuelo-display.

### ABL-028 — Pendiente de apagado: 'Please remove the live-medium. press ENTER'

- **Severidad:** media
- **Componente:** auto/config bootappend
- **Descripción:** live-boot pide retirar el medio y pulsar ENTER al apagar; el equipo no se apaga solo.
- **Impacto:** El usuario cree que el apagado se ha colgado.
- **Evidencia:**
  - `auto/config sin noeject/noprompt`
- **Propuesta:** Anadir 'noeject noprompt' al bootappend-live.

### ABL-032 — URLs de soporte muertas o de la cuenta antigua en os-release (abuelo.local / Pickeric)

- **Severidad:** baja
- **Componente:** os-release / branding de Calamares
- **Descripción:** os-release y lsb-release apuntan a un dominio inexistente o a la cuenta antigua.
- **Impacto:** Los botones de soporte del instalador y del sistema no llevan al repositorio actual.
- **Evidencia:**
  - `HOME_URL=https://abuelo.local`
  - `github.com/Pickeric/Abuel-os`
- **Propuesta:** Actualizar os-release y el branding al repositorio y la cuenta actuales.

## Otros fallos y limitaciones ya documentados en esta versión

### PREV-1.0.1-02 — No existe instalador a disco (previo)

- **Severidad:** alta
- **Componente:** instalador / Calamares
- **Descripción:** La ISO solo funciona en modo live desde el USB; no hay asistente que instale en el disco interno ni en uno externo.
- **Impacto:** No se puede instalar el sistema en un equipo.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-03 — No hay cifrado (LUKS) ni persistencia (previo)

- **Severidad:** alta
- **Componente:** persistencia / LUKS
- **Descripción:** cryptsetup está instalado pero nada crea volúmenes cifrados; el modo USB no guarda cuentas, contraseñas, archivos ni registros entre reinicios.
- **Impacto:** Se pierde todo lo hecho en la sesión live y no existe cifrado de disco.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-04 — El sistema de archivos no está completamente oculto (previo)

- **Severidad:** media
- **Componente:** Archivos / diálogos GTK
- **Descripción:** abuelo-files solo permite carpetas personales y USB, pero los diálogos de apertura y guardado de Chrome y otras aplicaciones GTK permiten navegar por todo el sistema, y xdg-open puede abrir rutas arbitrarias.
- **Impacto:** El aislamiento del área visible no se cumple en aplicaciones de terceros.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-05 — El aislamiento del usuario mayor es parcial (previo)

- **Severidad:** media
- **Componente:** sesión live / cuentas
- **Descripción:** Tras el arranque se retira sudo al usuario live y se bloquean herramientas de sistema, pero el usuario live no es la cuenta abuelo creada por el asistente. El kiosco limita el panel y la sesión, pero no impide cambiar el fondo con el menú contextual.
- **Impacto:** La separación entre la persona mayor y la cuenta administrativa no es completa.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-06 — La capa de errores no es global (previo)

- **Severidad:** media
- **Componente:** gestión de errores
- **Descripción:** Las aplicaciones propias muestran mensajes claros, pero los errores del sistema y de aplicaciones de terceros se muestran en crudo; no hay interceptación global ni traducción.
- **Impacto:** El usuario puede encontrarse mensajes técnicos incomprensibles.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-07 — Auditoría incompleta (previo)

- **Severidad:** media
- **Componente:** auditoría
- **Descripción:** La auditoría son ficheros de texto en /var/log/abuelo-os/audit.log, sin cifrar; no se registra el historial de navegación; la actividad del panel muestra texto sin filtrar por fecha, tipo ni usuario; la retención de un año se hace por rotación de logrotate, sin índice consultable.
- **Impacto:** La auditoría no sirve como registro completo ni confidencial.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-08 — El panel del responsable es básico (previo)

- **Severidad:** media
- **Componente:** panel
- **Descripción:** Configuración solo guarda dos nombres; Espacio solo vacía cachés y papeleras; Cuentas abre el asistente pero no permite editar ni eliminar cuentas; no hay recuperación de contraseñas ni copias de seguridad.
- **Impacto:** El responsable no puede gestionar las funciones anunciadas.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-09 — Outlook no es un cliente nativo (previo)

- **Severidad:** media
- **Componente:** Outlook
- **Descripción:** Es Outlook Web abierto como aplicación de Chrome; no existe cliente oficial de Outlook para Linux y, sin persistencia, la sesión se pierde en cada reinicio.
- **Impacto:** La experiencia de correo depende del navegador y no conserva la sesión.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-10 — La interfaz «tipo Windows» es una aproximación (previo)

- **Severidad:** media
- **Componente:** tema / escritorio
- **Descripción:** Tema GTK claro con acento azul, botones a la derecha y panel oscuro, más el marco de ventanas de Moheli renombrado; no es una réplica de Windows.
- **Impacto:** La apariencia no cumple una réplica exacta.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-11 — Rendimiento sin optimizar (previo)

- **Severidad:** baja
- **Componente:** rendimiento / squashfs
- **Descripción:** No hay ajustes de arranque, servicios, memoria ni compresión más allá de los valores por defecto de Debian y squashfs.
- **Impacto:** El rendimiento puede ser peor de lo necesario en equipos modestos.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-12 — Solo probado en VirtualBox (previo)

- **Severidad:** baja
- **Componente:** pruebas / hardware
- **Descripción:** El arranque BIOS y UEFI está verificado en la ISO y el escritorio se probó en una VM (BIOS); no se ha probado en el Pentium real ni con Wi-Fi, impresora o suspensión.
- **Impacto:** Puede haber fallos no detectados en hardware real.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-13 — La construcción depende de terceros (previo)

- **Severidad:** baja
- **Componente:** construcción / dependencias
- **Descripción:** Chrome se descarga en tiempo de compilación desde dl.google.com; si cambia la URL, la construcción falla. Requiere Debian 12 con live-build 20230502; en Ubuntu, live-build 3.0~a57 necesita los parches de tools/fix-live-build.py.
- **Impacto:** La construcción puede fallar fuera del entorno previsto.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo

### PREV-1.0.1-14 — Sistema de arranque sin firma (previo)

- **Severidad:** baja
- **Componente:** arranque / Secure Boot
- **Descripción:** La ISO no está firmada para Secure Boot.
- **Impacto:** En un equipo con Secure Boot activo hay que desactivarlo o añadir confianza manualmente.
- **Evidencia:**
  - Documentación previa de la release (sustituida por este documento)
- **Propuesta:** No consta en la documentación previa.
- **Origen:** previo
