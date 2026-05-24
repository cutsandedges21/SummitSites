import { useState, useEffect, useRef } from 'react'
import Homepage from './Homepage'

// Screen bounds in % of viewport (image is 16:9, objectFit:cover maps 1:1)
const S = { top: 32, right: 31.1, bottom: 18.4, left: 31.1 }
// Screen center Y = top + (100 - top - bottom) / 2
const SCY = S.top + (100 - S.top - S.bottom) / 2  // 58%
// Homepage scale at p=0 that makes it fill the screen exactly (height-fit)
const S0 = (100 - S.top - S.bottom) / 100          // 0.44
// Y delta: screen center (58%) vs viewport center (50%)
const DY  = SCY - 50                                 // 8

export default function LaptopZoom() {
  const [progress, setProgress] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [touchY,   setTouchY]   = useState(null)

  // Smooth lerp via RAF
  const targetRef = useRef(0)
  const rafRef    = useRef(null)

  useEffect(() => {
    const tick = () => {
      const curr   = targetRef._curr ?? 0
      const target = targetRef.current
      const next   = curr + (target - curr) * 0.07
      targetRef._curr = next
      setProgress(next)
      if (next >= 0.999 && !expanded) setExpanded(true)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [expanded])

  // Intercept scroll while animating
  useEffect(() => {
    const clamp = v => Math.min(Math.max(v, 0), 1)

    const onWheel = (e) => {
      if (expanded) return
      e.preventDefault()
      targetRef.current = clamp(targetRef.current + e.deltaY * 0.0005)
    }

    const onTouchStart = (e) => setTouchY(e.touches[0].clientY)

    const onTouchMove = (e) => {
      if (touchY === null || expanded) return
      e.preventDefault()
      const dy     = touchY - e.touches[0].clientY
      const factor = dy < 0 ? 0.006 : 0.004
      targetRef.current = clamp(targetRef.current + dy * factor)
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

  const p = progress

  // Laptop zooms at same rate as homepage expands — feels like one continuous push in
  const laptopScale = 1 + p * (1 / S0 - 1)

  // Homepage: scales from screen-fitted size → full, translated to screen center → viewport center
  const homeScale = S0 + (1 - S0) * p
  const homeTY    = DY * (1 - p)   // vh

  // Clip opens from screen bounds → full viewport
  const ct = S.top    * (1 - p)
  const cr = S.right  * (1 - p)
  const cb = S.bottom * (1 - p)
  const cl = S.left   * (1 - p)
  const radius = 16 * (1 - p)
  const clipPath = `inset(${ct}% ${cr}% ${cb}% ${cl}% round ${radius}px)`

  // Fade laptop out in the last quarter
  const laptopOpacity = p < 0.75 ? 1 : 1 - (p - 0.75) / 0.25

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000' }}>

      {/* Laptop image — tiny zoom toward screen center */}
      <img
        src="/good_laptop_ref_ratio.png"
        alt=""
        style={{
          position:        'absolute',
          width:           '100%',
          height:          '100%',
          objectFit:       'cover',
          objectPosition:  'center',
          transform:       `scale(${laptopScale})`,
          transformOrigin: `50% ${SCY + 6.5}%`,
          opacity:         laptopOpacity,
          willChange:      'transform, opacity',
        }}
      />

      {/* Homepage scales up from screen position */}
      <div
        style={{
          position:        'absolute',
          inset:           0,
          clipPath,
          willChange:      'clip-path',
        }}
      >
        <div
          style={{
            width:           '100vw',
            height:          '100vh',
            transform:       `translateY(${homeTY}vh) scale(${homeScale})`,
            transformOrigin: 'center center',
            willChange:      'transform',
          }}
        >
          <Homepage revealed={expanded} />
        </div>
      </div>

    </div>
  )
}
