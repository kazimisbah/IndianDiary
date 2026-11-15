import { HERO_VIDEO_POSTER, HERO_VIDEO_URL, SITE } from '../config'
import { scrollToId } from '../hooks'
import Icon from './Icons'

/* The 3D diary: the cover opens, three pages flip, and the tagline is
 * "written" on the last page. Pure CSS — see .diary-* rules in index.css. */
function HeroDiary() {
  const leaves = [
    { delay: '1.9s', end: '-177deg', z: '2px' },
    { delay: '2.35s', end: '-176deg', z: '1.5px' },
    { delay: '2.8s', end: '-175deg', z: '1px' },
  ]
  return (
    <div className="flex w-full justify-center py-6" aria-hidden="true">
      <div className="diary-scene">
        <div className="diary">
          {/* Right-hand page (revealed last) */}
          <div className="diary-base">
            <div className="diary-tagline flex h-full flex-col justify-center px-[12%] text-ink-800">
              <span className="font-serif text-[clamp(.55rem,1vw,.7rem)] tracking-[.3em] text-gold-600 uppercase">
                Our promise
              </span>
              <p className="mt-2 font-serif text-[clamp(.95rem,1.9vw,1.45rem)] leading-snug italic">
                Crafted in Kolkata.
                <br />
                Written Around the World.
              </p>
              <svg viewBox="0 0 120 20" className="mt-3 w-2/3 text-gold-600">
                <path d="M2 14c12-10 22-10 26 0s14 6 22-2 18-6 22 2 18 4 46-6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {leaves.map((l, i) => (
            <div key={i} className="diary-leaf" style={{ '--delay': l.delay, '--end': l.end, '--z': l.z }} />
          ))}

          {/* Cover: front (leather + foil) and back (inside cover) */}
          <div className="diary-cover" style={{ '--delay': '1.1s', '--end': '-178deg', '--z': '3px' }}>
            <div className="diary-cover-front stitch flex flex-col items-center justify-center gap-3">
              <span className="foil font-serif text-[clamp(1rem,2.2vw,1.6rem)] font-semibold">{SITE.shortName}</span>
              <span className="h-px w-1/3 bg-gold-400/50" />
              <span className="foil text-[clamp(.45rem,.8vw,.6rem)] tracking-[.35em] uppercase">Est. Kolkata</span>
              {/* elastic band */}
              <span className="absolute top-0 right-[12%] h-full w-[5px] rounded bg-ink-950/70 shadow-[1px_0_0_rgba(255,255,255,.06)]" />
              {/* ribbon */}
              <span className="absolute -bottom-6 left-[38%] h-8 w-2 bg-copper-500 [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]" />
            </div>
            <div className="diary-cover-back flex flex-col items-center justify-center p-[14%] text-center text-ink-800">
              <span className="text-[clamp(.45rem,.8vw,.6rem)] tracking-[.3em] text-gold-600 uppercase">This diary belongs to</span>
              <span className="mt-2 w-full border-b border-ink-800/30 pb-1 font-serif text-[clamp(.8rem,1.5vw,1.1rem)] italic">your brand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-900 pt-24 pb-16 text-cream-100">
      {/* ---- Background ----
       * SWAP: set HERO_VIDEO_URL in src/config.js to your factory video.
       * Without a video, the animated "ink & paper" background is shown. */}
      {HERO_VIDEO_URL ? (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
          src={HERO_VIDEO_URL}
          poster={HERO_VIDEO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
          <div className="hero-blob top-[-10%] left-[-10%] h-[55vmax] w-[55vmax] bg-forest-700/60" />
          <div className="hero-blob right-[-15%] bottom-[-20%] h-[50vmax] w-[50vmax] bg-ink-700/70 [animation-delay:-6s]" />
          <div className="hero-blob top-[30%] left-[40%] h-[28vmax] w-[28vmax] bg-copper-500/25 [animation-delay:-11s]" />
          <div className="hero-lines absolute inset-0" />
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950/70" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-8">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="eyebrow !text-gold-300 justify-center lg:justify-start">Premium Diary Manufacturer · Since {SITE.foundedYear}</p>
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] font-semibold text-balance sm:text-6xl lg:text-7xl">
            Crafted in Kolkata.{' '}
            <span className="block italic text-gold-300">Written Around the World.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream-200/85 sm:text-lg lg:mx-0">
            We make premium, fully customizable diaries, journals and planners for business, gifting and everyday life,
            produced in bulk with export-ready quality for buyers across India and the world.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <button type="button" onClick={() => scrollToId('book-demo')} className="btn-gold w-full !px-8 !py-3.5 text-base sm:w-auto">
              Book a Demo <Icon name="arrow" className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => scrollToId('range')} className="btn-ghost w-full !px-8 !py-3.5 text-base sm:w-auto">
              Explore Our Diaries
            </button>
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-200/75 lg:justify-start">
            {['Fully custom orders', 'Private label / OEM', 'Ships worldwide'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-gold-300" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 lg:order-2">
          <HeroDiary />
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId('about')}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[.3em] text-cream-200/60 uppercase sm:flex"
        aria-label="Scroll to About section"
      >
        Scroll
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold-300 to-transparent" />
      </button>
    </section>
  )
}
