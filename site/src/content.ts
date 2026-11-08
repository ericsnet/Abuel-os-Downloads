export type Lang = 'es' | 'en'

type Localized = { es: string; en: string }

export const strings: Record<string, Localized> = {
  skip: { es: 'Saltar al contenido', en: 'Skip to content' },
  'brand.aria': { es: 'abuel-os, inicio', en: 'abuel-os, home' },
  'nav.aria': { es: 'Principal', en: 'Main' },
  'nav.download': { es: 'Descargar', en: 'Download' },
  'nav.install': { es: 'Instalar', en: 'Install' },
  'nav.verify': { es: 'Verificar', en: 'Verify' },
  'nav.update': { es: 'Actualizar', en: 'Update' },
  'nav.versions': { es: 'Versiones', en: 'Versions' },
  'nav.github': { es: 'GitHub', en: 'GitHub' },
  'nav.menu': { es: 'Abrir menú', en: 'Open menu' },
  'nav.close': { es: 'Cerrar menú', en: 'Close menu' },
  'lang.toggle': { es: 'English', en: 'Español' },
  'lang.aria': { es: 'Cambiar a inglés', en: 'Switch to Spanish' },

  'hero.title': {
    es: 'Un ordenador fácil de usar para quien no creció con uno.',
    en: "A computer that's easy to use for people who didn't grow up with one.",
  },
  'hero.lead': {
    es: 'abuel-os es un sistema basado en Debian 12 y XFCE, con dos cuentas separadas: una para el día a día y otra para quien cuida del equipo.',
    en: 'abuel-os is a system based on Debian 12 and XFCE, with two separate accounts: one for everyday use and one for whoever looks after the machine.',
  },
  'hero.cta.download': { es: 'Descargar la ISO', en: 'Download the ISO' },
  'hero.cta.install': { es: 'Cómo se instala', en: 'How installation works' },
  'hero.f1.k': { es: 'Sistema base', en: 'Base system' },
  'hero.f1.v': { es: 'Debian 12', en: 'Debian 12' },
  'hero.f2.k': { es: 'Escritorio', en: 'Desktop' },
  'hero.f2.v': { es: 'XFCE', en: 'XFCE' },
  'hero.f3.k': { es: 'Arquitectura', en: 'Architecture' },
  'hero.f3.v': { es: 'AMD64', en: 'AMD64' },

  'mock.alt': {
    es: 'Demostración interactiva del escritorio de abuel-os: iconos, tarjeta de bienvenida y panel inferior.',
    en: 'Interactive demo of the abuel-os desktop: icons, a welcome card and a bottom panel.',
  },
  'mock.title': { es: 'abuel-os 1.0.8', en: 'abuel-os 1.0.8' },
  'mock.files': { es: 'Archivos', en: 'Files' },
  'mock.net': { es: 'Internet', en: 'Internet' },
  'mock.panel': { es: 'Panel', en: 'Panel' },
  'mock.note': { es: 'Todo listo. Elige lo que quieres hacer.', en: 'All set. Choose what you want to do.' },
  'mock.help': { es: 'Ayuda', en: 'Help' },

  'mock.demo': {
    es: 'Pulsa un icono para probar el escritorio.',
    en: 'Tap an icon to try the desktop.',
  },
  'mock.morning': { es: 'Buenos días', en: 'Good morning' },
  'mock.afternoon': { es: 'Buenas tardes', en: 'Good afternoon' },
  'mock.evening': { es: 'Buenas noches', en: 'Good evening' },
  'demo.files.t': { es: 'Tus archivos', en: 'Your files' },
  'demo.files.d': {
    es: 'Documentos, fotos y todo lo tuyo, en un solo sitio.',
    en: 'Documents, photos and everything of yours, in one place.',
  },
  'demo.files.c1': { es: 'Documentos', en: 'Documents' },
  'demo.files.c2': { es: 'Fotos', en: 'Photos' },
  'demo.net.t': { es: 'Internet', en: 'Internet' },
  'demo.net.d': { es: 'El navegador, listo para abrir.', en: 'The browser, ready to open.' },
  'demo.net.c1': { es: 'Buscar', en: 'Search' },
  'demo.net.c2': { es: 'Correo', en: 'Mail' },
  'demo.panel.t': { es: 'El panel', en: 'The panel' },
  'demo.panel.d': {
    es: 'Letras, pantalla y sonido, a tu medida.',
    en: 'Text, screen and sound, the way you like them.',
  },
  'demo.panel.c1': { es: 'Pantalla', en: 'Screen' },
  'demo.panel.c2': { es: 'Texto', en: 'Text' },
  'demo.help.t': { es: 'Ayuda', en: 'Help' },
  'demo.help.d': { es: 'Si algo no va, aquí tienes una mano.', en: "If something's wrong, here's a hand." },
  'demo.help.c1': { es: 'Guía', en: 'Guide' },
  'demo.help.c2': { es: 'Soporte', en: 'Support' },

  'release.title': { es: 'Última versión publicada', en: 'Latest published version' },
  'release.date': { es: '6 de noviembre de 2026', en: 'November 6, 2026' },
  'release.download': { es: 'Descargar la ISO', en: 'Download the ISO' },
  'release.link': { es: 'Ver la release', en: 'View the release' },
  'release.note': {
    es: 'Incluye los paquetes firmados abuelo-os-core y abuelo-os-updater de esta versión.',
    en: 'Includes the signed abuelo-os-core and abuelo-os-updater packages for this version.',
  },
  'release.sha': { es: 'SHA-256 de la ISO', en: 'ISO SHA-256' },
  'release.hint': {
    es: 'Compáralo antes de usar la imagen. Si no coincide, no la uses.',
    en: "Compare it before using the image. If it doesn't match, don't use it.",
  },
  'release.arch': { es: 'ISO para AMD64', en: 'AMD64 ISO' },
  'release.size': { es: '1,82 GiB', en: '1.82 GiB' },

  'copy.hash': { es: 'Copiar', en: 'Copy' },
  'copy.cmd': { es: 'Copiar', en: 'Copy' },
  copied: { es: 'Copiado', en: 'Copied' },
  'status.copied': { es: 'Copiado al portapapeles', en: 'Copied to clipboard' },
  'status.failed': { es: 'No se pudo copiar el texto', en: "Couldn't copy the text" },

  'about.title': { es: 'Qué es abuel-os', en: 'What abuel-os is' },
  'about.lead': {
    es: 'Una distribución pequeña y sin adornos, pensada para que la persona que la usa cada día no tenga que pelearse con el sistema.',
    en: "A small, unadorned distribution, made so the person who uses it every day doesn't have to fight the system.",
  },
  'about.s1.t': { es: 'Sistema', en: 'System' },
  'about.s1.d': {
    es: 'Debian 12 Bookworm, con las actualizaciones de seguridad que publica Debian. La capa propia añade el panel, los ajustes y las herramientas de administración; no sustituye al sistema base.',
    en: 'Debian 12 Bookworm, with the security updates Debian publishes. The abuel-os layer adds the panel, settings and administration tools; it does not replace the base system.',
  },
  'about.s2.t': { es: 'Escritorio', en: 'Desktop' },
  'about.s2.d': {
    es: 'XFCE, con letras grandes, iconos claros y sin efectos que distraigan. El panel se adapta a la pantalla y la preferencia se conserva entre sesiones desde 1.0.7.',
    en: 'XFCE, with large text, clear icons and no distracting effects. The panel adapts to the screen and the preference is kept between sessions since 1.0.7.',
  },
  'about.s3.t': { es: 'Dos cuentas', en: 'Two accounts' },
  'about.s3.d': {
    es: '<code>abuelo</code> entra automáticamente y usa el equipo. <code>responsable</code> instala, actualiza, cambia la configuración y recupera el sistema cuando hace falta.',
    en: '<code>abuelo</code> logs in automatically and uses the computer. <code>responsable</code> installs, updates, changes settings and recovers the system when needed.',
  },
  'about.s4.t': { es: 'Requisitos', en: 'Requirements' },
  'about.s4.d': {
    es: 'Procesador de 64 bits, 2 GB de RAM (4 GB recomendados) y un USB de 4 GB (8 GB o más recomendado).',
    en: '64-bit processor, 2 GB of RAM (4 GB recommended) and a 4 GB USB drive (8 GB or more recommended).',
  },

  'install.title': { es: 'Instalar en cinco pasos', en: 'Install in five steps' },
  'install.lead': {
    es: 'En orden. Si algo no coincide con lo que ves en pantalla, para y consulta las notas de esa versión antes de tocar el disco.',
    en: "In order. If something doesn't match what you see on screen, stop and check that version's notes before touching the disk.",
  },
  'install.warn.k': { es: 'Antes de empezar', en: 'Before you start' },
  'install.warn.v': {
    es: 'Instalar un sistema puede borrar todos los archivos del ordenador. Guarda documentos, fotos y cualquier dato importante en otro sitio. Si quieres conservar Windows, no elijas el disco entero ni borres particiones sin saber qué hace cada una.',
    en: "Installing a system can erase every file on the computer. Back up documents, photos and any important data somewhere else. If you want to keep Windows, don't choose the whole disk or delete partitions without knowing what each one does.",
  },
  'install.s1.t': { es: 'Prepara una copia de seguridad', en: 'Make a backup' },
  'install.s1.d': {
    es: 'Copia lo importante a un disco externo o a la nube. Comprueba que puedes abrir los archivos copiados; una copia que no se puede leer no sirve.',
    en: "Copy what matters to an external drive or to the cloud. Check that you can open the copied files; a backup you can't read is no backup.",
  },
  'install.s2.t': { es: 'Graba la ISO en un USB', en: 'Write the ISO to a USB drive' },
  'install.s2.d': {
    es: 'Necesitas un USB de 4 GB o más, que se borrará por completo. En Windows, abre <a href="https://rufus.ie/">Rufus</a>, elige el dispositivo correcto, selecciona la ISO en «Boot selection» y pulsa Start. Si el USB no arranca después, repítelo en modo DD. <a href="https://www.ventoy.net/">Ventoy</a> también sirve: prepara el USB con Ventoy y copia la ISO dentro.',
    en: 'You need a USB drive of 4 GB or more, and it will be completely erased. On Windows, open <a href="https://rufus.ie/">Rufus</a>, pick the right device, select the ISO under “Boot selection” and press Start. If the drive doesn\'t boot afterwards, redo it in DD mode. <a href="https://www.ventoy.net/">Ventoy</a> also works: prepare the drive with Ventoy, then copy the ISO onto it.',
  },
  'install.s3.t': { es: 'Arranca desde el USB', en: 'Boot from the USB drive' },
  'install.s3.d': {
    es: 'Apaga el equipo, conecta el USB y enciéndelo. Pulsa la tecla del menú de arranque que indique el fabricante (suele ser F12, F11 o Esc). Elige el USB; si aparecen varias entradas, escoge la que empiece por UEFI.',
    en: "Turn the computer off, plug in the drive and turn it back on. Press the boot-menu key your manufacturer uses (often F12, F11 or Esc). Choose the drive; if several entries appear, pick the one starting with UEFI.",
  },
  'install.s4.t': { es: 'Prueba el escritorio e instala', en: 'Try the desktop and install' },
  'install.s4.d': {
    es: 'Comprueba que se ven la pantalla, el teclado, el ratón, el sonido y la red. Si la ISO trae instalador, ábrelo y sigue las pantallas. En el paso del disco, revisa dos veces qué disco y qué particiones vas a cambiar antes de confirmar.',
    en: 'Check the screen, keyboard, mouse, sound and network. If the ISO includes an installer, open it and follow the screens. At the disk step, look twice at which disk and partitions you\'re about to change before confirming.',
  },
  'install.s5.t': { es: 'Primer inicio de sesión', en: 'First sign-in' },
  'install.s5.d': {
    es: 'En la primera instalación puede aparecer la pantalla de inicio de sesión: entra una vez con la cuenta <code>responsable</code> (contraseña inicial <code>live</code>), cámbiala y sal. A partir de ahí, <code>abuelo</code> entra sola. No reutilices esa contraseña en otros servicios.',
    en: 'On a first install, the sign-in screen may appear: sign in once as <code>responsable</code> (initial password <code>live</code>), change it and sign out. After that, <code>abuelo</code> logs in by itself. Don\'t reuse that password on other services.',
  },

  'verify.title': { es: 'Comprobar la ISO', en: 'Check the ISO' },
  'verify.lead': {
    es: 'Calcula el SHA-256 del archivo y compáralo carácter por carácter con el de esta versión. Si no coincide exactamente, no uses esa imagen: vuelve a descargarla.',
    en: "Calculate the file's SHA-256 and compare it character for character with this version's. If it doesn't match exactly, don't use that image: download it again.",
  },
  'verify.note': {
    es: 'El archivo <code>abuelo-os-amd64.iso.sha256</code> se publica junto al ISO en cada release y contiene el valor esperado.',
    en: 'The file <code>abuelo-os-amd64.iso.sha256</code> is published next to the ISO in every release and contains the expected value.',
  },
  'verify.win': { es: 'Windows · PowerShell', en: 'Windows · PowerShell' },
  'verify.linux': { es: 'Linux', en: 'Linux' },

  'update.title': { es: 'Actualizar sin reinstalar', en: 'Update without reinstalling' },
  'update.lead': {
    es: 'Dos capas independientes. Debian actualiza la base con sus parches de seguridad; la capa de abuel-os viaja en un paquete firmado y cambia la versión sin tocar tus archivos.',
    en: 'Two independent layers. Debian updates the base with its security patches; the abuel-os layer travels in a signed package and changes the version without touching your files.',
  },
  'update.detail': {
    es: '<code>--check</code> consulta la última release. <code>--install</code> descarga el paquete, verifica su SHA-256 y su firma Ed25519, e instala con apt. Si falta la clave pública o la firma no cuadra, aborta.',
    en: '<code>--check</code> asks for the latest release. <code>--install</code> downloads the package, verifies its SHA-256 and Ed25519 signature, and installs it with apt. If the public key is missing or the signature doesn\'t match, it aborts.',
  },
  'update.link': { es: 'Leer el documento de actualizaciones', en: 'Read the update document' },
  'update.layer1.tag': { es: 'Capa abuel-os', en: 'abuel-os layer' },
  'update.layer1.d': {
    es: 'Panel, ajustes y utilidades en un <code>.deb</code> firmado.',
    en: 'Panel, settings and utilities in a signed <code>.deb</code>.',
  },
  'update.layer2.tag': { es: 'Debian 12', en: 'Debian 12' },
  'update.layer2.d': {
    es: 'Parches de seguridad y del sistema con apt.',
    en: 'Security and system patches with apt.',
  },
  'update.cmdlabel': { es: 'Con la cuenta responsable', en: 'From the responsable account' },

  'versions.title': { es: 'Todas las versiones', en: 'All versions' },
  'versions.lead': {
    es: 'Cada versión tiene su carpeta en el repositorio con cambios, fallos conocidos y datos del artefacto. El ISO y los paquetes se adjuntan a su release.',
    en: 'Every version has its own folder in the repository with changes, known issues and artifact details. The ISO and packages are attached to its release.',
  },
  'table.version': { es: 'Versión', en: 'Version' },
  'table.date': { es: 'Fecha', en: 'Date' },
  'table.hash': { es: 'SHA-256 del ISO', en: 'ISO SHA-256' },
  'table.release': { es: 'Release', en: 'Release' },
  'versions.current': { es: 'actual', en: 'current' },
  'versions.index': { es: 'Índice completo de versiones', en: 'Full version index' },
  'versions.issues': { es: 'Fallos conocidos de 1.0.8', en: 'Known issues in 1.0.8' },

  'footer.tagline': { es: 'Fácil. Seguro. Para ti.', en: 'Easy. Safe. For you.' },
  'footer.legal': {
    es: 'abuel-os es software propietario. Descargar una ISO no concede por sí solo permiso para copiar, modificar o redistribuir el software más allá de lo que permita la ley aplicable o una autorización escrita previa de ericsnet.',
    en: 'abuel-os is proprietary software. Downloading an ISO does not by itself grant permission to copy, modify or redistribute the software beyond what applicable law or prior written authorization from ericsnet allows.',
  },
  'footer.releases': { es: 'Releases', en: 'Releases' },
  'footer.issues': { es: 'Problemas', en: 'Issues' },
  'footer.license': { es: 'Licencia', en: 'License' },
}

