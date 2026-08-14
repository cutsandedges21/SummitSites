import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const AMBER = '#D4623A'
const LAST_UPDATED = 'August 14, 2026'

const SECTIONS = [
  {
    h: 'Information We Collect',
    body: [
      'When you reach out to us by email, we collect the details you choose to share — typically your name, email address, business name, and anything you tell us about your project.',
      'When you visit our website, we automatically collect limited technical information such as your IP address, browser type, device information, pages viewed, and how you arrived at our site. This is standard analytics data used to understand how the site is performing.',
    ],
  },
  {
    h: 'How We Use Your Information',
    list: [
      'Respond to your inquiries and provide quotes',
      'Design, build, host, and maintain your website',
      'Communicate with you about your project and account',
      'Improve our website, services, and marketing',
      'Meet legal, tax, and accounting obligations',
    ],
  },
  {
    h: 'Cookies & Analytics',
    body: [
      'Our site may use cookies and similar technologies, along with analytics tools, to understand traffic and improve the experience. You can disable cookies in your browser settings, though some parts of the site may not function as intended.',
    ],
  },
  {
    h: 'How We Share Information',
    body: [
      'We do not sell your personal information. We share it only with trusted service providers who help us operate — such as hosting, analytics, email, and payment processors — and only as needed to deliver our services. We may also disclose information when required by law.',
    ],
  },
  {
    h: 'Data Retention',
    body: [
      'We keep your information for as long as needed to provide our services and meet legal obligations. When it is no longer required, we delete or anonymize it.',
    ],
  },
  {
    h: 'Data Security',
    body: [
      'We take reasonable measures to protect your information, but no method of transmission or storage is completely secure. We cannot guarantee absolute security.',
    ],
  },
  {
    h: 'Your Rights',
    body: [
      'You may request access to, correction of, or deletion of your personal information, and you can opt out of marketing communications at any time. To make a request, contact us using the details below.',
    ],
  },
  {
    h: 'Third-Party Links',
    body: [
      'Our site and the websites we build may link to third-party services. We are not responsible for the privacy practices of those third parties and encourage you to review their policies.',
    ],
  },
  {
    h: "Children's Privacy",
    body: [
      'Our services are not directed to children under 13, and we do not knowingly collect information from them.',
    ],
  },
  {
    h: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Changes take effect once posted, and the date above reflects the most recent revision.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,60px)', fontFamily: "'Itoya','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, marginBottom: 18 }}
        >
          Legal
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          style={{ fontSize: 'clamp(40px,5vw,80px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif", margin: 0, marginBottom: 14 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', margin: 0, marginBottom: 40 }}
        >
          Last updated: {LAST_UPDATED}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
          style={{ fontSize: 'clamp(14px,1.1vw,17px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0, marginBottom: 48 }}
        >
          Summit Sites Agency ("we," "us," or "our") builds and maintains websites for businesses. This policy explains what
          information we collect, how we use it, and the choices you have. By using our website or working with us, you
          agree to the practices described here.
        </motion.p>

        {SECTIONS.map((s, i) => (
          <motion.section
            key={s.h}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.28 + i * 0.04 }}
            style={{ marginBottom: 40, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 28 }}
          >
            <h2 style={{ fontSize: 'clamp(16px,1.4vw,22px)', fontWeight: 600, color: '#fff', letterSpacing: '0.01em', margin: 0, marginBottom: 16 }}>
              {s.h}
            </h2>
            {s.body && s.body.map((p, j) => (
              <p key={j} style={{ fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0, marginBottom: 14 }}>
                {p}
              </p>
            ))}
            {s.list && (
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {s.list.map((item, j) => (
                  <li key={j} style={{ fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 8 }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        ))}

        <motion.section
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 + SECTIONS.length * 0.04 }}
          style={{ marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 28 }}
        >
          <h2 style={{ fontSize: 'clamp(16px,1.4vw,22px)', fontWeight: 600, color: '#fff', margin: 0, marginBottom: 16 }}>
            Contact Us
          </h2>
          <p style={{ fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0 }}>
            Questions about this policy or your information? Email us at{' '}
            <a href="mailto:summitsites.agency@gmail.com" style={{ color: AMBER, textDecoration: 'none' }}>
              summitsites.agency@gmail.com
            </a>{' '}
            or reach out through our{' '}
            <Link to="/contact" style={{ color: AMBER, textDecoration: 'none' }}>contact page</Link>.
          </p>
        </motion.section>

      </div>
    </div>
  )
}
