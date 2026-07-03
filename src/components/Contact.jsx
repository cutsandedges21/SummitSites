import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Mirrors the three plans on the Pricing page (Launch / Growth / Summit).
const BUDGETS  = ['Launch — $750', 'Growth — $1,399', 'Summit — $2,599']
const MONTHLY  = ['$68/mo',        '$108/mo',         '$218/mo']

// Submissions are emailed to summitsites.agency@gmail.com via Web3Forms.
// This access key is tied to that Gmail inbox. It's safe to expose in client-side
// code — it only permits submitting this form, not reading any data.
const WEB3FORMS_ACCESS_KEY = 'bf4b5306-1975-4ffa-be9d-bc2e7d2f7d41'

const inputStyle = {
  width: '100%', background: 'transparent',
  border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)',
  color: '#fff', fontSize: 14, padding: '10px 0', outline: 'none',
  fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif", letterSpacing: '0.03em',
}
const labelStyle = { fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)' }

const priceVariants = {
  enter: d => ({ y: d > 0 ? '110%' : '-110%' }),
  center: { y: '0%' },
  exit:  d => ({ y: d > 0 ? '-110%' : '110%' }),
}

function ChipBtn({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} style={{
      background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
      border: `1px solid ${active ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}`,
      color: active ? '#fff' : 'rgba(255,255,255,0.4)',
      padding: '6px 14px', borderRadius: 2, cursor: 'pointer',
      fontSize: 11, letterSpacing: '0.08em', transition: 'all 0.2s',
    }}>{children}</button>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending,   setSending]   = useState(false)
  const [error,     setError]     = useState(null)
  const [form, setForm] = useState({ name: '', email: '', business: '', description: '', budget: '', timeline: '' })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const botRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSending(true)

    const tier = MONTHLY[BUDGETS.indexOf(form.budget)] || ''

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New project inquiry${form.name ? ` from ${form.name}` : ''}`,
          from_name: 'Summit Sites Website',
          name: form.name,
          email: form.email,
          business: form.business,
          message: form.description,
          budget: form.budget,
          hosting_maintenance: tier,
          // honeypot — bots tick this hidden box; humans never see it
          botcheck: botRef.current?.checked || false,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error — please try again, or email summitsites.agency@gmail.com directly.')
    } finally {
      setSending(false)
    }
  }

  const [displayIdx, setDisplayIdx]   = useState(null)
  const [priceKey,   setPriceKey]     = useState(0)
  const [direction,  setDirection]    = useState(1)
  const [multiStep,  setMultiStep]    = useState(false)
  const displayIdxRef = useRef(null)
  const timerRefs     = useRef([])

  useEffect(() => {
    const newIdx = BUDGETS.indexOf(form.budget)
    if (newIdx === -1) return

    timerRefs.current.forEach(clearTimeout)
    timerRefs.current = []

    const oldIdx = displayIdxRef.current

    if (oldIdx === null) {
      displayIdxRef.current = newIdx
      setDisplayIdx(newIdx)
      setPriceKey(k => k + 1)
      setMultiStep(false)
      return
    }

    if (oldIdx === newIdx) return

    const dir = newIdx > oldIdx ? 1 : -1
    setDirection(dir)

    const steps = []
    for (let i = oldIdx + dir; i !== newIdx + dir; i += dir) steps.push(i)

    setMultiStep(steps.length > 1)

    steps.forEach((stepIdx, i) => {
      const t = setTimeout(() => {
        displayIdxRef.current = stepIdx
        setDisplayIdx(stepIdx)
        setPriceKey(k => k + 1)
      }, steps.length > 1 ? i * 85 : 0)
      timerRefs.current.push(t)
    })

    return () => timerRefs.current.forEach(clearTimeout)
  }, [form.budget])

  if (submitted) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: 32, marginBottom: 16 }}>✦</div>
        <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff', marginBottom: 10 }}>MESSAGE RECEIVED</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>WE'LL REACH OUT WITHIN 24 HOURS.</div>
      </motion.div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ marginBottom: 72 }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, marginBottom: 18 }}
        >
          Start a project
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ fontSize: 'clamp(44px,5.5vw,88px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0, marginBottom: 20 }}
        >
          Let's build<br />something.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ fontSize: 'clamp(13px,1.05vw,18px)', color: 'rgba(255,255,255,0.45)', fontWeight: 400, letterSpacing: '0.04em', margin: 0 }}
        >
          Tell us about your business — no commitment, no pressure.
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit}
        style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 32 }}
      >
        {/* honeypot — hidden from humans, catches bots */}
        <input ref={botRef} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <div>
            <label style={labelStyle}>NAME</label>
            <input required style={inputStyle} value={form.name} onChange={set('name')} placeholder="Jane Smith" />
          </div>
          <div>
            <label style={labelStyle}>EMAIL</label>
            <input required type="email" style={inputStyle} value={form.email} onChange={set('email')} placeholder="jane@company.com" />
          </div>
        </div>

        <div>
          <label style={labelStyle}>BUSINESS NAME</label>
          <input style={inputStyle} value={form.business} onChange={set('business')} placeholder="Summit Sites" />
        </div>

        <div>
          <label style={{ ...labelStyle, display: 'block', marginBottom: 4 }}>BRIEF DESCRIPTION</label>
          <textarea
            style={{ ...inputStyle, resize: 'none', minHeight: 36 }}
            value={form.description} onChange={set('description')}
            placeholder="Tell us about your business and what you need..."
          />
        </div>

        <div>
          <label style={{ ...labelStyle, display: 'block', marginBottom: 12 }}>DESIRED PLAN</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {BUDGETS.map(b => (
              <ChipBtn key={b} active={form.budget === b} onClick={() => setForm(f => ({ ...f, budget: b }))}>{b}</ChipBtn>
            ))}
          </div>

          {displayIdx !== null && (
            <div style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', display: 'flex', alignItems: 'center' }}>
              MONTHLY PLAN —&nbsp;
              <span style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', height: '1.4em', minWidth: '6.2em', verticalAlign: 'bottom' }}>
                <AnimatePresence initial={false} mode="sync" custom={direction}>
                  <motion.span
                    key={priceKey}
                    custom={direction}
                    variants={priceVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: multiStep ? 0.08 : 0.2, ease: 'easeInOut' }}
                    style={{ display: 'block', position: 'absolute', top: 0, left: 0, whiteSpace: 'nowrap', color: '#fff', fontWeight: 600 }}
                  >
                    {MONTHLY[displayIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          )}
        </div>

        <motion.button type="submit"
          disabled={sending}
          whileHover={sending ? undefined : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
          whileTap={sending ? undefined : { scale: 0.97 }}
          style={{
            alignSelf: 'flex-start', padding: '14px 36px',
            border: '1px solid rgba(255,255,255,0.35)', borderRadius: 2,
            background: 'transparent', color: '#fff',
            cursor: sending ? 'default' : 'pointer', opacity: sending ? 0.5 : 1,
            fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
            paddingTop: 14, marginTop: 5,
          }}
        >
          {sending ? 'SENDING…' : 'SEND MESSAGE →'}
        </motion.button>

        {error && (
          <p style={{ fontSize: 12, color: '#ff8a8a', letterSpacing: '0.04em', margin: 0 }}>
            {error}
          </p>
        )}
      </motion.form>
    </div>
  )
}
