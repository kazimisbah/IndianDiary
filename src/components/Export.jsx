import { useMemo } from 'react'
import { EXPORT_INFO } from '../config'
import { scrollToId, useInView } from '../hooks'
import Icon from './Icons'
import { Reveal, SectionHeading } from './ui'

/* ---------------------------------------------------------------------------
 * Dotted world map, generated from rough continent outlines ([lon, lat]).
 * It's decorative, so the shapes are intentionally simplified.
 * -------------------------------------------------------------------------*/
const LAND = [
  // North America
  [[-168,66],[-162,70],[-156,71.5],[-140,70],[-128,70],[-115,68],[-95,72],[-82,73],[-80,63],[-90,57],[-95,59],[-82,52],[-78,57],[-70,60],[-64,60],[-56,52],[-60,47],[-66,44],[-70,42],[-74,40],[-76,35],[-81,31],[-80,25],[-84,30],[-90,29],[-97,27],[-97,22],[-95,18],[-90,21],[-87,21],[-88,16],[-84,15],[-83,10],[-79,9],[-78,7],[-83,8],[-86,12],[-92,14],[-96,16],[-105,20],[-106,23],[-112,29],[-117,32],[-121,35],[-124,40],[-124,46],[-123,49],[-130,54],[-135,58],[-142,60],[-150,61],[-154,57],[-162,55],[-158,59],[-165,61],[-166,64]],
  // Greenland
  [[-55,60],[-43,60],[-35,65],[-22,70],[-20,77],[-18,81],[-35,83],[-60,82],[-70,78],[-60,75],[-55,70],[-52,65]],
  // Iceland
  [[-24,64],[-14,64],[-14,66],[-22,66.5]],
  // South America
  [[-80,9],[-75,11],[-72,12],[-62,11],[-52,5],[-50,0],[-44,-2],[-35,-5],[-35,-9],[-39,-14],[-40,-21],[-48,-26],[-53,-34],[-58,-38],[-62,-40],[-65,-45],[-68,-50],[-69,-55],[-72,-53],[-74,-46],[-73,-37],[-71,-28],[-70,-18],[-76,-14],[-81,-6],[-80,-2],[-78,2],[-79,7]],
  // Europe
  [[-10,36],[-9,43],[-2,44],[-4,48],[2,51],[8,54],[10,57],[12,55],[20,55],[22,60],[30,60],[30,70],[40,68],[44,45],[40,41],[30,41],[26,40],[22,37],[20,40],[16,38],[13,45],[8,44],[3,43],[-1,37],[-6,36]],
  // Scandinavia
  [[5,58],[5,62],[10,64],[15,68],[20,70],[28,71],[31,70],[30,65],[25,65],[22,60],[18,60],[18,56],[12,56],[8,58]],
  // Great Britain & Ireland
  [[-5,50],[1,51],[2,53],[-1,55],[-2,57],[-3,58.5],[-6,58],[-5,55],[-3,54],[-5,52]],
  [[-10,52],[-6,52],[-6,55],[-8,55],[-10,54]],
  // Africa
  [[-17,21],[-13,28],[-10,30],[-6,36],[0,36],[10,37],[11,33],[20,31],[30,31],[32,31],[34,28],[38,22],[43,12],[51,12],[51,10],[48,4],[42,-2],[40,-10],[40,-16],[35,-24],[33,-28],[27,-34],[20,-35],[18,-32],[15,-26],[12,-17],[13,-11],[12,-5],[9,0],[9,4],[5,5],[-2,5],[-8,4],[-13,8],[-17,14]],
  // Madagascar
  [[44,-13],[50,-15],[48,-25],[44,-24],[43,-18]],
  // Arabian Peninsula
  [[34,28],[35,32],[36,36],[42,37],[48,30],[50,27],[52,24],[56,26],[56,24],[60,22],[57,19],[52,16],[45,13],[43,13],[39,21]],
  // Asia
  [[26,40],[36,36],[42,37],[48,30],[50,30],[57,26],[62,25],[67,24],[70,21],[73,16],[76,8],[78,8],[80,13],[80,16],[86,20],[89,22],[92,22],[94,17],[98,16],[98,8],[100,4],[103,1],[104,2],[103,6],[100,13],[105,9],[107,11],[109,12],[108,16],[106,20],[110,21],[117,23],[121,28],[122,31],[120,36],[122,40],[118,39],[121,41],[126,37],[129,35],[129,40],[133,43],[138,46],[142,52],[141,59],[150,59],[156,62],[163,61],[160,55],[163,58],[170,60],[180,65],[180,69],[170,70],[160,71],[150,72],[140,73],[130,71],[120,73],[110,77],[100,79],[90,76],[80,73],[70,73],[66,70],[60,70],[55,68],[45,68],[40,66],[35,69],[30,70],[30,60],[28,56],[24,56],[22,54],[24,50],[28,46],[30,45],[34,44],[38,47],[40,43],[42,42],[40,41]],
  // Sri Lanka
  [[80,10],[82,8],[81.5,6],[80,6.5]],
  // Japan
  [[130,31],[132,34],[135,34],[140,35],[141,38],[142,42],[145,44],[142,46],[140,42],[139,38],[136,36],[132,35]],
  // Borneo, Sumatra, New Guinea, Philippines, Java
  [[109,1],[117,7],[119,1],[116,-4],[110,-3]],
  [[95,5],[100,1],[106,-6],[104,-6],[96,2]],
  [[106,-6],[114,-7],[114,-8.5],[106,-7.5]],
  [[131,-1],[141,-3],[150,-10],[141,-9],[138,-8]],
  [[120,18],[122,18],[126,7],[123,7],[121,12]],
  // Australia
  [[114,-22],[114,-34],[118,-35],[124,-33],[131,-31],[138,-35],[141,-38],[146,-39],[150,-37],[153,-28],[153,-25],[146,-19],[142,-11],[141,-17],[136,-12],[130,-12],[126,-14],[122,-18]],
  // New Zealand
  [[172,-34],[178,-38],[176,-42],[171,-46],[167,-46],[172,-41]],
]

