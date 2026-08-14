import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PLANS = [
  {
    icon: '△',
    name: 'LAUNCH',
    tagline: 'Establish your presence',
    price: '$68',
    perDay: '≈ $2.23/day',
    setup: '$750 one-time setup',
    features: [
      '1–4 page website',
      'Mobile-friendly',
      'Contact form',
      'Professional custom design',
      'Hosting, security & updates',
      'Ongoing support',
      'Up to 2 hrs of edits / month',
      'Site monitoring',
    ],
  },
  {
    icon: '✦',
    name: 'GROWTH',
    tagline: 'Turn visitors into customers',
    price: '$108',
    perDay: '≈ $3.55/day',
    setup: '$1,399 one-time setup',
    featured: true,
    badge: 'Summer Sale: Was Previously $168 /mo',
    features: [
      'Everything in Launch',
      'Strategy built to turn visitors into leads',
      'Local SEO — get found on Google',
      'Conversion-focused copy & layout',
      'High-quality landing page',
      '5–7 optimized pages',
      'Trust-building reviews & testimonials',
      'Google Business Profile integration',
    ],
  },
  {
    icon: '⬡',
    name: 'SUMMIT',
    tagline: 'Scale with optimization',
    price: '$218',
    perDay: '≈ $7.16/day',
    setup: '$2,599 one-time setup',
    features: [
      'Everything in Growth',
      'Ongoing optimization & monthly SEO',
      'Monthly performance report',
      'A/B split testing',
      'Conversion optimization',
      'Fast, unlimited edits — priority turnaround',
      'Unlimited pages',
      'Animated and/or 3D elements',
    ],
  },
]

const ADDON_GROUPS = [
  {
    label: 'Ongoing',
    note: 'Added to your monthly plan',
    items: [
      { name: 'Unlimited edits', note: 'One request at a time · 48hr turnaround', price: '$99/mo' },
      { name: 'Google Business Profile management', price: '$79/mo' },
      { name: 'Monthly analytics report',           price: '$39/mo' },
      { name: 'Professional copywriting',           price: '$299–599/mo' },
      { name: 'Advanced booking / scheduling system', price: '$249/mo' },
    ],
  },
  {
    label: 'One-off',
    note: 'Billed once, as needed',
    items: [
      { name: 'Brand / logo refresh',                 price: '$249–499' },
      { name: 'Extra pages',                          price: '$75–125/page' },
      { name: 'Business email setup',                 price: '$75' },
      { name: 'Extra project work', note: 'New features & builds — not routine edits', price: '$49/hr' },
    ],
  },
]

const EASE = [0.22, 1, 0.36, 1]

export default function Pricing() {
  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ marginBottom: 72 }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, marginBottom: 18 }}
        >
          What it costs
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          style={{ fontSize: 'clamp(44px,5.5vw,88px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0, marginBottom: 20 }}
        >
          Simple, honest<br />pricing.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          style={{ fontSize: 'clamp(13px,1.05vw,18px)', color: 'rgba(255,255,255,0.45)', fontWeight: 400, letterSpacing: '0.04em', margin: 0 }}
        >
          Three straightforward plans — one flat monthly rate each. No hidden fees, no surprises.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, alignItems: 'stretch', maxWidth: 1100, margin: '0 auto 60px' }}>
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            style={{
              position: 'relative',
              display: 'flex', flexDirection: 'column',
              border: `1px solid ${plan.featured ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 4, padding: '36px 28px',
              background: plan.featured ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
            }}
          >
            {plan.badge && (
              <div style={{
                position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
                background: '#fff', color: '#000', whiteSpace: 'nowrap',
                fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '5px 14px', borderRadius: 2,
              }}>
                {plan.badge}
              </div>
            )}

            <div style={{ fontSize: 24, marginBottom: 16, color: 'rgba(255,255,255,0.6)' }}>{plan.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: '#fff', marginBottom: 6 }}>{plan.name}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}>{plan.tagline}</div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 44, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif" }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>/mo</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', marginTop: 6 }}>{plan.perDay}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', marginTop: 4 }}>{plan.setup}</div>
            </div>

            <ul style={{ margin: '0 0 28px', padding: 0, listStyle: 'none', flex: 1 }}>
              {plan.features.map(item => (
                <li key={item} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.03em', lineHeight: 1.5, padding: '7px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  — {item}
                </li>
              ))}
            </ul>

            <Link to="/contact" style={{
              display: 'block', textAlign: 'center', padding: '13px 24px',
              border: `1px solid ${plan.featured ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'}`,
              borderRadius: 2,
              background: plan.featured ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: '#fff', textDecoration: 'none', fontSize: 11.5,
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Get in touch →
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Add-ons teaser — pulls the eye below the three plans */}
      <motion.button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent('summit:scrollto', { detail: 'addons' }))}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
        style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px 18px',
          width: '100%', maxWidth: 720, margin: '0 auto 60px', padding: '18px 26px',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: 4,
          background: 'rgba(255,255,255,0.05)', textAlign: 'center', cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: '#fff', fontWeight: 600, letterSpacing: '0.02em' }}>
          Keep scrolling for add-ons
        </span>
        <span style={{ fontSize: 'clamp(12px,1vw,13.5px)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.02em' }}>
          Unlimited edits, SEO, copywriting & the Care+ bundle — save $676/mo
        </span>
      </motion.button>

      {/* ── Add-ons ───────────────────────────────────────────── */}
      <div id="addons" style={{ scrollMarginTop: 40, maxWidth: 1100, margin: '72px auto 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 64 }}>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, marginBottom: 16 }}
        >
          Optional extras
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.1, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0, marginBottom: 14 }}
        >
          Add-ons.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
          style={{ fontSize: 'clamp(13px,1.05vw,17px)', color: 'rgba(255,255,255,0.45)', margin: 0, marginBottom: 48, maxWidth: 560, letterSpacing: '0.04em' }}
        >
          Bolt any of these onto your plan whenever you need them.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
          {ADDON_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: gi * 0.08, ease: EASE }}
              style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '30px 28px', background: 'rgba(255,255,255,0.03)' }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>{group.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>{group.note}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {group.items.map(item => (
                  <li key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, padding: '13px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.02em', lineHeight: 1.4 }}>{item.name}</span>
                      {item.note && <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em', lineHeight: 1.4 }}>{item.note}</span>}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', lineHeight: 1.4 }}>{item.price}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Care+ bundle */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
          style={{ marginTop: 24, border: '1px solid rgba(255,255,255,0.38)', borderRadius: 4, padding: '28px 30px', background: 'rgba(255,255,255,0.07)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}
        >
          <div style={{ maxWidth: 620 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', marginBottom: 8 }}>★ Care+ bundle</div>
            <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, letterSpacing: '0.02em' }}>
              Unlimited edits, Google Business Profile management & monthly analytics report — everything handled for one flat rate.
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through' }}>$1065</span>
              <span style={{ fontSize: 34, fontWeight: 700, color: '#fff', fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif" }}>$389</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/mo</span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', marginTop: 2 }}>Save $676/mo</div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            maxWidth: 700, margin: '72px auto 0', textAlign: 'center',
            fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.65,
            color: 'rgba(255,255,255,0.5)', letterSpacing: '0.03em',
          }}
        >
          Every monthly plan includes {' '}
          <strong style={{ color: '#fff', fontWeight: 600 }}>2 hours of work per month</strong> (excluding the Summit plan which allows unlimited edits).
          {' '}Any work beyond those 2 hours — larger changes or extra requests — may be billed separately.
        </motion.p>
      </div>
    </div>
  )
}
