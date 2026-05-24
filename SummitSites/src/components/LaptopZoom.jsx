import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import Homepage from './Homepage'

// Pixel bounds of the laptop screen within good_laptop_ref_noText.png
// expressed as inset percentages (top / right / bottom / left of the image).
// Tweak these if the zoom origin feels off after seeing the actual image.
const SCREEN = {
  top: 5.5,
  right: 11.5,
  bottom: 29,
  left: 11.5,
}

export default function LaptopZoom() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Laptop zooms toward the viewer; origin locked to the screen center
  const laptopScale   = useTransform(scrollYProgress, [0, 1],    [1, 4])
  const laptopOpacity = useTransform(scrollYProgress, [0.65, 1], [1, 0])

  // Clip-path opens from the laptop screen area out to the full viewport
  const clipTop    = useTransform(scrollYProgress, [0, 1], [SCREEN.top,    0])
  const clipRight  = useTransform(scrollYProgress, [0, 1], [SCREEN.right,  0])
  const clipBottom = useTransform(scrollYProgress, [0, 1], [SCREEN.bottom, 0])
  const clipLeft   = useTransform(scrollYProgress, [0, 1], [SCREEN.left,   0])

  const clipPath = useTransform(
    [clipTop, clipRight, clipBottom, clipLeft],
    ([t, r, b, l]) => `inset(${t}% ${r}% ${b}% ${l}% round 4px)`
  )

  // Homepage fades in early so it's visible through the expanding screen window
  const homepageOpacity = useTransform(scrollYProgress, [0.04, 0.25], [0, 1])

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {/* Laptop image — zooms in toward the screen */}
        <motion.img
          src="/good_laptop_ref_noText.png"
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

        {/* Homepage revealed through the expanding screen window */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath,
            opacity: homepageOpacity,
          }}
        >
          <Homepage />
        </motion.div>
      </div>
    </div>
  )
}
