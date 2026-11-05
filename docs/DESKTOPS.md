# Escritorios soportados / investigados

XFCE es el escritorio por defecto de abuel-os. La capa propia (panel del
responsable, `abuelo-files`, kiosco, xfconf, iconos del escritorio y
`abuelo-apply-settings`) está escrita para XFCE, así que añadir otro escritorio
no es solo instalar un metapaquete: hay que adaptar la sesión, el panel, los
iconos y los ajustes.

## Comparativa

| Escritorio | RAM aprox. | Ventaja | Problema para abuel-os |
|---|---|---|---|
| **XFCE** (actual) | 350–500 MB | Ligero, estable, GTK3, todo integrado | Ya es la base; no hay que cambiar nada |
| **LXQt** | 300–450 MB | Muy ligero, Qt, módulos separados | Hay que reescribir panel/iconos/ajustes (no usa xfconf) |
| **MATE** | 450–700 MB | Familiar (GNOME 2), GTK3, accesible | Panel y applets propios; más trabajo de integración |
| **Cinnamon** | 700 MB–1 GB | Moderno y familiar | Pesado para equipos modestos; muchos servicios |
| **KDE Plasma** | 800 MB–1.5 GB | Muy configurable | Pesado, complejo, mal encaje para el público objetivo |
| **GNOME** | 800 MB–1.5 GB | Accesibilidad madura | Pesado y poco configurable para el kiosco |
| **Budgie** | 600–900 MB | Sencillo | Menos soporte en Debian 12; panel propio |
| **Openbox/IceWM** | 150–250 MB | Mínimo | Sin panel ni escritorio "de persona mayor" |

## Recomendación

1. **XFCE**: mantenerlo como único escritorio de la ISO 1.0.6. Es el que está
   probado y el que necesita menos mantenimiento.
2. **LXQt**: candidato para una variante "equipos muy justos" (1.1.0). Requiere
   un panel propio y un adaptador de ajustes.
3. **MATE**: candidato para quien quiera algo más clásico; mismo trabajo de
   integración que LXQt.
4. **Cinnamon/GNOME/KDE**: no para la imagen principal; se pueden ofrecer como
   instalación opcional desde Debian, sin la capa abuel-os adaptada.

## Arquitectura propuesta (para 1.1.0)

```
config/
  desktops/
    xfce/        (actual: xfconf, panel, iconos, sesión)
    lxqt/        (panel, autostart, ajustes)
    mate/        (panel, autostart, ajustes)
```

- `ABUELO_DESKTOP=xfce|lxqt|mate` en `auto/config`.
- `abuelo-apply-settings` detecta la sesión (`XDG_CURRENT_DESKTOP`) y llama al
  adaptador correspondiente.
- El panel del responsable sigue siendo una aplicación GTK independiente; solo
  cambia el lanzador y el aspecto.
- `abuelo-files` es independiente del escritorio; se reutiliza.
- Pruebas obligatorias por variante: autologin, iconos, papelera, panel,
  idioma, aplicaciones permitidas y apagado.

## Estado

- 1.0.6: solo XFCE. Este documento es la investigación y el plan; no se
  incluyen paquetes de otros escritorios en la ISO.
- Próximo paso: prototipo LXQt en una rama/VM aparte, sin tocar la ISO estable.
