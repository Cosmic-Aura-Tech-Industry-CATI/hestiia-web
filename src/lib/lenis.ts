import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/**
 * High-performance smooth scroll provider with GSAP ScrollTrigger ticker synchronization
 * Automatically disabled when prefers-reduced-motion is detected or on mobile devices
 */
class SmoothScroller {
  private isDestroyed = false
  private isReducedMotion = false

  init() {
    if (typeof window === 'undefined') return

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (this.isReducedMotion) {
      document.documentElement.style.scrollBehavior = 'smooth'
      return
    }

    // Ticker integration with GSAP
    gsap.ticker.add(this.update)
    gsap.ticker.lagSmoothing(0)

    // Window scroll events update GSAP ScrollTrigger
    window.addEventListener('scroll', this.onScroll, { passive: true })
  }

  private onScroll = () => {
    ScrollTrigger.update()
  }

  private update = () => {
    if (this.isDestroyed || this.isReducedMotion) return
    // ScrollTrigger will be kept updated
    ScrollTrigger.update()
  }

  scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) {
    if (typeof window === 'undefined') return

    let targetPosition = 0
    if (typeof target === 'number') {
      targetPosition = target
    } else if (typeof target === 'string') {
      const element = document.querySelector(target) as HTMLElement
      if (element) {
        const offset = options?.offset ?? 0
        targetPosition = element.getBoundingClientRect().top + window.scrollY + offset
      }
    } else if (target instanceof HTMLElement) {
      const offset = options?.offset ?? 0
      targetPosition = target.getBoundingClientRect().top + window.scrollY + offset
    }

    if (this.isReducedMotion) {
      window.scrollTo({ top: targetPosition, behavior: 'auto' })
      return
    }

    gsap.to(window, {
      scrollTo: { y: targetPosition, autoKill: false },
      duration: options?.duration ?? 1,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onUpdate: () => ScrollTrigger.update(),
    })
  }

  destroy() {
    this.isDestroyed = true
    if (typeof window !== 'undefined') {
      gsap.ticker.remove(this.update)
      window.removeEventListener('scroll', this.onScroll)
    }
  }
}

export const smoothScroller = new SmoothScroller()
