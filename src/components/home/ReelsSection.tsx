import { useEffect, useRef, useState, useCallback } from 'react'
import { Play, Pause, ArrowUpRight } from 'lucide-react'
import { motion, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { reels, instagramProfileUrl, type Reel } from '../../data/reels'
import { InstagramIcon } from '../icons/InstagramIcon'
import SplitText from '../reactbits/SplitText'
import ShinyText from '../reactbits/ShinyText'
import Magnet from '../reactbits/Magnet'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'

import './reels-section.css'

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger)

/**
 * REELS CONTINUOUS MARQUEE SPEED SETTING
 * Duration in seconds for one full seamless loop (-50% track translate).
 * 35-50s creates a slow, elegant motion (~40-60 px/sec).
 * - Decrease to make it move faster (e.g. 30)
 * - Increase to make it move slower (e.g. 50)
 */
export const REELS_LOOP_DURATION = 42

// Check reduced motion or data saver
const isReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true
  )
}

/* ===================================================
   INDIVIDUAL REEL CARD COMPONENT
   =================================================== */
interface ReelCardProps {
  reel: Reel
  isDesktop: boolean
  isDuplicate?: boolean
}

function ReelCard({ reel, isDesktop, isDuplicate = false }: ReelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Spotlight coordinates
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [videoError, setVideoError] = useState(false)

  // 3D Tilt springs
  const springConfig = { damping: 20, stiffness: 220 }
  const tiltX = useSpring(0, springConfig)
  const tiltY = useSpring(0, springConfig)

  // Mouse move for spotlight & subtle 3D tilt on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isDesktop || isReducedMotion()) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setSpotlightPos({ x, y })

    // Subtle 3D tilt (max 4 degrees)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotX = ((y - centerY) / centerY) * -4
    const rotY = ((x - centerX) / centerX) * 4
    tiltX.set(rotX)
    tiltY.set(rotY)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <div
      style={{
        perspective: '1000px',
        width: '100%',
        height: '100%',
        aspectRatio: '9 / 16',
        display: 'block',
      }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: isDesktop && !isReducedMotion() ? tiltX : 0,
          rotateY: isDesktop && !isReducedMotion() ? tiltY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="hz-reels-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Spotlight dynamic cursor shine layer */}
        <div
          className="hz-reels-spotlight-layer"
          style={{
            background: `radial-gradient(420px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(184, 154, 100, 0.22), transparent 75%)`,
          }}
        />

        {/* Fallback background layer (dark brown + gold styling if video fails) */}
        <div className="hz-reels-card-fallback-bg" aria-hidden="true" />

        {/* Video Player: Strictly muted, defaultMuted, loop, autoPlay, playsInline */}
        {!videoError && (
          <video
            ref={(el) => {
              videoRef.current = el
              if (el) {
                el.muted = true
                el.defaultMuted = true
              }
            }}
            src={reel.video}
            poster={reel.poster}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload noremoteplayback"
            className="hz-reels-video"
            onError={() => {
              if (import.meta.env.DEV) {
                console.warn(`[Reels] Video failed to load: ${reel.video}`)
              }
              setVideoError(true)
            }}
          />
        )}

        {/* Optional Poster Image */}
        {reel.poster && !videoError && (
          <img
            src={reel.poster}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="hz-reels-poster"
            onError={(e) => {
              ;(e.currentTarget as HTMLElement).style.display = 'none'
            }}
          />
        )}

        {/* TOP BAR: Direct link to Instagram reel */}
        <div className="hz-reels-card-top">
          <a
            href={reel.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isDuplicate ? -1 : 0}
            className="hz-reels-ig-link"
            aria-label={`Open reel "${reel.title}" on Instagram`}
            title="Open reel on Instagram"
          >
            <InstagramIcon size={17} />
          </a>
        </div>

        {/* BOTTOM SCRIM & "Watch on Instagram ↗" PILL BUTTON */}
        <div className="hz-reels-card-bottom">
          <h3 className="hz-reels-card-title">{reel.title}</h3>

          <a
            href={reel.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isDuplicate ? -1 : 0}
            className="hz-reels-pill-btn"
            aria-label={`Watch ${reel.title} on Instagram`}
          >
            <span>Watch on Instagram</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </motion.div>
    </div>
  )
}

