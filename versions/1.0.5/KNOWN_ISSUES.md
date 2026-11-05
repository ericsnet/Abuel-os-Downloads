# Fallos conocidos - abuel-os 1.0.5

- **0 fallos abiertos** de la QA de 1.0.4 (ver
  `artifacts/qa-1.0.4/INFORME_QA_1.0.4.md`).
- Pendiente: probar la ISO 1.0.5 en equipo real y completar una instalación a
  disco (la QA de 1.0.4 se hizo en modo live).



## Limitaciones conocidas

- **Primer arranque instalado**: LightDM tiene `autologin-user=abuelo`, pero esa
  cuenta la crea el asistente en el primer inicio. Hasta que el responsable
  entra una vez, se ve el greeter; después el autologin funciona.
- **Persistencia cifrada**: probada sobre dispositivos de bucle en el proyecto;
  falta una prueba con un USB físico y distintos fabricantes.
- **Modos de pantalla**: `abuelo-display --set` crea modos con `cvt` si el
  monitor no los anuncia, pero algunos drivers propietarios ignoran esos modos.
  La opción Automática siempre usa los modos EDID/preferidos.
- **Socket de auditoría**: sigue siendo escribible por el usuario mayor para que
  las apps registren sus acciones; los eventos privilegiados se filtran por uid,
  pero un usuario puede generar eventos no privilegiados (ruido/DoS de la base).
- **`crypt`**: `common.verify_password` usa el módulo `crypt` (presente en
  bookworm/Python 3.11; eliminado en Python 3.13). Habrá que migrar a
  `crypt_r`/PAM antes de cambiar de base.
- **Calamares**: la marca no incluye traducciones ni `stylesheet.qss`; son
  avisos, no errores. La instalación completa sigue pendiente de validar.

## Cómo informar de un fallo

Incluye el modelo del equipo, si arranca en BIOS o UEFI, la resolución de
pantalla y el informe generado con `abuelo-report` (Ayuda → «Generar informe
técnico»).
