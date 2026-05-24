export default function Homepage() {
  return (
    <div style={styles.wrapper}>
      {/* Mountain background */}
      <img src="/good_homepage.png" alt="" style={styles.bg} />
      <div style={styles.overlay} />

      {/* Announcement bar */}
      <div style={styles.announcement}>
        Free Shipping On All Intl. Orders Over $100
      </div>

      {/* Nav */}
      <nav style={styles.nav}>
        <span style={styles.navItem}>Shop All</span>
        <span style={styles.navItem}>Pendant</span>
        <span style={styles.navItem}>Flame</span>
        <span style={styles.navItem}>Table</span>
        <span style={styles.navItem}>Contact</span>
        <span style={styles.navItem}>Cart</span>
      </nav>

      {/* Mid-left / mid-right labels */}
      <div style={styles.midLeft}>
        LIGHTING DESIGN<br />FOR A LASTING IMPRESSION
      </div>
      <div style={styles.midRight}>
        EXPLORE NEW<br />COLLECTION
      </div>

      {/* Hero text */}
      <div style={styles.heroBottom}>
        <div style={styles.heroInner}>
          <h1 style={styles.heroTitle}>SUMMIT SITES</h1>
          <p style={styles.heroSub}>Illuminate Your Style.</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: "'Barlow', 'Helvetica Neue', Arial, sans-serif",
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
    fontSize: '11px',
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
    fontSize: '12px',
    letterSpacing: '0.04em',
    cursor: 'pointer',
    opacity: 0.9,
  },
  midLeft: {
    position: 'absolute',
    zIndex: 10,
    left: '28px',
    bottom: '32%',
    fontSize: '10px',
    letterSpacing: '0.08em',
    lineHeight: 1.6,
    textTransform: 'uppercase',
    opacity: 0.85,
  },
  midRight: {
    position: 'absolute',
    zIndex: 10,
    right: '28px',
    bottom: '32%',
    fontSize: '10px',
    letterSpacing: '0.08em',
    lineHeight: 1.6,
    textTransform: 'uppercase',
    textAlign: 'right',
    opacity: 0.85,
  },
  heroBottom: {
    position: 'absolute',
    zIndex: 10,
    bottom: '32px',
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
    fontSize: 'clamp(64px, 13vw, 160px)',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1,
    margin: 0,
    fontFamily: "'Barlow Semi Condensed', 'Barlow', 'Helvetica Neue', Arial, sans-serif",
  },
  heroSub: {
    fontSize: '14px',
    letterSpacing: '0.04em',
    marginTop: '8px',
    opacity: 0.85,
    fontStyle: 'italic',
  },
}
