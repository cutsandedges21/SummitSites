import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  { q: 'How much does a site cost?',           a: "Every project is different — we'll talk through your needs and figure it out together." },
  { q: 'How long does a build take?',          a: '1–2 weeks depending on the details and how many changes are needed along the way.' },
  { q: 'How many revisions do I get?',         a: 'Unlimited revisions during the design phase. Once development starts, reasonable adjustments are always included.' },
  { q: "Do I own the site when it's done?",    a: 'Yes — fully. Code, content, domain, accounts. Everything transfers to you at launch.' },
  { q: 'Who handles hosting?',                 a: "We set up and manage hosting on your behalf — it's included as part of working with us." },
  { q: 'Will my site rank on Google?',         a: "SEO is built into every project — structure, meta tags, schema, Core Web Vitals. We build the right foundation." },
  { q: 'What if I need changes after launch?', a: 'Maintenance plans cover ongoing edits. One-off changes are billed at a flat hourly rate.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <motion.h1
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, letterSpacing: '0.06em', color: '#fff', margin: '0 0 8px' }}
      >
        FAQ
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, letterSpacing: '0.06em', marginBottom: 52 }}
      >
        COMMON QUESTIONS. STRAIGHT ANSWERS.
      </motion.p>

      <div style={{ maxWidth: 720 }}>
        {FAQS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 0', textAlign: 'left', gap: 16,
              }}
            >
              <span style={{ fontSize: 14, color: '#fff', letterSpacing: '0.03em', fontWeight: open === i ? 600 : 400 }}>{item.q}</span>
              <span style={{
                fontSize: 18, color: 'rgba(255,255,255,0.35)', flexShrink: 0,
                transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none',
              }}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 20px', paddingRight: 32 }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ textAlign: 'center', marginTop: 64 }}
      >
        <motion.a href="/contact"
          whileHover={{ background: 'rgba(255,255,255,0.08)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-block', padding: '14px 36px',
            border: '1px solid rgba(255,255,255,0.35)', borderRadius: 2,
            color: '#fff', textDecoration: 'none', fontSize: 12,
            letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          CONVINCED YET? →
        </motion.a>
      </motion.div>
    </div>
  )
}