/* ===================================================
   MAIN REELS SECTION (Continuous Seamless Loop Marquee)
   =================================================== */
export default function ReelsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null)

  const { isDesktop, isMobile, isTouch } = useDeviceMotion()
  const [isUserPaused, setIsUserPaused] = useState<boolean>(() => isReducedMotion())
  const isSectionInViewRef = useRef<boolean>(false)

  // Helper to play videos in the section (muted)
  const playAllVideos = useCallback(() => {
    if (!sectionRef.current) return
    const videos = sectionRef.current.querySelectorAll<HTMLVideoElement>('video')
    videos.forEach((video) => {
      video.muted = true
      video.defaultMuted = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy or aborted
        })
      }
    })
  }, [])

  // Helper to pause all videos in the section
  const pauseAllVideos = useCallback(() => {
    if (!sectionRef.current) return
    const videos = sectionRef.current.querySelectorAll<HTMLVideoElement>('video')
    videos.forEach((video) => {
      video.pause()
    })
  }, [])

  // Tab visibility management: pause when hidden, resume when visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAllVideos()
        marqueeTweenRef.current?.pause()
      } else if (isSectionInViewRef.current && !isUserPaused && !isReducedMotion()) {
        playAllVideos()
        marqueeTweenRef.current?.play()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [pauseAllVideos, playAllVideos, isUserPaused])

  // GSAP Infinite Marquee & Header Reveal Setup
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || !reels.length) return

    const reduced = isReducedMotion()
    if (reduced) {
      return
    }

    const ctx = gsap.context(() => {
      const header = section.querySelector('.hz-reels-header')

      // 1. Header entrance animation
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // 2. Infinite Continuous Marquee Tween: moves seamlessly to -50% (slower on mobile: ~54s vs 42s)
      const tween = gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: isMobile ? 54 : REELS_LOOP_DURATION,
        repeat: -1,
      })
      marqueeTweenRef.current = tween

      // Initially paused until section enters viewport
      tween.pause()
    }, section)

    // Safety fallback: ensure cards are visible after 1.5s
    const fallbackTimer = setTimeout(() => {
      const cards = section.querySelectorAll<HTMLElement>('.hz-reels-item')
      cards.forEach((card) => {
        if (window.getComputedStyle(card).opacity === '0') {
          card.style.opacity = '1'
        }
      })
    }, 1500)

    return () => {
      ctx.revert()
      clearTimeout(fallbackTimer)
    }
  }, [isMobile])

  // IntersectionObserver: play/pause based on section viewport entry
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionInViewRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          if (!isUserPaused && !isReducedMotion()) {
            marqueeTweenRef.current?.play()
            playAllVideos()
          }
        } else {
          marqueeTweenRef.current?.pause()
          pauseAllVideos()
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1,
      }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [isUserPaused, playAllVideos, pauseAllVideos])

  // Mobile video throttling: only play videos currently visible in mobile viewport (max 2-3)
  useEffect(() => {
    if (!isMobile || !sectionRef.current) return

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video')
          if (!video) return
          if (entry.isIntersecting && isSectionInViewRef.current && !isUserPaused) {
            video.muted = true
            video.defaultMuted = true
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = sectionRef.current.querySelectorAll('.hz-reels-item')
    cards.forEach((card) => cardObserver.observe(card))

    return () => cardObserver.disconnect()
  }, [isMobile, isUserPaused])

  // Handle accessible Pause / Play toggle
  const handleToggleUserPause = () => {
    setIsUserPaused((prev) => {
      const next = !prev
      if (next) {
        marqueeTweenRef.current?.pause()
        pauseAllVideos()
      } else {
        if (isSectionInViewRef.current) {
          marqueeTweenRef.current?.play()
          playAllVideos()
        }
      }
      return next
    })
  }

  // Desktop Hover: smoothly slow down or pause marquee so user can click
  const handleMouseEnter = () => {
    if (marqueeTweenRef.current && !isUserPaused && !isReducedMotion()) {
      gsap.to(marqueeTweenRef.current, { timeScale: 0, duration: 0.4, ease: 'power1.out' })
    }
  }

  const handleMouseLeave = () => {
    if (marqueeTweenRef.current && !isUserPaused && !isReducedMotion() && isSectionInViewRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.4, ease: 'power1.out' })
    }
  }

  // Mobile Touch-and-hold to pause
  const handleTouchStart = () => {
    if (marqueeTweenRef.current && !isUserPaused && !isReducedMotion()) {
      gsap.to(marqueeTweenRef.current, { timeScale: 0, duration: 0.2, ease: 'power1.out' })
    }
  }

  const handleTouchEnd = () => {
    if (marqueeTweenRef.current && !isUserPaused && !isReducedMotion() && isSectionInViewRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.3, ease: 'power1.out' })
    }
  }

  // Safety check: if no reels exist, render nothing
  if (!reels || reels.length === 0) {
    return null
  }

  // Ensure items fill at least 2x viewport width on 1920px+ displays before duplicating
  const baseReels = reels.length < 8 ? [...reels, ...reels] : reels

  return (
    <section
      id="reels"
      ref={sectionRef}
      className="hz-reels-section"
      aria-labelledby="reels-heading"
    >
      <div className="hz-reels-container">
        {/* SECTION HEADER */}
        <div className="hz-reels-header">
          <div className="hz-reels-header-left">
            <span className="hz-reels-eyebrow">
              <span className="hz-reels-eyebrow-line" aria-hidden="true" />
              <ShinyText text="OUR REELS" speed={3.5} />
            </span>

            <SplitText as="h2" className="hz-reels-title">
              Moments from the Kitchen.
            </SplitText>

            <p className="hz-reels-subtitle">
              A window into our slow-simmered heritage, sizzling wok artistry, and pure vegetarian craftsmanship.
            </p>
          </div>

          <div className="hz-reels-header-right">
            {/* Follow on Instagram CTA with Magnet */}
            <Magnet disabled={!isDesktop || isTouch} strength={0.25} padding={20}>
              <a
                href={instagramProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hz-reels-follow-btn"
                aria-label="Follow Hestiia Restaurant on Instagram (opens in new tab)"
              >
                <InstagramIcon size={16} />
                <span>Follow on Instagram</span>
              </a>
            </Magnet>

            {/* Accessibility Play / Pause Toggle Button */}
            <Magnet disabled={!isDesktop || isTouch} strength={0.25} padding={16}>
              <button
                type="button"
                className="hz-reels-toggle-btn"
                onClick={handleToggleUserPause}
                aria-pressed={isUserPaused}
                aria-label={isUserPaused ? 'Play reels marquee and videos' : 'Pause reels marquee and videos'}
                title={isUserPaused ? 'Play animation' : 'Pause animation'}
              >
                {isUserPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} />}
                <span>{isUserPaused ? 'Play' : 'Pause'}</span>
              </button>
            </Magnet>
          </div>
        </div>

        {/* CONTINUOUS MARQUEE REGION (Full bleed with soft edge gradient fades) */}
        <div
          className="hz-reels-carousel-region"
          role="region"
          aria-label="Hestiia Moments Video Reels Marquee"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div ref={trackRef} className="hz-reels-track">
            {/* SET 1: Primary Interactive Set */}
            {baseReels.map((reel, idx) => (
              <div
                key={`primary-${reel.id}-${idx}`}
                className="hz-reels-item"
                data-reel-id={reel.id}
                data-reel-index={idx}
              >
                <ReelCard
                  reel={reel}
                  isDesktop={isDesktop}
                  isDuplicate={false}
                />
              </div>
            ))}

            {/* SET 2: Duplicate Set for Seamless Loop (-50% loop point) */}
            {baseReels.map((reel, idx) => (
              <div
                key={`duplicate-${reel.id}-${idx}`}
                className="hz-reels-item"
                aria-hidden="true"
                data-reel-id={reel.id}
                data-reel-index={idx + baseReels.length}
              >
                <ReelCard
                  reel={reel}
                  isDesktop={isDesktop}
                  isDuplicate={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
