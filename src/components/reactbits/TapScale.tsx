import { motion } from 'framer-motion'

interface TapScaleProps {
  children: React.ReactNode
  scale?: number
  className?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent) => void
}

export default function TapScale({
  children,
  scale = 0.96,
  className = '',
  style = {},
  onClick,
}: TapScaleProps) {
  return (
    <motion.div
      whileTap={{ scale }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`tap-scale-wrap ${className}`}
      style={{ display: 'inline-block', ...style }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
