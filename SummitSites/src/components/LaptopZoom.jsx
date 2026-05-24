import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

// Screen bounds within good_laptop_ref.png (% of image)
// Adjust these if the crop feels off
const SCREEN = {
  top: 5.5,    // % from top
  right: 11.5, // % from right
  bottom: 29,  // % from bottom
  left: 11.5,  // % from left
}

export default function LaptopZoom() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Laptop zooms in — origin anchored to screen center
  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 4])
  const laptopOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0])

  // Homepage clip-path expands from screen bounds → full viewport
  const clipTop    = useTransform(scrollYProgress, [0, 1], [SCREEN.top,    0])
  const clipRight  = useTransform(scrollYProgress, [0, 1], [SCREEN.right,  0])
  const clipBottom = useTransform(scrollYProgress, [0, 1], [SCREEN.bottom, 0])
  const clipLeft   = useTransform(scrollYProgress, [0, 1], [SCREEN.left,   0])

  const clipPath = useTransform(
    [clipTop, clipRight, clipBottom, clipLeft],
    ([t, r, b, l]) => `inset(${t}% ${r}% ${b}% ${l}% round 4px)`
  )

  const homepageOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1])

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a0a0a',
        }}
      >
        {/* Laptop layer */}
        <motion.img
          src="/good_laptop_ref.png"
          alt="laptop"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            scale: laptopScale,
            opacity: laptopOpacity,
            transformOrigin: '50% 37%',
          }}
        />

        {/* Homepage reveal layer */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath,
            opacity: homepageOpacity,
          }}
        >
          <img
            src="/mountian.jpeg"
            alt="homepage"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
