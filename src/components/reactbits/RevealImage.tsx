import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealImageProps {
  src: string
  alt: string
  aspectRatio?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function RevealImage({
  src,
  alt,
  aspectRatio = '4/3',
  className = '',
  style = {},
  children,
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    const image = imageRef.current
    if (!container || !wrapper || !image) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isReduced) {
      gsap.set(wrapper, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(image, { scale: 1, opacity: 1, y: 0 })
      return
    }

    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean }

        // Initial states
        gsap.set(wrapper, { clipPath: 'inset(0% 100% 0% 0%)' })
        gsap.set(image, { scale: 1.15, transformOrigin: 'center center' })

        // 1. Entrance clip-wipe left-to-right & inner scale settle
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        })

        tl.to(wrapper, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: isDesktop ? 1.4 : 0.9,
          ease: 'power3.inOut',
        }).to(
          image,
          {
            scale: 1,
            duration: isDesktop ? 1.6 : 1.0,
            ease: 'power2.out',
          },
          0
        )

        // 2. Desktop parallax: 24px vertical shift on scroll scrub
        if (isDesktop) {
          gsap.to(image, {
            y: 24,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`reveal-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio,
        ...style,
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            willChange: 'transform, clip-path',
          }}
        />
        {children}
      </div>
    </div>
  )
}
