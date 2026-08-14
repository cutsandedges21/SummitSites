import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomeSections from './HomeExtras'
import Footer from './Footer'

const EASE = [0.22, 1, 0.36, 1]
const MORPH = { type: 'spring', stiffness: 45, damping: 18 }
const MORPH_SLOW = { type: 'spring', stiffness: 8, damping: 18 }
const SIDEBAR_W = 260

// Mobile sidebar shows every page, including Pricing.
const ALL_NAV_LINKS = [
  { to: '/portfolio',        label: 'Portfolio' },
  { to: '/services',   label: 'Services'   },
  { to: '/pricing',    label: 'Pricing'    },
  { to: '/faq',        label: 'FAQ'        },
  { to: '/contact',    label: 'Contact'    },
]

const TAIL_TOP_VH = 1.15 // About + footer block starts at 115vh

export default function Homepage({ revealed = true, isMobile = false, native = false, scrollY = 0, progress = 0, onMaxScroll }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showBrand, setShowBrand] = useState(false)
  const topBarRef  = useRef(null)
  const heroSubRef = useRef(null)
  const tailRef    = useRef(null)
  const mHeaderRef = useRef(null)
  const mTailRef   = useRef(null)

  // Measure the About+footer block so the scroll can be clamped at its bottom
  useEffect(() => {
    const el = tailRef.current
    if (!el || !onMaxScroll) return
    const measure = () => {
      const vh = window.innerHeight
      onMaxScroll(Math.max(0, TAIL_TOP_VH * vh + el.offsetHeight - vh))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [onMaxScroll, revealed, isMobile])

  useEffect(() => {
    if (!heroSubRef.current || !topBarRef.current) return
    const subTop    = heroSubRef.current.getBoundingClientRect().top
    const barBottom = topBarRef.current.getBoundingClientRect().bottom
    setShowBrand(subTop <= barBottom)
  }, [scrollY])

  // Mobile native: swap the header tagline for the brand once the tail (About)
  // scrolls up to meet the navbar.
  useEffect(() => {
    if (!native) return
    const onScroll = () => {
      const tail = mTailRef.current
      const header = mHeaderRef.current
      if (!tail || !header) return
      setShowBrand(tail.getBoundingClientRect().top <= header.getBoundingClientRect().bottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [native])

  // ── Desktop animations ───────────────────────────────────────────────────
  const dAnn = {
    initial:    { opacity: 0, y: -10 },
    animate:    revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 },
    transition: { duration: 0.55, ease: 'easeOut', delay: 0.05 },
  }
  const fadeUp = {
    initial:    { opacity: 0, y: -12 },
    animate:    revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 },
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.15 },
  }
  const fadeSide = (x) => ({
    initial:    { opacity: 0, x },
    animate:    revealed ? { opacity: 1, x: 0 } : { opacity: 0, x },
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.25 },
  })

  // ── Mobile entrance animations ───────────────────────────────────────────
  const mML   = { initial: { opacity: 0, x: -28 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, ease: EASE, delay: 0.22 } }
  const mSub  = { initial: { opacity: 0 },          animate: { opacity: 1 },       transition: { duration: 0.5, ease: 'easeOut', delay: 0.45 } }

  const springTransition = { duration: 0.65, ease: EASE }

  // ── Desktop render ───────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <div style={styles.wrapper}>
        <video src="/wink_4k_homepageVid.mp4" style={styles.bg} autoPlay loop muted playsInline />
        <div style={styles.overlay} />

        {/* Top bar — stays fixed while content scrolls */}
        <div ref={topBarRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <motion.div style={styles.announcement} {...dAnn}>
            {showBrand
              ? <motion.span key="brand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} style={{ fontSize: 'clamp(12px, 1.0vw, 18px)', letterSpacing: '0.35em' }}>SUMMIT SITES</motion.span>
              : <motion.span key="tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} style={{ fontSize: 'clamp(12px, 1.0vw, 18px)', letterSpacing: '0.35em' }}>PROFESSIONAL WEBSITES FOR SERIOUS BUSINESSES</motion.span>
            }
          </motion.div>
          {/* Desktop: Portfolio / Pricing / Contact — space-between renders them left / middle / right */}
          <motion.nav style={styles.nav} {...fadeUp}>
            <Link to="/portfolio"        style={styles.navLink}>PORTFOLIO</Link>
            <Link to="/pricing"    style={styles.navLink}>PRICING</Link>
            <Link to="/contact"    style={styles.navLink}>CONTACT</Link>
          </motion.nav>
        </div>

        {/* Content layer — moves up on scroll */}
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${-scrollY}px)`, willChange: 'transform' }}>
          <motion.div style={{ ...styles.midLeft, bottom: `calc(34% + ${5 * progress}vw)` }} className="mid-left" {...fadeSide(-20)}>
          WE DON’T BUILD WEBSITES <br />JUST TO “HAVE A WEBSITE” <br />WE BUILD DIGITAL EXPERIENCES THAT <br />POSITION YOUR COMPANY AS<br /> THE OBVIOUS CHOICE.
          </motion.div>
          <motion.div {...fadeSide(20)} className="mid-right-wrapper" style={{ position: 'absolute', zIndex: 10, right: 'clamp(16px, 2vw, 40px)', bottom: `calc(34% + ${5 * progress}vw)` }}>
            <Link to="/Pricing" style={styles.midRight} className="mid-right explore-link">
              <span>summer<br />sale</span>
              <ChevronIcon size={14} />
            </Link>
          </motion.div>
          <div style={styles.heroBottom} className="hero-bottom">
            <div style={styles.heroInner} className="hero-inner">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.3 }}
              >
                <FlipText style={styles.heroTitle} className="hero-title">SUMMIT SITES</FlipText>
              </motion.div>
              <motion.p
                ref={heroSubRef}
                style={styles.heroSub}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.5 }}
              >YOUR BUSINESS, ELEVATED.</motion.p>
            </div>
          </div>
          <div style={styles.scrollChevron} className="scroll-chevron"><ChevronIcon size={18} /></div>

          {/* Tail + footer — sits at 115vh, scrolls up with the content layer */}
          <div ref={tailRef} style={{ position: 'absolute', top: '115vh', left: 0, width: '100vw' }}>
            <TailBlur />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <HomeSections />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Mobile native render — normal document flow, native scrolling ────────
  return (
    <div style={styles.mWrapper}>

      {/* Video background — fixed behind the whole page */}
      <video src="/wink_4k_homepageVid.mp4" style={styles.bgFixed} autoPlay loop muted playsInline />
      <div style={styles.overlayFixed} />

      {/* Fixed header — mirrors the top bar used on every other page */}
      <header ref={mHeaderRef} style={styles.mHeader}>
        <div style={styles.mHeaderTagline}>
          PROFESSIONAL WEBSITES FOR SERIOUS BUSINESSES
        </div>
        <div style={styles.mHeaderRow}>
          <motion.div
            initial={false}
            animate={{ opacity: showBrand ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Link to="/" style={styles.mHeaderBrand}>SUMMIT SITES</Link>
          </motion.div>
          <button
            className="icon-btn"
            style={styles.hamburger}
            onClick={() => setSidebarOpen(v => !v)}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span style={styles.hamburgerBar} animate={sidebarOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.5, ease: EASE }} />
            <motion.span style={styles.hamburgerBar} animate={sidebarOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }} />
            <motion.span style={styles.hamburgerBar} animate={sidebarOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.5, ease: EASE }} />
          </button>
        </div>
      </header>

      {/* Drawer — fixed overlay, slides in from the left */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -SIDEBAR_W }}
        transition={springTransition}
        style={styles.mSidebar}
      >
        <div style={styles.sidebarBrand}>SUMMIT<br />SITES</div>
        <nav style={styles.sidebarNav}>
          {ALL_NAV_LINKS.map(({ to, label }, i) => (
            <motion.div
              key={to}
              initial={false}
              animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -16 }}
              transition={{ delay: sidebarOpen ? i * 0.055 : 0, duration: 0.35, ease: EASE }}
            >
              <Link to={to} style={styles.sidebarLink} onClick={() => setSidebarOpen(false)}>
                {label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>

      {sidebarOpen && <div style={styles.mBackdrop} onClick={() => setSidebarOpen(false)} />}

      {/* Hero — one full viewport */}
      <section style={styles.mHero}>
        <motion.div style={styles.midLeftNative} {...mML}>
        WE DON’T BUILD WEBSITES <br />JUST TO “HAVE A WEBSITE” <br />WE BUILD DIGITAL EXPERIENCES THAT <br />POSITION YOUR COMPANY AS<br /> THE OBVIOUS CHOICE.
        </motion.div>

        <div style={styles.mHeroBottom}>
          <motion.h1
            style={styles.heroTitle}
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.3 }}
          >
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>SUMMIT</span>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>SITES</span>
          </motion.h1>
          <motion.p style={styles.heroSub} {...mSub}>
            YOUR BUSINESS, ELEVATED.
          </motion.p>
        </div>

        <div style={styles.scrollChevron} className="scroll-chevron"><ChevronIcon size={18} /></div>
      </section>

      {/* Tail — process → work → CTA → footer, over one continuous blur */}
      <div ref={mTailRef} style={{ position: 'relative' }}>
        <TailBlur />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <HomeSections isMobile />
          <Footer />
        </div>
      </div>

    </div>
  )
}

// Single continuous glass layer behind the whole tail (About → footer).
// Fades in over the top ~18vh so it blends out of the clear hero video,
// then holds a consistent blur + tint through every section and the footer.
function TailBlur() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      background: 'linear-gradient(to bottom, rgba(10,20,40,0.45) 0%, rgba(10,20,40,0.62) 100%)',
      maskImage: 'linear-gradient(to bottom, transparent 0, black 18vh)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, black 18vh)',
    }} />
  )
}

function ChevronIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <polyline points="8,4 16,12 8,20" />
    </svg>
  )
}

function FlipText({ children, style, className }) {
  const [hovered, setHovered] = useState(false)
  const text = String(children)
  return (
    <h1
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex' }}>
        {text.split('').map((letter, i) => (
          <span key={i} style={{
            display: 'inline-block',
            transition: 'transform 300ms ease-in-out',
            transitionDelay: `${i * 25}ms`,
            transform: hovered ? 'translateY(-110%)' : 'translateY(0)',
            width: letter === ' ' ? '0.35em' : undefined,
          }}>
            {letter === ' ' ? ' ' : letter}
          </span>
        ))}
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
        {text.split('').map((letter, i) => (
          <span key={i} style={{
            display: 'inline-block',
            transition: 'transform 300ms ease-in-out',
            transitionDelay: `${i * 25}ms`,
            transform: hovered ? 'translateY(0)' : 'translateY(110%)',
            width: letter === ' ' ? '0.35em' : undefined,
          }}>
            {letter === ' ' ? ' ' : letter}
          </span>
        ))}
      </div>
    </h1>
  )
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    fontFamily: "'Itoya', 'Helvetica Neue', Arial, sans-serif",
    color: '#fff',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 30%',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(10,20,40,0.45) 0%, rgba(10,20,40,0.15) 40%, rgba(10,20,40,0.6) 100%)',
  },

  // ── Mobile native layout ──
  mWrapper: {
    position: 'relative',
    zIndex: 0, // own stacking context so the fixed video bg layers correctly
    width: '100%',
    overflowX: 'clip',
    fontFamily: "'Itoya', 'Helvetica Neue', Arial, sans-serif",
    color: '#fff',
  },
  bgFixed: {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 30%',
    zIndex: 0,
  },
  overlayFixed: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    background: 'linear-gradient(to bottom, rgba(10,20,40,0.45) 0%, rgba(10,20,40,0.15) 40%, rgba(10,20,40,0.6) 100%)',
  },
  mHeader: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 20,
    paddingTop: 'env(safe-area-inset-top, 0px)',
    background: 'transparent',
    backdropFilter: 'blur(7px)',
    WebkitBackdropFilter: 'blur(7px)',
  },
  mHeaderTagline: {
    textAlign: 'center',
    fontSize: 'clamp(11px, 0.85vw, 15px)',
    fontWeight: 500,
    letterSpacing: '0.05em',
    padding: 'clamp(8px, 0.9vh, 12px) 16px',
    borderBottom: '2px solid rgba(255,255,255,0.2)',
    margin: '0 clamp(16px, 2vw, 40px)',
  },
  mHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'clamp(10px, 1.4vh, 16px) clamp(16px, 4vw, 24px)',
  },
  mHeaderBrand: {
    fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif",
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#fff',
    textDecoration: 'none',
  },
  mSidebar: {
    position: 'fixed',
    left: 0, top: 0, bottom: 0,
    width: SIDEBAR_W,
    zIndex: 40,
    background: 'transparent',
    backdropFilter: 'blur(9px)',
    WebkitBackdropFilter: 'blur(9px)',
    borderRight: '1px solid rgba(255,255,255,0.15)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
    paddingBottom: '40px',
  },
  mBackdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 30,
    background: 'rgba(0,0,0,0.45)',
  },
  mHero: {
    position: 'relative',
    height: '100svh',
    width: '100%',
  },
  midLeftNative: {
    position: 'absolute',
    zIndex: 2,
    left: 'clamp(16px, 4vw, 24px)',
    bottom: '49%',
    fontSize: 'clamp(9px, 2.8vw, 13px)',
    fontWeight: 500,
    letterSpacing: '0.08em',
    lineHeight: 1.6,
    textTransform: 'uppercase',
  },
  mHeroBottom: {
    position: 'absolute',
    zIndex: 2,
    bottom: 'clamp(40px, 9vh, 90px)',
    left: 'clamp(14px, 4vw, 24px)',
    right: 'clamp(14px, 4vw, 24px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  centeredTitle: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'left',
  },
  announcement: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    fontSize: 'clamp(11px, 0.85vw, 15px)',
    fontWeight: 500,
    letterSpacing: '0.05em',
    padding: 'clamp(6px, 0.7vh, 10px) 16px',
    borderBottom: '2px solid rgba(255,255,255,0.25)',
    margin: '0 clamp(16px, 2vw, 40px)',
  },
  nav: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'clamp(10px, 1.4vh, 18px) clamp(16px, 2vw, 40px)',
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    zIndex: 10,
  },
  hamburgerBar: {
    display: 'block',
    width: '22px',
    height: '1.5px',
    background: '#fff',
    borderRadius: '1px',
  },
  sidebarBrand: {
    fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif",
    fontSize: '48px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    lineHeight: 1,
    color: '#fff',
    padding: '24px 28px 32px',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    flex: 1,
  },
  sidebarLink: {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '14px 28px',
  },
  navLink: {
    fontSize: 'clamp(12px, 0.9vw, 17px)',
    fontWeight: 500,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    color: '#fff',
    textDecoration: 'none',
  },
  midLeft: {
    position: 'absolute',
    zIndex: 10,
    left: 'clamp(16px, 2vw, 40px)',
    bottom: '34%',
    fontSize: 'clamp(10px, 0.8vw, 14px)',
    fontWeight: 500,
    letterSpacing: '0.08em',
    lineHeight: 1.6,
    textTransform: 'uppercase',
  },
  midRight: {
    fontSize: 'clamp(10px, 0.8vw, 14px)',
    fontWeight: 500,
    letterSpacing: '0.08em',
    lineHeight: 1.6,
    textTransform: 'uppercase',
    textAlign: 'right',
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  exploreArrow: {
    fontSize: 'clamp(14px, 1vw, 20px)',
    lineHeight: 1,
    flexShrink: 0,
  },
  heroBottom: {
    position: 'absolute',
    zIndex: 10,
    bottom: 'clamp(16px, 2.5vh, 50px)',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  heroInner: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 'clamp(60px, 14vw, 240px)',
    fontWeight: 700,
    letterSpacing: '0.1em',
    lineHeight: 1,
    margin: 0,
    fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif",
  },
  heroSub: {
    fontSize: 'clamp(13px, 1.1vw, 22px)',
    fontWeight: 500,
    letterSpacing: '0.06em',
    marginTop: '0px',
  },
  scrollChevron: {
    position: 'absolute',
    zIndex: 10,
    bottom: 'clamp(10px, 1.5vh, 26px)',
    left: '50%',
    transform: 'translateX(-50%) translateY(0px) rotate(90deg)',
    fontSize: 'clamp(16px, 1.5vw, 24px)',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.75)',
    animation: 'chevronDrop 2s ease-in-out infinite',
    pointerEvents: 'none',
    userSelect: 'none',
  },
}
