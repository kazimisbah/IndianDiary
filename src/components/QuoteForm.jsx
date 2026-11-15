import { useEffect, useRef, useState } from 'react'
import { BUYER_TYPES, COUNTRIES, COUNTRY_CODES, GOOGLE_SCRIPT_URL, PRODUCTS, SITE, whatsappLink } from '../config'
import Icon, { WhatsAppIcon } from './Icons'
import { Reveal, SectionHeading } from './ui'

/* ---------------------------------------------------------------------------
 * BOOK A DEMO / REQUEST A QUOTE
 * Submissions are sent to Google Sheets through a Google Apps Script Web App.
 * Set GOOGLE_SCRIPT_URL in src/config.js. Setup steps: google-apps-script/Code.gs
 * -------------------------------------------------------------------------*/

const BASE_CATEGORIES = [
  ...PRODUCTS.map((p) => p.title),
  'Corporate New Year diaries',
  'Festival gifting',
  'Employee welcome kits',
  'Custom configuration (Studio)',
  'Other / Not sure yet',
]

const EMPTY = {
  fullName: '',
  company: '',
  email: '',
  phoneCode: '+91',
  phone: '',
  country: '',
  city: '',
  buyerType: '',
  category: '',
  quantity: '',
  requiredBy: '',
  notes: '',
  contactMethod: 'WhatsApp',
  demoDateTime: '',
  website: '', // honeypot: real visitors never see or fill this
}

const isConfigured = () => /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(GOOGLE_SCRIPT_URL)
const today = () => new Date().toISOString().slice(0, 10)

function validate(v) {
  const e = {}
  if (v.fullName.trim().length < 2) e.fullName = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 6 || digits.length > 15) e.phone = 'Please enter a valid phone number.'
  if (!v.country) e.country = 'Please select your country.'
  if (!v.city.trim()) e.city = 'Please enter your city.'
  if (!v.buyerType) e.buyerType = 'Please choose a buyer type.'
  if (!v.category) e.category = 'Please choose a diary category.'
  if (!/^\d+$/.test(v.quantity) || Number(v.quantity) < 1) e.quantity = 'Please enter an estimated quantity.'
  if (v.requiredBy && v.requiredBy < today()) e.requiredBy = 'The date must be in the future.'
  if (v.demoDateTime && new Date(v.demoDateTime) < new Date()) e.demoDateTime = 'Please pick a future date and time.'
  return e
}

