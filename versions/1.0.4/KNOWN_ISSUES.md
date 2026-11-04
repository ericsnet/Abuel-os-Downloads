# Fallos conocidos - abuel-os 1.0.4

- **0 fallos abiertos** conocidos de las versiones anteriores.
- Mejoras pendientes de confirmar por el operador tras probar la ISO.

## Limitaciones conocidas

- **Carpetas duplicadas en Archivos**: el explorador lista `Desktop` y
  `Escritorio`, `Imagenes` e `Imágenes`, `Musica` y `Música` porque usa nombres
  fijos en lugar de `xdg-user-dir`. Pendiente para 1.0.5/1.1.0.
- **Depósito de claves la primera vez**: al abrir Correo, gnome-keyring pide una
  contraseña para crear el depósito. Se puede dejar vacía; conviene
  inicializarlo en la sesión live más adelante.
- **Idioma**: se aplica al reiniciar la sesión del usuario mayor, no dentro de
  las aplicaciones ya abiertas (limitación de GTK/X11: el idioma es entorno de
  proceso). El panel ofrece reiniciar la sesión al cambiarlo.

## Cómo informar de un fallo

Incluye el modelo del equipo, si arranca en BIOS o UEFI, la resolución de
pantalla y el informe generado con `abuelo-report` (Ayuda → «Generar informe
técnico»).
