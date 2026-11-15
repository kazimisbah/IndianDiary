import { useCallback, useEffect, useRef, useState } from 'react'
import { FAQS, GALLERY, TESTIMONIALS } from '../config'
import { prefersReducedMotion } from '../hooks'
import Icon from './Icons'
import { Img, Reveal, SectionHeading } from './ui'

/* ======================= GIFTING & SEASONAL ======================= */
/* SWAP: images for each gifting card */
const GIFTING = [
  {
    title: 'Corporate New Year diaries',
    text: 'Dated diaries with your logo, holiday lists and company pages, delivered before the year turns.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=75',
    tag: 'Order by October',
  },
  {
    title: 'Festival gifting',
    text: 'Special editions for Diwali, Eid, Christmas and the New Year, with festive foils and gift boxes.',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=75',
    tag: 'Diwali · Eid · Christmas',
  },
  {
    title: 'Employee welcome kits',
    text: 'Onboarding sets of a journal, pen and branded box that make day one memorable.',
    image: 'https://images.unsplash.com/photo-1528938102132-4a9276b8e320?auto=format&fit=crop&w=900&q=75',
    tag: 'HR & onboarding',
  },
]

export function Gifting({ onEnquire }) {
  return (
    <section id="gifting" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Gifting & seasonal" title="Gifts that get used every day" lead="A good diary is a gift your clients and teams carry with them all year, with your brand on the cover." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {GIFTING.map((g, i) => (
            <Reveal key={g.title} delay={i * 110} className="tilt-group group card overflow-hidden">
              <div className="cover-tilt relative aspect-[4/3]">
                <Img src={g.image} alt={g.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute top-4 left-4 rounded-full bg-bg/90 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">{g.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.text}</p>
                <button type="button" onClick={() => onEnquire({ category: g.title, notes: `Gifting enquiry: ${g.title}` })} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all">
                  Enquire <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="stitch relative mt-10 overflow-hidden rounded-3xl bg-forest-800 p-8 text-cream-100 sm:p-12">
          <svg className="absolute -top-10 -right-10 h-64 w-64 text-gold-400/10" viewBox="0 0 100 100" aria-hidden="true">
            <path fill="currentColor" d="M50 0 61 39 100 50 61 61 50 100 39 61 0 50 39 39Z" />
          </svg>
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow !text-gold-300">Seasonal planning</p>
              <h3 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Plan your New Year diary order early</h3>
              <p className="mt-3 max-w-xl text-cream-200/80">
                Our Q4 slots fill up fast. Confirm by October to lock in your preferred materials, and you get a sample and on-time delivery for January.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEnquire({ category: 'Corporate & Executive Diaries', notes: 'New Year diary order: please share options and timelines.' })}
              className="btn-gold shrink-0 !px-8 !py-4"
            >
              Reserve production slot <Icon name="calendar" className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ======================= GALLERY + LIGHTBOX ======================= */
function Lightbox({ index, onClose, onNav }) {
  const closeRef = useRef(null)
  const item = GALLERY[index]

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [onClose, onNav])

  return (
    <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-sm" onClick={onClose}>
      <figure key={index} className="pop-in relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={item.src.replace('w=1200', 'w=1800')} alt={item.alt} className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl" />
        <figcaption className="mt-3 text-center text-sm text-cream-200/80">
          {item.alt} <span className="opacity-60">· {index + 1} / {GALLERY.length}</span>
        </figcaption>
      </figure>
      <button ref={closeRef} type="button" onClick={onClose} className="absolute top-4 right-4 rounded-full bg-white/10 p-3 text-cream-100 hover:bg-white/20" aria-label="Close image viewer">
        <Icon name="close" className="h-5 w-5" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onNav(-1) }} className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream-100 hover:bg-white/20" aria-label="Previous image">
        <Icon name="chevronLeft" className="h-6 w-6" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onNav(1) }} className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream-100 hover:bg-white/20" aria-label="Next image">
        <Icon name="chevronRight" className="h-6 w-6" />
      </button>
    </div>
  )
}

export function Gallery() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const nav = useCallback((d) => setOpen((i) => (i + d + GALLERY.length) % GALLERY.length), [])

  return (
    <section id="gallery" className="bg-surface-2/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Gallery" title="Paper, craft and finished pieces" lead="A look at materials, finishes and diaries in use. Tap any photo to enlarge it." />
        {/* SWAP: gallery photos live in config.js → GALLERY */}
        <ul className="mt-14 columns-2 gap-4 md:columns-3 lg:columns-4">
          {GALLERY.map((g, i) => (
            <Reveal as="li" key={g.src} delay={(i % 4) * 80} className="mb-4 break-inside-avoid">
              <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-2xl bg-surface-2" aria-label={`Enlarge: ${g.alt}`}>
                <Img src={g.src.replace('w=1200', 'w=700')} alt={g.alt} className={`w-full object-cover transition duration-700 group-hover:scale-105 ${g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/70 via-transparent opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="flex items-center gap-2 p-4 text-left text-xs text-cream-100">
                    <Icon name="search" className="h-4 w-4 shrink-0" /> {g.alt}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
      {open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}
    </section>
  )
}

/* ======================= TESTIMONIALS ======================= */
export function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIALS.length
  const go = (d) => setI((x) => (x + d + n) % n)

  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const t = setInterval(() => setI((x) => (x + 1) % n), 6500)
    return () => clearInterval(t)
  }, [paused, n])

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What our clients say" />
        <Reveal
          className="card stitch relative mt-12 overflow-hidden p-8 sm:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <svg viewBox="0 0 40 30" className="h-9 w-12 text-gold-500/60" aria-hidden="true">
            <path d="M0 30V17C0 7 6 1 15 0v6c-5 1-7 5-7 10h7v14H0Zm24 0V17c0-10 6-16 15-17v6c-5 1-7 5-7 10h7v14H24Z" fill="currentColor" />
          </svg>
          <div className="relative mt-4 min-h-[220px] sm:min-h-[180px]">
            {TESTIMONIALS.map((t, idx) => (
              <figure
                key={idx}
                aria-hidden={idx !== i}
                className={`absolute inset-0 transition-all duration-700 ${idx === i ? 'translate-x-0 opacity-100' : idx < i ? '-translate-x-8 opacity-0' : 'translate-x-8 opacity-0'}`}
              >
                <blockquote className="font-serif text-xl leading-relaxed text-balance sm:text-2xl">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="flex text-gold-500" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
                      </svg>
                    ))}
                  </span>
                  <strong>{t.name}</strong>
                  <span className="text-muted">
                    {t.role} · {t.location}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  aria-current={idx === i}
                  className={`h-2 rounded-full transition-all ${idx === i ? 'w-8 bg-accent' : 'w-2 bg-line hover:bg-muted'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} className="rounded-full border border-line p-2.5 hover:border-accent" aria-label="Previous testimonial">
                <Icon name="chevronLeft" className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go(1)} className="rounded-full border border-line p-2.5 hover:border-accent" aria-label="Next testimonial">
                <Icon name="chevronRight" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ======================= FAQ ======================= */
export function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-surface-2/50 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions buyers often ask" />
        <Reveal className="mt-12 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-serif text-lg font-semibold transition hover:bg-surface-2/60"
                  >
                    {f.q}
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand text-brand-fg' : ''}`}>
                      <Icon name="chevronDown" className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
