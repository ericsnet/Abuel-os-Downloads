# Publicación - abuel-os 1.0.1

## ISO

- **Archivo:** `abuelo-os-amd64.iso`
- **Tamaño:** 1.692.844.032 bytes
- **SHA256:** `ff037e08f2ee942806cb92498ae475217ec058db28207dfc2be3490bdb835fc2`
- **Fecha:** 2026-10-25
- **Etiqueta:** `v1.0.1`
- **Descarga:** [release](https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.1) · [ISO](https://github.com/ericsnet/Abuel-os-Downloads/releases/download/v1.0.1/abuelo-os-amd64.iso)
- **Verificación:** `sha256sum abuelo-os-amd64.iso` debe devolver `ff037e08f2ee942806cb92498ae475217ec058db28207dfc2be3490bdb835fc2`.

## Fallos conocidos (resumen)

- **Total:** 29 (16 de la auditoría QA y 13 previos).
- **Severidad:** 6 alta, 11 media, 11 baja.
- **Principales:**
  - ABL-018 — Autologin roto (pantalla de acceso en vez de sesion)
  - ABL-019 — Posible interbloqueo de systemd: abuelo-live-restrict ejecuta 'systemctl start lightdm' estando ordenado Before=lightdm
  - ABL-021 — Polkit daba root sin contrasena al usuario live y el panel no pedia autenticacion
  - ABL-023 — Los iconos del escritorio no se abren porque Thunar no es ejecutable por el usuario mayor
  - PREV-1.0.1-02 — No existe instalador a disco (previo)
  - PREV-1.0.1-03 — No hay cifrado (LUKS) ni persistencia (previo)

## Auditoría completa

- [1.0.1/KNOWN_ISSUES.md](https://github.com/ericsnet/Abuel-os-Downloads/blob/main/versions/1.0.1/KNOWN_ISSUES.md)
