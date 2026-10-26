import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface ScrollFloatCharProps {
  char: string
  index: number
  scrollYProgress: MotionValue<number>
}

function ScrollFloatChar({ char, index, scrollYProgress }: ScrollFloatCharProps) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [(index % 2 === 0 ? 60 : -40), (index % 2 === 0 ? -40 : 60)],
  )
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.25, 0.25, 0.05])

  return (
    <motion.span
      style={{
        y,
        opacity,
        display: 'inline-block',
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(5rem, 18vw, 18rem)',
        fontWeight: 300,
        lineHeight: 0.85,
        letterSpacing: '-0.04em',
        color: 'var(--color-brass)',
        willChange: 'transform, opacity',
      }}
    >
      {char}
    </motion.span>
  )
}

interface ScrollFloatProps {
  text: string
  className?: string
}

export default function ScrollFloat({ text, className = '' }: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const letters = text.split('')

  return (
    <div
      ref={ref}
      className={`scroll-float-wrapper ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {letters.map((char, index) => (
        <ScrollFloatChar
          key={index}
          char={char}
          index={index}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  )
}

