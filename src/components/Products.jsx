import { useState } from 'react'
import { PRODUCT_FILTERS, PRODUCTS } from '../config'
import Icon from './Icons'
import { Img, SectionHeading } from './ui'

export default function Products({ onEnquire }) {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(filter))

  return (
    <section id="range" className="bg-surface-2/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our diary range"
          title="Every kind of diary, made your way"
          lead="Twelve product families, each fully customizable in size, paper, cover and branding. Pick a category, or ask us for something entirely new."
        />

        <div role="tablist" aria-label="Filter diaries by category" className="mt-10 flex flex-wrap justify-center gap-2">
          {PRODUCT_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              aria-controls="product-grid"
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                filter === f.id ? 'border-brand bg-brand text-brand-fg shadow-md' : 'border-line bg-surface hover:border-accent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards re-mount on filter change, so they play the page-flip entrance */}
        <ul id="product-grid" role="tabpanel" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <li key={`${filter}-${p.id}`} className="flip-in" style={{ '--d': `${i * 70}ms` }}>
              <article className="tilt-group card flex h-full flex-col overflow-hidden">
                <div className="p-3 pb-0">
                  <div className="cover-tilt aspect-[4/3] overflow-hidden rounded-xl bg-surface-2">
                    <Img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.categories.map((c) => (
                      <span key={c} className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-accent uppercase">
                        {PRODUCT_FILTERS.find((f) => f.id === c)?.label}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 font-serif text-xl leading-snug font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                  <p className="mt-4 flex items-center gap-2 border-t border-dashed border-line pt-3 text-xs font-medium">
                    <Icon name="book" className="h-4 w-4 text-accent" />
                    {p.sizes}
                  </p>
                  <button
                    type="button"
                    onClick={() => onEnquire({ category: p.title, notes: `Interested in: ${p.title} (${p.sizes})` })}
                    className="btn-primary mt-4 w-full !py-2.5"
                    aria-label={`Enquire about ${p.title}`}
                  >
                    Enquire <Icon name="arrow" className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
