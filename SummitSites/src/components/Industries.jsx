import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const INDUSTRIES = [
  { icon: '⚖',  label: 'LAW',           pain: 'Clients judge you before they call.'          },
  { icon: '✚',  label: 'MEDICAL',        pain: 'Your old site costs you new patients.'         },
  { icon: '⬡',  label: 'CONSTRUCTION',   pain: 'Bad photos kill good work.'                   },
  { icon: '◆',  label: 'RESTAURANT',     pain: 'Empty tables start with a bad website.'       },
  { icon: '⌂',  label: 'REAL ESTATE',    pain: 'Listings deserve better than templates.'      },
  { icon: '◎',  label: 'FITNESS',        pain: "Signups drop when the site doesn't inspire."  },
  { icon: '✦',  label: 'FINANCE',        pain: 'Credibility is everything — show it.'          },
  { icon: '△',  label: 'TRADE SERVICES', pain: 'Phone calls come from Google, not referrals.' },
]

export default function Industries() {
  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ marginBottom: 72 }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, marginBottom: 18 }}
        >
          Who we serve
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ fontSize: 'clamp(44px,5.5vw,88px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0, marginBottom: 20 }}
        >
          We know your<br />industry.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ fontSize: 'clamp(13px,1.05vw,18px)', color: 'rgba(255,255,255,0.45)', fontWeight: 400, letterSpacing: '0.04em', margin: 0 }}
        >
          We've built across every major local business category. Your sector isn't new to us.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
        {INDUSTRIES.map((ind, i) => (
          <motion.div
            key={ind.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            style={{
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4,
              padding: '28px 24px', background: 'rgba(255,255,255,0.02)',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}
          >
            <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>{ind.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: '#fff' }}>{ind.label}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{ind.pain}</div>
            <Link to="/demos" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textDecoration: 'underline', marginTop: 4 }}>
              SEE EXAMPLE →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
