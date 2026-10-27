import { useState, useEffect, useRef, useCallback } from 'react'

// Concurrency gate: max 3 carousels actively auto-advancing at the same time
let activeAutoCarouselsCount = 0
const MAX_CONCURRENT_CAROUSELS = 3

interface UseAutoCarouselOptions {
  itemCount: number
  intervalMs?: number
  resumeDelayMs?: number
  enabled?: boolean
}

export function useAutoCarousel({
  itemCount,
  intervalMs = 3800,
  resumeDelayMs = 6000,
  enabled = true,
}: UseAutoCarouselOptions) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)

  const isReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  // Determine if this carousel has permission to auto-advance
  const hasConcurrencySlotRef = useRef(false)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoAdvanceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Sync activeIndex with scroll position
  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track || itemCount <= 1) return

    const scrollLeft = track.scrollLeft
    const card = track.children[0] as HTMLElement | undefined
    if (!card) return

    const cardWidth = card.offsetWidth
    const gap = 16 // approximate track gap
    const step = cardWidth + gap
    if (step <= 0) return

    const index = Math.round(scrollLeft / step)
    const clamped = Math.max(0, Math.min(itemCount - 1, index))
    setActiveIndex(clamped)
  }, [itemCount])

  // Scroll to a specific card smoothly
  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track || itemCount <= 1) return

      const targetCard = track.children[index] as HTMLElement | undefined
      if (!targetCard) return

      // Center card or align nicely within track
      const trackWidth = track.clientWidth
      const cardWidth = targetCard.offsetWidth
      const cardLeft = targetCard.offsetLeft
      const targetScroll = cardLeft - (trackWidth - cardWidth) / 2

      track.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      })
      setActiveIndex(index)
    },
    [itemCount]
  )

  const advanceNext = useCallback(() => {
    setActiveIndex(prev => {
      const next = (prev + 1) % itemCount
      scrollToIndex(next)
      return next
    })
  }, [itemCount, scrollToIndex])

  // Mark user interaction and set 6s resume timer
  const onUserInteraction = useCallback(() => {
    setIsUserInteracting(true)
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false)
    }, resumeDelayMs)
  }, [resumeDelayMs])

  // IntersectionObserver to detect when in viewport
  useEffect(() => {
    const track = trackRef.current
    if (!track || !enabled || isReducedMotion) return

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.3
        setIsInViewport(visible)
      },
      { threshold: [0, 0.3, 0.5] }
    )

    observer.observe(track)
    return () => observer.disconnect()
  }, [enabled, isReducedMotion])

  // Concurrency slot management
  useEffect(() => {
    if (isInViewport && enabled && !isReducedMotion) {
      if (!hasConcurrencySlotRef.current && activeAutoCarouselsCount < MAX_CONCURRENT_CAROUSELS) {
        activeAutoCarouselsCount++
        hasConcurrencySlotRef.current = true
      }
    } else {
      if (hasConcurrencySlotRef.current) {
        activeAutoCarouselsCount = Math.max(0, activeAutoCarouselsCount - 1)
        hasConcurrencySlotRef.current = false
      }
    }

    return () => {
      if (hasConcurrencySlotRef.current) {
        activeAutoCarouselsCount = Math.max(0, activeAutoCarouselsCount - 1)
        hasConcurrencySlotRef.current = false
      }
    }
  }, [isInViewport, enabled, isReducedMotion])

  // Auto-advance loop
  useEffect(() => {
    if (
      !enabled ||
      isReducedMotion ||
      itemCount <= 1 ||
      !isInViewport ||
      isUserInteracting ||
      isManuallyPaused ||
      !hasConcurrencySlotRef.current ||
      (typeof document !== 'undefined' && document.hidden)
    ) {
      if (autoAdvanceIntervalRef.current) {
        clearInterval(autoAdvanceIntervalRef.current)
        autoAdvanceIntervalRef.current = null
      }
      return
    }

    autoAdvanceIntervalRef.current = setInterval(() => {
      advanceNext()
    }, intervalMs)

    return () => {
      if (autoAdvanceIntervalRef.current) {
        clearInterval(autoAdvanceIntervalRef.current)
        autoAdvanceIntervalRef.current = null
      }
    }
  }, [
    enabled,
    isReducedMotion,
    itemCount,
    isInViewport,
    isUserInteracting,
    isManuallyPaused,
    intervalMs,
    advanceNext,
  ])

  // Document visibility change listener
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && autoAdvanceIntervalRef.current) {
        clearInterval(autoAdvanceIntervalRef.current)
        autoAdvanceIntervalRef.current = null
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Event listeners for touch, mouse, wheel, focus
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    track.addEventListener('scroll', handleScroll, { passive: true })
    track.addEventListener('touchstart', onUserInteraction, { passive: true })
    track.addEventListener('mousedown', onUserInteraction, { passive: true })
    track.addEventListener('wheel', onUserInteraction, { passive: true })
    track.addEventListener('focusin', onUserInteraction)

    return () => {
      track.removeEventListener('scroll', handleScroll)
      track.removeEventListener('touchstart', onUserInteraction)
      track.removeEventListener('mousedown', onUserInteraction)
      track.removeEventListener('wheel', onUserInteraction)
      track.removeEventListener('focusin', onUserInteraction)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [handleScroll, onUserInteraction])

  const togglePause = useCallback(() => {
    setIsManuallyPaused(prev => !prev)
  }, [])

  return {
    trackRef,
    activeIndex,
    scrollToIndex,
    isPaused: isManuallyPaused || isUserInteracting || isReducedMotion,
    togglePause,
  }
}