const inPoly = (x, y, poly) => {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

// projection: lon -180..180 → x 0..360, lat 84..-58 → y 0..142
const LAT_TOP = 84
const proj = ([lon, lat]) => [lon + 180, LAT_TOP - lat]

/* EDIT: export destinations shown on the map */
const ORIGIN = { name: 'Kolkata', at: [88.36, 22.57] }
const DESTINATIONS = [
  { name: 'USA', at: [-74, 40.7] },
  { name: 'UK', at: [-0.1, 51.5], label: [-6, -2] },
  { name: 'Europe', at: [10, 48.5], label: [9, 1] },
  { name: 'UAE', at: [55.3, 25.2], label: [3, 6] },
  { name: 'Middle East', at: [44, 27], label: [-6, -3.2] },
  { name: 'SE Asia', at: [103.8, 1.35] },
]

function WorldMap() {
  const [ref, visible] = useInView({ threshold: 0.25 })
  const dots = useMemo(() => {
    const out = []
    const step = 2.4
    for (let lat = LAT_TOP; lat > -58; lat -= step) {
      for (let lon = -180; lon < 180; lon += step) {
        if (LAND.some((p) => inPoly(lon, lat, p))) out.push(proj([lon, lat]))
      }
    }
    return out
  }, [])

  const [ox, oy] = proj(ORIGIN.at)
  const routes = DESTINATIONS.map((d, i) => {
    const [x, y] = proj(d.at)
    const mx = (ox + x) / 2
    const dist = Math.hypot(x - ox, y - oy)
    const my = Math.min(oy, y) - dist * 0.32
    return { ...d, x, y, path: `M${ox},${oy} Q${mx},${my} ${x},${y}`, delay: i * 250 }
  })

  return (
    <div ref={ref} className={`relative ${visible ? 'is-visible' : ''}`}>
      <svg viewBox="0 0 360 142" className="h-auto w-full" role="img" aria-label="World map showing export routes from Kolkata to the USA, UK, Europe, UAE, the Middle East and Southeast Asia">
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0" stopColor="#e2c98f" />
            <stop offset="1" stopColor="#b4734a" />
          </linearGradient>
        </defs>
        <g className="fill-cream-200/25">
          {dots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r=".62" />
          ))}
        </g>
        {routes.map((r) => (
          <path
            key={r.name}
            d={r.path}
            fill="none"
            stroke="url(#route)"
            strokeWidth=".55"
            strokeLinecap="round"
            pathLength="100"
            className="map-route"
            style={{ '--len': 100, '--d': `${r.delay}ms` }}
          />
        ))}
        {routes.map((r) => (
          <g key={`${r.name}-pin`}>
            <circle cx={r.x} cy={r.y} r="2.4" className="map-pulse fill-gold-300/50" style={{ animationDelay: `${r.delay}ms` }} />
            <circle cx={r.x} cy={r.y} r="1.1" className="fill-gold-300" />
            <text x={r.x + (r.label?.[0] ?? 0)} y={r.y + (r.label?.[1] ?? -3.2)} textAnchor="middle" className="fill-cream-100 text-[3.6px] font-semibold tracking-wide">
              {r.name}
            </text>
          </g>
        ))}
        <circle cx={ox} cy={oy} r="3.4" className="map-pulse fill-copper-500/60" />
        <circle cx={ox} cy={oy} r="1.6" className="fill-copper-500 stroke-cream-100" strokeWidth=".4" />
        <text x={ox + 3} y={oy + 5} className="fill-gold-300 text-[4px] font-bold">
          {ORIGIN.name}
        </text>
      </svg>
    </div>
  )
}

