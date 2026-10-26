import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftCurtainRef = useRef<HTMLDivElement>(null)
  const rightCurtainRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Check if reduced motion is requested or already seen this session
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasSeen = sessionStorage.getItem('hestiia_preloader_seen')

    if (isReducedMotion || hasSeen) {
      onComplete()
      return
    }

    sessionStorage.setItem('hestiia_preloader_seen', 'true')

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete,
    })

    // Fast <1.4s entrance and curtain split open
    tl.from(wordmarkRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power3.out',
    })
      .from(
        taglineRef.current,
        {
          opacity: 0,
          y: 15,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.2',
      )
      .to({}, { duration: 0.3 }) // brief hold
      .to([wordmarkRef.current, taglineRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(
        leftCurtainRef.current,
        {
          xPercent: -100,
          duration: 0.65,
          ease: 'power4.inOut',
        },
        '-=0.1',
      )
      .to(
        rightCurtainRef.current,
        {
          xPercent: 100,
          duration: 0.65,
          ease: 'power4.inOut',
        },
        '<',
      )

    return () => {
      tl.kill()
    }
  }, [onComplete])

  const handleSkip = () => {
    sessionStorage.setItem('hestiia_preloader_seen', 'true')
    onComplete()
  }

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Loading Hestiia Restaurant"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
      }}
    >
      {/* Split Curtains */}
      <div
        ref={leftCurtainRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          backgroundColor: '#1F1A16',
          borderRight: '1px solid rgba(184, 154, 100, 0.1)',
        }}
      />
      <div
        ref={rightCurtainRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          backgroundColor: '#1F1A16',
          borderLeft: '1px solid rgba(184, 154, 100, 0.1)',
        }}
      />

      {/* Brand Centerpiece */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <h1
          ref={wordmarkRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: 'var(--color-text-inverse)',
            margin: 0,
          }}
        >
          Hestiia<span style={{ fontSize: '0.45em', verticalAlign: 'super', color: 'var(--color-brass)' }}>®</span>
        </h1>
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--color-brass)',
            marginTop: '12px',
          }}
        >
          Pure Vegetarian · Kanpur
        </p>

        {/* Skippable button */}
        <button
          onClick={handleSkip}
          aria-label="Skip preloader animation"
          style={{
            marginTop: '24px',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(246, 239, 228, 0.4)',
            cursor: 'pointer',
            padding: '6px 14px',
            border: '1px solid rgba(184, 154, 100, 0.15)',
            borderRadius: '20px',
            background: 'none',
          }}
        >
          Skip Intro
        </button>
      </div>
    </div>
  )
}
