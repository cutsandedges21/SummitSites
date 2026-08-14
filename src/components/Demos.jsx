import { useState } from 'react'
import { motion } from 'framer-motion'

const TAGS = ['All', 'Restaurant', 'Hospitality', 'Product', 'Service', 'Agency']

export const DEMOS = [
  { name: 'SOM Elixir',          own: false, type: ['Product'],                               stat: '2.3× conversions',     color: '#0d0a06', image: '/drinksom-hero.jpeg', url: 'https://www.drinksom.eu/#hero' },
  { name: 'AIR Business Center', own: false, type: ['Service'],                               stat: '+31% new patients',    color: '#0d1f1a', image: '/aircenter-hero.jpg', imgPosition: '50% 45%', url: 'https://aircenter.space/' },
  { name: 'Vorszk',              own: false, type: ['Agency'],                                stat: '+124% leads',          color: '#0a0a0a', image: '/vorszk-hero.jpeg', url: 'https://www.vorszk.com/' },
  { name: 'Meridian Studio',     own: true,  type: ['Agency'],                                stat: '+18% engagement',      color: '#0b0a12', image: '/meridian-hero.png', url: 'https://summitsites-agency.github.io/meridian-studio/' },
  { name: "Khufu's",             own: false, type: ['Restaurant'],                            stat: '3.4× reservations',    color: '#1a1208', image: '/khufus-hero.jpeg', url: 'https://khufus.com/' },
  { name: 'Monads',              own: false, type: ['Product'],                               stat: '+180% signups',        color: '#0a0a0f', image: '/monads-hero.jpeg', url: 'https://www.monads.ch/' },
  { name: 'Cuts & Edges',        own: true,  type: ['Service'],                               stat: '2× bookings',          color: '#0a0a0a', image: '/cutsandedges-vercel.jpeg', url: 'https://cutsandedges.vercel.app/' },
  { name: 'Sterling Motors',     own: true,  type: ['Service'],                               stat: '+22% test drives',     color: '#0c0e12', image: '/sterling-hero.jpeg', url: 'https://sterling-motors-demo.vercel.app/', cropScrollbar: true },
  { name: 'Halcyon Spa',         own: true,  type: ['Service'],                               stat: '+74% bookings',        color: '#15100c', image: '/halcyon-hero.jpeg', url: 'https://halcyon-spa-demo.vercel.app/' },
  { name: 'Elixir Hotel',        own: true,  type: ['Hospitality'],                           stat: '+41% direct bookings', color: '#0c0a08', image: '/elixir-hotel-hero.jpeg', url: 'https://elixir-hotel-demo.vercel.app' },
  { name: 'Piment',              own: true,  type: ['Restaurant'],                            stat: '+96% reservations',    color: '#100b0a', image: '/piment-hero.jpeg', url: 'https://piment-demo.vercel.app/' },
  { name: 'Centenario',          own: true,  type: ['Product'],                               stat: '4× engagement',        color: '#d5d5d8', image: '/lamborghini-hero.jpeg', url: 'https://lamborghini-centenario-showcase.vercel.app/' },
  { name: 'BRAND Cosmetics',     own: true,  type: ['Product'],                               stat: '+88% orders',          color: '#e9eaf0', image: '/brand-cosmetics-hero.jpeg', url: 'https://brand-cosmetics.vercel.app/' },
  { name: 'Gloryn Custom',       own: true,  type: ['Service'],                               stat: '+37% bookings',        color: '#140908', image: '/glorync-hero.jpeg', url: 'https://gloryncustom.com/' },
]

// Curated favourites lead the Our Work grid; everything else follows in listed order.
const FAVOURITES = ['Gloryn Custom', 'Meridian Studio', 'Cuts & Edges', 'Halcyon Spa', 'Elixir Hotel', 'Piment', 'Centenario', 'BRAND Cosmetics']
const favRank = name => { const i = FAVOURITES.indexOf(name); return i === -1 ? 999 : i }

const OWN_WORK    = DEMOS.filter(d => d.own).sort((a, b) => favRank(a.name) - favRank(b.name))
const INSPIRATION = DEMOS.filter(d => !d.own)

const EASE = [0.22, 1, 0.36, 1]
const GRID = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }

function DemoCard({ demo, i, hovered, setHovered }) {
  return (
    <motion.div
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
      {/* Ownership badge — stays visible over the hover state */}
      <div style={{
        position: 'absolute', top: 12, left: 12, zIndex: 3,
        fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
        padding: '4px 9px', borderRadius: 2, color: '#fff',
        background: demo.own ? 'rgba(212,98,58,0.92)' : 'rgba(0,0,0,0.5)',
        border: `1px solid ${demo.own ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.3)'}`,
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
      }}>
        {demo.own ? 'Our Work' : 'Inspiration'}
      </div>
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
  )
}

function SectionLabel({ title, sub, delay = 0 }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <motion.h2
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay }}
        style={{ fontSize: 'clamp(22px,2.6vw,36px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.1, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0 }}
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', margin: '8px 0 0' }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  )
}

export default function Demos() {
  const [active, setActive] = useState('All')
  const [hovered, setHovered] = useState(null)
  const ownFiltered = active === 'All' ? OWN_WORK : OWN_WORK.filter(d => d.type.includes(active))

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ marginBottom: 64 }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, marginBottom: 18 }}
        >
          Work &amp; Inspiration
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          style={{ fontSize: 'clamp(44px,5.5vw,88px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0, marginBottom: 20 }}
        >
          Quality<br />examples.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          style={{ fontSize: 'clamp(13px,1.05vw,18px)', color: 'rgba(255,255,255,0.45)', fontWeight: 400, letterSpacing: '0.04em', margin: 0, maxWidth: 720 }}
        >
          A mix of sites we&apos;ve designed and built, plus a few we simply admire. Anything marked <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Our Work</strong> is ours end to end — the rest are inspirations that set the standard we hold ourselves to.
        </motion.p>
      </div>

      {/* Our Work — sites we've designed and built */}
      <div style={{ marginBottom: 72 }}>
        <SectionLabel title="Our Work" sub="Sites we've designed and built, start to finish." />
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}
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
        <div style={GRID}>
          {ownFiltered.map((demo, i) => (
            <DemoCard key={demo.name} demo={demo} i={i} hovered={hovered} setHovered={setHovered} />
          ))}
        </div>
      </div>

      {/* Inspiration — sites we admire, not our own work */}
      <div>
        <SectionLabel title="Inspiration" sub="Not ours — a handful we love that set the bar." delay={0.05} />
        <div style={GRID}>
          {INSPIRATION.map((demo, i) => (
            <DemoCard key={demo.name} demo={demo} i={i} hovered={hovered} setHovered={setHovered} />
          ))}
        </div>
      </div>
    </div>
  )
}
