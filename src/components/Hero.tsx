import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, ChevronDown } from 'lucide-react'
import { RESTAURANT } from '../content/restaurant'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  isReady?: boolean
}

// Network connection interface for slow connection detection
interface NetworkInformation extends EventTarget {
  saveData?: boolean
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g'
}

export default function Hero({ isReady = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  const [shouldLoadVideo] = useState(() => {
    if (typeof window === 'undefined') return false
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return false

    const nav = navigator as unknown as { connection?: NetworkInformation }
    const connection = nav.connection
    if (connection) {
      if (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        return false
      }
    }
    return true
  })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // 2. Video Playback Management (IntersectionObserver, visibilitychange, and try/catch play)
  useEffect(() => {
    if (!shouldLoadVideo) return

    const video = videoRef.current
    if (!video) return

    let isMounted = true

    const playVideo = async () => {
      try {
        await video.play()
        if (isMounted) {
          setIsVideoPlaying(true)
        }
      } catch {
        // Autoplay policy or error: keep poster visible, no crash
        if (isMounted) {
          setIsVideoPlaying(false)
        }
      }
    }

    // Play once video can play through or is loaded
    if (video.readyState >= 2) {
      playVideo()
    } else {
      video.addEventListener('canplay', playVideo, { once: true })
    }

    // Pause when tab hidden, resume when visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        video.pause()
      } else if (document.visibilityState === 'visible') {
        playVideo()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Pause when hero is out of viewport, resume when returning
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause()
        } else if (document.visibilityState === 'visible') {
          playVideo()
        }
      },
      { threshold: 0.05 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      isMounted = false
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      observer.disconnect()
    }
  }, [shouldLoadVideo])

  // 3. Entrance Animations & Desktop-only Scroll Scale (GSAP)
  useEffect(() => {
    if (!isReady) return

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    const ctx = gsap.context(() => {
      // Soft, non-blocking fade-and-rise animations
      const elements = [
        eyebrowRef.current,
        titleRef.current,
        subtitleRef.current,
        ctasRef.current,
        scrollCueRef.current,
      ].filter(Boolean)

      gsap.from(elements, {
        opacity: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      })

      // Desktop-only video micro-scale on scroll (1.0 to 1.04)
      if (window.innerWidth >= 768 && videoRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: self => {
            if (videoRef.current) {
              gsap.set(videoRef.current, { scale: 1.0 + self.progress * 0.04 })
            }
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <section ref={sectionRef} className="hero" id="home" aria-label="Hero Section">
      {/* LAYER 0: MEDIA (Video + Responsive Poster Underneath) */}
      <div className="hero__media" aria-hidden="true">
        {/* Responsive Poster is LCP element (fetchpriority="high", eager) */}
        <picture className="hero__poster">
          <source media="(max-width: 767px)" srcSet="/video/hero-mobile-poster.jpg" />
          <img
            src="/video/hero-desktop-poster.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            className="hero__poster-img"
          />
        </picture>

        {/* Video Element */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            className={`hero__video ${isVideoPlaying ? 'hero__video--playing' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/hero-mobile-poster.jpg"
            aria-hidden="true"
            disablePictureInPicture
            tabIndex={-1}
            onPlaying={() => setIsVideoPlaying(true)}
            onError={() => setIsVideoPlaying(false)}
          >
            {/* Mobile sources first */}
            <source media="(max-width: 767px)" src="/video/hero-mobile.webm" type="video/webm" />
            <source media="(max-width: 767px)" src="/video/hero-mobile.mp4" type="video/mp4" />
            {/* Desktop sources */}
            <source src="/video/hero-desktop.webm" type="video/webm" />
            <source src="/video/hero-desktop.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* LAYER 1: OVERLAY (High-Contrast Gradient Scrim) */}
      <div className="hero__overlay" aria-hidden="true">
        <div className="hero__overlay-dim" />
        <div className="hero__overlay-header" />
        <div className="hero__overlay-gradient" />
      </div>

      {/* LAYER 2: CONTENT (Normal Flow Flex Block, Zero Absolute Overlaps) */}
      <div className="hero__content-wrap">
        <div className="hero__text-block">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            <span>Pure Vegetarian · Shyam Nagar, Kanpur</span>
          </div>

          {/* H1 Title */}
          <h1 ref={titleRef} className="hero__title">
            Hestiia
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="hero__subtitle">
            Pure vegetarian dining in Shyam Nagar, Kanpur.
          </p>

          {/* CTA Buttons */}
          <div ref={ctasRef} className="hero__ctas">
            <a href="#visit" className="hero__btn hero__btn--primary" id="hero-reserve-btn">
              Reserve a Table
            </a>

            <a href="#menu" className="hero__btn hero__btn--secondary" id="hero-menu-btn">
              View Menu
            </a>

            <a
              href={`tel:${RESTAURANT.phone.e164}`}
              className="hero__btn hero__btn--tertiary"
              id="hero-call-btn"
              aria-label={`Call ${RESTAURANT.phone.display}`}
            >
              <Phone size={15} color="var(--color-brass, #B89A64)" aria-hidden="true" />
              <span>Call Us</span>
            </a>
          </div>

          {/* Scroll Cue */}
          <div ref={scrollCueRef} className="hero__scroll-cue" aria-hidden="true">
            <span>Scroll</span>
            <ChevronDown size={14} className="bounce-animation" />
          </div>
        </div>
      </div>
    </section>
  )
}
