import { useEffect, useState } from 'react'
import { NAV, SITE } from '../config'
import { scrollToId } from '../hooks'
import Icon, { LogoMark } from './Icons'

/* Language switcher placeholder.
 * To add real translations later, plug in an i18n library (e.g. react-i18next)
 * and switch the language inside onLanguageChange below. */
const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
]

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* storage unavailable — ignore */
    }
  }, [dark])
  return [dark, setDark]
}

export default function Header({ onToast }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [lang, setLang] = useState('en')
  const [dark, setDark] = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav link of the section currently on screen
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
    history.replaceState(null, '', `#${id}`)
  }

  const onLanguageChange = (e) => {
    const code = e.target.value
    setLang(code)
    if (code !== 'en') {
      const l = LANGUAGES.find((x) => x.code === code)
      onToast?.(`${l.label} version coming soon. The site is shown in English for now.`)
    }
  }

  const solid = scrolled || open
  const tone = solid ? 'text-fg' : 'text-cream-100'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'border-b border-line bg-bg/85 py-2.5 shadow-sm backdrop-blur-xl' : 'py-4'
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8 ${tone}`}>
        {/* LOGO — replace <LogoMark/> with <img src="/logo.svg" .../> when you have one */}
        <a href="#top" onClick={go('top')} className="flex min-w-0 items-center gap-2.5" aria-label={`${SITE.companyName} home`}>
          <LogoMark className="h-9 w-9 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-serif text-lg font-semibold tracking-tight">{SITE.companyName}</span>
            <span className={`block truncate text-[10px] font-medium uppercase tracking-[0.25em] ${solid ? 'text-accent' : 'text-gold-300'}`}>
              Diary Manufacturers · Kolkata
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative rounded-full px-2.5 py-2 text-sm font-medium whitespace-nowrap transition hover:opacity-100 ${
                    active === n.id ? 'opacity-100' : 'opacity-75'
                  }`}
                >
                  {n.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gold-400 transition-transform duration-500 ${
                      active === n.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5 xl:ml-4">
          <label className="relative hidden items-center sm:flex" title="Language">
            <span className="sr-only">Language</span>
            <Icon name="globe" className="pointer-events-none absolute left-2.5 h-4 w-4 opacity-80" />
            <select
              value={lang}
              onChange={onLanguageChange}
              className="cursor-pointer appearance-none rounded-full border border-current/20 bg-transparent py-1.5 pr-3 pl-8 text-xs font-semibold"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="text-ink-900">
                  {l.short}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className="rounded-full p-2 transition hover:bg-current/10"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon name={dark ? 'sun' : 'moon'} className="h-5 w-5" />
          </button>

          <a
            href={`tel:${SITE.phoneTel}`}
            className="hidden items-center gap-2 rounded-full border border-current/25 px-3.5 py-2 text-sm font-semibold transition hover:border-current md:inline-flex"
            aria-label={`Call ${SITE.phoneDisplay}`}
          >
            <Icon name="phone" className="h-4 w-4" />
            <span className="hidden whitespace-nowrap 2xl:inline">{SITE.phoneDisplay}</span>
          </a>

          <a href="#book-demo" onClick={go('book-demo')} className="btn-gold hidden !px-5 !py-2.5 whitespace-nowrap sm:inline-flex">
            Book a Demo
          </a>

          <button
            type="button"
            className="rounded-full p-2 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-500 xl:hidden ${
          open ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 pt-3 pb-6 sm:px-6">
          <ul className="grid gap-1 border-t border-line pt-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-between rounded-xl px-3 py-3 font-serif text-lg hover:bg-surface-2"
                >
                  {n.label}
                  <Icon name="chevronRight" className="h-4 w-4 text-accent" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a href={`tel:${SITE.phoneTel}`} tabIndex={open ? 0 : -1} className="btn-ghost text-fg">
              <Icon name="phone" className="h-4 w-4" /> Call
            </a>
            <a href="#book-demo" onClick={go('book-demo')} tabIndex={open ? 0 : -1} className="btn-primary">
              Book a Demo
            </a>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-muted sm:hidden">
            <Icon name="globe" className="h-4 w-4" />
            <span>Language</span>
            <select value={lang} onChange={onLanguageChange} tabIndex={open ? 0 : -1} className="field !w-auto !py-1.5">
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
        </nav>
      </div>
    </header>
  )
}
