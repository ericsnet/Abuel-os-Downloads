# Actualizaciones dinámicas de abuel-os 1.0.9

## Flujo 1.0.8 → 1.0.9

1. `abuelo-update --check` detecta 1.0.9.
2. `sudo abuelo-update --install` descarga y verifica el paquete firmado.
3. El `postinst` elimina el autologin anterior, aplica la configuración de
   LightDM y los permisos de ajustes.
4. Queda `abuel-os 1.0.9`.

## Firma

- Ed25519; la clave privada no está en el repositorio.
- Paquete 1.0.9: `191f0d171a46acf6bb0e99ed37c55f73d49ca93273d679cfe723a00ba458bf1f`.

## Pendiente

- Probar el salto real 1.0.8 → 1.0.9 y rollback.
