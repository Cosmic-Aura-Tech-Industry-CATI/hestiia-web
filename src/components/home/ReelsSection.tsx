import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Play, Pause, X, ChevronLeft, ChevronRight, Volume2, VolumeX, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { reels, instagramProfileUrl, type Reel } from '../../data/reels'
import { InstagramIcon } from '../icons/InstagramIcon'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'
import { useReelPlayer, releaseVideoMemory, isPlaybackRestricted } from '../../hooks/useReelPlayer'
import Button from '../ui/Button'

import './reels-section.css'

gsap.registerPlugin(ScrollTrigger)

export const REELS_LOOP_DURATION = 42

/* ===================================================
   SINGLE PREVIEW VIDEO COMPONENT
   Mounted ONLY when this specific card is active.
   Unmounting calls releaseVideoMemory immediately.
   =================================================== */
interface ReelPreviewVideoProps {
  src: string
  poster?: string
  onError: () => void
}

function ReelPreviewVideo({ src, poster, onError }: ReelPreviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.src = src

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Handled silently: autoplay restriction or aborted
      })
    }

    return () => {
      releaseVideoMemory(video)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted
      playsInline
      loop
      preload="none"
      disablePictureInPicture
      controlsList="nodownload noremoteplayback"
      className="hz-reels-video"
      onError={onError}
    />
  )
}

/* ===================================================
   INDIVIDUAL REEL CARD
   Poster-first rule: Always renders <img> poster.
   Preview video is rendered strictly if isActive is true.
   =================================================== */
interface ReelCardProps {
  reel: Reel
  isActive: boolean
  isDesktop: boolean
  onHover: () => void
  onLeave: () => void
  onCardClick: () => void
}

function ReelCard({
  reel,
  isActive,
  isDesktop,
  onHover,
  onLeave,
  onCardClick,
}: ReelCardProps) {
  const [videoError, setVideoError] = useState(false)

  return (
    <div
      className="hz-reels-card"
      onClick={onCardClick}
      onMouseEnter={isDesktop ? onHover : undefined}
      onMouseLeave={isDesktop ? onLeave : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onCardClick()
        }
      }}
      aria-label={`Open reel: ${reel.title}`}
    >
      {/* 1. Poster Image (Always rendered, fixed 9:16 aspect ratio) */}
      <img
        src={reel.poster}
        alt={reel.title}
        width={540}
        height={960}
        loading="lazy"
        decoding="async"
        className="hz-reels-poster"
      />

      {/* 2. Single Active Video Preview (Mounted ONLY when isActive) */}
      {isActive && !videoError && (
        <ReelPreviewVideo
          src={reel.video}
          poster={reel.poster}
          onError={() => {
            if (import.meta.env.DEV) {
              console.warn(`[Reels] Video preview failed: ${reel.video}`)
            }
            setVideoError(true)
          }}
        />
      )}

      {/* 3. Playing indicator badge when preview video is live */}
      {isActive && !videoError && (
        <div className="hz-reels-playing-badge" aria-hidden="true">
          <span className="hz-reels-playing-dot" />
          <span>Playing</span>
        </div>
      )}

      {/* 4. Top bar: Direct Instagram link badge */}
      <div className="hz-reels-card-top" onClick={(e) => e.stopPropagation()}>
        <a
          href={reel.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hz-reels-ig-link"
          aria-label={`Open "${reel.title}" on Instagram`}
          title="Watch on Instagram"
        >
          <InstagramIcon size={18} />
        </a>
      </div>

      {/* 5. Bottom bar: Title and pill link */}
      <div className="hz-reels-card-bottom" onClick={(e) => e.stopPropagation()}>
        <h3 className="hz-reels-card-title">{reel.title}</h3>
        <a
          href={reel.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hz-reels-pill-btn"
          aria-label={`Watch ${reel.title} on Instagram`}
        >
          <span>Watch on Instagram</span>
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  )
}

/* ===================================================
   FULLSCREEN REEL VIEWER MODAL
   Exactly ONE <video> element across the entire modal.
   Swapping reels updates the existing video element's src.
   =================================================== */
interface FullscreenViewerProps {
  currentReelId: string
  allReels: Reel[]
  onClose: () => void
  onSelectReel: (id: string) => void
}

