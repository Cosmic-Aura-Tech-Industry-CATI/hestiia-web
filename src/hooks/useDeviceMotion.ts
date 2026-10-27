import { useState, useEffect } from 'react'

export interface DeviceMotionState {
  isTouch: boolean
  isDesktop: boolean
  isMobile: boolean
  isTablet: boolean
  reduceMotion: boolean
}

function getDeviceMotionState(): DeviceMotionState {
  if (typeof window === 'undefined') {
    return {
      isTouch: false,
      isDesktop: true,
      isMobile: false,
      isTablet: false,
      reduceMotion: false,
    }
  }

  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const isMobileQuery = window.matchMedia('(max-width: 767px)').matches
  const isTabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return {
    isTouch: !hasFinePointer,
    isDesktop: !isMobileQuery && !isTabletQuery && hasFinePointer,
    isMobile: isMobileQuery,
    isTablet: isTabletQuery,
    reduceMotion: reduceMotionQuery,
  }
}

export function useDeviceMotion(): DeviceMotionState {
  const [state, setState] = useState<DeviceMotionState>(getDeviceMotionState)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateState = () => {
      setState(getDeviceMotionState())
    }

    pointerQuery.addEventListener('change', updateState)
    mobileQuery.addEventListener('change', updateState)
    tabletQuery.addEventListener('change', updateState)
    motionQuery.addEventListener('change', updateState)
    window.addEventListener('resize', updateState)

    return () => {
      pointerQuery.removeEventListener('change', updateState)
      mobileQuery.removeEventListener('change', updateState)
      tabletQuery.removeEventListener('change', updateState)
      motionQuery.removeEventListener('change', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [])

  return state
}