const WHY_INDIA = [
  { icon: 'rupee', title: 'Competitive pricing', text: 'Indian paper, skilled labour and our in-house processes keep your landed cost low.' },
  { icon: 'handshake', title: 'Skilled craftsmanship', text: "Kolkata's long tradition of binding and printing goes into every stitch and foil." },
  { icon: 'boxes', title: 'Scalable bulk capacity', text: 'From pilot runs to container loads, with a consistent spec across every batch.' },
  { icon: 'award', title: 'Private label / OEM', text: 'Your brand, barcodes and packaging. Our name never appears.' },
  { icon: 'ship', title: 'Export-grade packaging', text: 'Moisture-protected, palletised 5-ply cartons built for long sea voyages.' },
]

export default function Export() {
  return (
    <section id="export" className="relative overflow-hidden bg-gradient-to-b from-ink-900 to-ink-950 py-24 text-cream-100 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={<span className="text-gold-300">Global export</span>}
          title={
            <>
              From Kolkata to <em className="text-gold-300">your warehouse</em>
            </>
          }
          lead={<span className="text-cream-200/75">We supply importers, distributors and private-label brands in the USA, UK, UAE, Europe, the Middle East and Southeast Asia.</span>}
        />

        <Reveal className="mt-12">
          <WorldMap />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-2xl border border-white/10 bg-white/[.04] p-6 sm:p-8">
            <h3 className="font-serif text-2xl">Why source diaries from India, and from Kolkata?</h3>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {WHY_INDIA.map((w) => (
                <li key={w.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold-400/15 text-gold-300">
                    <Icon name={w.icon} className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <div className="font-semibold">{w.title}</div>
                    <p className="mt-0.5 text-sm text-cream-200/70">{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="stitch flex flex-col rounded-2xl bg-gold-400 p-6 text-ink-900 sm:p-8">
            <h3 className="font-serif text-2xl font-semibold">Export at a glance</h3>
            {/* EDIT: values come from EXPORT_INFO in config.js */}
            <dl className="mt-5 grid gap-4 text-sm">
              {[
                ['Minimum order', EXPORT_INFO.moq],
                ['Sample lead time', EXPORT_INFO.sampleTime],
                ['Production lead time', EXPORT_INFO.leadTime],
                ['Shipping', EXPORT_INFO.shipping],
                ['Trade terms', EXPORT_INFO.incoterms],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col border-b border-ink-900/15 pb-3 last:border-0">
                  <dt className="text-xs font-semibold tracking-wider uppercase opacity-70">{k}</dt>
                  <dd className="mt-0.5 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 rounded-xl bg-ink-900/10 p-3 text-sm">
              <strong>Private labelling:</strong> we manufacture under your brand for overseas retailers and stationery labels.
            </p>
            <button type="button" onClick={() => scrollToId('book-demo')} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-cream-50 transition hover:-translate-y-0.5">
              Request export pricing <Icon name="arrow" className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
