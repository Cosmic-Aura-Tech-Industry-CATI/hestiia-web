import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface BlurTextProps {
  text: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  onAnimationComplete?: () => void
}

export default function BlurText({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <span ref={ref} className={`blur-text ${className}`} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {elements.map((element, i) => (
        <motion.span
          key={i}
          initial={{
            filter: 'blur(10px)',
            opacity: 0,
            y: direction === 'top' ? -18 : 18,
          }}
          animate={
            inView
              ? {
                  filter: 'blur(0px)',
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.7,
            delay: (i * delay) / 1000,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          style={{
            display: 'inline-block',
            marginRight: animateBy === 'words' ? '0.28em' : '0',
            willChange: 'filter, opacity, transform',
          }}
        >
          {element === ' ' ? '\u00A0' : element}
        </motion.span>
      ))}
    </span>
  )
}
