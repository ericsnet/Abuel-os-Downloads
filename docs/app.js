(function () {
  "use strict";

  var EN = {
    "skip": "Skip to content",
    "brand.aria": "abuel-os, home",
    "nav.aria": "Main",
    "nav.download": "Download",
    "nav.install": "Install",
    "nav.verify": "Verify",
    "nav.update": "Update",
    "nav.versions": "Versions",
    "nav.github": "GitHub",

    "hero.title": "A computer that's easy to use for people who didn't grow up with one.",
    "hero.lead": "abuel-os is a system based on Debian 12 and XFCE, with two separate accounts: one for everyday use and one for whoever looks after the machine.",
    "hero.cta.download": "Download the ISO",
    "hero.cta.install": "How installation works",
    "hero.f1.k": "Base system",
    "hero.f1.v": "Debian 12",
    "hero.f2.k": "Desktop",
    "hero.f2.v": "XFCE",
    "hero.f3.k": "Architecture",
    "hero.f3.v": "AMD64",

    "mock.alt": "Illustration of the abuel-os desktop: large icons, a welcome card and a bottom panel.",
    "mock.title": "abuel-os 1.0.8",
    "mock.files": "Files",
    "mock.net": "Internet",
    "mock.panel": "Panel",
    "mock.power": "Power off",
    "mock.hello": "Good morning",
    "mock.note": "All set. Choose what you want to do.",
    "mock.help": "Help",
    "mock.caption": "Desktop view: large icons, a welcome card and the panel always in sight.",

    "release.title": "Latest published version",
    "release.date": "November 6, 2026",
    "release.download": "Download the ISO",
    "release.link": "View the release",
    "release.note": "Includes the signed abuelo-os-core and abuelo-os-updater packages for this version.",
    "release.sha": "ISO SHA-256",
    "release.hint": "Compare it before using the image. If it doesn't match, don't use it.",

    "copy.hash": "Copy",
    "copy.cmd": "Copy",

    "about.title": "What abuel-os is",
    "about.lead": "A small, unadorned distribution, made so the person who uses it every day doesn't have to fight the system.",
    "about.s1.t": "System",
    "about.s1.d": "Debian 12 Bookworm, with the security updates Debian publishes. The abuel-os layer adds the panel, settings and administration tools; it does not replace the base system.",
    "about.s2.t": "Desktop",
    "about.s2.d": "XFCE, with large text, clear icons and no distracting effects. The panel adapts to the screen and the preference is kept between sessions since 1.0.7.",
    "about.s3.t": "Two accounts",
    "about.s3.d": "<code>abuelo</code> logs in automatically and uses the computer. <code>responsable</code> installs, updates, changes settings and recovers the system when needed.",
    "about.s4.t": "Requirements",
    "about.s4.d": "64-bit processor, 2 GB of RAM (4 GB recommended) and a 4 GB USB drive (8 GB or more recommended).",

    "install.title": "Install in five steps",
    "install.lead": "In order. If something doesn't match what you see on screen, stop and check that version's notes before touching the disk.",
    "install.warn.k": "Before you start",
    "install.warn.v": "Installing a system can erase every file on the computer. Back up documents, photos and any important data somewhere else. If you want to keep Windows, don't choose the whole disk or delete partitions without knowing what each one does.",
    "install.s1.t": "Make a backup",
    "install.s1.d": "Copy what matters to an external drive or to the cloud. Check that you can open the copied files; a backup you can't read is no backup.",
    "install.s2.t": "Write the ISO to a USB drive",
    "install.s2.d": "You need a USB drive of 4 GB or more, and it will be completely erased. On Windows, open <a href=\"https://rufus.ie/\">Rufus</a>, pick the right device, select the ISO under \u201cBoot selection\u201d and press Start. If the drive doesn't boot afterwards, redo it in DD mode. <a href=\"https://www.ventoy.net/\">Ventoy</a> also works: prepare the drive with Ventoy, then copy the ISO onto it.",
    "install.s3.t": "Boot from the USB drive",
    "install.s3.d": "Turn the computer off, plug in the drive and turn it back on. Press the boot-menu key your manufacturer uses (often F12, F11 or Esc). Choose the drive; if several entries appear, pick the one starting with UEFI.",
    "install.s4.t": "Try the desktop and install",
    "install.s4.d": "Check the screen, keyboard, mouse, sound and network. If the ISO includes an installer, open it and follow the screens. At the disk step, look twice at which disk and partitions you're about to change before confirming.",
    "install.s5.t": "First sign-in",
    "install.s5.d": "On a first install, the sign-in screen may appear: sign in once as <code>responsable</code> (initial password <code>live</code>), change it and sign out. After that, <code>abuelo</code> logs in by itself. Don't reuse that password on other services.",

    "verify.title": "Check the ISO",
    "verify.lead": "Calculate the file's SHA-256 and compare it character for character with this version's. If it doesn't match exactly, don't use that image: download it again.",
    "verify.note": "The file <code>abuelo-os-amd64.iso.sha256</code> is published next to the ISO in every release and contains the expected value.",
    "verify.win": "Windows \u00b7 PowerShell",
    "verify.linux": "Linux",

    "update.title": "Update without reinstalling",
    "update.lead": "Two independent layers. Debian updates the base with its security patches; the abuel-os layer travels in a signed package and changes the version without touching your files.",
    "update.detail": "<code>--check</code> asks for the latest release. <code>--install</code> downloads the package, verifies its SHA-256 and Ed25519 signature, and installs it with apt. If the public key is missing or the signature doesn't match, it aborts.",
    "update.link": "Read the update document",
    "update.layer1.tag": "abuel-os layer",
    "update.layer1.d": "Panel, settings and utilities in a signed <code>.deb</code>.",
    "update.layer2.tag": "Debian 12",
    "update.layer2.d": "Security and system patches with apt.",
    "update.cmdlabel": "From the responsable account",

    "versions.title": "All versions",
    "versions.lead": "Every version has its own folder in the repository with changes, known issues and artifact details. The ISO and packages are attached to its release.",
    "table.version": "Version",
    "table.date": "Date",
    "table.hash": "ISO SHA-256",
    "table.release": "Release",
    "versions.current": "current",
    "versions.index": "Full version index",
    "versions.issues": "Known issues in 1.0.8",

    "footer.tagline": "Easy. Safe. For you.",
    "footer.legal": "abuel-os is proprietary software. Downloading an ISO does not by itself grant permission to copy, modify or redistribute the software beyond what applicable law or prior written authorization from ericsnet allows.",
    "footer.releases": "Releases",
    "footer.issues": "Issues",
    "footer.license": "License"
  };

  var TITLES = {
    es: "abuel-os \u2014 Descargas",
    en: "abuel-os \u2014 Downloads"
  };

  var DESCRIPTIONS = {
    es: "Descarga abuel-os: sistema basado en Debian 12 y XFCE, pensado para personas mayores. Versi\u00f3n 1.0.8 para AMD64, verificaci\u00f3n SHA-256 e instrucciones de instalaci\u00f3n.",
    en: "Download abuel-os: a system based on Debian 12 and XFCE, made for older people. Version 1.0.8 for AMD64, SHA-256 verification and installation instructions."
  };

  var COPIED = { es: "Copiado", en: "Copied" };
  var STATUS_COPIED = { es: "Copiado al portapapeles", en: "Copied to clipboard" };
  var STATUS_FAILED = { es: "No se pudo copiar el texto", en: "Couldn't copy the text" };

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var ariaNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n-aria]"));
  var originalText = new Map();
  var originalAria = new Map();

  nodes.forEach(function (el) { originalText.set(el, el.innerHTML); });
  ariaNodes.forEach(function (el) { originalAria.set(el, el.getAttribute("aria-label") || ""); });

  var toggle = document.getElementById("lang-toggle");
  var status = document.getElementById("status");
  var current = "es";

  function setMeta(name, value) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (el) { el.setAttribute("content", value); }
  }

  function applyLanguage(lang) {
    current = lang;
    var useEnglish = lang === "en";

    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (useEnglish && Object.prototype.hasOwnProperty.call(EN, key)) {
        el.innerHTML = EN[key];
      } else {
        el.innerHTML = originalText.get(el);
      }
    });

    ariaNodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (useEnglish && Object.prototype.hasOwnProperty.call(EN, key)) {
        el.setAttribute("aria-label", EN[key]);
      } else {
        el.setAttribute("aria-label", originalAria.get(el));
      }
    });

    document.documentElement.lang = lang;
    document.title = TITLES[lang];
    setMeta("description", DESCRIPTIONS[lang]);

    if (toggle) {
      toggle.textContent = useEnglish ? "Espa\u00f1ol" : "English";
      toggle.setAttribute("aria-label", useEnglish ? "Cambiar a espa\u00f1ol" : "Switch to English");
      toggle.setAttribute("lang", useEnglish ? "es" : "en");
    }

    try { localStorage.setItem("abuelos-lang", lang); } catch (e) { /* sin almacenamiento */ }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyLanguage(current === "es" ? "en" : "es");
    });
  }

  var stored = null;
  try { stored = localStorage.getItem("abuelos-lang"); } catch (e) { stored = null; }
  if (stored === "en") { applyLanguage("en"); }

  /* ---------- cabecera al hacer scroll ---------- */

  var header = document.querySelector(".site-header");
  var ticking = false;

  function syncHeader() {
    if (!header) { return; }
    header.classList.toggle("is-top", window.scrollY <= 16);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(syncHeader);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  syncHeader();

  /* ---------- copiar al portapapeles ---------- */

  function legacyCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () {
        return legacyCopy(text);
      });
    }
    return Promise.resolve(legacyCopy(text));
  }

  Array.prototype.slice.call(document.querySelectorAll("[data-copy]")).forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.querySelector(button.getAttribute("data-copy"));
      if (!target) { return; }
      var raw = target.tagName === "PRE"
        ? target.textContent.replace(/^\s+|\s+$/g, "")
        : target.textContent.replace(/\s+/g, " ").trim();

      copyText(raw).then(function (ok) {
        if (status) {
          status.textContent = ok ? STATUS_COPIED[current] : STATUS_FAILED[current];
        }
        if (!ok) { return; }
        if (!button.hasAttribute("data-label")) {
          button.setAttribute("data-label", button.textContent);
        }
        button.textContent = COPIED[current];
        window.setTimeout(function () {
          var label = button.getAttribute("data-label");
          if (label !== null) { button.textContent = label; }
        }, 1600);
      });
    });
  });
})();
