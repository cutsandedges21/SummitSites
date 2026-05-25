import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function FAQ() {
  return (
    <div style={styles.wrapper}>
      <motion.nav style={styles.nav} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
        <Link to="/demos" style={styles.navLink}>Demos</Link>
        <Link to="/services" style={styles.navLink}>Services</Link>
        <Link to="/process" style={styles.navLink}>Process</Link>
        <Link to="/industries" style={styles.navLink}>Industries</Link>
        <Link to="/faq" style={styles.navLink}>FAQ</Link>
        <Link to="/contact" style={styles.navLink}>Contact</Link>
      </motion.nav>
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100vw',
    height: '100svh',
    background: '#040c1a',
    fontFamily: "'Itoya', 'Helvetica Neue', Arial, sans-serif",
    color: '#fff',
  },
  nav: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'clamp(10px, 1.4vh, 18px) clamp(16px, 2vw, 40px)',
  },
  navLink: {
    fontSize: 'clamp(12px, 0.9vw, 17px)',
    fontWeight: 500,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    color: '#fff',
    textDecoration: 'none',
  },
}
