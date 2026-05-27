import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const STEPS = [
  {
    num: '01',
    title: 'Tell us about your business.',
    desc: 'Fill out a short form. We learn your goals, brand, and audience in under 10 minutes. No long calls, no guesswork.',
  },
  {
    num: '02',
    title: 'We design and build.',
    desc: 'We handle everything — design, copy, development. You review, give feedback, we refine until it\'s exactly right.',
  },
  {
    num: '03',
    title: 'Launch and go live.',
    desc: 'We handle the full launch — domain, hosting, performance. Your site is live and working before you know it.',
  },
  {
    num: '04',
    title: 'Ongoing support.',
    desc: 'Updates, fixes, new pages — we stay on after launch. One flat rate, no surprise invoices, no disappearing act.',
  },
]

const CARD_CSS = `
  .pc-wrap { flex: 1 1 220px; min-width: 220px; height: 300px; perspective: 1000px; }
  .pc-inner {
    position: relative; height: 100%; border-radius: 50px;
    background: transparent;
    box-shadow: 0 4px 4px rgba(0,0,0,0.15), 0 0 12px rgba(0,0,0,0.08), 0 0 24px rgba(255,255,255,0.1), inset 3px 3px 3px 0 rgba(255,255,255,0.45), inset -3px -3px 3px 0 rgba(255,255,255,0.45);
    transform: rotate3d(1,1,0,0deg);
    transform-style: preserve-3d;
    transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  }
  .pc-wrap:not(.pc-flat):hover .pc-inner {
    box-shadow: rgba(0,0,0,0.3) 30px 50px 25px -40px, rgba(0,0,0,0.1) 0px 25px 30px 0px, inset 3px 3px 3px 0 rgba(255,255,255,0.45), inset -3px -3px 3px 0 rgba(255,255,255,0.45);
    transform: rotate3d(1,1,0,20deg);
  }
  .pc-badge {
    transform: translate3d(0,0,100px);
    transition: transform 0.5s ease-in-out 0.2s;
  }
  .pc-wrap:not(.pc-flat):hover .pc-badge { transform: translate3d(0,0,120px); }
  .pc-flat .pc-badge { transform: none; }
`

function ProcessCard({ step, index, flat = false, inView = false }) {
  const shown = { opacity: 1, y: 0, filter: 'blur(0px)' }
  const reveal = inView
    ? { whileInView: shown, viewport: { once: true, amount: 0.3 } }
    : { animate: shown }
  return (
    <>
      {index === 0 && <style>{CARD_CSS}</style>}
      <motion.div
        className={flat ? 'pc-wrap pc-flat' : 'pc-wrap'}
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        {...reveal}
        whileHover={flat ? { scale: 1.03 } : undefined}
        transition={{ duration: 0.7, delay: 0.35 + index * 0.15, ease: EASE, scale: { duration: 0.25, ease: EASE } }}
      >
        <div className="pc-inner">

          {/* Backdrop — separate so it doesn't flatten preserve-3d */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 50,
            backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
            zIndex: 0,
          }} />

          {/* Number badge */}
          <div style={{ position: 'absolute', top: 0, right: 0, transformStyle: 'preserve-3d' }}>
            <div className="pc-badge" style={{
              position: 'absolute',
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: '#fff',
              top: 30,
              right: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'rgba(100,100,111,0.2) -10px 10px 20px 0px',
            }}>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#000',
                letterSpacing: '0.05em',
                fontFamily: "'Itoya', 'Helvetica Neue', Arial, sans-serif",
              }}>
                {step.num}
              </span>
            </div>
          </div>

          {/* Text content */}
          <div style={{
            position: 'absolute',
            inset: 0,
            transform: flat ? 'none' : 'translate3d(0,0,26px)',
            padding: '140px 22px 20px',
            overflow: 'hidden',
          }}>
            <span style={{
              display: 'block',
              fontSize: 18,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.25,
              fontFamily: "'Itoya', 'Helvetica Neue', Arial, sans-serif",
              marginBottom: 10,
            }}>
              {step.title}
            </span>
            <span style={{
              display: 'block',
              fontSize: 14,
              color: 'rgba(210,210,220,0.8)',
              lineHeight: 1.65,
              fontWeight: 300,
              fontFamily: "'Itoya', 'Helvetica Neue', Arial, sans-serif",
            }}>
              {step.desc}
            </span>
          </div>

        </div>
      </motion.div>
    </>
  )
}

export default function Process({
  flat = false,
  inView = false,
  eyebrow = 'How it works',
  heading = <>Up and running<br />in four steps.</>,
  sub = 'We keep it simple. No jargon, no long timelines, no surprises.',
  steps = STEPS,
}) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const reveal = (to) => inView
    ? { whileInView: to, viewport: { once: true, amount: 0.3 } }
    : { animate: to }

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isMobile
        ? 'clamp(48px, 12vw, 72px) clamp(16px, 5vw, 28px) clamp(48px, 10vw, 72px)'
        : 'clamp(60px, 8vh, 100px) clamp(24px, 6vw, 80px)',
    }}>

      {/* Header */}
      <div style={{ marginBottom: isMobile ? 48 : 72 }}>
        <motion.p
          initial={{ opacity: 0 }}
          {...reveal({ opacity: 1 })}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
            marginBottom: 18,
          }}
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          {...reveal({ opacity: 1, y: 0 })}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          style={{
            fontSize: isMobile ? 'clamp(34px, 11vw, 56px)' : 'clamp(44px, 5.5vw, 88px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.08,
            fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif",
            margin: 0,
            marginBottom: 20,
          }}
        >
          {heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          {...reveal({ opacity: 1, y: 0 })}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          style={{
            fontSize: isMobile ? 'clamp(13px, 3.5vw, 16px)' : 'clamp(13px, 1.05vw, 18px)',
            color: 'rgba(255,255,255,0.45)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            margin: 0,
          }}
        >
          {sub}
        </motion.p>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'stretch' }}>
        {steps.map((step, i) => (
          <ProcessCard key={step.num} step={step} index={i} flat={flat} inView={inView} />
        ))}
      </div>

    </div>
  )
}
