import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Button, Glass, Menu, SegmentedControl, Slider, Switch, TabBar } from 'glisse'
import { t, type Lang } from '../content'

export type OsApp = 'files' | 'net' | 'panel' | 'help'

const glyph = (children: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const FolderGlyph = glyph(
  <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />,
)
const GlobeGlyph = glyph(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.6 3.9 5.6 3.9 9S14.6 18.4 12 21c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" />
  </>,
)
const SlidersGlyph = glyph(
  <>
    <path d="M4 7h10" />
    <path d="M18 7h2" />
    <circle cx="16" cy="7" r="2" />
    <path d="M4 17h4" />
    <path d="M12 17h8" />
    <circle cx="10" cy="17" r="2" />
  </>,
)
const HelpGlyph = glyph(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.3c-.7.4-1.2 1-1.2 1.8v.4" />
    <path d="M12 17.4h.01" />
  </>,
)

export function OsDock({
  lang,
  active,
  onSelect,
}: {
  lang: Lang
  active: OsApp | 'home'
  onSelect: (app: OsApp) => void
}) {
  const tr = (key: string) => t(lang, key)
  return (
    <TabBar
      className="os-dock"
      aria-label={tr('os.apps')}
      value={active === 'home' ? null : active}
      onValueChange={(value) => onSelect(value as OsApp)}
      items={[
        { value: 'files', label: tr('mock.files'), icon: FolderGlyph },
        { value: 'net', label: tr('mock.net'), icon: GlobeGlyph },
        { value: 'panel', label: tr('mock.panel'), icon: SlidersGlyph },
        { value: 'help', label: tr('mock.help'), icon: HelpGlyph },
      ]}
    />
  )
}

export function OsPanel({
  lang,
  textSize,
  onTextSize,
  sound,
  onSound,
  onClose,
  onHelp,
  onReset,
}: {
  lang: Lang
  textSize: number
  onTextSize: (value: number) => void
  sound: boolean
  onSound: (value: boolean) => void
  onClose: () => void
  onHelp: () => void
  onReset: () => void
}) {
  const tr = (key: string) => t(lang, key)
  const [saved, setSaved] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    [],
  )

  const preset = textSize <= 15 ? 'small' : textSize >= 20 ? 'large' : 'normal'

  const apply = () => {
    setSaved(true)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setSaved(false), 1600)
  }

  return (
    <Glass className="os-panel">
      <div className="os-panel-head">
        <div>
          <p className="os-panel-title">{tr('demo.panel.t')}</p>
          <p className="os-panel-sub">{tr('demo.panel.d')}</p>
        </div>
        <Menu
          aria-label={tr('os.panel.menu')}
          align="end"
          items={[
            { label: tr('os.reset'), onSelect: onReset },
            { label: tr('os.help'), onSelect: onHelp },
            'separator',
            { label: tr('os.close'), onSelect: onClose },
          ]}
        />
      </div>

      <div className="os-row">
        <span className="os-label">{tr('os.text')}</span>
        <SegmentedControl
          aria-label={tr('os.text')}
          items={[
            { value: 'small', label: tr('os.text.small') },
            { value: 'normal', label: tr('os.text.normal') },
            { value: 'large', label: tr('os.text.large') },
          ]}
          value={preset}
          onValueChange={(value) => onTextSize(value === 'small' ? 14 : value === 'large' ? 21 : 17)}
        />
      </div>

      <div className="os-row">
        <span className="os-label">{tr('os.size')}</span>
        <Slider
          className="os-slider"
          aria-label={tr('os.size')}
          min={14}
          max={24}
          value={textSize}
          onValueChange={onTextSize}
        />
      </div>

      <div className="os-row">
        <span className="os-label">{tr('os.sound')}</span>
        <Switch aria-label={tr('os.sound')} checked={sound} onCheckedChange={onSound} />
      </div>

      <p className="os-preview" style={{ fontSize: textSize }}>
        {tr('os.preview')}
      </p>

      <div className="os-actions">
        <Button variant="filled" tint="#f0b54a" onClick={apply}>
          {saved ? tr('os.saved') : tr('os.apply')}
        </Button>
      </div>
    </Glass>
  )
}
