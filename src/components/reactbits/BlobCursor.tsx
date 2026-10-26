import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function BlobCursor() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !isTouch && !isReducedMotion
  })
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  useEffect(() => {
    // Suppress on touch devices or reduced motion
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || isReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && (target.closest('a') || target.closest('button') || target.closest('[data-magnetic]'))) {
        setIsHoveringInteractive(true)
      } else {
        setIsHoveringInteractive(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <motion.div
      className="blob-cursor"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{
          scale: isHoveringInteractive ? 2.4 : 1,
          opacity: isHoveringInteractive ? 0.45 : 0.75,
          borderColor: isHoveringInteractive ? 'var(--color-brass)' : 'rgba(212, 184, 138, 0.4)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: isHoveringInteractive ? 'var(--color-brass-light)' : 'var(--color-brass)',
          border: '1px solid rgba(212, 184, 138, 0.4)',
          boxShadow: '0 0 12px rgba(184, 154, 100, 0.3)',
        }}
      />
    </motion.div>
  )
}
