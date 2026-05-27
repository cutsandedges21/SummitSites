import { useState } from 'react'
import { motion } from 'framer-motion'

const TAGS = ['All', 'Law', 'Medical', 'Construction', 'Restaurant', 'Real Estate', 'Fitness']

const DEMOS = [
  { name: 'Harmon & Associates', industry: 'Law',         stat: '+52% consultations', color: '#1a1a2e' },
  { name: 'Peak Orthopedics',    industry: 'Medical',     stat: '+38% new patients',  color: '#0d1f1a' },
  { name: 'Ridge Builders',      industry: 'Construction',stat: '+40% leads',         color: '#1e1206' },
  { name: 'Ember Table',         industry: 'Restaurant',  stat: '3× reservations',    color: '#1e0808' },
  { name: 'Summit Realty',       industry: 'Real Estate', stat: '+61% inquiries',     color: '#0a1520' },
  { name: 'Apex Fitness',        industry: 'Fitness',     stat: '+44% signups',       color: '#0c1a12' },
  { name: 'Calloway Law Group',  industry: 'Law',         stat: '+29% form fills',    color: '#1a1a2e' },
  { name: 'ClearPath Dental',    industry: 'Medical',     stat: '+55% bookings',      color: '#0d1f1a' },
]

export default function Demos() {
  const [active, setActive] = useState('All')
  const [hovered, setHovered] = useState(null)
  const filtered = active === 'All' ? DEMOS : DEMOS.filter(d => d.industry === active)

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <motion.h1
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, letterSpacing: '0.06em', color: '#fff', margin: '0 0 8px' }}
      >
        DEMOS
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, letterSpacing: '0.06em', marginBottom: 36 }}
      >
        REAL RESULTS. REAL CLIENTS.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}
      >
        {TAGS.map(tag => (
          <button
            key={tag} onClick={() => setActive(tag)}
            style={{
              background: active === tag ? 'rgba(255,255,255,0.12)' : 'transparent',
              border: `1px solid ${active === tag ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}`,
              color: active === tag ? '#fff' : 'rgba(255,255,255,0.45)',
              padding: '6px 16px', borderRadius: 2, cursor: 'pointer',
              fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s',
            }}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
        {filtered.map((demo, i) => (
          <motion.div
            key={demo.name}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            onMouseEnter={() => setHovered(demo.name)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative', overflow: 'hidden',
              background: demo.color, border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 4, aspectRatio: '16/10', cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 18,
              background: 'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%)',
              opacity: hovered === demo.name ? 0 : 1, transition: 'opacity 0.25s',
            }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '0.03em' }}>{demo.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', marginTop: 3 }}>{demo.stat}</div>
              </div>
            </div>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.55)',
              opacity: hovered === demo.name ? 1 : 0, transition: 'opacity 0.25s',
            }}>
              <div style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{demo.industry.toUpperCase()}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{demo.name}</div>
              <div style={{ marginTop: 14, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textDecoration: 'underline' }}>VIEW LIVE →</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
