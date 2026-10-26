import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
  type PanInfo,
} from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { GALLERY_ITEMS, type GalleryItem } from '../../content/gallery'
import { track } from '../../lib/analytics'

interface RingDimensions {
  cardWidth: number
  cardHeight: number
  radius: number
  step: number
  maxTilt: number
  topPad: number
  containerHeight: number
  isMobile: boolean
}

function computeRingDimensions(width: number): RingDimensions {
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024

  if (isMobile) {
    // 78% to 85% of viewport width with neighbouring cards peeking in
    const cardWidth = Math.round(Math.min(Math.max(width * 0.80, 280), 340))
    const cardHeight = Math.round(cardWidth * 0.75) // 4:3 aspect ratio
    // Flatter radius for gentle curve, step chosen for ~65px peek
    const radius = 1600
    const step = 9.8 // deg
    const maxTilt = 12 // capped at ±12° on mobile
    return {
      cardWidth,
      cardHeight,
      radius,
      step,
      maxTilt,
      topPad: 10,
      containerHeight: cardHeight + 60, // cardHeight + 60px
      isMobile: true,
    }
  }

  if (isTablet) {
    // 440px to 500px wide
    const cardWidth = Math.round(Math.min(Math.max(width * 0.48, 440), 500))
    const cardHeight = Math.round(cardWidth * 0.75)
    const radius = 3200
    const step = 7.5 // deg
    const maxTilt = 15 // capped at ±15° on tablet
    return {
      cardWidth,
      cardHeight,
      radius,
      step,
      maxTilt,
      topPad: 14,
      containerHeight: cardHeight + 85, // cardHeight + 85px
      isMobile: false,
    }
  }

  // Desktop (1280px+): active center card about 620 to 700px wide (at 1.08 scale)
  // Base width 590px - 640px -> at 1.08 scale becomes 637px - 690px
  const cardWidth = Math.round(Math.min(Math.max(width * 0.42, 580), 640))
  const cardHeight = Math.round(cardWidth * 0.75)
  // Large radius for a gentle smile-shaped arc (vertical drop ~85-95px at 2nd card)
  const radius = 5200
  const step = 6.2 // deg
  const maxTilt = 18 // capped at ±18° on desktop
  return {
    cardWidth,
    cardHeight,
    radius,
    step,
    maxTilt,
    topPad: 16,
    containerHeight: cardHeight + 100, // cardHeight + 100px
    isMobile: false,
  }
}

/**
 * Individual Card on the Arc
 */
interface ArcCardProps {
  item: GalleryItem
  index: number
  total: number
  dims: RingDimensions
  smoothRotation: ReturnType<typeof useSpring>
  onCardClick: (item: GalleryItem) => void
  isDraggingRef: React.MutableRefObject<boolean>
  isInView: boolean
  prefersReducedMotion: boolean
}

