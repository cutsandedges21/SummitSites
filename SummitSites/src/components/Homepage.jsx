import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const MORPH = { type: 'spring', stiffness: 45, damping: 18 }

export default function Homepage({ revealed = true, isMobile = false }) {

  // ── Desktop animations ───────────────────────────────────────────────────
  const fadeUp = {
    initial:    { opacity: 0, y: -12 },
    animate:    revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 },
    transition: { duration: 0.6, ease: 'easeOut' },
  }
  const fadeSide = (x) => ({
    initial:    { opacity: 0, x },
    animate:    revealed ? { opacity: 1, x: 0 } : { opacity: 0, x },
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.15 },
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
        <div style={styles.scrollChevron} className="scroll-chevron">&#62;</div>
      </div>
    )
  }

  // ── Mobile fullscreen entrance animations ────────────────────────────────
  const mAnn  = { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay: 0.05 } }
  const mNav  = { initial: { opacity: 0, y: -28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6,  ease: EASE, delay: 0.12 } }
  const mML   = { initial: { opacity: 0, x: -28 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6,  ease: EASE, delay: 0.22 } }
  const mMR   = { initial: { opacity: 0, x:  28 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6,  ease: EASE, delay: 0.22 } }
  const mSub  = { initial: { opacity: 0 },          animate: { opacity: 1 },       transition: { duration: 0.5,  ease: 'easeOut', delay: 0.45 } }

  const annProps = isMobile ? mAnn : {}
  const navProps = isMobile ? mNav : fadeUp
  const mlProps  = isMobile ? mML  : fadeSide(-20)
  const mrProps  = isMobile ? mMR  : fadeSide(20)

  return (
    <div style={styles.wrapper}>
      <video src="/wink_4k_homepageVid.mp4" style={styles.bg} autoPlay loop muted playsInline />
      <div style={styles.overlay} />

      <motion.div style={styles.announcement} {...annProps}>
        Professional Websites for Serious Businesses
      </motion.div>

      <motion.nav style={styles.nav} {...navProps}>
        <Link to="/demos" style={styles.navLink}>Demos</Link>
        <Link to="/services" style={styles.navLink}>Services</Link>
        <Link to="/process" style={styles.navLink}>Process</Link>
        <Link to="/industries" style={styles.navLink}>Industries</Link>
        <Link to="/faq" style={styles.navLink}>FAQ</Link>
        <Link to="/contact" style={styles.navLink}>Contact</Link>
      </motion.nav>

      <motion.div style={styles.midLeft} className="mid-left" {...mlProps}>
        We build fast,<br />professional websites<br />for local businesses,<br />starting at one flat fee.
      </motion.div>
      <motion.div {...mrProps} style={{ position: 'absolute', zIndex: 10, right: 'clamp(16px, 2vw, 40px)', bottom: '34%' }}>
        <Link to="/demos" style={styles.midRight} className="mid-right explore-link">
          <span>see our<br />work</span>
          <span style={styles.exploreArrow}>&gt;</span>
        </Link>
      </motion.div>

      {/* Hero — h1 uses layoutId so it morphs from the centered phone-frame position */}
      <div style={styles.heroBottom} className="hero-bottom">
        <div style={styles.heroInner} className="hero-inner">
          {isMobile ? (
            <motion.h1
              layoutId="summit-title"
              style={styles.heroTitle}
              className="hero-title"
              transition={MORPH}
            >
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>SUMMIT</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>SITES</span>
            </motion.h1>
          ) : (
            <h1 style={styles.heroTitle} className="hero-title">SUMMIT SITES</h1>
          )}
          <motion.p style={styles.heroSub} {...(isMobile ? mSub : {})}>
            Your Business, Elevated.
          </motion.p>
        </div>
      </div>

      <div style={styles.scrollChevron} className="scroll-chevron">&#62;</div>
    </div>
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
    borderBottom: '1px solid rgba(255,255,255,0.25)',
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
  navItem: {
    fontSize: 'clamp(12px, 0.9vw, 17px)',
    fontWeight: 500,
    letterSpacing: '0.04em',
    cursor: 'pointer',
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
    fontStyle: 'italic',
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