function FullscreenViewer({
  currentReelId,
  allReels,
  onClose,
  onSelectReel,
}: FullscreenViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const touchStartY = useRef<number | null>(null)

  const currentIndex = allReels.findIndex((r) => r.id === currentReelId)
  const currentReel = allReels[currentIndex >= 0 ? currentIndex : 0]

  const handlePrev = useCallback(() => {
    const nextIdx = (currentIndex - 1 + allReels.length) % allReels.length
    onSelectReel(allReels[nextIdx].id)
  }, [currentIndex, allReels, onSelectReel])

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % allReels.length
    onSelectReel(allReels[nextIdx].id)
  }, [currentIndex, allReels, onSelectReel])

  // Key listeners (Esc, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, handlePrev, handleNext])

  // Update video src on currentReel change and release old decoder memory
  useEffect(() => {
    const video = videoRef.current
    if (!video || !currentReel) return

    video.pause()
    video.src = currentReel.video
    video.muted = isMuted

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }

    return () => {
      releaseVideoMemory(video)
    }
  }, [currentReel, isMuted])

  // Toggle Play / Pause
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  // Toggle Mute
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Swipe down to close
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const diff = e.changedTouches[0].clientY - touchStartY.current
    if (diff > 90) {
      onClose()
    }
    touchStartY.current = null
  }

  if (!currentReel) return null

  return (
    <div
      className="hz-reels-modal-overlay"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${currentReel.title}`}
    >
      <div
        className="hz-reels-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Exactly ONE HTML5 video element */}
        <video
          ref={videoRef}
          poster={currentReel.poster}
          playsInline
          loop
          preload="metadata"
          className="hz-reels-modal-video"
          onClick={togglePlay}
        />

        {/* Center play icon overlay when paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 4,
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(23, 18, 14, 0.85)',
              border: '1px solid var(--color-brass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-brass)',
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
            aria-label="Play video"
          >
            <Play size={28} fill="currentColor" />
          </div>
        )}

        {/* Top bar controls */}
        <div className="hz-reels-modal-top">
          <h4 className="hz-reels-modal-title">{currentReel.title}</h4>
          <div className="hz-reels-modal-actions">
            <button
              type="button"
              className="hz-reels-modal-btn"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              type="button"
              className="hz-reels-modal-btn"
              onClick={onClose}
              aria-label="Close viewer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Prev / Next navigation buttons */}
        <button
          type="button"
          className="hz-reels-modal-nav hz-reels-modal-nav--prev"
          onClick={handlePrev}
          aria-label="Previous reel"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          className="hz-reels-modal-nav hz-reels-modal-nav--next"
          onClick={handleNext}
          aria-label="Next reel"
        >
          <ChevronRight size={24} />
        </button>

        {/* Bottom bar with caption & Instagram link */}
        <div className="hz-reels-modal-bottom">
          {currentReel.caption && (
            <p className="hz-reels-modal-caption">{currentReel.caption}</p>
          )}
          <a
            href={currentReel.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hz-reels-pill-btn"
            aria-label="Open in Instagram app"
          >
            <span>Watch on Instagram</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  )
}

/* ===================================================
   MAIN REELS SECTION COMPONENT
   =================================================== */
export default function ReelsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRegionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null)

  const { isDesktop } = useDeviceMotion()

  const {
    activeCardId,
    fullscreenId,
    setIsSectionInView,
    requestCardActivation,
    deactivateCard,
    openFullscreen,
    closeFullscreen,
  } = useReelPlayer({ hoverDelay: 300 })

  const [isUserPaused, setIsUserPaused] = useState<boolean>(() => isPlaybackRestricted())

  // Step 3.1: Dev-only live media counter (Rule: never more than 2 on the whole page)
  useEffect(() => {
    if (!import.meta.env.DEV) return
    let lastLogged = -1
    const timer = setInterval(() => {
      const liveVideos = document.querySelectorAll('video').length
      if (liveVideos !== lastLogged) {
        lastLogged = liveVideos
        console.log(`[Dev Media Monitor] Live <video> elements on page: ${liveVideos} (Hero + ${Math.max(0, liveVideos - 1)} Reel)`)
        if (liveVideos > 2) {
          console.warn(`[Dev Media Monitor] WARNING: More than 2 live video elements detected: ${liveVideos}`)
        }
      }
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  // Section visibility observer (100px rootMargin)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsSectionInView(inView)

        if (inView) {
          if (!isUserPaused && !isPlaybackRestricted()) {
            marqueeTweenRef.current?.play()
          }
        } else {
          marqueeTweenRef.current?.pause()
        }
      },
      { rootMargin: '100px 0px', threshold: 0.05 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [setIsSectionInView, isUserPaused])

  // Mobile: IntersectionObserver (threshold 0.6) to detect centered card for auto preview
  useEffect(() => {
    if (isDesktop || isPlaybackRestricted() || !carouselRegionRef.current) return

    const region = carouselRegionRef.current
    const itemElements = region.querySelectorAll<HTMLElement>('.hz-reels-item')
    if (!itemElements.length) return

    const centerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const reelId = entry.target.getAttribute('data-reel-id')
            if (reelId) {
              requestCardActivation(reelId, true)
            }
          }
        })
      },
      {
        root: region,
        threshold: 0.6,
      }
    )

    itemElements.forEach((el) => centerObserver.observe(el))
    return () => centerObserver.disconnect()
  }, [isDesktop, requestCardActivation])

  // Desktop: Shared Spotlight pointermove listener on the carousel region (requestAnimationFrame throttled)
  useEffect(() => {
    const region = carouselRegionRef.current
    if (!region || !isDesktop || isPlaybackRestricted()) return

    let rafId: number | null = null

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        const rect = region.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        region.style.setProperty('--spotlight-x', `${x}px`)
        region.style.setProperty('--spotlight-y', `${y}px`)
        rafId = null
      })
    }

    region.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      region.removeEventListener('pointermove', handlePointerMove)
    }
  }, [isDesktop])

  // Desktop GSAP Infinite Marquee on poster track
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || !isDesktop || isPlaybackRestricted()) return

    const ctx = gsap.context(() => {
      // 1. Header entrance
      const header = section.querySelector('.hz-reels-header')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 20 },
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

      // 2. Marquee translate tween (poster tiles only)
      const tween = gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: REELS_LOOP_DURATION,
        repeat: -1,
      })
      marqueeTweenRef.current = tween
      tween.pause()
    }, section)

    return () => {
      ctx.revert()
    }
  }, [isDesktop])

  // Desktop Hover: slow / pause marquee on hover, resume on leave
  const handleMouseEnter = () => {
    if (marqueeTweenRef.current && !isUserPaused && !isPlaybackRestricted()) {
      gsap.to(marqueeTweenRef.current, { timeScale: 0, duration: 0.35, ease: 'power1.out' })
    }
  }

  const handleMouseLeave = () => {
    deactivateCard()
    if (marqueeTweenRef.current && !isUserPaused && !isPlaybackRestricted()) {
      gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.35, ease: 'power1.out' })
    }
  }

  // User pause toggle
  const handleToggleUserPause = () => {
    setIsUserPaused((prev) => {
      const next = !prev
      if (next) {
        marqueeTweenRef.current?.pause()
        deactivateCard()
      } else {
        marqueeTweenRef.current?.play()
      }
      return next
    })
  }

  // Display items: On desktop, duplicate poster list once for seamless 50% loop.
  // On mobile, render exact list once with no duplicates.
  const displayItems = useMemo(() => {
    if (isDesktop) {
      return [...reels, ...reels]
    }
    return reels
  }, [isDesktop])

  if (!reels || reels.length === 0) return null

  return (
    <section
      id="reels"
      ref={sectionRef}
      className="hz-reels-section"
      aria-labelledby="reels-heading"
    >
      <div className="hz-reels-container">
        {/* Header */}
        <div className="hz-reels-header">
          <div className="hz-reels-header-left">
            <div className="hz-reels-eyebrow">
              <span className="hz-reels-eyebrow-line" />
              <span className="eyebrow">Our Reels</span>
            </div>

            <h2 id="reels-heading" className="h-section hz-reels-title">
              Moments from the <em className="accent">Kitchen</em>.
            </h2>

            <p className="lead hz-reels-subtitle">
              Sizzling woks, slow-simmered handi curries, and warm hospitality at Hestiia in Shyam Nagar, Kanpur.
            </p>
          </div>

          <div className="hz-reels-header-right">
            {/* Accessible Pause / Play Button */}
            <button
              type="button"
              onClick={handleToggleUserPause}
              className="hz-reels-toggle-btn"
              aria-label={isUserPaused ? 'Resume reels motion' : 'Pause reels motion'}
              title={isUserPaused ? 'Resume reels motion' : 'Pause reels motion'}
            >
              {isUserPaused ? (
                <>
                  <Play size={14} fill="currentColor" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause size={14} fill="currentColor" />
                  <span>Pause</span>
                </>
              )}
            </button>

            {/* Follow on Instagram Button */}
            <Button
              href={instagramProfileUrl}
              variant="primary"
              size="lg"
              icon={<InstagramIcon size={17} />}
              iconPosition="left"
              aria-label="Follow Hestiia Restaurant on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on Instagram
            </Button>
          </div>
        </div>
      </div>

      {/* Marquee Carousel Region (Desktop) / Scroll-Snap Track (Mobile) */}
      <div
        ref={carouselRegionRef}
        className="hz-reels-carousel-region"
        onMouseEnter={isDesktop ? handleMouseEnter : undefined}
        onMouseLeave={isDesktop ? handleMouseLeave : undefined}
        role="region"
        aria-label="Kitchen Reels Marquee"
      >
        {/* Shared Spotlight Overlay (Desktop only, 0 per-card gradients) */}
        <div className="hz-reels-shared-spotlight" aria-hidden="true" />

        <div ref={trackRef} className="hz-reels-track">
          {displayItems.map((reel, index) => {
            const isCardActive = activeCardId === reel.id
            const uniqueKey = `${reel.id}-${index}`

            return (
              <div
                key={uniqueKey}
                className="hz-reels-item"
                data-reel-id={reel.id}
              >
                <ReelCard
                  reel={reel}
                  isActive={isCardActive}
                  isDesktop={isDesktop}
                  onHover={() => requestCardActivation(reel.id, false)}
                  onLeave={() => deactivateCard(reel.id)}
                  onCardClick={() => openFullscreen(reel.id)}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Fullscreen Reel Viewer (ONE live video element in entire viewer) */}
      {fullscreenId && (
        <FullscreenViewer
          currentReelId={fullscreenId}
          allReels={reels}
          onClose={closeFullscreen}
          onSelectReel={(id) => openFullscreen(id)}
        />
      )}
    </section>
  )
}
