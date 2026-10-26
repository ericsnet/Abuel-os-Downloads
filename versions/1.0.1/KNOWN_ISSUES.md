# Fallos y limitaciones conocidas — abuel-os 1.0.1

Lista honesta de lo que **no** funciona o está incompleto en esta versión.
Es la misma base que la 1.0.0: el cambio de nombre no arregla ninguno de estos fallos.

## Estado de los fallos de la 1.0.0

| # | Fallo | Estado en 1.0.1 |
|---|---|---|
| 1 | La pantalla de inicio de sesión aparece (autologin roto) | **Abierto** |
| 2 | No existe instalador a disco | Abierto |
| 3 | Sin cifrado LUKS ni persistencia USB | Abierto |
| 4 | El sistema de archivos no está completamente oculto | Abierto |
| 5 | Aislamiento del usuario mayor parcial | Abierto |
| 6 | La capa de errores no es global | Abierto |
| 7 | Auditoría incompleta (sin cifrar, sin historial) | Abierto |
| 8 | Panel del responsable básico | Abierto |
| 9 | Outlook no es cliente nativo (solo web) | Abierto |
| 10 | Interfaz «tipo Windows» aproximada | Abierto |
| 11 | Rendimiento sin optimizar | Abierto |
| 12 | Solo probado en VirtualBox | Abierto |
| 13 | Construcción dependiente de terceros (dl.google.com) | Abierto |
| 14 | ISO sin firma para Secure Boot | Abierto |
| 15 | Temporizador de diagnóstico activo en la imagen | Abierto |

## Bloqueantes

### 1. Pantalla de inicio de sesión (autologin roto)

**Síntoma:** al arrancar aparece LightDM pidiendo usuario y contraseña.

**Solución provisional:** usuario `user`, contraseña `live`.

**Causa conocida:** LightDM arranca antes de que `live-config` cree el usuario y
responde `Can't login unknown user 'user'`. Se intentaron `autologin-user`, grupo
`nopasswdlogin`, `accountsservice`, fijar la contraseña y arrancar LightDM desde un
servicio propio; el último intento no quedó validado.

**Arreglo previsto:** arrancar la sesión gráfica sin gestor de sesión, o garantizar
el orden `live-config → cuentas → LightDM` y probarlo en hardware real.

### 2. No existe instalador a disco

Solo modo live. No instala en disco interno ni externo.

### 3. Sin cifrado LUKS ni persistencia

`cryptsetup` está instalado pero nada crea volúmenes cifrados. El USB no guarda nada:
cuentas, contraseñas de Chrome, archivos y registros se pierden al reiniciar.

## Importantes

### 4. Sistema de archivos no oculto del todo

`abuelo-files` solo navega por carpetas personales y USB, pero los diálogos GTK de
Chrome y otras aplicaciones permiten navegar por todo el sistema.

### 5. Aislamiento parcial

El usuario live pierde `sudo` al arrancar y no puede ejecutar herramientas del sistema,
pero no es la cuenta `abuelo` del asistente. El menú contextual del escritorio aún
permite cambiar el fondo (no persiste).

### 6. Errores sin capa global

Las aplicaciones propias muestran mensajes claros; los errores del sistema y de
terceros se muestran en crudo.

### 7. Auditoría incompleta

Texto plano, sin cifrar, sin historial de navegación y sin filtros en el panel.

### 8. Panel básico

Configuración solo guarda nombres; limpieza solo cachés y papeleras; no edita cuentas
ni permite copias de seguridad.

### 9. Outlook solo web

Aplicación web de Chrome; sin persistencia se pierde la sesión.

### 10. Tema aproximado

GTK claro con acento azul y marco Moheli; no es una réplica de Windows.

## Menores

### 11. Sin optimización de rendimiento

Valores por defecto de Debian y squashfs.

### 12. Solo probado en VirtualBox

No probado en el Pentium real, ni Wi-Fi, impresora o suspensión.

### 13. Dependencia de terceros en la construcción

Chrome se descarga de `dl.google.com` en tiempo de compilación.

### 14. Sin firma Secure Boot

Hay que desactivar Secure Boot o añadir confianza manualmente.

### 15. Instrumentación de diagnóstico

`abuelo-diag.timer` vuelca el journal a `/var/log/abuelo-diag.txt` a los 35 s.
Pensado para depurar el fallo 1; debe retirarse cuando se cierre.
