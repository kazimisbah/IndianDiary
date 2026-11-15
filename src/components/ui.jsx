import { useInView } from '../hooks'

/** Fades/slides its children in when scrolled into view. `delay` in ms. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Standard section heading: small gold eyebrow, serif title, optional lead text. */
export function SectionHeading({ eyebrow, title, lead, align = 'center', className = '' }) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'items-start'
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-serif text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl">{title}</h2>
      {lead && <p className="text-base leading-relaxed text-pretty text-muted sm:text-lg">{lead}</p>}
    </Reveal>
  )
}

/** Image with a graceful fallback if the URL fails to load. */
export function Img({ src, alt, className = '', ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={(e) => {
        e.currentTarget.onerror = null
        e.currentTarget.style.visibility = 'hidden'
        e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-cream-200', 'to-gold-200')
      }}
      {...rest}
    />
  )
}

/** Decorative hand-drawn style divider */
export function Flourish({ className = '' }) {
  return (
    <svg viewBox="0 0 120 12" className={`h-3 w-28 text-gold-500 ${className}`} aria-hidden="true">
      <path d="M2 6h44M74 6h44" stroke="currentColor" strokeWidth="1" />
      <path d="M60 1.5 64.5 6 60 10.5 55.5 6Z" fill="currentColor" />
      <circle cx="50" cy="6" r="1.4" fill="currentColor" />
      <circle cx="70" cy="6" r="1.4" fill="currentColor" />
    </svg>
  )
}
