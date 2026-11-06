# Fallos conocidos - abuel-os 1.0.7

Fallos y limitaciones abiertos en esta versión.

## Abiertos

- **Primer arranque instalado**: `autologin-user=abuelo` apunta a una cuenta que
  aún no existe; se ve el greeter hasta que el responsable entra una vez.
- **Persistencia cifrada**: probada con dispositivos de bucle, no con USB físico.
- **Modos de pantalla**: drivers propietarios pueden ignorar los modos `cvt`.
- **Socket de auditoría**: escribible por el usuario mayor; eventos privilegiados
  filtrados, pero puede generar ruido/DoS.
- **`crypt`**: migrar a PAM/`crypt_r` antes de Python 3.13.
- **Calamares**: traducciones/stylesheet y instalación completa sin validar.
- **Rollback de actualizaciones**: falta probar la vuelta a la versión anterior.
- **Escritorios alternativos**: XFCE por defecto; LXQt/MATE solo investigados.
