# abuel-os — Descargas

**Página oficial de descarga de abuel-os**, una distribución basada en Debian 12 (Bookworm) y XFCE, diseñada para ofrecer un escritorio sencillo y una cuenta separada para la persona responsable.

## Última versión: 1.0.2

| Característica | Detalle |
|---|---|
| Arquitectura | AMD64 (Intel/AMD de 64 bits) |
| Sistema base | Debian 12 (Bookworm) |
| Escritorio | XFCE |
| Arranque | BIOS y UEFI; compatibilidad con Secure Boot indicada para esta versión |
| RAM | 2 GB mínimo; 4 GB recomendados |
| USB | 4 GB mínimo; se recomienda 8 GB o más |

**Estado de la descarga:** las ISO todavía no están publicadas en este repositorio. Cuando estén disponibles, aparecerán en [Releases](https://github.com/ericsnet/Abuel-os-Downloads/releases).

## Versiones y verificación

| Versión | SHA-256 esperado | Estado |
|---|---|---|
| 1.0.2 | `bb0b42ca5f3acd4694263906e296d0b2cac9ab33da4cf6760ce83335551cfb98` | ISO pendiente de publicación |
| 1.0.1 | `ff037e08f2ee942806cb92498ae475217ec058db28207dfc2be3490bdb835fc2` | ISO pendiente de publicación |
| 1.0.0 | `3262da299e671020aa0268eaf076b7d0756d799d163ff90e1a2b6eec2b22eebf` | ISO pendiente de publicación |

Verifica siempre la suma SHA-256 de la ISO descargada y compárala con la correspondiente a esa versión. Si no coincide exactamente, no utilices esa imagen.

### Verificar en Windows

Abre PowerShell y ejecuta el comando siguiente, cambiando la ruta si guardaste la ISO en otra carpeta:

```powershell
Get-FileHash "$HOME\Downloads\abuelo-os-amd64.iso" -Algorithm SHA256
```

Compara el valor de `Hash` con el SHA-256 publicado.

### Verificar en Linux

En un terminal abierto en la carpeta de la ISO:

```bash
sha256sum abuelo-os-amd64.iso
```

El resultado debe coincidir carácter por carácter con el checksum oficial.

## Guía de instalación

**Antes de empezar:** instalar un sistema operativo puede borrar todos los archivos del ordenador. Haz una copia de seguridad de documentos, fotos y otros datos importantes. Si quieres conservar Windows u otro sistema, no selecciones el disco completo ni elimines particiones sin comprender el efecto.

### 1. Preparar una memoria USB

Necesitarás la ISO oficial cuando se publique, una memoria USB de al menos 4 GB (preferiblemente 8 GB o más) y un ordenador para prepararla. El proceso puede borrar por completo la memoria USB.

**Con Rufus en Windows:**

1. Descarga Rufus desde [rufus.ie](https://rufus.ie/).
2. Conecta el USB y guarda fuera de él los archivos que quieras conservar.
3. Abre Rufus y comprueba que el campo **Dispositivo** identifica la memoria USB correcta.
4. En **Selección de arranque**, elige **Disco o imagen ISO** y selecciona la ISO de abuel-os.
5. Si Rufus pregunta cómo escribir la imagen, utiliza primero el modo recomendado. Si el USB no arranca y Rufus ofrece el modo **DD**, vuelve a crearlo con ese modo.
6. Pulsa **Empezar** y confirma únicamente después de revisar el dispositivo seleccionado.
7. Espera a que termine y expulsa el USB de forma segura.

También puedes usar [Ventoy](https://www.ventoy.net/), siguiendo su documentación oficial. Preparar Ventoy en un USB también puede borrar sus datos; después se copia la ISO a la unidad preparada.

### 2. Arrancar desde el USB

1. Apaga el ordenador, conecta el USB y vuelve a encenderlo.
2. Abre el menú de arranque pulsando la tecla indicada por el fabricante justo al encender. Suele ser F12, F11, Esc u otra tecla.
3. Selecciona el USB. En equipos modernos, normalmente conviene elegir la entrada **UEFI** si aparecen varias.
4. Espera a que aparezca el menú de abuel-os y elige la opción de inicio normal.

Si el USB no aparece, consulta las instrucciones del fabricante para abrir el menú de arranque. No cambies opciones de BIOS/UEFI o de seguridad al azar.

### 3. Probar el sistema e iniciar la instalación

1. Si aparece un escritorio de prueba, comprueba que funcionan la pantalla, el teclado, el ratón, el sonido y la conexión de red.
2. **Si la ISO incluye un instalador**, ábrelo y sigue las pantallas. Selecciona idioma, zona horaria y distribución del teclado cuando se soliciten.
3. Cuando llegues a la configuración del disco, revisa cuidadosamente las opciones. Usar el disco completo puede borrar los sistemas y archivos existentes.
4. Si quieres conservar Windows, hacer arranque dual o mantener particiones con datos, detente antes de confirmar y prepara un plan de particionado adecuado.
5. Lee el resumen de cambios del instalador. Continúa solo cuando el disco de destino y las particiones sean los correctos.
6. Espera a que el instalador indique que ha terminado. Reinicia y retira el USB cuando se te indique.
7. Si el ordenador vuelve a arrancar desde el USB, reinicia y selecciona el disco interno desde el menú de arranque.

**Nota:** las pantallas y opciones exactas dependen del instalador incluido en la ISO. Si no aparece un instalador o las pantallas no coinciden, no modifiques el disco; consulta las notas específicas de esa versión antes de continuar.

### 4. Primer inicio de sesión

En la versión 1.0.2, las cuentas previstas son:

- **Uso diario:** `abuelo`, con inicio de sesión automático.
- **Persona responsable:** `responsable`, con contraseña inicial `live`.

Cambia la contraseña inicial de la cuenta responsable durante la primera configuración. No la reutilices en otros servicios ni la compartas públicamente. Si las credenciales de tu ISO no coinciden con esta información, consulta las notas de esa versión.

### 5. Después de instalar

- Comprueba que el sistema inicia sin el USB conectado.
- Verifica Internet, sonido, resolución de pantalla, teclado, ratón e impresora si corresponde.
- Instala las actualizaciones disponibles mediante las herramientas del sistema.
- Mantén una copia de seguridad de los datos importantes.
- Acordad quién se encargará de las actualizaciones, las contraseñas y la recuperación del equipo.

## Requisitos

- Procesador Intel o AMD de 64 bits.
- 2 GB de RAM como mínimo; 4 GB recomendados.
- Memoria USB de 4 GB como mínimo.
- Copia de seguridad de los datos existentes.
- Conexión a Internet recomendada para actualizaciones y documentación.

## Ayuda y versiones

- [Descargas y versiones publicadas](https://github.com/ericsnet/Abuel-os-Downloads/releases)
- [Notificar un problema con esta página](https://github.com/ericsnet/Abuel-os-Downloads/issues)

Copyright (c) 2026 **ericsnet**. Todos los derechos reservados.

abuel-os es software propietario. Descargar una ISO no concede por sí solo permiso para copiar, modificar o redistribuir el software fuera de lo permitido por la legislación aplicable o de una autorización escrita previa de ericsnet. Consulta [LICENSE](LICENSE).

## Historial detallado de versiones

Consulta el [índice de versiones](versions/INDEX.md) para ver los cambios, los fallos conocidos y los datos de publicación de cada versión. Las ISO siguen pendientes de publicación en este repositorio; el índice enlaza a la página pública de [Releases](https://github.com/ericsnet/Abuel-os-Downloads/releases).
