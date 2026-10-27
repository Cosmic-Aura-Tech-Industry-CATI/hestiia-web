import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Checks for user preferences that forbid or restrict auto video playback:
 * - prefers-reduced-motion: reduce
 * - navigator.connection.saveData: true
 */
export function isPlaybackRestricted(): boolean {
  if (typeof window === 'undefined') return true
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const nav = navigator as unknown as { connection?: { saveData?: boolean } }
  const saveData = nav.connection?.saveData === true
  return reducedMotion || saveData
}

/**
 * Releases HTML5 video element decoder memory cleanly:
 * pauses, removes source attribute, and triggers load() to clear native buffers.
 */
export function releaseVideoMemory(video: HTMLVideoElement | null | undefined): void {
  if (!video) return
  try {
    video.pause()
    video.removeAttribute('src')
    // Clear child <source> elements if any exist
    while (video.firstChild) {
      video.removeChild(video.firstChild)
    }
    video.load()
  } catch {
    // Non-fatal if video is already torn down
  }
}

interface UseReelPlayerOptions {
  hoverDelay?: number // ms to wait before activating hovered reel (default 300ms)
}

export function useReelPlayer(options: UseReelPlayerOptions = {}) {
  const { hoverDelay = 300 } = options

  // Active preview card ID (null if no card is previewing)
  const [activeCardId, setActiveCardId] = useState<string | null>(null)

  // Fullscreen viewer ID (null if closed)
  const [fullscreenId, setFullscreenId] = useState<string | null>(null)

  // Section visibility tracking
  const [isSectionInView, setIsSectionInView] = useState<boolean>(false)

  // Debounce timer ref for hover preview
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clear hover timer
  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }, [])

  // Request to activate a card (e.g. desktop hover with 300ms delay)
  const requestCardActivation = useCallback(
    (reelId: string, immediate: boolean = false) => {
      clearHoverTimer()

      if (isPlaybackRestricted() || fullscreenId !== null) {
        return
      }

      if (immediate) {
        setActiveCardId(reelId)
      } else {
        hoverTimerRef.current = setTimeout(() => {
          setActiveCardId(reelId)
        }, hoverDelay)
      }
    },
    [clearHoverTimer, fullscreenId, hoverDelay]
  )

  // Deactivate card preview
  const deactivateCard = useCallback(
    (reelId?: string) => {
      clearHoverTimer()
      setActiveCardId((prev) => {
        if (!reelId || prev === reelId) {
          return null
        }
        return prev
      })
    },
    [clearHoverTimer]
  )

  // Open fullscreen viewer (immediately unmounts preview card video)
  const openFullscreen = useCallback(
    (reelId: string) => {
      clearHoverTimer()
      setActiveCardId(null)
      setFullscreenId(reelId)
    },
    [clearHoverTimer]
  )

  // Close fullscreen viewer
  const closeFullscreen = useCallback(() => {
    setFullscreenId(null)
  }, [])

  // When tab becomes hidden, or section leaves view, clear card preview
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        clearHoverTimer()
        setActiveCardId(null)
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [clearHoverTimer])

  // When section leaves view, clear preview video
  useEffect(() => {
    if (!isSectionInView) {
      clearHoverTimer()
      setActiveCardId(null)
    }
  }, [isSectionInView, clearHoverTimer])

  // Rule: When fullscreen viewer is active, card preview video is strictly null.
  const effectiveActiveCardId = fullscreenId ? null : activeCardId

  return {
    activeCardId: effectiveActiveCardId,
    fullscreenId,
    isSectionInView,
    setIsSectionInView,
    requestCardActivation,
    deactivateCard,
    openFullscreen,
    closeFullscreen,
    isRestricted: isPlaybackRestricted(),
  }
}
