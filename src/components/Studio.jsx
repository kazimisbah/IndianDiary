import { useState } from 'react'
import { SITE, STUDIO } from '../config'
import Icon from './Icons'
import { Reveal, SectionHeading } from './ui'

const NEXT_YEAR = new Date().getFullYear() + 1

const DEFAULTS = {
  material: 'leather',
  color: 'navy',
  branding: 'foil',
  size: 'A5',
  paper: STUDIO.paperTypes[0],
  gsm: 80,
  ruling: 'ruled',
  addOns: ['elastic', 'ribbon'],
  logoText: '',
}

const RULING_BG = {
  ruled: 'repeating-linear-gradient(to bottom, transparent 0 13px, rgba(27,42,65,.18) 13px 14px)',
  plain: 'none',
  dotted: 'radial-gradient(rgba(27,42,65,.35) 1px, transparent 1.3px)',
  grid: 'linear-gradient(rgba(27,42,65,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(27,42,65,.13) 1px, transparent 1px)',
}
const RULING_SIZE = { ruled: 'auto', plain: 'auto', dotted: '12px 12px', grid: '12px 12px' }

function gsmNote(g) {
  if (g <= 70) return 'Lightweight: thin and economical, best for pencil and ballpoint.'
  if (g <= 80) return 'Everyday standard: a smooth, reliable feel for most diaries.'
  if (g <= 100) return 'Premium: richer feel, low show-through, fountain-pen friendly.'
  return 'Luxury: thick and opaque, ideal for markers and high-end gifting.'
}

