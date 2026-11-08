import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CURRENT, LINKS, META, VERSIONS, t, type Lang } from './content'

/* ------------------------------------------------------------------ iconos */

type IconProps = { className?: string }

function Icon({ children, className }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

const FolderIcon = () => (
  <Icon>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
  </Icon>
)
const GlobeIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.6 3.9 5.6 3.9 9S14.6 18.4 12 21c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" />
  </Icon>
)
const SlidersIcon = () => (
  <Icon>
    <path d="M4 7h10" />
    <path d="M18 7h2" />
    <circle cx="16" cy="7" r="2" />
    <path d="M4 17h4" />
    <path d="M12 17h8" />
    <circle cx="10" cy="17" r="2" />
  </Icon>
)
const MenuIcon = () => (
  <Icon>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Icon>
)
const CloseIcon = () => (
  <Icon>
    <path d="m6 6 12 12" />
    <path d="m18 6-12 12" />
  </Icon>
)
const LayerIcon = () => (
  <Icon>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 16 9 5 9-5" />
  </Icon>
)
const MonitorIcon = () => (
  <Icon>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
  </Icon>
)
const UsersIcon = () => (
  <Icon>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M16 5.2a3 3 0 0 1 0 5.6" />
    <path d="M18 14.4c1.9.8 3 2.6 3 5.6" />
  </Icon>
)
const CheckIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 2.6 2.6L16 9.6" />
  </Icon>
)
const ShieldIcon = () => (
  <Icon>
    <path d="M12 3 4.5 6v5.4c0 4.6 3.1 8.1 7.5 9.6 4.4-1.5 7.5-5 7.5-9.6V6L12 3Z" />
    <path d="m8.8 12 2.3 2.3 4.1-4.3" />
  </Icon>
)
const WarnIcon = () => (
  <Icon>
    <path d="M12 4 3 20h18L12 4Z" />
    <path d="M12 10v4.5" />
    <path d="M12 17.5h.01" />
  </Icon>
)
const CopyIcon = () => (
  <Icon>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </Icon>
)
const ArrowIcon = () => (
  <Icon>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Icon>
)

function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="abuelo-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1d4a70" />
          <stop offset="100%" stopColor="#2f6d99" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="240" height="240" rx="52" fill="url(#abuelo-logo)" />
      <g transform="translate(128 118)">
        <path d="M -62 18 L 0 -38 L 62 18 L 62 86 L 24 86 L 24 32 L -24 32 L -24 86 L -62 86 Z" fill="#f6b73c" />
        <path
          d="M 0 60 c -11 -13 -27 -20 -27 -34 c 0 -9 8 -17 17 -17 c 5 0 8 2 10 5 c 2 -3 5 -5 10 -5 c 9 0 17 8 17 17 c 0 14 -16 21 -27 34 Z"
          fill="#ffffff"
        />
      </g>
    </svg>
  )
}

/* --------------------------------------------------------------- portapapeles */

function legacyCopy(text: string): boolean {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.top = '-1000px'
  document.body.appendChild(area)
  area.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  document.body.removeChild(area)
  return ok
}

function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => legacyCopy(text),
    )
  }
  return Promise.resolve(legacyCopy(text))
}

function CopyButton({
  text,
  label,
  copiedLabel,
  onStatus,
  compact = false,
}: {
  text: string
  label: string
  copiedLabel: string
  onStatus: (message: string) => void
  compact?: boolean
}) {
  const [copied, setCopied] = useState(false)

  async function handleClick() {
    const ok = await copyText(text)
    onStatus(ok ? copiedLabel : '')
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button type="button" className={compact ? 'copy copy-compact' : 'copy'} onClick={handleClick}>
      <CopyIcon />
      <span>{copied ? copiedLabel : label}</span>
    </button>
  )
}

/* ---------------------------------------------------------------- piezas */

