import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollRefresh() {
  useEffect(() => {
    // 1. Initial paint refresh
    const initialTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    // 2. Fonts ready refresh
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    // 3. Debounced orientation / resize refresh
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    }

    window.addEventListener('orientationchange', handleResize)
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(initialTimer)
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('orientationchange', handleResize)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}
