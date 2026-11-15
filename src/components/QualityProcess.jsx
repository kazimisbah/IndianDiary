import { useEffect, useRef, useState } from 'react'
import { CERTIFICATIONS, IMAGES } from '../config'
import { useInView } from '../hooks'
import Icon from './Icons'
import { Img, Reveal, SectionHeading } from './ui'

/* ======================= QUALITY & PAPER ======================= */
const QUALITY_POINTS = [
  { icon: 'leaf', title: 'Responsible paper sourcing', text: 'We buy from established Indian mills, with FSC-certified and recycled stock available on request.' },
  { icon: 'droplet', title: 'Bleed-resistant pages', text: 'Sized paper keeps ink crisp, with minimal show-through, even with gel and fountain pens.' },
  { icon: 'feather', title: 'Smooth writing feel', text: 'Calendered surfaces let pens glide easily, without feathering or scratchiness.' },
  { icon: 'book', title: 'Binding that lasts', text: 'Thread-sewn, case-bound and double-wire options are tested to open flat and last the year.' },
  { icon: 'search', title: 'Checked at every stage', text: 'We inspect paper, print, binding, branding and packing, with a final AQL check before dispatch.' },
  { icon: 'shield', title: 'Consistent reorders', text: 'Approved samples and documented specs keep your third reorder matching your first.' },
]

const GSM_SCALE = [
  { gsm: 70, use: 'Economy notebooks' },
  { gsm: 80, use: 'Everyday diaries' },
  { gsm: 100, use: 'Premium journals' },
  { gsm: 120, use: 'Luxury & art pages' },
]