function Field({ id, label, required, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label} {required && <span className="text-red-600 dark:text-red-400" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function Success({ name, demo, onReset }) {
  return (
    <div className="pop-in flex flex-col items-center py-12 text-center">
      <svg viewBox="0 0 60 60" className="h-24 w-24 text-accent" aria-hidden="true">
        <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2.5" className="circle-draw" />
        <path d="m19 31 7.5 7.5L42 23" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
      </svg>
      <h3 className="mt-6 font-serif text-3xl font-semibold">Thank you, {name.split(' ')[0]}!</h3>
      <p className="mt-3 max-w-md text-muted">
        Your request has reached our team in Kolkata. We usually reply within one business day. For anything urgent, message us on WhatsApp.
      </p>
      {demo && (
        <p className="mt-4 max-w-md rounded-xl border border-dashed border-amber-500/50 bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
          Site owner: this form isn't connected to Google Sheets yet, so nothing was saved. Set <code>GOOGLE_SCRIPT_URL</code> in <code>src/config.js</code>.
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
        </a>
        <button type="button" onClick={onReset} className="btn-ghost">
          Send another request
        </button>
      </div>
    </div>
  )
}

export default function QuoteForm({ prefill }) {
  const [v, setV] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [demoMode, setDemoMode] = useState(false)
  const [flash, setFlash] = useState(false)
  const formRef = useRef(null)

  // Pre-fill from "Enquire" buttons and the Customization Studio
  useEffect(() => {
    if (!prefill) return
    setStatus('idle')
    setV((cur) => ({
      ...cur,
      category: prefill.category || cur.category,
      notes: prefill.notes ? (cur.notes && !cur.notes.includes(prefill.notes) ? `${cur.notes}\n\n${prefill.notes}` : prefill.notes) : cur.notes,
    }))
    setFlash(true)
    const t = setTimeout(() => setFlash(false), 1600)
    return () => clearTimeout(t)
  }, [prefill])

  const categories = v.category && !BASE_CATEGORIES.includes(v.category) ? [v.category, ...BASE_CATEGORIES] : BASE_CATEGORIES

  const set = (k) => (e) => {
    const val = e.target.value
    setV((cur) => ({ ...cur, [k]: val }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const a11y = (k) => ({
    id: k,
    name: k,
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })

  async function onSubmit(e) {
    e.preventDefault()
    if (v.website) return // bot filled the honeypot
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      formRef.current?.querySelector(`#${first}`)?.focus()
      return
    }

    setStatus('sending')
    // These keys become the column headers in your Google Sheet.
    const payload = {
      'Full Name': v.fullName.trim(),
      Company: v.company.trim(),
      Email: v.email.trim(),
      Phone: `${v.phoneCode} ${v.phone.trim()}`,
      Country: v.country,
      City: v.city.trim(),
      'Buyer Type': v.buyerType,
      'Diary Category': v.category,
      'Estimated Quantity': v.quantity,
      'Required By': v.requiredBy,
      'Customization Notes': v.notes.trim(),
      'Preferred Contact': v.contactMethod,
      'Preferred Demo Date & Time': v.demoDateTime ? new Date(v.demoDateTime).toLocaleString() : '',
      'Visitor Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'Page URL': window.location.href,
    }

    if (!isConfigured()) {
      console.warn('[Quote form] GOOGLE_SCRIPT_URL is not set in src/config.js, so this submission was NOT saved:', payload)
      await new Promise((r) => setTimeout(r, 900))
      setDemoMode(true)
      setStatus('done')
      return
    }

    try {
      // Apps Script web apps don't send CORS headers, so we use "no-cors".
      // The request still reaches the script; we just can't read the reply.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams(payload).toString(),
      })
      setDemoMode(false)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const reset = () => {
    setV(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  return (
    <section id="book-demo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Book a demo · Request a quote"
              title="Let's create your diaries"
              lead="Tell us what you need. We'll get back to you within one business day with options, pricing and a sample plan, and we can walk you through materials on a video call."
            />
            <Reveal delay={100} as="ul" className="mt-8 space-y-4 text-sm">
              {[
                ['clock', 'Reply within 1 business day'],
                ['users', 'A dedicated account manager'],
                ['eye', 'Live video demo of materials and finishes'],
                ['shield', 'Your designs stay confidential'],
              ].map(([icon, t]) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-accent">
                    <Icon name={icon} className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </Reveal>
            <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${SITE.phoneTel}`} className="btn-ghost">
                <Icon name="phone" className="h-4 w-4" /> {SITE.phoneDisplay}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </a>
            </Reveal>
          </div>

          <Reveal delay={80} className={`card stitch p-6 transition-shadow duration-700 sm:p-10 ${flash ? 'shadow-[0_0_0_4px_var(--accent)]' : ''}`}>
            {status === 'done' ? (
              <Success name={v.fullName} demo={demoMode} onReset={reset} />
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Book a demo or request a quote">
                <Field id="fullName" label="Full name" required error={errors.fullName}>
                  <input {...a11y('fullName')} className="field" autoComplete="name" value={v.fullName} onChange={set('fullName')} />
                </Field>
                <Field id="company" label="Company / Institution" error={errors.company}>
                  <input {...a11y('company')} className="field" autoComplete="organization" value={v.company} onChange={set('company')} />
                </Field>
                <Field id="email" label="Email" required error={errors.email}>
                  <input {...a11y('email')} type="email" className="field" autoComplete="email" value={v.email} onChange={set('email')} />
                </Field>
                <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
                  <div className="flex gap-2">
                    <select aria-label="Country code" className="field !w-28 shrink-0 !px-2" value={v.phoneCode} onChange={set('phoneCode')}>
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.label} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input {...a11y('phone')} type="tel" inputMode="tel" className="field" autoComplete="tel-national" value={v.phone} onChange={set('phone')} />
                  </div>
                </Field>
                <Field id="country" label="Country" required error={errors.country}>
                  <select {...a11y('country')} className="field" autoComplete="country-name" value={v.country} onChange={set('country')}>
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field id="city" label="City" required error={errors.city}>
                  <input {...a11y('city')} className="field" autoComplete="address-level2" value={v.city} onChange={set('city')} />
                </Field>

                <fieldset className="sm:col-span-2">
                  <legend className="label">
                    Buyer type <span className="text-red-600 dark:text-red-400" aria-hidden="true">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-describedby={errors.buyerType ? 'buyerType-error' : undefined}>
                    {BUYER_TYPES.map((b, idx) => (
                      <label key={b} className="cursor-pointer">
                        <input type="radio" name="buyerType" id={idx === 0 ? 'buyerType' : undefined} value={b} checked={v.buyerType === b} onChange={set('buyerType')} className="peer sr-only" />
                        <span className="chip inline-block peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-fg peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                          {b}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.buyerType && (
                    <p id="buyerType-error" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400" role="alert">
                      {errors.buyerType}
                    </p>
                  )}
                </fieldset>

                <Field id="category" label="Diary category" required error={errors.category}>
                  <select {...a11y('category')} className="field" value={v.category} onChange={set('category')}>
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field id="quantity" label="Estimated quantity" required error={errors.quantity}>
                  <input {...a11y('quantity')} type="number" min="1" inputMode="numeric" placeholder="e.g. 500" className="field" value={v.quantity} onChange={set('quantity')} />
                </Field>
                <Field id="requiredBy" label="Required by" error={errors.requiredBy}>
                  <input {...a11y('requiredBy')} type="date" min={today()} className="field" value={v.requiredBy} onChange={set('requiredBy')} />
                </Field>
                <Field id="demoDateTime" label="Preferred demo date & time" error={errors.demoDateTime}>
                  <input {...a11y('demoDateTime')} type="datetime-local" className="field" value={v.demoDateTime} onChange={set('demoDateTime')} />
                </Field>

                <fieldset className="sm:col-span-2">
                  <legend className="label">Preferred contact method</legend>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ['Call', 'phone'],
                      ['WhatsApp', 'chat'],
                      ['Email', 'mail'],
                    ].map(([m, icon]) => (
                      <label key={m} className="cursor-pointer">
                        <input type="radio" name="contactMethod" value={m} checked={v.contactMethod === m} onChange={set('contactMethod')} className="peer sr-only" />
                        <span className="chip inline-flex items-center gap-1.5 peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-fg peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                          <Icon name={icon} className="h-3.5 w-3.5" /> {m}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field id="notes" label="Customization notes" error={errors.notes} className="sm:col-span-2">
                  <textarea
                    {...a11y('notes')}
                    rows={5}
                    className="field resize-y"
                    placeholder="Cover material, size, branding, paper, packaging, or anything else you have in mind…"
                    value={v.notes}
                    onChange={set('notes')}
                  />
                </Field>

                {/* Honeypot (hidden from people, catches spam bots) */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website <input tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')} />
                  </label>
                </div>

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted">By submitting, you agree to be contacted about your enquiry. We never share your details.</p>
                  <button type="submit" disabled={status === 'sending'} className="btn-primary !px-8 !py-3.5">
                    {status === 'sending' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        Book my demo <Icon name="arrow" className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
                {status === 'error' && (
                  <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm sm:col-span-2" role="alert">
                    Something went wrong while sending. Please try again, or reach us directly on WhatsApp at {SITE.phoneDisplay}.
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
