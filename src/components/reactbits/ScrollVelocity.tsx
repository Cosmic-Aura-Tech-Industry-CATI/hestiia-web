import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion'

interface ScrollVelocityProps {
  texts: string[]
  velocity?: number
  className?: string
}

function VelocityLine({ text, baseVelocity = 2, className = '' }: { text: string; baseVelocity: number; className?: string }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const x = useTransform(baseX, v => `${wrap(-25, 0, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="scroll-velocity-wrapper" style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
      <motion.div className={`scroll-velocity-content ${className}`} style={{ x, display: 'flex', gap: '2rem' }}>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  )
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export default function ScrollVelocity({ texts, velocity = 2, className = '' }: ScrollVelocityProps) {
  return (
    <section className="scroll-velocity-section" aria-label="Restaurant culinary highlights">
      {texts.map((text, index) => (
        <VelocityLine
          key={index}
          text={text}
          baseVelocity={index % 2 === 0 ? velocity : -velocity}
          className={className}
        />
      ))}
    </section>
  )
}
