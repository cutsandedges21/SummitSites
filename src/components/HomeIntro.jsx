import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Homepage from './Homepage'

// Intro flow: the intro video plays on load with a 0→100 counter overlaid on top,
// driven by the video's own playback so it lasts the full clip. When the video
// ends it fades to black and up into the homepage. Shown once per browser session.
const DESKTOP_INTRO = '/new_homepage.mp4'
const MOBILE_INTRO  = '/new_iphone_homepage.mp4'
const EASE        = [0.22, 1, 0.36, 1]
const FADE_OUT_MS = 1400   // intro video fades out to a black screen
const FADE_IN_MS  = 2000   // black fades away into the homepage (text comes in)
const SAFETY_MS   = 15000  // fail-safe: advance even if the video never fires `ended`

function introAlreadyPlayed() {
  try { return !!sessionStorage.getItem('introPlayed') } catch { return false }
}
function markIntroPlayed() {
  try { sessionStorage.setItem('introPlayed', '1') } catch { /* private mode — ignore */ }
}

export default function HomeIntro() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const played = useRef(introAlreadyPlayed())

  // Video sequence:
  // 'intro'     → intro video opaque, homepage mounted underneath (not revealed)
  // 'toBlack'   → intro video fades out to a black screen
  // 'fromBlack' → black fades away, homepage revealed + text animating in
  // 'home'      → intro overlay unmounted
  const [phase, setPhase] = useState(() => (played.current ? 'home' : 'intro'))
  const [showLoader, setShowLoader] = useState(() => !played.current)
  const [count, setCount] = useState(0)
  const videoRef = useRef(null)

  // Desktop fake-scroll driver (ported from the old LaptopZoom scroll phase).
  const [scrollY, setScrollY] = useState(0)
  const scrollTargetRef = useRef(0)
  const scrollCurrRef   = useRef(0)
  const rafRef          = useRef(null)
  const touchYRef       = useRef(null)
  const maxScrollRef    = useRef(Infinity)

  const revealed    = phase === 'fromBlack' || phase === 'home'
  const showOverlay = phase !== 'home'
  const introSrc    = isMobile ? MOBILE_INTRO : DESKTOP_INTRO

  const handleMaxScroll = useCallback((max) => {
    maxScrollRef.current = max
    scrollTargetRef.current = Math.min(scrollTargetRef.current, max)
  }, [])

  const handleLoaderDone = useCallback(() => setShowLoader(false), [])

  // Intro → toBlack. Guarded so `ended`, `error`, and the safety timer can't double-fire.
  const finishIntro = useCallback(() => {
    setCount(100)
    setPhase(p => {
      if (p !== 'intro') return p
      markIntroPlayed()
      return 'toBlack'
    })
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Drive the counter from the intro video's playback position, so 0→100 spans
  // the whole clip regardless of its exact length.
  useEffect(() => {
    if (phase !== 'intro') return
    let raf
    const tick = () => {
      const v = videoRef.current
      if (v && v.duration > 0) {
        const p = Math.min(1, v.currentTime / v.duration)
        setCount(Math.min(100, Math.round(p * 100)))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  // Once the video has faded to black, start lifting the black into the homepage.
  useEffect(() => {
    if (phase !== 'toBlack') return
    const t = setTimeout(() => setPhase('fromBlack'), FADE_OUT_MS)
    return () => clearTimeout(t)
  }, [phase])

  // After the black has fully lifted, unmount the intro overlay.
  useEffect(() => {
    if (phase !== 'fromBlack') return
    const t = setTimeout(() => setPhase('home'), FADE_IN_MS)
    return () => clearTimeout(t)
  }, [phase])

  // Fail-safe in case autoplay stalls or `ended` never fires.
  useEffect(() => {
    if (phase !== 'intro') return
    const t = setTimeout(finishIntro, SAFETY_MS)
    return () => clearTimeout(t)
  }, [phase, finishIntro])

  // Lock body scroll while the intro overlay covers the page.
  useEffect(() => {
    if (phase === 'home') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [phase])

  // Desktop only, once past the intro: smooth the fake scroll each frame.
  useEffect(() => {
    if (isMobile || phase === 'intro') return
    const tick = () => {
      const curr = scrollCurrRef.current
      const next = curr + (scrollTargetRef.current - curr) * 0.07
      scrollCurrRef.current = next
      setScrollY(next)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isMobile, phase])

  // Desktop only: wheel/touch drive the fake-scroll target.
  useEffect(() => {
    if (isMobile || phase === 'intro') return
    const clampScroll = v => Math.min(maxScrollRef.current, Math.max(0, v))
    const onWheel = (e) => {
      e.preventDefault()
      scrollTargetRef.current = clampScroll(scrollTargetRef.current + e.deltaY * 0.4)
    }
    const onTouchStart = (e) => { touchYRef.current = e.touches[0].clientY }
    const onTouchMove  = (e) => {
      if (touchYRef.current === null) return
      const dy = touchYRef.current - e.touches[0].clientY
      scrollTargetRef.current = clampScroll(scrollTargetRef.current + dy)
      touchYRef.current = e.touches[0].clientY
    }
    const onTouchEnd = () => { touchYRef.current = null }
    window.addEventListener('wheel',      onWheel,      { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true  })
    window.addEventListener('touchmove',  onTouchMove,  { passive: true  })
    window.addEventListener('touchend',   onTouchEnd)
    return () => {
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [isMobile, phase])

  const overlay = showOverlay && (
    <IntroOverlay src={introSrc} phase={phase} videoRef={videoRef} onDone={finishIntro} />
  )
  const loader = showLoader && (
    <Preloader count={count} exiting={phase !== 'intro'} onExitComplete={handleLoaderDone} />
  )

  // Mobile: native document flow (matches the old post-zoom mobile path).
  if (isMobile) {
    return (
      <div style={{ background: '#000' }}>
        <Homepage revealed={revealed} isMobile native />
        {overlay}
        {loader}
      </div>
    )
  }

  // Desktop: fixed full-viewport stage with the fake-scroll homepage.
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000' }}>
      <Homepage
        revealed={revealed}
        isMobile={false}
        scrollY={scrollY}
        progress={1}
        onMaxScroll={handleMaxScroll}
      />
      {overlay}
      {loader}
    </div>
  )
}

// 0→100 counter overlaid on the intro video. Presentational — the count is driven
// by the parent from the video's playback, and it fades away as the video ends.
function Preloader({ count, exiting, onExitComplete }) {
  return (
    <motion.div
      style={styles.preloader}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: exiting ? 0 : 1, y: exiting ? -30 : 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      onAnimationComplete={() => { if (exiting) onExitComplete && onExitComplete() }}
    >
      <span style={styles.preloaderLabel}>SUMMIT SITES® — PROFESSIONAL WEB DESIGN</span>
      <span style={styles.preloaderCount}>{String(count).padStart(3, '0')}</span>
    </motion.div>
  )
}

function IntroOverlay({ src, phase, videoRef, onDone }) {
  // Black backdrop covers the page until `fromBlack`, when it fades to reveal the
  // homepage. The video sits on top and fades out first — to black.
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#000',
        opacity: phase === 'fromBlack' ? 0 : 1,
        transition: `opacity ${FADE_IN_MS}ms ease`,
        pointerEvents: phase === 'intro' || phase === 'toBlack' ? 'auto' : 'none',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        onEnded={onDone}
        onError={onDone}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: phase === 'intro' ? 1 : 0,
          transition: `opacity ${FADE_OUT_MS}ms ease`,
        }}
      />
    </div>
  )
}

const styles = {
  preloader: {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '16px',
    padding: 'clamp(24px, 4vw, 40px)',
    color: '#efede7',
    pointerEvents: 'none',
  },
  preloaderLabel: {
    maxWidth: '60%',
    fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
    fontSize: 'clamp(9px, 0.85vw, 12px)',
    textTransform: 'uppercase',
    letterSpacing: '0.3em',
    lineHeight: 1.4,
    opacity: 0.85,
    textShadow: '0 2px 12px rgba(0,0,0,0.55)',
  },
  preloaderCount: {
    fontFamily: "'Avaleigh', 'MohoCondensed', sans-serif",
    fontSize: 'clamp(72px, 14vw, 170px)',
    fontWeight: 700,
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
    fontFeatureSettings: '"tnum"',
    textShadow: '0 2px 18px rgba(0,0,0,0.55)',
  },
}
