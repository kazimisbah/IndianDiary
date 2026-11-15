import { NAV, PRODUCTS, SITE, SOCIALS, whatsappLink } from '../config'
import { scrollToId } from '../hooks'
import Icon, { LogoMark, SocialIcon, WhatsAppIcon } from './Icons'
import { Reveal, SectionHeading } from './ui'

const YEAR = new Date().getFullYear()
const fullAddress = `${SITE.addressLine}, ${SITE.city}, ${SITE.region} ${SITE.postalCode}, ${SITE.country}`

/* ======================= CONTACT ======================= */
export function Contact() {
  const cards = [
    { icon: 'phone', title: 'Call us', value: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}`, cta: 'Tap to call' },
    { icon: 'whatsapp', title: 'WhatsApp', value: SITE.phoneDisplay, href: whatsappLink(), cta: 'Start a chat', external: true },
    { icon: 'mail', title: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, cta: 'Write to us' },
    { icon: 'pin', title: 'Manufacturing hub', value: fullAddress, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`, cta: 'Get directions', external: true },
  ]
  return (
    <section id="contact" className="bg-surface-2/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Contact" title="Visit, call or message us" lead={`${SITE.hours}. International buyers: we're happy to schedule calls to suit your time zone.`} />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group card flex h-full items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:border-accent/60"
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${c.icon === 'whatsapp' ? 'bg-[#25D366] text-white' : 'bg-brand text-brand-fg'}`}>
                    {c.icon === 'whatsapp' ? <WhatsAppIcon className="h-6 w-6" /> : <Icon name={c.icon} className="h-5 w-5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-wider text-muted uppercase">{c.title}</span>
                    <span className="mt-0.5 block font-medium break-words">{c.value}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      {c.cta} <Icon name="arrow" className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} className="card overflow-hidden p-2">
            {/* Google Map embed. To pin your exact building, change SITE.mapQuery in config.js */}
            <iframe
              title={`Map showing ${SITE.companyName} at ${SITE.addressLine}, ${SITE.city}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=16&output=embed`}
              className="h-full min-h-[380px] w-full rounded-xl border-0 grayscale-[25%] dark:invert-[.9] dark:hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ======================= FOOTER ======================= */
export function Footer() {
  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }
  return (
    <footer className="bg-ink-950 pt-20 pb-28 text-cream-200 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <span className="font-serif text-2xl font-semibold text-cream-50">{SITE.companyName}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/70">
              Premium custom diaries, journals and planners. {SITE.tagline}
            </p>
            {/* EDIT: social links in config.js → SOCIALS */}
            <ul className="mt-6 flex gap-2">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <a href={s.href} aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-gold-400 hover:text-gold-300">
                    <SocialIcon name={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer quick links">
            <h3 className="font-serif text-lg text-cream-50">Quick links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[...NAV, { id: 'book-demo', label: 'Book a Demo' }].map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={go(n.id)} className="text-cream-200/70 transition hover:text-gold-300">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-serif text-lg text-cream-50">Our diaries</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PRODUCTS.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <a href="#range" onClick={go('range')} className="text-cream-200/70 transition hover:text-gold-300">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-cream-50">Get in touch</h3>
            <ul className="mt-4 space-y-3.5 text-sm text-cream-200/80">
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                {fullAddress}
              </li>
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="flex gap-3 hover:text-gold-300">
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-gold-300" /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-gold-300">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-gold-300" /> WhatsApp us
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex gap-3 break-all hover:text-gold-300">
                  <Icon name="mail" className="h-4 w-4 shrink-0 text-gold-300" /> {SITE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="clock" className="h-4 w-4 shrink-0 text-gold-300" /> {SITE.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-cream-200/55 sm:flex-row">
          <p>
            © {YEAR} {SITE.companyName}. All rights reserved. Founded by {SITE.founder}.
          </p>
          <p>Proudly manufactured in Kolkata, India 🇮🇳</p>
        </div>
      </div>
    </footer>
  )
}

/* ======================= FLOATING BUTTONS ======================= */
export function FloatingButtons() {
  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group fixed right-4 bottom-20 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-xl shadow-black/25 transition hover:scale-105 sm:right-6 sm:bottom-6"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.5s]" aria-hidden="true" />
        <WhatsAppIcon className="h-7 w-7" />
      </a>
      {/* Mobile-only sticky "Book a Demo" bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-bg/92 p-3 backdrop-blur-xl sm:hidden">
        <a href={`tel:${SITE.phoneTel}`} className="btn-ghost flex-1 !py-3 text-fg" aria-label={`Call ${SITE.phoneDisplay}`}>
          <Icon name="phone" className="h-4 w-4" /> Call
        </a>
        <button type="button" onClick={() => scrollToId('book-demo')} className="btn-primary flex-[2] !py-3">
          Book a Demo
        </button>
      </div>
    </>
  )
}
