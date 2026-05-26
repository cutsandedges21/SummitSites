import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/privacy-policy',    label: 'Privacy Policy'    },
  { to: '/terms-of-service',  label: 'Terms of Service'  },
]

export default function Footer() {
  const { pathname } = useLocation()
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: 'clamp(16px, 2vw, 24px) clamp(16px, 4vw, 60px)',
      color: '#fff',
      fontFamily: "'Itoya', 'Helvetica Neue', Arial, sans-serif",
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '12px',
      }}>
        {/* Brand */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif",
            fontSize: 'clamp(20px, 2.5vw, 32px)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#fff',
            lineHeight: 1,
          }}>
            SUMMIT<br />SITES
          </div>
        </Link>

        {/* Nav links */}
        <nav style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(8px, 1.2vw, 20px) clamp(12px, 2vw, 32px)',
          alignItems: 'center',
        }}>
          {LINKS.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              color: pathname === to ? '#fff' : 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontSize: 'clamp(11px, 0.9vw, 14px)',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = pathname === to ? '#fff' : 'rgba(255,255,255,0.5)'}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        paddingTop: '10px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <span style={{
          fontSize: 'clamp(10px, 0.8vw, 13px)',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.06em',
        }}>
          © {new Date().getFullYear()} Summit Sites. All rights reserved.
        </span>
        <span style={{
          fontSize: 'clamp(10px, 0.8vw, 13px)',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Your business, elevated.
        </span>
      </div>
    </footer>
  )
}
