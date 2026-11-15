import { useCallback, useEffect, useState } from 'react'
import { scrollToId } from './hooks'
import Header from './components/Header'
import Hero from './components/Hero'
import { About, TrustBar } from './components/TrustAbout'
import Products from './components/Products'
import Studio from './components/Studio'
import { Process, Quality, WhoWeServe } from './components/QualityProcess'
import Export from './components/Export'
import { FAQ, Gallery, Gifting, Testimonials } from './components/Showcase'
import QuoteForm from './components/QuoteForm'
import { Contact, FloatingButtons, Footer } from './components/ContactFooter'

/* Page order — rearrange or remove sections here. */
export default function App() {
  const [prefill, setPrefill] = useState(null)
  const [toast, setToast] = useState('')

  // Used by "Enquire" buttons and the Customization Studio to fill the form
  const requestQuote = useCallback((data) => {
    setPrefill({ ...data, at: Date.now() })
    scrollToId('book-demo')
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 3800)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-fg">
        Skip to content
      </a>
      <Header onToast={setToast} />
      <main id="main">
        <Hero />
        <TrustBar />
        <About />
        <Products onEnquire={requestQuote} />
        <Studio onSend={requestQuote} />
        <Quality />
        <Process />
        <WhoWeServe />
        <Export />
        <Gifting onEnquire={requestQuote} />
        <Gallery />
        <Testimonials />
        <FAQ />
        <QuoteForm prefill={prefill} />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />

      <div
        role="status"
        aria-live="polite"
        className={`fixed top-20 left-1/2 z-[75] -translate-x-1/2 rounded-full bg-ink-900 px-5 py-3 text-sm text-cream-100 shadow-xl transition-all duration-500 ${
          toast ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        {toast}
      </div>
    </>
  )
}