function Terminal({
  title,
  code,
  prompt,
  copyLabel,
  copiedLabel,
  onStatus,
}: {
  title: string
  code: string
  prompt?: string
  copyLabel: string
  copiedLabel: string
  onStatus: (message: string) => void
}) {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="dots" aria-hidden="true">
          <i className="dot dot-gold" />
          <i className="dot" />
          <i className="dot" />
        </span>
        <span className="terminal-title">{title}</span>
        <CopyButton text={code} label={copyLabel} copiedLabel={copiedLabel} onStatus={onStatus} compact />
      </div>
      <pre tabIndex={0}>
        <code>
          {code.split('\n').map((line, index) => (
            <span className="term-line" key={index}>
              {prompt ? <span className="prompt" aria-hidden="true">{prompt}</span> : null}
              {line}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

const HelpIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.3c-.7.4-1.2 1-1.2 1.8v.4" />
    <path d="M12 17.4h.01" />
  </Icon>
)

type DemoId = 'files' | 'net' | 'panel' | 'help'

const DEMO_ITEMS = [
  { id: 'files' as const, label: 'mock.files', icon: <FolderIcon /> },
  { id: 'net' as const, label: 'mock.net', icon: <GlobeIcon /> },
  { id: 'panel' as const, label: 'mock.panel', icon: <SlidersIcon /> },
  { id: 'help' as const, label: 'mock.help', icon: <HelpIcon /> },
]

const DEMO_CHIPS: Record<DemoId | 'home', string[]> = {
  home: ['mock.files', 'mock.net', 'mock.help'],
  files: ['demo.files.c1', 'demo.files.c2'],
  net: ['demo.net.c1', 'demo.net.c2'],
  panel: ['demo.panel.c1', 'demo.panel.c2'],
  help: ['demo.help.c1', 'demo.help.c2'],
}

function DesktopMock({ lang }: { lang: Lang }) {
  const tr = (key: string) => t(lang, key)
  const [active, setActive] = useState<DemoId | 'home'>('home')
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  const hour = now.getHours()
  const greeting = hour < 12 ? 'mock.morning' : hour < 20 ? 'mock.afternoon' : 'mock.evening'
  const time = now.toLocaleTimeString(lang === 'es' ? 'es-ES' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const titleKey = active === 'home' ? greeting : `demo.${active}.t`
  const noteKey = active === 'home' ? 'mock.note' : `demo.${active}.d`

  return (
    <figure className="hero-art">
      <div className="screen" role="group" aria-label={tr('mock.alt')}>
        <div className="screen-bar">
          <span className="dots" aria-hidden="true">
            <i className="dot dot-gold" />
            <i className="dot dot-sage" />
            <i className="dot" />
          </span>
          <span className="screen-title">{tr('mock.title')}</span>
        </div>
        <div className="screen-body">
          <div className="screen-rings" aria-hidden="true" />
          <ul className="screen-icons">
            {DEMO_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={active === item.id ? 'dicon-btn is-active' : 'dicon-btn'}
                  aria-pressed={active === item.id}
                  onClick={() => setActive(item.id)}
                >
                  <span className="dicon">{item.icon}</span>
                  <span className="dicon-label">{tr(item.label)}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="screen-card" aria-live="polite">
            <div className="screen-card-body" key={active}>
              <p className="screen-hello">{tr(titleKey)}</p>
              {active === 'home' ? <p className="screen-clock">{time}</p> : null}
              <p className="screen-note">{tr(noteKey)}</p>
              <div className="screen-chips">
                {DEMO_CHIPS[active].map((key) => (
                  <span key={key}>{tr(key)}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="screen-panel">
            <span className="panel-btn" aria-hidden="true"><MenuIcon /></span>
            <span className="panel-dot" />
            <span className="panel-dot" />
            <span className="panel-spacer" />
            <span className="panel-clock">{time}</span>
          </div>
        </div>
      </div>
      <figcaption>{tr('mock.demo')}</figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------ app */

const NAV = [
  { href: '#descargar', key: 'nav.download' },
  { href: '#instalar', key: 'nav.install' },
  { href: '#verificar', key: 'nav.verify' },
  { href: '#actualizar', key: 'nav.update' },
  { href: '#versiones', key: 'nav.versions' },
]

const FEATURES = [
  { icon: <LayerIcon />, t: 'about.s1.t', d: 'about.s1.d' },
  { icon: <MonitorIcon />, t: 'about.s2.t', d: 'about.s2.d' },
  { icon: <UsersIcon />, t: 'about.s3.t', d: 'about.s3.d' },
  { icon: <CheckIcon />, t: 'about.s4.t', d: 'about.s4.d' },
]

const STEPS = ['s1', 's2', 's3', 's4', 's5'] as const

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem('abuelos-lang') === 'en' ? 'en' : 'es'
    } catch {
      return 'es'
    }
  })
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [active, setActive] = useState('inicio')

  const progressRef = useRef<HTMLDivElement>(null)

  const tr = (key: string) => t(lang, key)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = META[lang].title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', META[lang].description)
    try {
      localStorage.setItem('abuelos-lang', lang)
    } catch {
      /* sin almacenamiento */
    }
  }, [lang])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!status) return
    const id = window.setTimeout(() => setStatus(''), 2200)
    return () => window.clearTimeout(id)
  }, [status])

  /* Sección activa en la navegación. */
  useEffect(() => {
    const ids = ['inicio', 'descargar', 'instalar', 'verificar', 'actualizar', 'versiones']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const toggleLang = () => setLang((value) => (value === 'es' ? 'en' : 'es'))
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip" href="#contenido">{tr('skip')}</a>

      <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
        <div className="wrap header-inner">
          <a className="brand" href="#inicio" aria-label={tr('brand.aria')} onClick={closeMenu}>
            <LogoMark className="mark" />
            <span className="brand-name">abuel-os</span>
          </a>

          <nav className="nav" aria-label={tr('nav.aria')}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className={active === item.href.slice(1) ? 'is-active' : undefined}>{tr(item.key)}</a>
            ))}
          </nav>

          <div className="header-tools">
            <a className="ghost hide-sm" href={LINKS.repo}>{tr('nav.github')}</a>
            <button
              className="lang"
              type="button"
              onClick={toggleLang}
              aria-label={tr('lang.aria')}
              lang={lang === 'es' ? 'en' : 'es'}
            >
              {tr('lang.toggle')}
            </button>
            <button
              className="menu-btn"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? tr('nav.close') : tr('nav.menu')}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <nav id="mobile-nav" className={menuOpen ? 'mobile-nav is-open' : 'mobile-nav'} aria-label={tr('nav.aria')}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={active === item.href.slice(1) ? 'is-active' : undefined} onClick={closeMenu}>{tr(item.key)}</a>
          ))}
          <a href={LINKS.repo} onClick={closeMenu}>{tr('nav.github')}</a>
        </nav>
        <div className="progress" ref={progressRef} aria-hidden="true" />
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1>{tr('hero.title')}</h1>
              <p className="hero-lead">{tr('hero.lead')}</p>
              <div className="hero-actions">
                <a className="btn btn-gold" href={LINKS.isoLatest}>{tr('hero.cta.download')}</a>
                <a className="btn btn-outline" href="#instalar">{tr('hero.cta.install')}</a>
              </div>
              <dl className="hero-facts">
                <div><dt>{tr('hero.f1.k')}</dt><dd>{tr('hero.f1.v')}</dd></div>
                <div><dt>{tr('hero.f2.k')}</dt><dd>{tr('hero.f2.v')}</dd></div>
                <div><dt>{tr('hero.f3.k')}</dt><dd>{tr('hero.f3.v')}</dd></div>
              </dl>
            </div>
            <DesktopMock lang={lang} />
          </div>
        </section>

        <section className="release" id="descargar" aria-labelledby="release-title">
          <div className="wrap">
            <div className="release-sheet">
              <div className="release-main">
                <h2 id="release-title">{tr('release.title')}</h2>
                <p className="release-version">{CURRENT.version}</p>
                <ul className="release-meta">
                  <li>{tr('release.arch')}</li>
                  <li>{tr('release.size')}</li>
                  <li><time dateTime={CURRENT.date}>{tr('release.date')}</time></li>
                </ul>
                <div className="release-actions">
                  <a className="btn btn-gold" href={LINKS.isoLatest}>{tr('release.download')}</a>
                  <a className="btn btn-quiet" href={LINKS.release108}>{tr('release.link')}</a>
                </div>
                <p className="micro">{tr('release.note')}</p>
              </div>

              <div className="release-verify">
                <p className="verify-label">{tr('release.sha')}</p>
                <code className="hash">{CURRENT.hash}</code>
                <CopyButton
                  text={CURRENT.hash}
                  label={tr('copy.hash')}
                  copiedLabel={tr('copied')}
                  onStatus={setStatus}
                />
                <p className="hint">
                  <ShieldIcon />
                  <span>{tr('release.hint')}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section about" id="que-es">
          <div className="wrap split">
            <div className="split-head">
              <h2>{tr('about.title')}</h2>
              <p className="section-lead">{tr('about.lead')}</p>
            </div>
            <ul className="features">
              {FEATURES.map((feature) => (
                <li key={feature.t}>
                  <div className="f-head">
                    <span className="f-icon">{feature.icon}</span>
                    <h3>{tr(feature.t)}</h3>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: tr(feature.d) }} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section install" id="instalar">
          <div className="wrap split">
            <div className="split-head">
              <h2>{tr('install.title')}</h2>
              <p className="section-lead">{tr('install.lead')}</p>
              <div className="callout">
                <WarnIcon />
                <div>
                  <strong>{tr('install.warn.k')}</strong>
                  <p>{tr('install.warn.v')}</p>
                </div>
              </div>
            </div>
            <ol className="steps">
              {STEPS.map((step) => (
                <li key={step}>
                  <span className="step-num" aria-hidden="true" />
                  <div>
                    <h3>{tr(`install.${step}.t`)}</h3>
                    <p dangerouslySetInnerHTML={{ __html: tr(`install.${step}.d`) }} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section verify" id="verificar">
          <div className="wrap split">
            <div className="split-head">
              <h2>{tr('verify.title')}</h2>
              <p className="section-lead">{tr('verify.lead')}</p>
              <p className="micro" dangerouslySetInnerHTML={{ __html: tr('verify.note') }} />
            </div>
            <div className="terminals">
              <Terminal
                title={tr('verify.win')}
                prompt="PS>"
                code={'Get-FileHash "$HOME\\Downloads\\abuelo-os-amd64.iso" -Algorithm SHA256'}
                copyLabel={tr('copy.cmd')}
                copiedLabel={tr('copied')}
                onStatus={setStatus}
              />
              <Terminal
                title={tr('verify.linux')}
                prompt="$"
                code={'sha256sum abuelo-os-amd64.iso'}
                copyLabel={tr('copy.cmd')}
                copiedLabel={tr('copied')}
                onStatus={setStatus}
              />
            </div>
          </div>
        </section>

        <section className="section update" id="actualizar">
          <div className="wrap split">
            <div className="split-head">
              <h2>{tr('update.title')}</h2>
              <p className="section-lead">{tr('update.lead')}</p>
              <p className="section-lead" dangerouslySetInnerHTML={{ __html: tr('update.detail') }} />
              <p className="links"><a href={LINKS.updates108}>{tr('update.link')} <ArrowIcon /></a></p>
            </div>
            <div className="update-side">
              <div className="layers">
                <div className="layer layer-top">
                  <span className="layer-tag">{tr('update.layer1.tag')}</span>
                  <p dangerouslySetInnerHTML={{ __html: tr('update.layer1.d') }} />
                </div>
                <div className="layer layer-base">
                  <span className="layer-tag">{tr('update.layer2.tag')}</span>
                  <p dangerouslySetInnerHTML={{ __html: tr('update.layer2.d') }} />
                </div>
              </div>
              <Terminal
                title={tr('update.cmdlabel')}
                prompt="$"
                code={'abuelo-update --check\nsudo abuelo-update --install'}
                copyLabel={tr('copy.cmd')}
                copiedLabel={tr('copied')}
                onStatus={setStatus}
              />
            </div>
          </div>
        </section>

        <section className="section versions" id="versiones">
          <div className="wrap">
            <div className="versions-head">
              <h2>{tr('versions.title')}</h2>
              <p className="section-lead">{tr('versions.lead')}</p>
            </div>
            <div className="table-scroll">
              <table className="versions">
                <thead>
                  <tr>
                    <th scope="col">{tr('table.version')}</th>
                    <th scope="col">{tr('table.date')}</th>
                    <th scope="col">{tr('table.hash')}</th>
                    <th scope="col">{tr('table.release')}</th>
                  </tr>
                </thead>
                <tbody>
                  {VERSIONS.map((version) => (
                    <tr key={version.version} className={version.latest ? 'is-latest' : undefined}>
                      <th scope="row">
                        {version.latest && <span className="current">{tr('versions.current')}</span>}
                        <a href={version.tree}>{version.version}</a>
                      </th>
                      <td><time dateTime={version.date}>{version.date}</time></td>
                      <td><code className="tiny">{version.hash}</code></td>
                      <td><a href={version.release}>v{version.version}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="links">
              <a href={LINKS.index}>{tr('versions.index')} <ArrowIcon /></a>
              <a href={LINKS.issues108}>{tr('versions.issues')} <ArrowIcon /></a>
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <LogoMark className="mark" />
            <p className="footer-word">abuel-os</p>
            <p className="footer-tagline">{tr('footer.tagline')}</p>
          </div>
          <div className="footer-side">
            <p className="footer-legal">{tr('footer.legal')}</p>
            <p className="footer-links">
              <a href={LINKS.repo}>GitHub</a>
              <a href={LINKS.releases}>{tr('footer.releases')}</a>
              <a href={LINKS.issues}>{tr('footer.issues')}</a>
              <a href={LINKS.license}>{tr('footer.license')}</a>
            </p>
            <p className="footer-copy">© 2026 ericsnet</p>
          </div>
        </div>
      </footer>

      <div className="sr-only" role="status" aria-live="polite">{status}</div>
    </>
  )
}
