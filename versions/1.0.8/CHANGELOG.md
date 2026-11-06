# Cambios - abuel-os 1.0.8

## 1.0.8 - 2026-11-06

### Incluido

- **Separación de privilegios**: la cuenta `abuelo` ya no puede elevar
  `panel-launcher`, `setup-launcher`, `install-launch` ni `update-launcher`.
  Esas herramientas quedan reservadas a `responsable`/grupo `responsables`.
- **Icono de actualizaciones**: `Actualizar.desktop` en el escritorio del
  responsable; abre `abuelo-update --gui`. La cuenta `abuelo` no recibe ese
  icono ni puede instalar actualizaciones.
- **Terminal root en el panel**: botón “Abrir terminal como root” dentro del
  panel autenticado del responsable. No se autoriza por polkit a `abuelo`.
- **Ajustes del responsable**: se añaden `nm-connection-editor`,
  `system-config-printer` y `blueman-manager` a la lista de binarios 0750
  root:responsables. Un `tmpfiles.d` reaplica los permisos en cada arranque
  para que una actualización de XFCE no los devuelva a 0755.
- **Iconos del responsable**: se copian `Panel.desktop` y `Actualizar.desktop`
  a su escritorio; se retira `Panel.desktop` del escritorio de `abuelo`.
- **Confianza de lanzadores**: solo se marcan como `metadata::trusted` los
  iconos conocidos, no cualquier `.desktop` que aparezca en el escritorio.
- **Auditoría**: el socket pasa a 0660 root:abuelo (antes 0666) y el
  actualizador registra el usuario real de `pkexec`, no siempre
  `responsable`.
- **Papelera**: si `gio trash` falla, ya no se borra permanentemente como
  respaldo silencioso.
- **Empaquetado**: se excluyen `__pycache__`/`.pyc` del árbol de instalación.

### Fallos corregidos

- El instalador de disco ya no es accesible como root desde `abuelo`.
- El asistente de cuentas y el panel ya no son accesibles como root desde
  `abuelo`.
- La instalación de actualizaciones queda exclusivamente en el responsable.
- El editor de red y las herramientas de ajustes ya no son ejecutables por
  `abuelo`.
- El socket de auditoría deja de ser escribible por cualquier usuario local.

### Artefacto

- ISO 1.0.8 construida y probada en VirtualBox.
- SHA-256: `584cb3b2c71d4fd458b3541464fe27af8b0ec38c8580e7bf3774b619f0627c57`
- Paquete de actualización: `abuelo-os-core_1.0.8_all.deb`
- SHA-256 del paquete: `cef82aa89f51b9f8f8d31c5600c6678206315b91b57ed9571ddf219887d2e8f7`
