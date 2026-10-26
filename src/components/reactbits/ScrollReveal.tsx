import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollRevealProps {
  children: string
  className?: string
  progressRange?: [number, number]
}

export default function ScrollReveal({
  children,
  className = '',
  progressRange = [0, 1],
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 50%'],
  })

  const words = children.split(' ')

  return (
    <p ref={containerRef} className={`scroll-reveal-paragraph ${className}`}>
      {words.map((word, i) => {
        const start = (i / words.length) * (progressRange[1] - progressRange[0]) + progressRange[0]
        const end = ((i + 1) / words.length) * (progressRange[1] - progressRange[0]) + progressRange[0]

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: any
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [4, 0])

  return (
    <motion.span
      style={{
        display: 'inline-block',
        marginRight: '0.28em',
        opacity,
        y,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </motion.span>
  )
}
