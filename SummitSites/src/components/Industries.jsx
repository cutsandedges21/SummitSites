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
      <motion.h1
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, letterSpacing: '0.06em', color: '#fff', margin: '0 0 8px' }}
      >
        INDUSTRIES
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, letterSpacing: '0.06em', marginBottom: 52 }}
      >
        WE KNOW YOUR INDUSTRY. WE KNOW WHAT WORKS.
      </motion.p>

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
