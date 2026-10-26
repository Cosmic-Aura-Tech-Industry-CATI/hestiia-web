import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  disabled?: boolean
  strength?: number
}

export default function Magnet({
  children,
  padding = 40,
  disabled = false,
  strength = 0.35,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    if (Math.abs(distanceX) < width / 2 + padding && Math.abs(distanceY) < height / 2 + padding) {
      setPosition({ x: distanceX * strength, y: distanceY * strength })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 180, mass: 0.2 }}
      data-magnetic="true"
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}
