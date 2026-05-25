import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const QUOTE_WORDS = [
  { text: '"Every',       amber: false },
  { text: 'local',        amber: false },
  { text: 'business',     amber: false },
  { text: 'deserves',     amber: false },
  { text: 'a',            amber: false },
  { text: 'professional', amber: true  },
  { text: 'presence',     amber: true  },
  { text: 'online."',     amber: false },
]

const COLS = [
  {
    num: '01',
    body: 'Summit Sites is a web design agency built specifically for local small businesses. We know you\'re busy — you don\'t have time for complicated tech, long timelines, or developers who disappear after launch.',
  },
  {
    num: '02',
    body: 'So we handle everything. One setup fee, one monthly rate, one person to call. No jargon, no surprises, no long contracts.',
  },
  {
    num: '03',
    body: 'Your website should be working for you around the clock — bringing in new clients even when you\'re not open. That\'s exactly what we build.',
  },
]

const wordVariants = {
  hidden: { filter: 'blur(10px)', opacity: 0, y: 50 },
  visible: {
    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
    opacity: [0, 0.5, 1],
    y: [50, -5, 0],
    transition: { duration: 0.7, times: [0, 0.5, 1], ease: 'easeOut' },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, delay: 0.55 + i * 0.17, ease: EASE },
  }),
}

const ctaVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: 1.1, ease: EASE },
  },
}

export default function About({ scrollY }) {
  const [revealed, setRevealed] = useState(false)
  const [viewportH, setViewportH] = useState(() => window.innerHeight)

  useEffect(() => {
    const onResize = () => setViewportH(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!revealed && scrollY > viewportH * 0.15) setRevealed(true)
  }, [scrollY, viewportH, revealed])

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(48px, 7vw, 100px) clamp(24px, 6vw, 80px) clamp(40px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Top rule */}
      <div style={{
        width: '100%', height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
        marginBottom: 'clamp(32px, 5vw, 64px)',
      }} />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
        style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: 'clamp(16px, 2vw, 28px)',
        }}
      >
        About Summit Sites
      </motion.div>

      {/* Quote block */}
      <div style={{
        paddingBottom: 'clamp(28px, 4vw, 56px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        marginBottom: 'clamp(28px, 4vw, 56px)',
      }}>
        <p style={{
          display: 'flex',
          flexWrap: 'wrap',
          rowGap: '0.1em',
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(20px, 3vw, 48px)',
          lineHeight: 1.25,
          color: 'rgba(255,255,255,0.88)',
          maxWidth: '900px',
        }}>
          {QUOTE_WORDS.map((w, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate={revealed ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, delay: i * 0.1, times: [0, 0.5, 1], ease: 'easeOut' }}
              style={{
                display: 'inline-block',
                marginRight: '0.28em',
                color: w.amber ? '#c8a96e' : undefined,
              }}
            >
              {w.text}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Three liquid-glass cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        flex: 1,
      }}>
        {COLS.map((col, i) => (
          <motion.div
            key={col.num}
            className="liquid-glass"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={revealed ? 'visible' : 'hidden'}
            style={{
              borderRadius: '20px',
              padding: 'clamp(20px, 2.5vw, 32px) clamp(16px, 2vw, 28px) clamp(24px, 3vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.2)',
              marginBottom: '16px',
            }}>
              {col.num}
            </div>
            <div style={{
              width: '24px', height: '1px',
              background: 'rgba(200,169,110,0.5)',
              marginBottom: '20px',
            }} />
            <p style={{
              fontSize: 'clamp(13px, 1.15vw, 17px)',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 300,
              flex: 1,
            }}>
              {col.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        variants={ctaVariants}
        initial="hidden"
        animate={revealed ? 'visible' : 'hidden'}
        style={{ marginTop: 'clamp(28px, 4vw, 52px)' }}
      >
        <a
          href="/contact"
          className="liquid-glass-strong"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            borderRadius: '6px',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.9)',
            textDecoration: 'none',
          }}
        >
          Work with us
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </motion.div>

    </div>
  )
}