export function t(lang: Lang, key: string): string {
  return strings[key]?.[lang] ?? key
}

export const META = {
  es: {
    title: 'abuel-os — Descargas',
    description:
      'Descarga abuel-os: sistema basado en Debian 12 y XFCE, pensado para personas mayores. Versión 1.0.8 para AMD64, verificación SHA-256 e instrucciones de instalación.',
  },
  en: {
    title: 'abuel-os — Downloads',
    description:
      'Download abuel-os: a system based on Debian 12 and XFCE, made for older people. Version 1.0.8 for AMD64, SHA-256 verification and installation instructions.',
  },
} as const

export const LINKS = {
  repo: 'https://github.com/ericsnet/Abuel-os-Downloads',
  releases: 'https://github.com/ericsnet/Abuel-os-Downloads/releases',
  issues: 'https://github.com/ericsnet/Abuel-os-Downloads/issues',
  license: 'https://github.com/ericsnet/Abuel-os-Downloads/blob/main/LICENSE',
  isoLatest: 'https://github.com/ericsnet/Abuel-os-Downloads/releases/latest/download/abuelo-os-amd64.iso',
  release108: 'https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.8',
  updates108: 'https://github.com/ericsnet/Abuel-os-Downloads/blob/main/versions/1.0.8/UPDATES.md',
  index: 'https://github.com/ericsnet/Abuel-os-Downloads/blob/main/versions/INDEX.md',
  issues108: 'https://github.com/ericsnet/Abuel-os-Downloads/blob/main/versions/1.0.8/KNOWN_ISSUES.md',
} as const

