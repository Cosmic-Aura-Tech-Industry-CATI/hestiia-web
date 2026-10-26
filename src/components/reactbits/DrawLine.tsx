import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface DrawLineProps {
  color?: string
  height?: string | number
  origin?: 'left' | 'center' | 'right'
  duration?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export default function DrawLine({
  color = 'var(--color-brass)',
  height = '1px',
  origin = 'left',
  duration = 1.2,
  delay = 0.1,
  className = '',
  style = {},
}: DrawLineProps) {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      gsap.set(el, { scaleX: 1, opacity: 1 })
      return
    }

    gsap.set(el, {
      scaleX: 0,
      transformOrigin: origin === 'center' ? '50% 50%' : origin === 'right' ? '100% 50%' : '0% 50%',
      opacity: 0,
    })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          scaleX: 1,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [duration, delay, origin])

  return (
    <div
      ref={lineRef}
      className={`draw-line ${className}`}
      style={{
        width: '100%',
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: color,
        ...style,
      }}
    />
  )
}
