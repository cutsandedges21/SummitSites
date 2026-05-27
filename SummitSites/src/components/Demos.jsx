import { useState } from 'react'
import { motion } from 'framer-motion'

const TAGS = ['All', 'Landing Page', '3D', 'Animated', 'Restaurant', 'Mobile-First', 'Simple', 'Small Business']

export const DEMOS = [
  { name: 'SOM Elixir',          type: ['3D', 'Animated', 'Landing Page'],                  stat: '+52% conversions',  color: '#0d0a06', image: '/drinksom-hero.jpeg', url: 'https://www.drinksom.eu/#hero' },
  { name: 'AIR Business Center', type: ['Landing Page', 'Animated'],                     stat: '+38% new patients', color: '#0d1f1a', image: '/aircenter-hero.jpg', imgPosition: '50% 45%', url: 'https://aircenter.space/' },
  { name: 'Vorszk',              type: ['Animated', 'Landing Page'],                         stat: '+40% leads',        color: '#0a0a0a', image: '/vorszk-hero.jpeg', url: 'https://www.vorszk.com/' },
  { name: "Khufu's",             type: ['Landing Page', 'Restaurant'],       stat: '3× reservations',   color: '#1a1208', image: '/khufus-hero.jpeg', url: 'https://khufus.com/' },
  { name: 'Handhold',            type: ['Mobile-First', 'Landing Page', 'Simple'],                     stat: '+61% inquiries',    color: '#0a0f1a', image: '/handhold-hero.jpeg', url: 'https://handhold.io/', cropScrollbar: true },
  { name: 'Monads',              type: ['Simple'],                           stat: '+44% signups',      color: '#0a0a0f', image: '/monads-hero.jpeg', url: 'https://www.monads.ch/' },
  { name: 'Laser & Me',          type: ['Simple', 'Small Business'],         stat: '+29% form fills',   color: '#1a0d12', image: '/laserandme-hero.jpeg', url: 'https://laserandme.com/', cropScrollbar: true },
  { name: 'Cuts & Edges',        type: ['Small Business', 'Simple'],                   stat: '+55% bookings',     color: '#0a0a0a', image: '/cutsandedges-hero.jpeg', url: 'https://cutsandedges.base44.app/Home', cropScrollbar: true },
]

export default function Demos() {
  const [active, setActive] = useState('All')
  const [hovered, setHovered] = useState(null)
  const filtered = active === 'All' ? DEMOS : DEMOS.filter(d => d.type.includes(active))

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ marginBottom: 72 }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, marginBottom: 18 }}
        >
          Our work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ fontSize: 'clamp(44px,5.5vw,88px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0, marginBottom: 20 }}
        >
          Sites we've<br />built.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ fontSize: 'clamp(13px,1.05vw,18px)', color: 'rgba(255,255,255,0.45)', fontWeight: 400, letterSpacing: '0.04em', margin: 0 }}
        >
          Real sites we've designed and built — and the results they delivered. This is the standard of work we bring to every client.
        </motion.p>
      </div>

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
            onClick={() => demo.url && window.open(demo.url, '_blank', 'noopener')}
            style={{
              position: 'relative', overflow: 'hidden',
              background: demo.color,
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 4, aspectRatio: '16/10', cursor: demo.url ? 'pointer' : 'default',
            }}
          >
            {demo.image && (
              <img
                src={demo.image}
                alt={demo.name}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: demo.imgPosition || 'left top',
                  display: 'block',
                  ...(demo.cropScrollbar && { transform: 'scaleX(1.02)', transformOrigin: 'left center' }),
                }}
              />
            )}
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
              <div style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{demo.type.join(' · ').toUpperCase()}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{demo.name}</div>
              {demo.url && (
                <div style={{ marginTop: 14, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textDecoration: 'underline' }}>VIEW LIVE →</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