/* ---------------- Live preview mock-up ---------------- */
function Preview({ cfg }) {
  const mat = STUDIO.materials.find((m) => m.id === cfg.material)
  const color = mat.fixedColor || STUDIO.colors.find((c) => c.id === cfg.color).hex
  const size = STUDIO.sizes.find((s) => s.id === cfg.size)
  const has = (id) => cfg.addOns.includes(id)
  const w = 200 * size.scale
  const h = w * 1.414
  const logo = cfg.logoText.trim() || 'YOUR LOGO'

  return (
    <div className="relative flex min-h-[400px] items-end justify-center gap-6 pb-10 sm:gap-10" aria-hidden="true">
      {/* gift box behind */}
      <div
        className={`absolute bottom-6 left-1/2 h-24 w-[86%] max-w-sm -translate-x-1/2 rounded-xl bg-gradient-to-b from-ink-800 to-ink-950 shadow-2xl transition-all duration-700 ${
          has('giftbox') ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-copper-500/80" />
        <span className="absolute inset-x-0 top-1/2 h-px bg-gold-400/40" />
      </div>

      {/* Closed cover */}
      <div className="relative z-10 transition-all duration-700" style={{ width: w, height: h }}>
        <div
          className={`tex-${cfg.material} relative h-full w-full overflow-hidden rounded-r-xl rounded-l-sm shadow-[16px_22px_40px_-18px_rgba(0,0,0,.6)] transition-colors duration-700`}
          style={{ backgroundColor: color }}
        >
          {/* spine shading */}
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
          {cfg.material === 'leather' && <div className="absolute inset-2.5 rounded-r-lg border border-dashed border-white/25" />}
          {/* gilded edge */}
          {has('gilded') && <div className="absolute inset-y-1 right-0 w-1 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300" />}
          {/* branding */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <span
              className={`brand-${cfg.branding} max-w-full truncate font-serif font-bold tracking-wide transition-all duration-500`}
              style={{ fontSize: Math.max(12, 22 * size.scale) }}
            >
              {logo}
            </span>
            <span className={`brand-${cfg.branding} mt-1 text-[9px] tracking-[.3em] uppercase`}>{NEXT_YEAR}</span>
          </div>
          {/* elastic band */}
          {has('elastic') && <div className="absolute inset-y-0 right-[14%] w-1.5 bg-black/55 shadow-[1px_0_0_rgba(255,255,255,.12)]" />}
          {/* magnetic flap */}
          {has('magnetic') && (
            <div className="absolute top-1/2 -right-px h-1/3 w-[22%] -translate-y-1/2 rounded-l-xl border-l border-white/10 shadow-[-6px_0_12px_rgba(0,0,0,.35)]" style={{ backgroundColor: color }}>
              <span className="absolute top-1/2 left-2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold-400/70" />
            </div>
          )}
        </div>
        {/* pen loop */}
        {has('penloop') && (
          <div className="absolute top-[18%] -right-3 h-14 w-3 rounded-r-full border-2 border-l-0 border-black/40" style={{ backgroundColor: color }} />
        )}
        {/* ribbon marker */}
        {has('ribbon') && (
          <div className="absolute -bottom-7 left-[40%] h-9 w-2.5 bg-copper-500 [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]" />
        )}
      </div>

      {/* Inner page */}
      <div
        className="relative z-10 hidden rounded-r-lg rounded-l-sm bg-cream-50 shadow-[12px_18px_32px_-18px_rgba(0,0,0,.5)] transition-all duration-700 sm:block"
        style={{ width: w * 0.95, height: h * 0.97 }}
      >
        <div
          className="absolute inset-x-4 top-8 bottom-6"
          style={{ backgroundImage: RULING_BG[cfg.ruling], backgroundSize: RULING_SIZE[cfg.ruling] }}
        />
        {has('logoevery') && (
          <span className="absolute top-2.5 right-3 font-serif text-[8px] font-bold tracking-wider text-ink-800/60">{logo}</span>
        )}
        {has('qr') && (
          <svg viewBox="0 0 21 21" className="absolute right-3 bottom-3 h-8 w-8 text-ink-800" shapeRendering="crispEdges">
            <path
              fill="currentColor"
              d="M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2zM14 0h7v7h-7zM15 1v5h5V1zM16 2h3v3h-3zM0 14h7v7H0zM1 15v5h5v-5zM2 16h3v3H2zM9 0h2v2H9zM9 3h1v3H9zM11 4h2v2h-2zM8 8h3v1H8zM12 8h1v3h-1zM14 9h2v1h-2zM17 8h3v2h-3zM9 10h2v2H9zM0 9h2v2H0zM3 8h3v1H3zM4 10h2v2H4zM14 12h3v2h-3zM18 12h3v1h-3zM9 14h2v3H9zM12 15h2v2h-2zM15 15h2v3h-2zM19 15h2v2h-2zM12 19h3v2h-3zM17 19h4v2h-4zM9 18h2v3H9z"
            />
          </svg>
        )}
        {has('pocket') && <div className="absolute inset-x-3 bottom-3 h-[22%] rounded-b-md border-t-2 border-dashed border-gold-500/50 bg-cream-200/80" />}
        <span className="absolute top-2.5 left-4 text-[8px] tracking-widest text-ink-800/50 uppercase">
          {cfg.gsm} GSM · {cfg.ruling}
        </span>
      </div>
    </div>
  )
}

/* ---------------- Option group helpers ---------------- */
function Group({ label, children, hint }) {
  return (
    <fieldset className="border-b border-line py-5 last:border-0">
      <legend className="label !mb-3">{label}</legend>
      {children}
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </fieldset>
  )
}

function Chips({ options, value, onChange, name }) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o.id} type="button" role="radio" aria-checked={value === o.id} onClick={() => onChange(o.id)} className="chip">
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function Studio({ onSend }) {
  const [cfg, setCfg] = useState(DEFAULTS)
  const set = (k) => (v) => setCfg((c) => ({ ...c, [k]: v }))
  const mat = STUDIO.materials.find((m) => m.id === cfg.material)
  const toggleAddOn = (id) =>
    setCfg((c) => ({ ...c, addOns: c.addOns.includes(id) ? c.addOns.filter((a) => a !== id) : [...c.addOns, id] }))

  const label = (list, id) => list.find((x) => x.id === id)?.label
  const summary = [
    `Cover: ${mat.label}${mat.fixedColor ? '' : ` (${label(STUDIO.colors, cfg.color)})`}`,
    `Branding: ${label(STUDIO.branding, cfg.branding)}${cfg.logoText ? ` — "${cfg.logoText}"` : ''}`,
    `Size: ${label(STUDIO.sizes, cfg.size)}`,
    `Paper: ${cfg.paper}, ${cfg.gsm} GSM, ${label(STUDIO.rulings, cfg.ruling)}`,
    `Add-ons: ${cfg.addOns.length ? cfg.addOns.map((a) => label(STUDIO.addOns, a)).join(', ') : 'None'}`,
  ].join('\n')

  return (
    <section id="studio" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customization studio"
          title="Design your diary in under a minute"
          lead="Choose your materials and finishes and watch the mock-up update. When it looks right, send the configuration straight to our team."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="card stitch relative overflow-hidden bg-gradient-to-b from-surface to-surface-2 p-6 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="flex items-center gap-2 font-semibold tracking-widest text-accent uppercase">
                <Icon name="eye" className="h-4 w-4" /> Live preview
              </span>
              <button type="button" onClick={() => setCfg(DEFAULTS)} className="flex items-center gap-1.5 hover:text-fg">
                <Icon name="refresh" className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
            <Preview cfg={cfg} />
            <pre className="rounded-xl bg-bg/70 p-4 font-sans text-xs leading-relaxed whitespace-pre-wrap text-muted" aria-live="polite">
              {summary}
            </pre>
            <button
              type="button"
              className="btn-primary mt-5 w-full !py-3.5"
              onClick={() => onSend({ category: 'Custom configuration (Studio)', notes: `My diary configuration:\n${summary}` })}
            >
              Send this configuration <Icon name="arrow" className="h-4 w-4" />
            </button>
          </Reveal>

          <Reveal delay={120} className="card px-6 py-2">
            <Group label="Cover material">
              <Chips name="Cover material" options={STUDIO.materials} value={cfg.material} onChange={set('material')} />
            </Group>

            <Group label="Cover colour" hint={mat.fixedColor ? `${mat.label} uses its natural colour.` : undefined}>
              <div role="radiogroup" aria-label="Cover colour" className="flex flex-wrap gap-2.5">
                {STUDIO.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={cfg.color === c.id}
                    aria-label={c.label}
                    title={c.label}
                    disabled={!!mat.fixedColor}
                    onClick={() => set('color')(c.id)}
                    className={`h-9 w-9 rounded-full border-2 shadow-inner transition disabled:opacity-30 ${
                      cfg.color === c.id && !mat.fixedColor ? 'scale-110 border-accent ring-2 ring-accent/30 ring-offset-2 ring-offset-surface' : 'border-white/40'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </Group>

            <Group label="Branding method">
              <Chips name="Branding method" options={STUDIO.branding} value={cfg.branding} onChange={set('branding')} />
              <label className="mt-4 block">
                <span className="sr-only">Logo or brand text for preview</span>
                <input
                  className="field"
                  maxLength={18}
                  placeholder="Type your brand name to preview"
                  value={cfg.logoText}
                  onChange={(e) => set('logoText')(e.target.value)}
                />
              </label>
            </Group>

            <Group label="Size">
              <div role="radiogroup" aria-label="Size" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {STUDIO.sizes.map((s) => (
                  <button key={s.id} type="button" role="radio" aria-checked={cfg.size === s.id} onClick={() => set('size')(s.id)} className="chip !rounded-xl !py-2.5 text-center">
                    <span className="block font-semibold">{s.label}</span>
                    <span className="block text-[10px] opacity-75">{s.note}</span>
                  </button>
                ))}
              </div>
            </Group>

            <Group label="Paper type & weight" hint={gsmNote(cfg.gsm)}>
              <select className="field" value={cfg.paper} onChange={(e) => set('paper')(e.target.value)} aria-label="Paper type">
                {STUDIO.paperTypes.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <div className="mt-4 flex items-center gap-4">
                <input
                  type="range"
                  min="70"
                  max="120"
                  step="10"
                  value={cfg.gsm}
                  onChange={(e) => set('gsm')(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                  aria-label="Paper weight in GSM"
                  aria-valuetext={`${cfg.gsm} GSM`}
                />
                <output className="w-20 shrink-0 rounded-lg bg-surface-2 py-1 text-center text-sm font-semibold tabular-nums">{cfg.gsm} GSM</output>
              </div>
            </Group>

            <Group label="Ruling">
              <Chips name="Ruling" options={STUDIO.rulings} value={cfg.ruling} onChange={set('ruling')} />
            </Group>

            <Group label="Add-ons">
              <div className="flex flex-wrap gap-2">
                {STUDIO.addOns.map((a) => (
                  <button key={a.id} type="button" aria-pressed={cfg.addOns.includes(a.id)} onClick={() => toggleAddOn(a.id)} className="chip inline-flex items-center gap-1.5">
                    {cfg.addOns.includes(a.id) && <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />}
                    {a.label}
                  </button>
                ))}
              </div>
            </Group>
          </Reveal>
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          The preview is illustrative. Our design team at {SITE.companyName} will share a detailed digital proof and a physical sample before production.
        </p>
      </div>
    </section>
  )
}
