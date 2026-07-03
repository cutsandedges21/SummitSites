import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const AMBER = '#D4623A'
const LAST_UPDATED = 'July 3, 2026'

const GOVERNING_LAW = 'the Province of Quebec, Canada'

const SECTIONS = [
  {
    h: 'Acceptance of These Terms',
    body: [
      'By accessing our website or engaging Summit Sites Agency for services, you agree to these Terms of Service. If you do not agree, please do not use our website or services.',
    ],
  },
  {
    h: 'Our Services',
    body: [
      'Summit Sites Agency designs, builds, hosts, and maintains websites for businesses. The specific scope, deliverables, and timeline for your project are agreed on a per-project basis before work begins.',
    ],
  },
  {
    h: 'Quotes, Fees & Payment',
    body: [
      'Projects typically involve a one-time setup fee and a recurring monthly rate, confirmed with you before work starts. Recurring fees cover ongoing hosting and maintenance and continue until the plan is cancelled.',
      'Invoices are due by the date stated on the invoice. Late or missed payments may result in work being paused or the site being taken offline until the account is brought current.',
    ],
  },
  {
    h: 'Your Responsibilities',
    body: [
      'You agree to provide timely content, materials, feedback, and approvals so we can complete your project, and to ensure you have the rights to any text, images, logos, or other materials you supply. You are responsible for the accuracy and legality of the content you provide.',
    ],
  },
  {
    h: 'Revisions',
    body: [
      'Unlimited revisions are included during the design phase. Once development begins, reasonable adjustments are included; larger changes to the agreed scope may be quoted separately.',
    ],
  },
  {
    h: 'Ownership & Intellectual Property',
    body: [
      'Once your project is complete and paid in full, ownership of the final website — code, content, domain, and accounts — transfers to you. Until full payment is received, all work product remains the property of Summit Sites Agency.',
      'We may display non-confidential aspects of completed work in our portfolio and marketing unless you request otherwise in writing.',
    ],
  },
  {
    h: 'Hosting & Maintenance',
    body: [
      'Where included, we set up and manage hosting on your behalf as part of your plan. Maintenance plans cover ongoing edits and updates; one-off changes outside an active plan may be billed at our standard rate.',
    ],
  },
  {
    h: 'Third-Party Services',
    body: [
      'Our services may rely on third-party providers such as hosting, domain registrars, analytics, and payment processors. Your use of those services is subject to their own terms, and we are not responsible for their performance or availability.',
    ],
  },
  {
    h: 'Disclaimer of Warranties',
    body: [
      'Our services and website are provided "as is" and "as available," without warranties of any kind, express or implied. We do not guarantee specific results, search rankings, uninterrupted availability, or that the site will be error-free.',
    ],
  },
  {
    h: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, Summit Sites Agency is not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability for any claim will not exceed the amount you paid us for the services giving rise to the claim.',
    ],
  },
  {
    h: 'Termination',
    body: [
      'Either party may end an ongoing plan with reasonable written notice. Setup fees and work already performed are non-refundable. Upon termination, recurring services such as hosting and maintenance will end at the close of the current billing period.',
    ],
  },
  {
    h: 'Governing Law',
    body: [
      `These Terms are governed by the laws of ${GOVERNING_LAW}, without regard to its conflict-of-law rules.`,
    ],
  },
  {
    h: 'Changes to These Terms',
    body: [
      'We may update these Terms from time to time. Changes take effect once posted, and the date above reflects the most recent revision. Continued use of our services means you accept the updated Terms.',
    ],
  },
]

export default function TermsOfService() {
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
          Terms of Service
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
          These Terms of Service govern your use of the Summit Sites Agency website and the services we provide. Please read
          them carefully — by using our website or working with us, you agree to be bound by these Terms.
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
            {s.body.map((p, j) => (
              <p key={j} style={{ fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0, marginBottom: 14 }}>
                {p}
              </p>
            ))}
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
            Questions about these Terms? Email us at{' '}
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
