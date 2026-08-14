import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const AMBER = '#D4623A'
const EMAIL = 'summitsites.agency@gmail.com'

const LINKS = [
  { to: '/portfolio',   label: 'See our work',      note: 'Live sites we’ve built' },
  { to: '/pricing',     label: 'View pricing',      note: 'Plans and what’s included' },
  { to: '/faq',         label: 'Common questions',  note: 'Answers before you ask' },
]

export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ maxWidth: 640 }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, marginBottom: 18 }}
          >
            Get in touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            style={{ fontSize: 'clamp(44px,5.5vw,88px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0, marginBottom: 20 }}
          >
            Let's build<br />something.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            style={{ fontSize: 'clamp(13px,1.05vw,18px)', color: 'rgba(255,255,255,0.45)', fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.6, margin: 0 }}
          >
            Tell us about your business — no commitment, no pressure. Email us and we'll reply within 24 hours.
          </motion.p>
        </div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.28 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 28, marginBottom: 40 }}
        >
          <p style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: 0, marginBottom: 12 }}>
            Email us
          </p>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              fontSize: 'clamp(20px,2.4vw,32px)', fontWeight: 600, letterSpacing: '-0.01em',
              color: '#fff', textDecoration: 'none', borderBottom: `1px solid ${AMBER}`, paddingBottom: 3,
            }}
          >
            {EMAIL}
          </a>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em', margin: 0, marginTop: 18, lineHeight: 1.6 }}>
            Include your business name and a few lines about what you need — the more you share, the sharper our first reply.
          </p>
        </motion.div>

        {/* Helpful links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.36 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 28 }}
        >
          <p style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: 0, marginBottom: 20 }}>
            Before you write
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {LINKS.map(({ to, label, note }) => (
              <Link
                key={to}
                to={to}
                style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16,
                  padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.07)',
                  textDecoration: 'none', color: '#fff',
                }}
              >
                <span style={{ fontSize: 'clamp(15px,1.3vw,18px)', fontWeight: 500, letterSpacing: '0.01em' }}>
                  {label}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', textAlign: 'right' }}>
                  {note} <span style={{ color: AMBER }}>→</span>
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