function ArcCard({
  item,
  index,
  total,
  dims,
  smoothRotation,
  onCardClick,
  isDraggingRef,
  isInView,
  prefersReducedMotion,
}: ArcCardProps) {
  const { cardWidth, cardHeight, radius, step, maxTilt, topPad } = dims
  const totalSpan = total * step
  const halfSpan = totalSpan / 2

  // Derive the wrapped relative angle in [-halfSpan, halfSpan]
  const relAngle = useTransform(smoothRotation, (r: number) => {
    const raw = index * step + r
    return (((raw + halfSpan) % totalSpan) + totalSpan) % totalSpan - halfSpan
  })

  // Horizontal position along the arc: x = radius * sin(angle)
  const cardX = useTransform(relAngle, (deg: number) => {
    const rad = (deg * Math.PI) / 180
    return radius * Math.sin(rad)
  })

  // Vertical position along the arc: y = radius * (1 - cos(angle)) + topPad (gentle smile curve)
  const cardY = useTransform(relAngle, (deg: number) => {
    const rad = (deg * Math.PI) / 180
    return radius * (1 - Math.cos(rad)) + topPad
  })

  // Capped rotation: max ±18° on desktop, ±12° on mobile so cards never turn into diamonds
  const cardRotate = useTransform(relAngle, (deg: number) => {
    return Math.max(-maxTilt, Math.min(maxTilt, deg * 0.95))
  })

  // Scale: Active center card gets 1.08, neighbours get 0.92
  const cardScale = useTransform(relAngle, (deg: number) => {
    const abs = Math.abs(deg)
    if (abs <= step) {
      return 1.08 - (abs / step) * (1.08 - 0.92)
    }
    return 0.92
  })

  // Opacity: Center card gets 1.0, neighbours get 0.85. Don't dim further than that.
  // Only fade to 0 when near the wrapping boundary off-screen.
  const cardOpacity = useTransform(relAngle, (deg: number) => {
    const abs = Math.abs(deg)
    if (abs <= step) {
      return 1.0 - (abs / step) * (1.0 - 0.85)
    }
    if (abs > 3.0 * step) {
      return Math.max(0, 0.85 - ((abs - 3.0 * step) / (0.8 * step)) * 0.85)
    }
    return 0.85
  })

  // Z-Index: Center active card sits in front, side cards gently tuck behind
  const cardZIndex = useTransform(relAngle, (deg: number) => {
    return Math.round(100 - Math.abs(deg) * 2)
  })

  return (
    <motion.div
      className="gallery-ring-card-wrapper gallery-ring-card-positioner"
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{
        duration: 0.7,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        x: cardX,
        y: cardY,
        translateX: '-50%',
        rotate: cardRotate,
        scale: cardScale,
        opacity: cardOpacity,
        zIndex: cardZIndex,
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
      }}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={`Open photo of ${item.title}`}
        onClick={() => {
          if (!isDraggingRef.current) {
            onCardClick(item)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onCardClick(item)
          }
        }}
        whileHover={{
          scale: 1.04,
          y: -4,
          boxShadow: '0 0 32px rgba(184, 154, 100, 0.4), 0 24px 48px rgba(0,0,0,0.7)',
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#261F1A',
          border: '1px solid rgba(184, 154, 100, 0.32)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.5)',
          cursor: 'pointer',
          position: 'relative',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          <motion.img
            layoutId={`gallery-img-${item.id}`}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
          />
          {/* Subtle gradient overlay with title and zoom icon */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 48%, rgba(20, 16, 13, 0.88) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '16px 20px',
              pointerEvents: 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(15px, 1.5vw, 19px)',
                  fontWeight: 400,
                  color: '#FAF6EE',
                  letterSpacing: '0.01em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}
              >
                {item.title}
              </p>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(38, 31, 26, 0.75)',
                  border: '1px solid rgba(184, 154, 100, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: '8px',
                }}
              >
                <ZoomIn size={16} color="var(--color-brass)" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Main Rotating "Ring" Carousel using Framer Motion
 */
export default function GalleryRing() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const dragDistanceRef = useRef(0)
  const startRotationRef = useRef(0)
  const isPausedRef = useRef(false)
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const [containerWidth, setContainerWidth] = useState(1200)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )

  // Track scroll into view for entrance spin
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Measure container width with ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width)
        }
      }
    })
    ro.observe(containerRef.current)
    setContainerWidth(containerRef.current.clientWidth || window.innerWidth)
    return () => ro.disconnect()
  }, [])

  // Detect prefers-reduced-motion changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const dims = useMemo(() => computeRingDimensions(containerWidth), [containerWidth])
  const total = GALLERY_ITEMS.length
  const totalSpan = total * dims.step
  const halfSpan = totalSpan / 2

  // Rotation MotionValues: target drives spring, which drives the cards
  // Start rotated by 1.5 * step so it gently spins into center rest position
  const initialEntranceAngle = prefersReducedMotion ? 0 : dims.step * 1.5
  const rotationTarget = useMotionValue(initialEntranceAngle)
  const smoothRotation = useSpring(rotationTarget, {
    stiffness: 85,
    damping: 22,
    mass: 1,
  })

  // Entrance animation: when section scrolls into view (20%), spin to 0°
  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        rotationTarget.set(0)
      } else {
        animate(rotationTarget, 0, {
          duration: dims.isMobile ? 1.0 : 1.2,
          ease: [0.22, 1, 0.36, 1],
        })
      }
    }
  }, [isInView, prefersReducedMotion, rotationTarget, dims.isMobile])

  // Pause / resume auto-rotate helpers
  const pauseAutoRotate = useCallback(() => {
    isPausedRef.current = true
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
      pauseTimeoutRef.current = null
    }
  }, [])

  const resumeAutoRotateAfterDelay = useCallback((delayMs = 2000) => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false
    }, delayMs)
  }, [])

  // Slow ambient auto-rotate loop (paused on hover, drag, touch; resumes after 2s idle)
  useEffect(() => {
    if (prefersReducedMotion) return

    let animationFrameId: number
    const speed = dims.isMobile ? 0.016 : 0.024 // slow, majestic, ambient

    const tick = () => {
      if (!isPausedRef.current && !isDraggingRef.current && !selectedItem && isInView) {
        rotationTarget.set(rotationTarget.get() - speed)
      }
      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(animationFrameId)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    }
  }, [prefersReducedMotion, dims.isMobile, selectedItem, isInView, rotationTarget])

  // Sync active card index with the card closest to apex (0°)
  useEffect(() => {
    const unsubscribe = smoothRotation.on('change', (r: number) => {
      let minDiff = Infinity
      let closest = 0
      GALLERY_ITEMS.forEach((_, i) => {
        const raw = i * dims.step + r
        const rel = Math.abs((((raw + halfSpan) % totalSpan) + totalSpan) % totalSpan - halfSpan)
        if (rel < minDiff) {
          minDiff = rel
          closest = i
        }
      })
      setActiveIndex((prev) => (prev !== closest ? closest : prev))
    })
    return () => unsubscribe()
  }, [smoothRotation, dims.step, halfSpan, totalSpan])

  // Drag / swipe handling with Framer Motion pan gesture
  const handlePanStart = () => {
    pauseAutoRotate()
    isDraggingRef.current = false
    dragDistanceRef.current = 0
    startRotationRef.current = rotationTarget.get()
    setHasInteracted(true)
  }

  const handlePan = (_: unknown, info: PanInfo) => {
    dragDistanceRef.current += Math.abs(info.delta.x)
    if (dragDistanceRef.current > 6) {
      isDraggingRef.current = true
      setIsDragging(true)
    }
    // Natural drag sensitivity: roughly 1 card per swipe
    const sensitivity = dims.step / (dims.cardWidth * 0.42)
    rotationTarget.set(startRotationRef.current + info.offset.x * sensitivity)
  }

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false)
    const sensitivity = dims.step / (dims.cardWidth * 0.42)
    // Inertia on release
    const velocityInertia = info.velocity.x * sensitivity * 0.16
    const projected = rotationTarget.get() + velocityInertia
    // Gently snap to nearest card
    const nearestSnap = Math.round(projected / dims.step) * dims.step

    animate(rotationTarget, nearestSnap, {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    })

    // Reset isDragging after brief timeout to avoid triggering click
    setTimeout(() => {
      isDraggingRef.current = false
    }, 80)

    resumeAutoRotateAfterDelay(2000)
  }

  // Mouse wheel horizontal scroll on desktop
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      pauseAutoRotate()
      setHasInteracted(true)
      const current = rotationTarget.get()
      const sensitivity = dims.step * 0.012
      rotationTarget.set(current - e.deltaX * sensitivity)
      resumeAutoRotateAfterDelay(2000)
    }
  }

  // Keyboard left / right arrows
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      pauseAutoRotate()
      setHasInteracted(true)
      const current = rotationTarget.get()
      const snapped = Math.round(current / dims.step) * dims.step
      animate(rotationTarget, snapped + dims.step, { duration: 0.5, ease: [0.22, 1, 0.36, 1] })
      resumeAutoRotateAfterDelay(2000)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      pauseAutoRotate()
      setHasInteracted(true)
      const current = rotationTarget.get()
      const snapped = Math.round(current / dims.step) * dims.step
      animate(rotationTarget, snapped - dims.step, { duration: 0.5, ease: [0.22, 1, 0.36, 1] })
      resumeAutoRotateAfterDelay(2000)
    }
  }

  // Lightbox handlers
  const openLightbox = (item: GalleryItem, triggerEl?: HTMLElement) => {
    if (triggerEl) triggerRef.current = triggerEl
    setSelectedItem(item)
    pauseAutoRotate()
    track('gallery_open', { image_id: item.id })
  }

  const closeLightbox = useCallback(() => {
    setSelectedItem(null)
    resumeAutoRotateAfterDelay(1500)
    if (triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [resumeAutoRotateAfterDelay])

  const currentLightboxIndex = selectedItem
    ? GALLERY_ITEMS.findIndex((i) => i.id === selectedItem.id)
    : -1

  const handlePrevImage = useCallback(() => {
    if (currentLightboxIndex > 0) {
      setSelectedItem(GALLERY_ITEMS[currentLightboxIndex - 1])
    } else {
      setSelectedItem(GALLERY_ITEMS[GALLERY_ITEMS.length - 1])
    }
  }, [currentLightboxIndex])

  const handleNextImage = useCallback(() => {
    if (currentLightboxIndex < GALLERY_ITEMS.length - 1) {
      setSelectedItem(GALLERY_ITEMS[currentLightboxIndex + 1])
    } else {
      setSelectedItem(GALLERY_ITEMS[0])
    }
  }, [currentLightboxIndex])

  // Esc key and lightbox arrow navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedItem) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') handlePrevImage()
      if (e.key === 'ArrowRight') handleNextImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedItem, closeLightbox, handlePrevImage, handleNextImage])

  const activeItem = GALLERY_ITEMS[activeIndex] || GALLERY_ITEMS[0]

  return (
    <div
      ref={containerRef}
      className="gallery-ring-container"
      tabIndex={0}
      role="region"
      aria-label="Interactive 3D Ring Photo Gallery"
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      onMouseEnter={pauseAutoRotate}
      onMouseLeave={() => resumeAutoRotateAfterDelay(1500)}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        outline: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* 3D Viewport with Perspective and pan-y to never block vertical page scrolling */}
      <motion.div
        className="gallery-ring-viewport"
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{
          position: 'relative',
          width: '100%',
          height: `${dims.containerHeight}px`,
          overflow: 'hidden',
          touchAction: 'pan-y', // Critical: vertical page scroll is never blocked
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {GALLERY_ITEMS.map((item, index) => (
          <ArcCard
            key={item.id}
            item={item}
            index={index}
            total={total}
            dims={dims}
            smoothRotation={smoothRotation}
            onCardClick={(clicked) => openLightbox(clicked)}
            isDraggingRef={isDraggingRef}
            isInView={isInView}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </motion.div>

      {/* Synchronized Caption of Active Card below the Ring with tight 24px gap */}
      <div
        className="gallery-active-caption-area"
        style={{
          textAlign: 'center',
          marginTop: dims.isMobile ? '16px' : '24px',
          minHeight: '62px',
          padding: '0 16px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                letterSpacing: '0.01em',
              }}
            >
              {activeItem.title}
            </p>
            <p
              style={{
                margin: '6px auto 0',
                maxWidth: '520px',
                fontSize: '13px',
                fontFamily: 'var(--font-sans)',
                color: 'rgba(246, 239, 228, 0.65)',
                lineHeight: 1.5,
              }}
            >
              {activeItem.alt}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Drag / Swipe Hint with gentle looping nudge until first interaction */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '14px',
          paddingBottom: '8px',
        }}
      >
        <motion.span
          animate={hasInteracted || prefersReducedMotion ? { x: 0 } : { x: [-5, 5, -5] }}
          transition={{
            repeat: hasInteracted || prefersReducedMotion ? 0 : Infinity,
            duration: 2.4,
            ease: 'easeInOut',
          }}
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(246, 239, 228, 0.52)',
            display: 'inline-block',
          }}
        >
          ← Drag or Swipe to Browse Photos →
        </motion.span>
      </div>

      {/* Lightbox Dialog (AnimatePresence + layoutId shared-element transition) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(15, 12, 10, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: dims.isMobile ? '16px' : '32px',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              autoFocus
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(38, 31, 26, 0.8)',
                border: '1px solid rgba(184, 154, 100, 0.3)',
                color: 'var(--color-text-inverse)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10010,
                transition: 'transform 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)'
                e.currentTarget.style.backgroundColor = 'rgba(184, 154, 100, 0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.backgroundColor = 'rgba(38, 31, 26, 0.8)'
              }}
            >
              <X size={24} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevImage()
              }}
              aria-label="Previous Image"
              style={{
                position: 'absolute',
                left: dims.isMobile ? '12px' : '28px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(38, 31, 26, 0.85)',
                border: '1px solid rgba(184, 154, 100, 0.35)',
                color: 'var(--color-brass)',
                borderRadius: '50%',
                width: dims.isMobile ? '42px' : '50px',
                height: dims.isMobile ? '42px' : '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10010,
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              }}
            >
              <ChevronLeft size={dims.isMobile ? 22 : 28} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNextImage()
              }}
              aria-label="Next Image"
              style={{
                position: 'absolute',
                right: dims.isMobile ? '12px' : '28px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(38, 31, 26, 0.85)',
                border: '1px solid rgba(184, 154, 100, 0.35)',
                color: 'var(--color-brass)',
                borderRadius: '50%',
                width: dims.isMobile ? '42px' : '50px',
                height: dims.isMobile ? '42px' : '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10010,
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              }}
            >
              <ChevronRight size={dims.isMobile ? 22 : 28} />
            </button>

            {/* Lightbox Image Preview with swipe-down to close */}
            <motion.div
              key={selectedItem.id}
              onClick={(e) => e.stopPropagation()}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                // Swipe down to close on touch / mouse
                if (info.offset.y > 90 || info.velocity.y > 350) {
                  closeLightbox()
                }
              }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                maxWidth: '92vw',
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                touchAction: 'none',
              }}
            >
              <motion.img
                layoutId={`gallery-img-${selectedItem.id}`}
                src={selectedItem.src}
                alt={selectedItem.alt}
                width={selectedItem.width}
                height={selectedItem.height}
                style={{
                  maxWidth: '100%',
                  maxHeight: '74vh',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.85)',
                  border: '1px solid rgba(184, 154, 100, 0.3)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ marginTop: '16px', textAlign: 'center', maxWidth: '640px' }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(20px, 2.4vw, 26px)',
                    color: 'var(--color-text-inverse)',
                    fontWeight: 300,
                  }}
                >
                  {selectedItem.title}
                </p>
                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)',
                    color: 'rgba(246, 239, 228, 0.65)',
                    lineHeight: 1.5,
                  }}
                >
                  {selectedItem.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
