# Fallos y limitaciones conocidas — 1.0.0

Documento honesto: esto es lo que **no** funciona o está incompleto en la versión
1.0.0. No es una lista de deseos, son defectos reales comprobados o carencias de
diseño que aún no están implementadas.

## Bloqueantes

### 1. La pantalla de inicio de sesión aparece (autologin roto) — ABIERTO

**Síntoma:** al arrancar se muestra LightDM pidiendo usuario y contraseña en lugar de
entrar directamente al escritorio.

**Solución provisional:** usuario `user`, contraseña `live`.

**Causa conocida:** LightDM arranca antes de que `live-config` cree el usuario. En el
registro de LightDM aparece:

```
WARNING: Error getting user list from org.freedesktop.Accounts
DEBUG: Seat seat0: Can't login unknown user 'user'
```

**Intentos hechos:** configurar `autologin-user`, grupo `nopasswdlogin`, instalar
`accountsservice`, fijar la contraseña en el arranque y arrancar LightDM desde un
servicio propio. El último intento (arrancar LightDM después de preparar usuario y
servicio de cuentas) **no llegó a validarse**.

**Arreglo previsto:** arrancar el servidor gráfico sin gestor de sesión, o garantizar
el orden `live-config → cuentas → LightDM` con prueba en hardware real.

### 2. No existe instalador a disco

La ISO solo funciona en modo live desde el USB. No instala en el disco interno ni en
uno externo. Falta el asistente de instalación.

### 3. No hay cifrado (LUKS) ni persistencia

- Los paquetes `cryptsetup` están instalados, pero nada crea volúmenes cifrados.
- El modo USB **no guarda nada**: cuentas creadas, contraseñas de Chrome, archivos y
  registros se pierden al reiniciar.
- No existen los dos modos pedidos (portátil persistente / instalado).

### 4. El sistema de archivos no está completamente oculto

- `abuelo-files` solo permite navegar por las carpetas personales y los USB.
- **Pero** los diálogos de apertura/guardado de Chrome y otras aplicaciones GTK
  permiten navegar por todo el sistema, y `xdg-open` puede abrir rutas arbitrarias.
- Falta confinamiento real (AppArmor/bubblewrap) o un escritorio sin diálogos GTK
  del sistema.

## Importantes

### 5. El aislamiento del usuario mayor es parcial

- Tras el arranque se retira `sudo` al usuario live y se bloquean las herramientas de
  sistema (permisos `0750` para el grupo `responsables`).
- Aun así, el usuario live **no es la cuenta `abuelo`** creada por el asistente: esa
  cuenta existe pero no se usa en modo live.
- El kiosco de XFCE limita el panel y la sesión, pero no impide cambiar el fondo con
  el menú contextual del escritorio (el cambio no persiste al no haber persistencia).

### 6. La capa de errores no es global

- Nuestras aplicaciones (panel, explorador, ayuda) muestran mensajes claros y ofrecen
  avisar al responsable.
- Los errores del sistema y de aplicaciones de terceros se muestran **en crudo**.
  No hay interceptación global ni traducción de errores.

### 7. Auditoría incompleta

- No está cifrada: son ficheros de texto en `/var/log/abuelo-os/audit.log`.
- No se registra el historial de navegación.
- La «Actividad» del panel muestra texto sin filtrar por fecha, tipo ni usuario.
- La retención de un año se hace por rotación de `logrotate`, sin índice consultable.

### 8. El panel del responsable es básico

- «Configuración» solo guarda dos nombres; no hay tema, idioma ni apps permitidas.
- «Espacio» solo vacía cachés y papeleras; no detecta archivos grandes ni duplicados.
- «Cuentas» abre el asistente, pero no permite editar ni eliminar cuentas.
- No hay recuperación de contraseñas ni copias de seguridad.

### 9. Outlook no es un cliente nativo

Es Outlook Web abierto como aplicación de Chrome. No existe cliente oficial de
Outlook para Linux. Sin persistencia, la sesión se pierde en cada reinicio.

### 10. La interfaz «tipo Windows» es una aproximación

Tema GTK claro con acento azul, botones a la derecha y panel oscuro, más el marco de
ventanas de Moheli renombrado. No es una réplica de Windows.

## Menores

### 11. Rendimiento sin optimizar

No hay ajustes de arranque, servicios, memoria ni compresión más allá de los valores
por defecto de Debian y squashfs.

### 12. Solo probado en VirtualBox

El arranque BIOS y UEFI está verificado en la ISO, y el escritorio se probó en una VM
(BIOS). **No se ha probado en el Pentium real ni con Wi-Fi, impresora o suspensión.**

### 13. La construcción depende de terceros

- Chrome se descarga en tiempo de compilación desde `dl.google.com`; si cambia la URL,
  la construcción falla.
- Requiere Debian 12 con `live-build 20230502`. En Ubuntu, `live-build 3.0~a57`
  necesita los parches de `tools/fix-live-build.py`.

### 14. Sistema de arranque sin firma

La ISO no está firmada para Secure Boot. En un equipo con Secure Boot activo hay que
desactivarlo o añadir confianza manualmente.

### 15. Registro de diagnóstico activo

La imagen incluye `abuelo-diag.timer`, que vuelca el journal a
`/var/log/abuelo-diag.txt` a los 35 segundos del arranque. Es instrumentación de
depuración y debería retirarse en la próxima versión.

## Cómo ayudar

Los fallos anteriores están abiertos. Cualquier informe debe incluir el modelo de
equipo, si arranca en BIOS o UEFI, y el contenido de `/var/log/abuelo-diag.txt`.
