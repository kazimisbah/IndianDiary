import { IMAGES, SITE, STATS } from '../config'
import { useCountUp, useInView } from '../hooks'
import Icon from './Icons'
import { Flourish, Img, Reveal, SectionHeading } from './ui'

/* ---------------- Trust bar ---------------- */
const TRUST = [
  { icon: 'globe', label: 'Domestic + Export Ready' },
  { icon: 'palette', label: 'Fully Custom Orders' },
  { icon: 'feather', label: 'Best-Quality Paper' },
  { icon: 'boxes', label: 'Bulk Capacity' },
  { icon: 'truck', label: 'On-time Delivery' },
  { icon: 'shield', label: 'Quality Checked at Every Stage' },
]

export function TrustBar() {
  const items = [...TRUST, ...TRUST] // duplicated for a seamless marquee loop
  return (
    <section aria-label="Why buyers trust us" className="relative border-y border-line bg-surface">
      <div className="overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="marquee flex w-max items-center gap-12 pr-12">
          {items.map((t, i) => (
            <li key={i} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium" aria-hidden={i >= TRUST.length}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-accent">
                <Icon name={t.icon} className="h-4.5 w-4.5" />
              </span>
              {t.label}
              <span className="ml-9 text-gold-500" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------- Stats counter ---------------- */
function Stat({ value, suffix, label, start, delay }) {
  const n = useCountUp(value, start, 2200)
  return (
    <Reveal delay={delay} className="text-center sm:text-left">
      <div className="font-serif text-4xl font-semibold text-fg tabular-nums sm:text-5xl">
        {n.toLocaleString('en-US')}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </Reveal>
  )
}

export function Stats() {
  const [ref, visible] = useInView({ threshold: 0.3 })
  return (
    <div ref={ref} className="card stitch mt-16 grid grid-cols-2 gap-8 p-8 sm:p-10 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <Stat key={s.label} {...s} start={visible} delay={i * 100} />
      ))}
    </div>
  )
}

/* ---------------- About ---------------- */
export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            {/* SWAP: IMAGES.about / IMAGES.heritage in config.js → your factory & team photos */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink-900/20">
              <Img src={IMAGES.about} alt="Person writing in a diary at a desk" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -right-4 -bottom-10 hidden w-56 overflow-hidden rounded-2xl border-[6px] border-bg shadow-xl sm:block lg:-right-10">
              <Img src={IMAGES.heritage} alt="Shelves of bound books showing traditional binding craft" className="aspect-square w-full object-cover" />
            </div>
            <div className="absolute top-8 -left-3 rounded-2xl bg-brand px-5 py-4 text-brand-fg shadow-xl sm:-left-8">
              <div className="font-serif text-3xl font-semibold">Kolkata</div>
              <div className="text-[11px] tracking-[.25em] uppercase opacity-80">Collins Street workshop</div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="About us"
              title={
                <>
                  A Kolkata paper craft, <em className="text-accent">bound for the world</em>
                </>
              }
            />
            <Reveal delay={100} className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {/* EDIT: your company story */}
              <p>
                {SITE.companyName} began in the stationery lanes around Collins Street, in a city that has sold paper,
                print and books for well over a century. We started as a small binding workshop. Today we design and
                manufacture every kind of diary, from boardroom executive diaries to school almanacs, for clients across India.
              </p>
              <p>
                Every diary still passes through skilled hands: paper chosen by touch, covers cut and stitched with care,
                and branding checked under the light. Now we are taking that same craft to importers, distributors and
                brands around the world.
              </p>
            </Reveal>

            <Reveal delay={200} className="relative mt-10 rounded-2xl border border-line bg-surface-2/60 p-7">
              <svg viewBox="0 0 40 30" className="absolute -top-4 left-6 h-8 w-10 text-gold-500" aria-hidden="true">
                <path d="M0 30V17C0 7 6 1 15 0v6c-5 1-7 5-7 10h7v14H0Zm24 0V17c0-10 6-16 15-17v6c-5 1-7 5-7 10h7v14H24Z" fill="currentColor" />
              </svg>
              {/* EDIT: founder's note */}
              <p className="font-serif text-lg leading-relaxed italic">
                “A diary is with someone every single day, so it has to be made with that much care. We put Kolkata's
                craftsmanship into every page, whether the order is for one office down the road or a distributor on
                another continent.”
              </p>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand font-serif text-lg text-brand-fg" aria-hidden="true">
                  SI
                </div>
                <div>
                  <div className="font-semibold">{SITE.founder}</div>
                  <div className="text-sm text-muted">Founder & Owner, {SITE.companyName}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Stats />
        <Flourish className="mx-auto mt-16" />
      </div>
    </section>
  )
}
