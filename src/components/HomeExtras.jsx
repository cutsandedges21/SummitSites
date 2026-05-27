import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Process from './Process'
import { DEMOS } from './Demos'

const EASE = [0.22, 1, 0.36, 1]
const VIEWPORT = { once: true, amount: 0.3 }

const SECTION_PAD = 'clamp(48px,7vw,90px) clamp(16px,4vw,60px)'

// Homepage process copy — kept deliberately distinct from the /process page
const HOME_STEPS = [
  { num: '01', title: 'Share your vision.',       desc: 'A quick form tells us your goals, brand, and audience — no drawn-out meetings, no guesswork.' },
  { num: '02', title: 'We do the heavy lifting.', desc: 'Design, copy, and development handled in-house. You review, we refine until it feels right.' },
  { num: '03', title: 'Go live, stress-free.',    desc: 'Domain, hosting, and performance are all on us. Your site ships fast and ready to perform.' },
  { num: '04', title: "We don't disappear.",      desc: 'Edits, fixes, and new pages whenever you need them — all rolled into one flat rate.' },
]

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div style={{ marginBottom: 'clamp(36px,4vw,56px)' }}>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEWPORT}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 18px' }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}
        transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
        style={{ fontSize: 'clamp(40px,5vw,80px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0 }}
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          style={{ fontSize: 'clamp(13px,1.05vw,18px)', color: 'rgba(255,255,255,0.45)', fontWeight: 400, letterSpacing: '0.04em', margin: '20px 0 0', maxWidth: 620 }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  )
}

function WorkPreview({ isMobile = false }) {
  const [hovered, setHovered] = useState(null)
  const featured = DEMOS.slice(0, 3)

  return (
    <section style={{ padding: SECTION_PAD }}>
      <SectionHead
        eyebrow="Selected work"
        title="Sites we've built."
        sub="A few of the sites we've designed and built — and the results they delivered."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
        {featured.map((demo, i) => (
          <motion.div
            key={demo.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}
            transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
            whileHover={{ scale: 1.03, transition: { duration: 0.25, ease: EASE } }}
            onMouseEnter={() => setHovered(demo.name)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => demo.url && window.open(demo.url, '_blank', 'noopener')}
            style={{
              position: 'relative', overflow: 'hidden',
              background: demo.color, border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6, aspectRatio: '16/10', cursor: demo.url ? 'pointer' : 'default',
            }}
          >
            {demo.image && (
              <img
                src={demo.image} alt={demo.name}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: demo.imgPosition || 'left top', display: 'block',
                  ...(demo.cropScrollbar && { transform: 'scaleX(1.02)', transformOrigin: 'left center' }),
                }}
              />
            )}
            {isMobile ? (
              <>
                {/* Left half — default label over the image (touch has no hover) */}
                <div style={{
                  position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%',
                  display: 'flex', alignItems: 'flex-end', padding: 16,
                  background: 'linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 60%)',
                }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '0.03em' }}>{demo.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', marginTop: 3 }}>{demo.stat}</div>
                  </div>
                </div>
                {/* Right half — permanently dimmed "hover" state */}
                <div style={{
                  position: 'absolute', top: 0, bottom: 0, left: '50%', right: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center', padding: 12,
                  background: 'rgba(0,0,0,0.55)',
                  borderLeft: '1px solid rgba(255,255,255,0.12)',
                }}>
                  <div style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{demo.type.join(' · ').toUpperCase()}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{demo.name}</div>
                  {demo.url && (
                    <div style={{ marginTop: 12, fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textDecoration: 'underline' }}>VIEW LIVE →</div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 18,
                  background: 'linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 60%)',
                  opacity: hovered === demo.name ? 0 : 1, transition: 'opacity 0.25s',
                }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '0.03em' }}>{demo.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', marginTop: 3 }}>{demo.stat}</div>
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
              </>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEWPORT}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ marginTop: 36 }}
      >
        <Link to="/demos" style={{
          fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 4,
        }}>
          See all work →
        </Link>
      </motion.div>
    </section>
  )
}

function Divider() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18,
      width: '100%', maxWidth: 1100, margin: '0 auto',
      padding: '0 clamp(16px,4vw,60px)',
    }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.18))' }} />
      <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, lineHeight: 1 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.18))' }} />
    </div>
  )
}

function CtaBand() {
  return (
    <section style={{
      padding: 'clamp(40px,10vw,140px) clamp(16px,4vw,60px)',
      textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          fontSize: 'clamp(44px,7vw,120px)', fontWeight: 700, letterSpacing: '-0.01em',
          lineHeight: 1, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0,
        }}
      >
        Let's build yours.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        style={{
          fontSize: 'clamp(14px,1.2vw,20px)', color: 'rgba(255,255,255,0.5)',
          fontWeight: 400, letterSpacing: '0.04em', margin: 'clamp(20px,2.5vw,32px) 0 0', maxWidth: 560,
        }}
      >
        Tell us about your business and we'll show you what's possible. One flat rate, no surprises.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
        style={{ marginTop: 'clamp(32px,4vw,48px)' }}
      >
        <Link to="/contact" style={{
          display: 'inline-block', padding: '16px 44px',
          border: '1px solid rgba(255,255,255,0.4)', borderRadius: 3,
          color: '#fff', textDecoration: 'none', fontSize: 13,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          background: 'rgba(255,255,255,0.04)',
        }}>
          Start your project →
        </Link>
      </motion.div>
    </section>
  )
}

export default function HomeSections({ isMobile = false }) {
  return (
    <>
      <Divider />
      <Process
        flat
        inView
        eyebrow="The process"
        heading={<>Simple from<br />day one.</>}
        sub="Four steps from first hello to a website that quietly works for you around the clock."
        steps={HOME_STEPS}
      />
      <Divider />
      <WorkPreview isMobile={isMobile} />
      <Divider />
      <CtaBand />
    </>
  )
}
