import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from './Footer'

const NAV_LINKS = [
  { to: '/demos',      label: 'DEMOS'      },
  { to: '/services',   label: 'SERVICES'   },
  { to: '/pricing',    label: 'PRICING'    },
  { to: '/process',    label: 'PROCESS'    },
  { to: '/faq',        label: 'FAQ'        },
  { to: '/contact',    label: 'CONTACT'    },
]

const EASE = [0.22, 1, 0.36, 1]
const SIDEBAR_W = 240

export default function Layout({ children }) {
  const [isMobile, setIsMobile]     = useState(() => window.innerWidth < 768)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrollY, setScrollY]       = useState(0)
  const location                    = useLocation()

  const contentRef      = useRef(null)
  const scrollTargetRef = useRef(0)
  const scrollCurrRef   = useRef(0)
  const rafRef          = useRef(null)
  const touchYRef       = useRef(null)
  const isMobileRef     = useRef(isMobile)

  useEffect(() => { isMobileRef.current = isMobile }, [isMobile])

  // Reset scroll on route change
  useEffect(() => {
    scrollTargetRef.current = 0
    scrollCurrRef.current   = 0
    setScrollY(0)
    setSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // RAF smooth scroll loop
  useEffect(() => {
    const tick = () => {
      const lerpFactor = isMobileRef.current ? 1 : 0.09
      const curr = scrollCurrRef.current
      const next = curr + (scrollTargetRef.current - curr) * lerpFactor
      scrollCurrRef.current = next
      setScrollY(next)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Wheel + touch handlers
  useEffect(() => {
    const maxScroll = () => {
      if (!contentRef.current) return 0
      return Math.max(0, contentRef.current.scrollHeight - window.innerHeight)
    }
    const clamp = v => Math.min(Math.max(v, 0), maxScroll())

    const onWheel = e => {
      e.preventDefault()
      scrollTargetRef.current = clamp(scrollTargetRef.current + e.deltaY * 0.4)
    }
    const onTouchStart = e => { touchYRef.current = e.touches[0].clientY }
    const onTouchMove  = e => {
      if (touchYRef.current === null) return
      e.preventDefault()
      const dy = touchYRef.current - e.touches[0].clientY
      scrollTargetRef.current = clamp(scrollTargetRef.current + dy)
      touchYRef.current = e.touches[0].clientY
    }
    const onTouchEnd = () => { touchYRef.current = null }

    window.addEventListener('wheel',      onWheel,      { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true  })
    window.addEventListener('touchmove',  onTouchMove,  { passive: false })
    window.addEventListener('touchend',   onTouchEnd)
    return () => {
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', color: '#fff', fontFamily: "'Itoya', 'Helvetica Neue', Arial, sans-serif" }}>

      {/* Fixed video background */}
      <video
        src="/wink_4k_homepageVid.mp4"
        autoPlay loop muted playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          zIndex: 0,
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.78) 100%)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }} />

      {/* Sidebar — mobile */}
      {isMobile && (
        <>
          <motion.div
            initial={false}
            animate={{ x: sidebarOpen ? 0 : -SIDEBAR_W }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: SIDEBAR_W,
              zIndex: 50,
              borderRight: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 20,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              background: 'rgba(0,0,0,0.4)',
            }}
          >
            <div style={{
              fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif",
              fontSize: 40, fontWeight: 700, letterSpacing: '0.1em',
              color: '#fff', padding: '20px 24px 28px',
              borderBottom: '1px solid rgba(255,255,255,0.1)', lineHeight: 1,
            }}>
              SUMMIT<br />SITES
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', padding: '20px 0', flex: 1 }}>
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={false}
                  animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -14 }}
                  transition={{ delay: sidebarOpen ? i * 0.05 : 0, duration: 0.3, ease: EASE }}
                >
                  <Link to={to} style={{
                    display: 'block',
                    color: location.pathname === to ? '#fff' : 'rgba(255,255,255,0.5)',
                    textDecoration: 'none', fontSize: 12, fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase', padding: '13px 24px',
                  }}>
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
          {sidebarOpen && (
            <div
              style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.3)' }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      {/* Scrollable content layer */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          zIndex: 2,
          transform: `translateY(${-scrollY}px)`,
          willChange: 'transform',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top bar */}
        <div style={{ flexShrink: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              textAlign: 'center',
              fontSize: 'clamp(11px, 0.85vw, 15px)',
              fontWeight: 500,
              letterSpacing: '0.05em',
              padding: 'clamp(6px, 0.7vh, 10px) 16px',
              borderBottom: '2px solid rgba(255,255,255,0.2)',
              margin: '0 clamp(16px, 2vw, 40px)',
            }}
          >
            PROFESSIONAL WEBSITES FOR SERIOUS BUSINESSES
          </motion.div>

          {isMobile ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 'clamp(10px, 1.4vh, 18px) clamp(16px, 4vw, 24px)',
              }}
            >
              <Link to="/" style={{
                color: '#fff', textDecoration: 'none',
                fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif",
                fontSize: 20, fontWeight: 700, letterSpacing: '0.1em',
              }}>
                SUMMIT SITES
              </Link>
              <button
                onClick={() => setSidebarOpen(v => !v)}
                style={{
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  alignItems: 'center', gap: 5, background: 'none', border: 'none',
                  cursor: 'pointer', padding: 4,
                }}
              >
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    style={{ display: 'block', width: 22, height: 1.5, background: '#fff', borderRadius: 1 }}
                    animate={
                      i === 1 ? { opacity: sidebarOpen ? 0 : 1, scaleX: sidebarOpen ? 0 : 1 }
                      : { rotate: sidebarOpen ? (i === 0 ? 45 : -45) : 0, y: sidebarOpen ? (i === 0 ? 6.5 : -6.5) : 0 }
                    }
                    transition={{ duration: 0.55, ease: EASE }}
                  />
                ))}
              </button>
            </motion.div>
          ) : (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 'clamp(10px, 1.4vh, 18px) clamp(16px, 2vw, 40px)',
              }}
            >
              {NAV_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} style={{
                  fontSize: 'clamp(12px, 0.9vw, 17px)',
                  fontWeight: 500, letterSpacing: '0.04em',
                  color: location.pathname === to ? '#fff' : 'rgba(255,255,255,0.45)',
                  textDecoration: 'none', transition: 'color 0.2s ease',
                }}>
                  {label}
                </Link>
              ))}
            </motion.nav>
          )}
        </div>

        <main style={{ flex: 1 }}>
          {children}
        </main>

        <Footer />
      </div>
    </div>
  )
}