export const CURRENT = {
  version: '1.0.8',
  date: '2026-11-06',
  hash: '584cb3b2c71d4fd458b3541464fe27af8b0ec38c8580e7bf3774b619f0627c57',
} as const

export type Version = {
  version: string
  date: string
  hash: string
  release: string
  tree: string
  latest?: boolean
}

export const VERSIONS: Version[] = [
  { version: '1.0.8', date: '2026-11-06', hash: '584cb3b2c71d4fd458b3541464fe27af8b0ec38c8580e7bf3774b619f0627c57', release: 'https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.8', tree: 'https://github.com/ericsnet/Abuel-os-Downloads/tree/main/versions/1.0.8', latest: true },
  { version: '1.0.7', date: '2026-11-06', hash: 'eb87d71e87a115541c81b4aa683c8d7e83ae9c6a415b31f5776e34350ebcfec5', release: 'https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.7', tree: 'https://github.com/ericsnet/Abuel-os-Downloads/tree/main/versions/1.0.7' },
  { version: '1.0.6', date: '2026-11-05', hash: '18d62c0af617b5c89f175d993d5428ecd1ad2abf2143ac9bd6446f4e5d8a8f5a', release: 'https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.6', tree: 'https://github.com/ericsnet/Abuel-os-Downloads/tree/main/versions/1.0.6' },
  { version: '1.0.5', date: '2026-11-05', hash: '5de7fd5384cc4a84ec798e25aa547e6c62902d464c849756995ec4ee04177c07', release: 'https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.5', tree: 'https://github.com/ericsnet/Abuel-os-Downloads/tree/main/versions/1.0.5' },
  { version: '1.0.4', date: '2026-11-03', hash: '468c8785723a63881f3828611d5d56c6282de67dddd27c2a8cfdeab476e5356e', release: 'https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.4', tree: 'https://github.com/ericsnet/Abuel-os-Downloads/tree/main/versions/1.0.4' },
  { version: '1.0.3', date: '2026-11-03', hash: 'c9636d05b124391c094077d543df9bba7d3e1f8af5ada2641bef62c6e79f2fae', release: 'https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.3', tree: 'https://github.com/ericsnet/Abuel-os-Downloads/tree/main/versions/1.0.3' },
  { version: '1.0.2', date: '2026-10-25', hash: 'bb0b42ca5f3acd4694263906e296d0b2cac9ab33da4cf6760ce83335551cfb98', release: 'https://github.com/ericsnet/Abuel-os-Downloads/releases/tag/v1.0.2', tree: 'https://github.com/ericsnet/Abuel-os-Downloads/tree/main/versions/1.0.2' },
  { version: '1.0.1', date: '2026-10-25', hash: 'ff037e08f2ee942806cb92498ae475217ec058db28207dfc2be3490bdb835fc2', release: 'https://github.com/Pickeric/Abuel-os/releases/tag/v1.0.1', tree: 'https://github.com/ericsnet/Abuel-os-Downloads/tree/main/versions/1.0.1' },
  { version: '1.0.0', date: '2026-10-25', hash: '3262da299e671020aa0268eaf076b7d0756d799d163ff90e1a2b6eec2b22eebf', release: 'https://github.com/Pickeric/Abuel-os/releases/tag/v1.0.0', tree: 'https://github.com/ericsnet/Abuel-os-Downloads/tree/main/versions/1.0.0' },
]
