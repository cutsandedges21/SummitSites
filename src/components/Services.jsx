import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SERVICES = [
  {
    icon: '✦',
    title: 'DESIGN',
    blurb: 'Custom visuals built around your brand — no templates, no shortcuts.',
    includes: ['Brand identity integration', 'Mobile-first layouts', 'Custom animations', 'UI/UX wireframing'],
  },
  {
    icon: '⬡',
    title: 'DEVELOPMENT',
    blurb: 'Fast, modern sites engineered for performance and long-term reliability.',
    includes: ['React / Next.js build', 'CMS integration', 'Speed optimization', 'Cross-browser QA'],
  },
  {
    icon: '◎',
    title: 'SEO',
    blurb: 'Built to rank from day one — technical SEO baked into every page.',
    includes: ['On-page optimization', 'Schema markup', 'Core Web Vitals', 'Google Business setup'],
  },
  {
    icon: '△',
    title: 'MAINTENANCE',
    blurb: 'We keep your site fast, secure, and up to date — hands off for you.',
    includes: ['Monthly updates', 'Uptime monitoring', 'Security patches', 'Content edits included'],
  },
]

export default function Services() {
  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ marginBottom: 72 }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, marginBottom: 18 }}
        >
          What we offer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ fontSize: 'clamp(44px,5.5vw,88px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0, marginBottom: 20 }}
        >
          Everything your<br />site needs.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ fontSize: 'clamp(13px,1.05vw,18px)', color: 'rgba(255,255,255,0.45)', fontWeight: 400, letterSpacing: '0.04em', margin: 0 }}
        >
          Design, development, SEO, and support — all under one roof, one flat rate.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 24, marginBottom: 60 }}>
        {SERVICES.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 4, padding: '32px 28px',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 16, color: 'rgba(255,255,255,0.6)' }}>{svc.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: '#fff', marginBottom: 10 }}>{svc.title}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 22 }}>{svc.blurb}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {svc.includes.map(item => (
                <li key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em', padding: '5px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  — {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <Link to="/contact" style={{
          display: 'inline-block', padding: '14px 36px',
          border: '1px solid rgba(255,255,255,0.35)', borderRadius: 2,
          color: '#fff', textDecoration: 'none', fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          GET STARTED →
        </Link>
      </motion.div>
    </div>
  )
}
