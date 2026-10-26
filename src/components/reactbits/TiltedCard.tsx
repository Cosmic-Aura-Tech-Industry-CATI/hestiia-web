import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface TiltedCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
}

export default function TiltedCard({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)
  const currentScale = useSpring(1, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    rotateX.set(tiltX)
    rotateY.set(tiltY)
  }

  const handleMouseEnter = () => {
    currentScale.set(scale)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    currentScale.set(1)
  }

  return (
    <div
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className={`tilted-card-wrapper ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: currentScale,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
