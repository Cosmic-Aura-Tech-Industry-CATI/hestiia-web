import { useEffect, useRef, useState } from 'react'
import {
  Volume2,
  VolumeX,
  X,
  Play,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react'
import { InstagramIcon } from '../icons/InstagramIcon'
import { REELS, instagramProfileUrl, type ReelItem } from '../../content/reels'
import SplitText from '../reactbits/SplitText'
import DrawLine from '../reactbits/DrawLine'
import Magnet from '../reactbits/Magnet'
import ClickSpark from '../reactbits/ClickSpark'
import TapScale from '../reactbits/TapScale'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './reels-section.css'

gsap.registerPlugin(ScrollTrigger)

export default function ReelsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null)
  const [mobileCenteredIndex, setMobileCenteredIndex] = useState<number>(0)
  const [videoNearViewport, setVideoNearViewport] = useState<boolean>(false)
  const [missingVideoIds, setMissingVideoIds] = useState<Set<string>>(new Set())

  // Fullscreen viewer state
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [playbackProgress, setPlaybackProgress] = useState<number>(0)
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null)

  // Track viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lazy-load videos only when within 1 viewport of view
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100% 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Pause all preview videos when document tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setActivePreviewId(null)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Check data-saver or reduced motion
  const isReducedMotionOrDataSaver = () => {
    if (typeof window === 'undefined') return false
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSaveData = (navigator as any).connection?.saveData === true
    return isReduced || isSaveData
  }

  // Desktop fan-in entrance animation
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isReduced = isReducedMotionOrDataSaver()
    const cards = section.querySelectorAll<HTMLElement>('.reel-card-wrap')
    const header = section.querySelector('.reels-header')

    if (isReduced) {
      gsap.set([header, cards], { opacity: 1, y: 0, rotate: 0 })
      return
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      })

      tl.from(header, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
      }).from(
        cards,
        {
          opacity: 0,
          y: 36,
          // Fan in rotation: left tilts -4deg, right tilts +4deg
          rotate: (i) => (i - (cards.length - 1) / 2) * 2.5,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    })

    return () => mm.revert()
  }, [])

  // Mobile centered reel auto-play (threshold 0.6)
  useEffect(() => {
    if (!isMobile || !trackRef.current) return
    if (isReducedMotionOrDataSaver()) return

    const container = trackRef.current
    const cards = container.querySelectorAll<HTMLElement>('.reel-card-wrap')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-reel-id')
            const cardIdx = Number(entry.target.getAttribute('data-reel-index'))
            if (cardId && !missingVideoIds.has(cardId)) {
              setActivePreviewId(cardId)
              setMobileCenteredIndex(cardIdx)
            }
          }
        })
      },
      {
        root: container,
        threshold: 0.6,
      }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [isMobile, missingVideoIds])

  // Desktop hover play preview
  const handleCardMouseEnter = (reel: ReelItem) => {
    if (isMobile || isReducedMotionOrDataSaver()) return
    if (reel.video && !missingVideoIds.has(reel.id)) {
      setActivePreviewId(reel.id)
    }
  }

  const handleCardMouseLeave = () => {
    if (isMobile) return
    setActivePreviewId(null)
  }

  // Open Fullscreen Viewer
  const openFullscreen = (index: number) => {
    const item = REELS[index]
    // If no video file available, open instagramUrl in new tab
    if (!item.video || missingVideoIds.has(item.id)) {
      window.open(item.instagramUrl, '_blank', 'noopener,noreferrer')
      return
    }

    setFullscreenIndex(index)
    setIsPlaying(true)
    setIsMuted(false)
  }

  const closeFullscreen = () => {
    setFullscreenIndex(null)
    setPlaybackProgress(0)
  }

  // Body scroll lock effect
  useEffect(() => {
    if (fullscreenIndex !== null) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [fullscreenIndex])

  const nextFullscreen = () => {
    setFullscreenIndex((prev) => (prev !== null ? (prev + 1) % REELS.length : null))
    setPlaybackProgress(0)
  }

  const prevFullscreen = () => {
    setFullscreenIndex((prev) => (prev !== null ? (prev - 1 + REELS.length) % REELS.length : null))
    setPlaybackProgress(0)
  }

  // Esc key closes fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenIndex === null) return
      if (e.key === 'Escape') closeFullscreen()
      if (e.key === 'ArrowUp') prevFullscreen()
      if (e.key === 'ArrowDown') nextFullscreen()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreenIndex])

  const toggleFullscreenPlay = () => {
    const vid = fullscreenVideoRef.current
    if (!vid) return
    if (vid.paused) {
      vid.play()
      setIsPlaying(true)
    } else {
      vid.pause()
      setIsPlaying(false)
    }
  }

  const handleVideoTimeUpdate = () => {
    const vid = fullscreenVideoRef.current
    if (!vid || !vid.duration) return
    setPlaybackProgress((vid.currentTime / vid.duration) * 100)
  }

  const activeFullscreenItem = fullscreenIndex !== null ? REELS[fullscreenIndex] : null

  // Circle progress calculation (circumference = 2 * PI * r = 2 * PI * 32 = ~201)
  const ringCircumference = 2 * Math.PI * 32
  const ringOffset = ringCircumference - (playbackProgress / 100) * ringCircumference

  // Empty list guard: render nothing and warn in dev
  if (!REELS || REELS.length === 0) {
    if (import.meta.env.DEV) {
      console.warn('[ReelsSection] No reels configured in src/content/reels.ts')
    }
    return null
  }

  return (
    <section
      ref={sectionRef}
      className="reels-section section-dark"
      aria-labelledby="reels-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="reels-header">
          <div>
            <span className="reels-eyebrow">
              Reels
            </span>

            {/* SplitText Title with Italics */}
            <h2 id="reels-heading" className="reels-title">
              <SplitText as="span">Hestiia,</SplitText>{' '}
              <em>in motion</em>
            </h2>

            {/* Gold DrawLine under title */}
            <DrawLine
              color="var(--color-brass, #B89A64)"
              height="2px"
              origin="left"
              duration={0.9}
              style={{ width: '56px', margin: '10px 0 14px 0' }}
            />

            <p className="reels-intro">
              A window into our slow-simmered sanctuary, sizzling woks, and handcrafted dining moments.
            </p>
          </div>

          {/* Follow on Instagram Button with Magnet + ClickSpark */}
          <div>
            <Magnet disabled={isMobile} strength={0.25} padding={24}>
              <ClickSpark sparkColor="var(--color-brass, #B89A64)" sparkCount={8}>
                <a
                  href={instagramProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reels-follow-btn"
                  aria-label="Follow Hestiia Restaurant on Instagram"
                >
                  <InstagramIcon size={15} />
                  <span>Follow on Instagram</span>
                </a>
              </ClickSpark>
            </Magnet>
          </div>
        </div>

        {/* Reels Track: Desktop Center-Emphasized Row vs Mobile Swipe Carousel */}
        <div
          ref={trackRef}
          className={`reels-track ${activePreviewId && !isMobile ? 'reels-track--dimmed' : ''}`}
        >
          {REELS.map((item, idx) => {
            const hasVideo = Boolean(item.video && !missingVideoIds.has(item.id))
            const isPlayingThis = hasVideo && activePreviewId === item.id
            const isCenterCard = !isMobile && idx === Math.floor(REELS.length / 2)
            const isMobileCenter = isMobile && idx === mobileCenteredIndex

            const cardClasses = [
              'reel-card-wrap',
              isCenterCard ? 'reel-card-wrap--center' : '',
              isMobileCenter ? 'reel-card-wrap--center' : 'reel-card-wrap--neighbor',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <div
                key={item.id}
                className={cardClasses}
                data-reel-id={item.id}
                data-reel-index={idx}
                onMouseEnter={() => handleCardMouseEnter(item)}
                onMouseLeave={handleCardMouseLeave}
              >
                <TapScale scale={0.97} style={{ width: '100%', height: '100%' }}>
                  <div
                    className="reel-card"
                    onClick={() => openFullscreen(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Watch reel: ${item.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openFullscreen(idx)
                      }
                    }}
                  >
                    {/* Video Element (rendered when near viewport and has video) */}
                    {hasVideo && videoNearViewport && (
                      <video
                        src={isPlayingThis ? item.video : undefined}
                        poster={item.poster}
                        muted
                        playsInline
                        loop
                        preload="none"
                        className="reel-card__video"
                        onError={() => {
                          setMissingVideoIds((prev) => new Set(prev).add(item.id))
                        }}
                        ref={(el) => {
                          if (el) {
                            if (isPlayingThis) {
                              el.play().catch(() => {})
                            } else {
                              el.pause()
                            }
                          }
                        }}
                      />
                    )}

                    {/* Poster Image fallback */}
                    <img
                      src={item.poster}
                      alt={item.title}
                      loading="lazy"
                      className="reel-card__poster"
                      onError={(e) => {
                        // Fallback placeholder gradient if poster is missing
                        ;(e.currentTarget as HTMLElement).style.backgroundColor = '#261F1A'
                      }}
                    />

                    {/* Top Bar: Instagram Badge + Play / External Link Indicator */}
                    <div className="reel-card__top-bar">
                      <div className="reel-card__ig-badge" aria-hidden="true">
                        <InstagramIcon size={14} />
                      </div>

                      {hasVideo ? (
                        <div className="reel-card__play-badge" aria-hidden="true">
                          <Play size={10} fill="currentColor" />
                          <span>Watch</span>
                        </div>
                      ) : (
                        <div className="reel-card__play-badge" aria-hidden="true">
                          <ArrowUpRight size={11} />
                          <span>Instagram</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Scrim & Caption */}
                    <div className="reel-card__scrim">
                      <h3 className="reel-card__title">{item.title}</h3>
                      <p className="reel-card__caption">{item.caption}</p>
                    </div>
                  </div>
                </TapScale>
              </div>
            )
          })}
        </div>

        {/* Mobile Dot Indicators */}
        {isMobile && (
          <div className="reels-dots" aria-hidden="true">
            {REELS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`reels-dot ${idx === mobileCenteredIndex ? 'reels-dot--active' : ''}`}
                onClick={() => {
                  const cards = trackRef.current?.querySelectorAll<HTMLElement>('.reel-card-wrap')
                  if (cards && cards[idx]) {
                    cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                    setMobileCenteredIndex(idx)
                  }
                }}
                aria-label={`Go to reel ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ===================================================
          FULLSCREEN REEL VIEWER MODAL
          =================================================== */}
      <AnimatePresence>
        {activeFullscreenItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="reel-viewer-overlay"
            onClick={closeFullscreen}
            role="dialog"
            aria-modal="true"
            aria-label={`Watching ${activeFullscreenItem.title}`}
          >
            {/* Modal Container */}
            <motion.div
              layoutId={activeFullscreenItem.id}
              className="reel-viewer-container"
              onClick={(e) => {
                e.stopPropagation()
                toggleFullscreenPlay()
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y < -50) nextFullscreen()
                else if (info.offset.y > 50) prevFullscreen()
              }}
            >
              {/* Progress Bar at top */}
              <div className="reel-viewer-progress-bar">
                <div
                  className="reel-viewer-progress-fill"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>

              {/* Video Player */}
              <video
                ref={fullscreenVideoRef}
                src={activeFullscreenItem.video}
                poster={activeFullscreenItem.poster}
                autoPlay
                playsInline
                loop
                muted={isMuted}
                className="reel-viewer-video"
                onTimeUpdate={handleVideoTimeUpdate}
              />

              {/* Top Controls: Sound Toggle & Close Button */}
              <div className="reel-viewer-top" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="reel-viewer-ctrl-btn"
                  onClick={() => setIsMuted((prev) => !prev)}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <button
                  type="button"
                  className="reel-viewer-ctrl-btn"
                  onClick={closeFullscreen}
                  aria-label="Close reel viewer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Center Play/Pause morph with circular progress ring */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="reel-viewer-center-play"
                  >
                    <svg className="reel-viewer-progress-ring" viewBox="0 0 72 72">
                      <circle
                        cx="36"
                        cy="36"
                        r="32"
                        strokeDasharray={ringCircumference}
                        strokeDashoffset={ringOffset}
                      />
                    </svg>
                    <Play size={24} fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Details & Instagram Link */}
              <div className="reel-viewer-bottom" onClick={(e) => e.stopPropagation()}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-brass, #B89A64)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Hestiia Sanctuary Reel
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '22px',
                    color: 'var(--color-text-inverse, #F6EFE4)',
                    margin: '0 0 6px 0',
                  }}
                >
                  {activeFullscreenItem.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'rgba(246, 239, 228, 0.8)',
                    margin: '0 0 14px 0',
                  }}
                >
                  {activeFullscreenItem.caption}
                </p>

                <a
                  href={activeFullscreenItem.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reels-follow-btn"
                  style={{ display: 'inline-flex' }}
                >
                  <InstagramIcon size={14} />
                  <span>Open on Instagram</span>
                </a>
              </div>
            </motion.div>

            {/* Desktop Vertical Next / Prev Chevrons */}
            <div className="reel-nav-btn" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="reel-viewer-ctrl-btn"
                onClick={prevFullscreen}
                aria-label="Previous reel"
              >
                <ChevronUp size={20} />
              </button>
              <button
                type="button"
                className="reel-viewer-ctrl-btn"
                onClick={nextFullscreen}
                aria-label="Next reel"
              >
                <ChevronDown size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