export function Quality() {
  const [ref, visible] = useInView({ threshold: 0.4 })
  return (
    <section id="quality" className="bg-ink-900 py-24 text-cream-100 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow={<span className="text-gold-300">Quality & paper</span>}
              title={
                <>
                  It starts with <em className="text-gold-300">the paper</em>
                </>
              }
              lead={<span className="text-cream-200/75">Good diaries are judged on the first page. Here is how we make sure yours feels right from page one to page 365.</span>}
            />

            {/* GSM explainer */}
            <Reveal delay={100} className="mt-10 rounded-2xl border border-white/10 bg-white/[.04] p-6">
              <h3 className="flex items-center gap-2 font-serif text-xl">
                <Icon name="layers" className="h-5 w-5 text-gold-300" /> GSM, explained
              </h3>
              <p className="mt-2 text-sm text-cream-200/70">
                GSM (grams per square metre) measures paper weight. Higher GSM means thicker, more opaque pages. We offer 70 to 120 GSM.
              </p>
              <div ref={ref} className="mt-6 grid grid-cols-4 items-end gap-3">
                {GSM_SCALE.map((g, i) => (
                  <div key={g.gsm} className="text-center">
                    <div className="mx-auto flex h-28 w-full max-w-16 items-end overflow-hidden rounded-t-lg bg-white/5">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-gold-600 to-gold-300 transition-[height] duration-1000 ease-out"
                        style={{ height: visible ? `${30 + i * 23}%` : '0%', transitionDelay: `${i * 120}ms` }}
                      />
                    </div>
                    <div className="mt-2 font-serif text-lg font-semibold">{g.gsm}</div>
                    <div className="text-[11px] leading-tight text-cream-200/60">{g.use}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {QUALITY_POINTS.map((q, i) => (
              <Reveal key={q.title} delay={i * 80} className="rounded-2xl border border-white/10 bg-white/[.04] p-6 transition hover:border-gold-400/40 hover:bg-white/[.07]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
                  <Icon name={q.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold">{q.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream-200/70">{q.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="relative min-h-72 overflow-hidden rounded-2xl">
            {/* SWAP: IMAGES.paper → photo of your paper stock */}
            <Img src={IMAGES.paper} alt="Close-up of textured cream paper" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-800/90 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-widest text-gold-300 uppercase">
                <Icon name="leaf" className="h-4 w-4" /> Sustainability
              </span>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-cream-100">
                Choose FSC-certified or 100% recycled paper, kraft and cork covers, or seed-paper covers that can be planted
                after use. We also offer plastic-free packing on request.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl border border-white/10 bg-white/[.04] p-6 sm:p-8">
            <h3 className="font-serif text-xl">Certifications & registrations</h3>
            {/* EDIT: confirm or remove each badge in config.js → CERTIFICATIONS */}
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {CERTIFICATIONS.map((c) => (
                <li key={c.label} className="flex items-center gap-4 rounded-xl border border-dashed border-gold-400/30 p-4">
                  <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0 text-gold-300" aria-hidden="true">
                    <circle cx="24" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="24" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth=".8" strokeDasharray="2 2" />
                    <path d="M18 32 15 45l9-4 9 4-3-13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="m19 20 3.5 3.5L29 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold">{c.label}</div>
                    <div className="text-xs text-cream-200/50">{c.note}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ======================= MANUFACTURING PROCESS ======================= */
const STEPS = [
  { icon: 'chat', title: 'Consultation', text: 'We understand your use, audience, quantity, budget and deadline, then recommend the right build.' },
  { icon: 'pen', title: 'Design & sampling', text: 'Our designers prepare digital proofs and a physical sample for your approval.' },
  { icon: 'layers', title: 'Paper selection', text: 'We match the paper type, GSM and ruling to how your diary will be used.' },
  { icon: 'printer', title: 'Printing', text: 'Offset and digital printing for inner pages, calendars and covers, colour-matched to your brand.' },
  { icon: 'scissors', title: 'Binding & finishing', text: 'Sewing, casing, wiro, foiling, debossing, edge gilding and add-ons, all done in-house.' },
  { icon: 'search', title: 'Quality inspection', text: 'Every batch is checked page by page and finish by finish against the approved sample.' },
  { icon: 'gift', title: 'Packaging', text: 'Shrink-wrap, gift boxes and retail packs, in export-grade 5-ply cartons.' },
  { icon: 'ship', title: 'Domestic or export dispatch', text: 'Door delivery across India, or sea and air freight worldwide with full documentation.' },
]

export function Process() {
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0)

  // Fill the timeline line as the visitor scrolls through the section
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (vh * 0.6 - r.top) / r.height
      setProgress(Math.max(0, Math.min(1, p)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="process" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="From paper to product"
          title="Our manufacturing process"
          lead="Eight careful stages under one roof in Kolkata, so you get one point of contact and complete control over quality."
        />

        <ol ref={wrapRef} className="relative mt-16">
          {/* track + animated fill */}
          <div className="absolute top-0 bottom-0 left-6 w-px bg-line lg:left-1/2" aria-hidden="true" />
          <div
            className="absolute top-0 left-6 w-px origin-top bg-gradient-to-b from-gold-400 to-copper-500 lg:left-1/2"
            style={{ height: `${progress * 100}%` }}
            aria-hidden="true"
          />

          {STEPS.map((s, i) => {
            const done = progress * STEPS.length > i + 0.3
            const left = i % 2 === 0
            return (
              <li key={s.title} className="relative grid pb-12 pl-20 last:pb-0 lg:grid-cols-2 lg:pl-0">
                <span
                  className={`absolute top-0 left-0 z-10 grid h-12 w-12 place-items-center rounded-full border-2 transition-[background-color,border-color,color,scale,box-shadow] duration-500 lg:left-[calc(50%-1.5rem)] ${
                    done ? 'scale-100 border-gold-400 bg-brand text-brand-fg shadow-lg shadow-gold-500/30' : 'scale-90 border-line bg-surface text-muted'
                  }`}
                  aria-hidden="true"
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <Reveal
                  delay={60}
                  className={`card p-6 ${left ? 'lg:col-start-1 lg:mr-14 lg:text-right' : 'lg:col-start-2 lg:ml-14'}`}
                >
                  <span className="text-xs font-semibold tracking-widest text-accent uppercase">Step {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-1 font-serif text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ======================= WHO WE SERVE ======================= */
const AUDIENCES = [
  { icon: 'building', title: 'Corporates & MNCs', text: 'Executive diaries, welcome kits and annual gifting.' },
  { icon: 'bank', title: 'Banks & insurance', text: 'Year-planner diaries for branches, agents and clients.' },
  { icon: 'pharma', title: 'Pharmaceutical companies', text: 'Doctor gifting diaries and medical-rep planners.' },
  { icon: 'cap', title: 'Educational institutions', text: 'School almanacs, student planners and notebooks.' },
  { icon: 'hotel', title: 'Hotels & hospitality', text: 'Room notepads, guest journals and amenity stationery.' },
  { icon: 'calendar', title: 'Event organizers', text: 'Conference notebooks and delegate kits, delivered on deadline.' },
  { icon: 'store', title: 'Retailers & distributors', text: 'Retail-ready ranges with barcodes and display packs.' },
  { icon: 'gift', title: 'Gifting companies', text: 'Curated gift sets and hampers, with bulk branding.' },
  { icon: 'plane', title: 'International importers', text: 'Private-label and OEM diaries with export documentation.' },
]

export function WhoWeServe() {
  return (
    <section id="clients" className="bg-surface-2/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Who we serve" title="Trusted by teams, schools and brands" lead="From a 200-piece corporate order to container loads for overseas distributors." />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 3) * 90} className="group card flex gap-4 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent transition group-hover:bg-brand group-hover:text-brand-fg">
                <Icon name={a.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
