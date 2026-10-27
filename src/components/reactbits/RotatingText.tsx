import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RotatingTextProps {
  texts: string[]
  interval?: number
  className?: string
  style?: React.CSSProperties
}

export default function RotatingText({
  texts,
  interval = 3000,
  className = '',
  style = {},
}: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (texts.length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [texts, interval])

  return (
    <span
      className={`rotating-text-wrap ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        ...style,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
