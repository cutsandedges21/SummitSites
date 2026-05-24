import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Homepage({ revealed = true }) {
  const fadeUp = {
    initial:   { opacity: 0, y: -12 },
    animate:   revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 },
    transition: { duration: 0.6, ease: 'easeOut' },
  }
  const fadeSide = (x) => ({
    initial:   { opacity: 0, x },
    animate:   revealed ? { opacity: 1, x: 0 } : { opacity: 0, x },
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.15 },
  })

  return (
    <div style={styles.wrapper}>
      {/* Mountain background */}
      <video src="/wink_4k_homepageVid.mp4" style={styles.bg} autoPlay loop muted playsInline />
      <div style={styles.overlay} />

      {/* Announcement bar */}
      <div style={styles.announcement}>
        Professional Websites for Serious Businesses
      </div>

      {/* Nav */}
      <motion.nav style={styles.nav} {...fadeUp}>
        <Link to="/demos" style={styles.navLink}>Demos</Link>
        <span style={styles.navItem}>Services</span>
        <span style={styles.navItem}>Process</span>
        <span style={styles.navItem}>Industries</span>
        <span style={styles.navItem}>FAQ</span>
        <span style={styles.navItem}>Contact</span>
      </motion.nav>

      {/* Mid-left / mid-right labels */}
      <motion.div style={styles.midLeft} className="mid-left" {...fadeSide(-20)}>
        We build fast,<br />professional websites<br />for local businesses,<br />starting at one flat fee.
      </motion.div>
      <motion.div {...fadeSide(20)} style={{ position: 'absolute', zIndex: 10, right: '28px', bottom: '34%' }}>
        <Link to="/demos" style={styles.midRight} className="mid-right explore-link">
          <span>see our<br />work</span>
          <span style={styles.exploreArrow}>&gt;</span>
        </Link>
      </motion.div>

      {/* Hero text */}
      <div style={styles.heroBottom} className="hero-bottom">
        <div style={styles.heroInner} className="hero-inner">
          <h1 style={styles.heroTitle} className="hero-title">SUMMIT SITES</h1>
          <p style={styles.heroSub}>Your Business, Elevated.</p>
        </div>
      </div>

      {/* Scroll-down chevron */}
      <div style={styles.scrollChevron} className="scroll-chevron">&#62;</div>
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
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
  announcement: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    padding: '8px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.25)',
    margin: '0 28px',
  },
  nav: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 28px',
  },
  navItem: {
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '0.04em',
    cursor: 'pointer',
  },
  navLink: {
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    color: '#fff',
    textDecoration: 'none',
  },
  midLeft: {
    position: 'absolute',
    zIndex: 10,
    left: '28px',
    bottom: '34%',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    lineHeight: 1.6,
    textTransform: 'uppercase',
  },
  midRight: {
    fontSize: '14px',
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
    fontSize: '18px',
    lineHeight: 1,
    flexShrink: 0,
  },
  heroBottom: {
    position: 'absolute',
    zIndex: 10,
    bottom: '30px',
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
    fontSize: 'clamp(80px, 16vw, 200px)',
    fontWeight: 700,
    letterSpacing: '0.1em',
    lineHeight: 1,
    margin: 0,
    fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif",
  },
  heroSub: {
    fontSize: '18px',
    fontWeight: 500,
    letterSpacing: '0.06em',
    marginTop: '0px',
    fontStyle: 'italic',
  },
  scrollChevron: {
    position: 'absolute',
    zIndex: 10,
    bottom: '18px',
    left: '50%',
    transform: 'translateX(-50%) translateY(0px) rotate(90deg)',
    fontSize: '22px',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.75)',
    animation: 'chevronDrop 2s ease-in-out infinite',
    pointerEvents: 'none',
    userSelect: 'none',
  },
}
