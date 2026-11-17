# Actualizaciones dinámicas de abuel-os 1.0.9

## Flujo 1.0.8 → 1.0.9

1. `abuelo-update --check` detecta 1.0.9.
2. `sudo abuelo-update --install` descarga y verifica el paquete firmado.
3. El `postinst` elimina el autologin anterior, aplica la configuración de
   LightDM y los permisos de ajustes.
4. Queda `abuel-os 1.0.9`.

## Firma

- Ed25519; la clave privada no está en el repositorio.
- Paquete 1.0.9: `877f5b564f0511db2adb7661c1e7b34b072f700ecb959d1d8951aac45fec49bd`.

## Pendiente

- Probar el salto real 1.0.8 → 1.0.9 y rollback.
