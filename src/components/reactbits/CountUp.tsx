import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CountUpProps {
  to: number
  from?: number
  decimals?: number
  duration?: number
  delay?: number
  className?: string
  separator?: string
  startWhenInView?: boolean
}

export default function CountUp({
  to,
  from = 0,
  decimals = 0,
  duration = 1.4,
  delay = 0,
  className = '',
  separator = '',
  startWhenInView = true,
}: CountUpProps) {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return to
    }
    return from
  })
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      return
    }

    const obj = { val: from }

    if (startWhenInView && spanRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: spanRef.current,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: to,
            duration,
            delay,
            ease: 'power3.out',
            onUpdate: () => {
              setValue(obj.val)
            },
          })
        },
      })

      return () => {
        trigger.kill()
      }
    } else {
      const tween = gsap.to(obj, {
        val: to,
        duration,
        delay,
        ease: 'power3.out',
        onUpdate: () => {
          setValue(obj.val)
        },
      })

      return () => {
        tween.kill()
      }
    }
  }, [to, from, duration, delay, startWhenInView])

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString()

  return (
    <span ref={spanRef} className={`count-up ${className}`}>
      {formatted}
      {separator}
    </span>
  )
}
