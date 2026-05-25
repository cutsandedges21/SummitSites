import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import About from './About'

const EASE = [0.22, 1, 0.36, 1]
const MORPH = { type: 'spring', stiffness: 45, damping: 18 }
const MORPH_SLOW = { type: 'spring', stiffness: 8, damping: 18 }
const SIDEBAR_W = 260

const ALL_NAV_LINKS = [
  { to: '/demos',      label: 'Demos'      },
  { to: '/services',   label: 'Services'   },
  { to: '/process',    label: 'Process'    },
  { to: '/industries', label: 'Industries' },
  { to: '/faq',        label: 'FAQ'        },
  { to: '/contact',    label: 'Contact'    },
]

export default function Homepage({ revealed = true, isMobile = false, scrollY = 0 }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showBrand, setShowBrand] = useState(false)
  const topBarRef  = useRef(null)
  const heroSubRef = useRef(null)

  useEffect(() => {
    if (!heroSubRef.current || !topBarRef.current) return
    const subTop    = heroSubRef.current.getBoundingClientRect().top
    const barBottom = topBarRef.current.getBoundingClientRect().bottom
    setShowBrand(subTop <= barBottom)
  }, [scrollY])

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

  // ── Mobile: only bg + centered title + chevron until fullscreen ──────────
  if (isMobile && !revealed) {
    return (
      <div style={styles.wrapper}>
        <video src="/wink_4k_homepageVid.mp4" style={styles.bg} autoPlay loop muted playsInline />
        <div style={styles.overlay} />
        <div style={styles.centeredTitle}>
          <motion.h1
            layoutId="summit-title"
            style={styles.heroTitle}
            className="hero-title"
            transition={MORPH}
          >
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>SUMMIT</span>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>SITES</span>
          </motion.h1>
        </div>
        <motion.div layoutId="scroll-chevron" style={styles.scrollChevron} className="scroll-chevron" transition={MORPH_SLOW}><ChevronIcon size={18} /></motion.div>
      </div>
    )
  }

  // ── Mobile fullscreen entrance animations ────────────────────────────────
  const mAnn  = { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay: 0.05 } }
  const mNav  = { initial: { opacity: 0, y: -28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6,  ease: EASE, delay: 0.12 } }
  const mML   = { initial: { opacity: 0, x: -28 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6,  ease: EASE, delay: 0.22 } }
  const mSub  = { initial: { opacity: 0 },          animate: { opacity: 1 },       transition: { duration: 0.5,  ease: 'easeOut', delay: 0.45 } }

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
          <motion.nav style={styles.nav} {...fadeUp}>
            <Link to="/demos"      style={styles.navLink}>Demos</Link>
            <Link to="/services"   style={styles.navLink}>Services</Link>
            <Link to="/process"    style={styles.navLink}>Process</Link>
            <Link to="/industries" style={styles.navLink}>Industries</Link>
            <Link to="/faq"        style={styles.navLink}>FAQ</Link>
            <Link to="/contact"    style={styles.navLink}>Contact</Link>
          </motion.nav>
        </div>

        {/* Content layer — moves up on scroll */}
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${-scrollY}px)`, willChange: 'transform' }}>
          <motion.div style={styles.midLeft} className="mid-left" {...fadeSide(-20)}>
            We build fast,<br />professional websites<br />for local businesses,<br />starting at one flat fee.
          </motion.div>
          <motion.div {...fadeSide(20)} className="mid-right-wrapper" style={{ position: 'absolute', zIndex: 10, right: 'clamp(16px, 2vw, 40px)', bottom: '34%' }}>
            <Link to="/demos" style={styles.midRight} className="mid-right explore-link">
              <span>see our<br />work</span>
              <ChevronIcon size={14} />
            </Link>
          </motion.div>
          <div style={styles.heroBottom} className="hero-bottom">
            <div style={styles.heroInner} className="hero-inner">
              <FlipText style={styles.heroTitle} className="hero-title">SUMMIT SITES</FlipText>
              <p ref={heroSubRef} style={styles.heroSub}>YOUR BUSINESS, ELEVATED.</p>
            </div>
          </div>
          <div style={styles.scrollChevron} className="scroll-chevron"><ChevronIcon size={18} /></div>

          {/* About section — sits at 100vh, scrolls up with the content layer */}
          <div style={{ position: 'absolute', top: '115vh', left: 0, width: '100vw', height: '100vh' }}>
            <About scrollY={scrollY} />
          </div>
        </div>
      </div>
    )
  }

  // ── Mobile render with push sidebar ─────────────────────────────────────
  return (
    <div style={styles.wrapper}>

      {/* Static background — never pushed */}
      <video src="/wink_4k_homepageVid.mp4" style={styles.bg} autoPlay loop muted playsInline />
      <div style={styles.overlay} />

      {/* Sidebar panel — slides in from left */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -SIDEBAR_W }}
        transition={springTransition}
        style={styles.sidebar}
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

      {/* Backdrop — tap to close */}
      {sidebarOpen && (
        <div style={styles.backdrop} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Text layer — only this gets pushed right */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? SIDEBAR_W : 0 }}
        transition={springTransition}
        style={{ position: 'absolute', inset: 0 }}
      >
        <motion.div style={styles.announcement} {...mAnn}>
          SUMMIT SITES
        </motion.div>

        <motion.nav style={styles.navMobile} {...mNav}>
          <button
            className="icon-btn"
            style={{ ...styles.hamburger, position: 'relative', zIndex: 28 }}
            onClick={() => setSidebarOpen(v => !v)}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              style={styles.hamburgerBar}
              animate={sidebarOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            />
            <motion.span
              style={styles.hamburgerBar}
              animate={sidebarOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
            <motion.span
              style={styles.hamburgerBar}
              animate={sidebarOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            />
          </button>
          <div style={styles.mobileNavLinks}>
            <Link to="/demos"     style={styles.navLink}>Demos</Link>
            <Link to="/services"  style={styles.navLink}>Services</Link>
            <Link to="/contact"   style={styles.navLink}>Contact</Link>
          </div>
        </motion.nav>

        <motion.div style={styles.midLeft} className="mid-left" {...mML}>
          We build fast,<br />professional websites<br />for local businesses,<br />starting at one flat fee.
        </motion.div>

        <div style={styles.heroBottom} className="hero-bottom">
          <div style={styles.heroInner} className="hero-inner">
            <motion.h1
              layoutId="summit-title"
              style={styles.heroTitle}
              className="hero-title"
              transition={MORPH}
            >
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>SUMMIT</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>SITES</span>
            </motion.h1>
            <motion.p style={styles.heroSub} {...mSub}>
              YOUR BUSINESS, ELEVATED.
            </motion.p>
          </div>
        </div>

        <motion.div
          layoutId="scroll-chevron"
          style={{ ...styles.scrollChevron, left: 'auto', right: 'clamp(16px, 4vw, 32px)', transform: 'rotate(90deg)' }}
          className="scroll-chevron"
          transition={MORPH_SLOW}
        ><ChevronIcon size={18} /></motion.div>
      </motion.div>

    </div>
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
    width: '100vw',
    height: '100svh',
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
  navMobile: {
    position: 'relative',
    zIndex: 10,
    display: 'grid',
    gridTemplateColumns: '44px 1fr',
    alignItems: 'center',
    padding: 'clamp(10px, 1.4vh, 18px) clamp(16px, 4vw, 24px)',
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
  mobileNavLinks: {
    display: 'flex',
    gap: '35px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_W,
    zIndex: 30,
    background: 'transparent',
    borderRight: '1px solid rgba(255,255,255,0.15)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px',
    paddingBottom: '40px',
  },
  sidebarClose: {
    alignSelf: 'flex-end',
    marginRight: '18px',
    background: 'none',
    border: 'none',
    color: 'rgba(0,0,0,0.45)',
    fontSize: '28px',
    lineHeight: 1,
    cursor: 'pointer',
    padding: '4px 8px',
    fontWeight: 300,
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
  backdrop: {
    position: 'absolute',
    inset: 0,
    zIndex: 25,
    background: 'rgba(0,0,0,0.35)',
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
    fontSize: 'clamp(60px, 12vw, 200px)',
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
