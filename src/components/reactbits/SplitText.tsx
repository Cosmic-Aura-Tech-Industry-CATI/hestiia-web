import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  style?: React.CSSProperties
}

export default function SplitText({
  children,
  className = '',
  delay = 0.1,
  stagger = 0.08,
  duration = 0.9,
  as: Component = 'div',
  style = {},
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  // Split text by words
  const words = children.split(' ')

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const spans = el.querySelectorAll<HTMLSpanElement>('.split-word-inner')

    if (isReduced) {
      gsap.set(spans, { opacity: 1, y: 0 })
      return
    }

    gsap.set(spans, { y: '105%', opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(spans, {
          y: '0%',
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [children, delay, stagger, duration])

  return (
    <Component
      ref={containerRef as any}
      className={`split-text ${className}`}
      style={{
        display: 'block',
        ...style,
      }}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="split-word-wrapper"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: '0.28em',
          }}
        >
          <span
            className="split-word-inner"
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  )
}
