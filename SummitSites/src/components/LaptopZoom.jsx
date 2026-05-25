import { useState, useEffect, useRef } from 'react'
import Homepage from './Homepage'

// Source image natural dimensions (px) — both bg images are the same size
const IMG_W = 1672
const IMG_H = 941

// Screen area as % of SOURCE IMAGE edges (top/right/bottom/left inset from image borders).
// These are resolution-independent — computed from viewport calibration at 1920×1080 (16:9).
const DESKTOP_SCREEN = { top: 34.9, right: 31.16, bottom: 23.45, left: 31.16 }

// Mobile: derived from iPhone 14 Pro (390×844) calibration.
// The phone is landscape in the image, so horizontal insets are large (~44%).
const MOBILE_SCREEN = { top: 19.3, right: 42.5, bottom: 19.5, left: 42.56 }

// Compute CSS inset% values accounting for how objectFit:cover crops the image
// at the current viewport size.
function computeInsets(screen, vw, vh) {
  const scale = Math.max(vw / IMG_W, vh / IMG_H)
  const rendW = IMG_W * scale
  const rendH = IMG_H * scale
  const ox    = (vw - rendW) / 2
  const oy    = (vh - rendH) / 2

  const vpLeft   = (screen.left   / 100) * rendW + ox
  const vpTop    = (screen.top    / 100) * rendH + oy
  const vpRight  = (1 - screen.right  / 100) * rendW + ox
  const vpBottom = (1 - screen.bottom / 100) * rendH + oy

  return {
    top:    vpTop             / vh * 100,
    right:  (vw - vpRight)   / vw * 100,
    bottom: (vh - vpBottom)  / vh * 100,
    left:   vpLeft            / vw * 100,
  }
}

function derive(s) {
  const scy = s.top + (100 - s.top - s.bottom) / 2
  const s0  = (100 - s.top - s.bottom) / 100
  const dy  = scy - 50
  return { scy, s0, dy }
}

export default function LaptopZoom() {
  const [progress, setProgress] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [touchY,   setTouchY]   = useState(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [viewport, setViewport] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))

  const targetRef = useRef(0)
  const rafRef    = useRef(null)

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768)
      setViewport({ w: window.innerWidth, h: window.innerHeight })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const tick = () => {
      const curr = targetRef._curr ?? 0
      const next = curr + (targetRef.current - curr) * 0.07
      targetRef._curr = next
      setProgress(next)
      if (next >= 0.999 && !expanded) setExpanded(true)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [expanded])

  useEffect(() => {
    const clamp = v => Math.min(Math.max(v, 0), 1)
    const onWheel = (e) => {
      if (expanded) return
      e.preventDefault()
      targetRef.current = clamp(targetRef.current + e.deltaY * 0.0005)
    }
    const onTouchStart = (e) => setTouchY(e.touches[0].clientY)
    const onTouchMove  = (e) => {
      if (touchY === null || expanded) return
      e.preventDefault()
      const dy = touchY - e.touches[0].clientY
      targetRef.current = clamp(targetRef.current + dy * (dy < 0 ? 0.006 : 0.004))
      setTouchY(e.touches[0].clientY)
    }
    const onTouchEnd = () => setTouchY(null)
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
  }, [expanded, touchY])

  const screen          = isMobile ? MOBILE_SCREEN : DESKTOP_SCREEN
  const s               = computeInsets(screen, viewport.w, viewport.h)
  const { scy, s0, dy } = derive(s)
  const p               = progress

  const bgSrc       = isMobile ? '/iphone_homepage.png' : '/good_laptop_ref_ratio.png'
  const bgScale     = 1 + p * (1 / s0 - 1)
  const bgOriginY   = isMobile ? scy : scy + 6.5

  const homeScale   = s0 + (1 - s0) * p
  const homeTY      = dy * (1 - p)

  const ct = s.top    * (1 - p)
  const cr = s.right  * (1 - p)
  const cb = s.bottom * (1 - p)
  const cl = s.left   * (1 - p)
  const radius  = 16 * (1 - p)
  const clipPath = `inset(${ct}% ${cr}% ${cb}% ${cl}% round ${radius}px)`

  const bgOpacity = p < 0.75 ? 1 : 1 - (p - 0.75) / 0.25

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000' }}>

      <img
        src={bgSrc}
        alt=""
        style={{
          position:        'absolute',
          width:           '100%',
          height:          '100%',
          objectFit:       'cover',
          objectPosition:  'center',
          transform:       `scale(${bgScale})`,
          transformOrigin: `50% ${bgOriginY}%`,
          opacity:         bgOpacity,
          willChange:      'transform, opacity',
        }}
      />

      <div style={{ position: 'absolute', inset: 0, clipPath, willChange: 'clip-path' }}>
        <div
          style={{
            width:           '100vw',
            height:          '100vh',
            transform:       `translateY(${homeTY}vh) scale(${homeScale})`,
            transformOrigin: 'center center',
            willChange:      'transform',
          }}
        >
          <Homepage revealed={expanded} isMobile={isMobile} />
        </div>
      </div>

    </div>
  )
}
