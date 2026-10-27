import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { smoothScroller } from '../../lib/lenis'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isMobile, isTouch } = useDeviceMotion()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0

      setScrollProgress(progress)
      setIsVisible(scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    try {
      smoothScroller.scrollTo(0, { duration: 0.8 })
    } catch {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - scrollProgress * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={!isTouch ? { scale: 1.08 } : undefined}
          whileTap={{ scale: 0.94 }}
          aria-label="Scroll back to top of page"
          style={{
            position: 'fixed',
            bottom: isMobile ? 'calc(82px + env(safe-area-inset-bottom, 0px))' : 'calc(28px + env(safe-area-inset-bottom, 0px))',
            right: isMobile ? 'calc(16px + env(safe-area-inset-right, 0px))' : 'calc(28px + env(safe-area-inset-right, 0px))',
            zIndex: 89,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(31, 26, 22, 0.88)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(184, 154, 100, 0.35)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-brass, #B89A64)',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {/* Progress Ring */}
          <svg
            viewBox="0 0 44 44"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              transform: 'rotate(-90deg)',
              pointerEvents: 'none',
            }}
          >
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="rgba(184, 154, 100, 0.15)"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="var(--color-brass, #B89A64)"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>

          <ChevronUp size={18} strokeWidth={2.2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
