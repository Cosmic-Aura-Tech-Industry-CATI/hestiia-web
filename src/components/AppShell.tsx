'use client'

import { useState, useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { smoothScroller } from '../lib/lenis'
import Preloader from './Preloader'
import Navbar from './Navbar'
import Footer from './Footer'
import { CartDrawer } from './cart/CartDrawer'
import ScrollProgressBar from './ui/ScrollProgressBar'
import FloatingActionBar from './ui/FloatingActionBar'
import BlobCursor from './reactbits/BlobCursor'
import BackToTop from './ui/BackToTop'
import AutoHideActionBar from './ui/AutoHideActionBar'
import { CartProvider } from '../context/CartContext'
import { RestaurantProvider } from '../context/RestaurantContext'
import { SiteReadyProvider } from '../context/SiteReadyContext'

if (typeof window !== 'undefined') {
  ;(window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger
  ScrollTrigger.config({ ignoreMobileResize: true })
  ScrollTrigger.normalizeScroll(false)
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const pathname = usePathname()

  const onPreloaderComplete = useCallback(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    // Initialize Lenis smooth scroll provider synced with GSAP
    smoothScroller.init()

    return () => {
      smoothScroller.destroy()
    }
  }, [])

  useEffect(() => {
    if (ready) {
      ScrollTrigger.refresh()
    }
  }, [ready])

  // On route change: scroll to top using lenis/smoothScroller API, refresh ScrollTrigger
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    smoothScroller.scrollTo(0, { duration: 0.1 })

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    let orientationTimer: ReturnType<typeof setTimeout> | null = null
    const handleOrientationChange = () => {
      if (orientationTimer) clearTimeout(orientationTimer)
      orientationTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 250)
    }

    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      clearTimeout(refreshTimer)
      if (orientationTimer) clearTimeout(orientationTimer)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [pathname])

  return (
    <RestaurantProvider>
      <CartProvider>
        <SiteReadyProvider isReady={ready}>
          {/* Session-cached Curtain Split Preloader (< 1.5s) */}
          <AnimatePresence mode="wait">
            {!ready && (
              <Preloader key="preloader" onComplete={onPreloaderComplete} />
            )}
          </AnimatePresence>

          {/* Main Experience Shell */}
          <div className={ready ? 'site-ready' : 'site-loading'}>
            {/* Scroll Reading Progress Bar */}
            <ScrollProgressBar />

            {/* Desktop Fluid Blob Cursor */}
            <BlobCursor />

            {/* Accessibility Skip Link */}
            <a href="#main-content" className="sr-only" style={{ position: 'absolute', zIndex: 9999 }}>
              Skip to main content
            </a>

            {/* Shared Layout: Sticky Header Navigation */}
            <Navbar />

            {/* Interactive Cart Drawer */}
            <CartDrawer />

            {/* Main Content Area with Light Fade Page Transition (opacity only, 0.25s) */}
            <main id="main-content" style={{ minHeight: '60vh' }}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {children}
              </motion.div>
            </main>

            {/* Shared Layout: Footer */}
            <Footer />

            {/* Back to top button */}
            <BackToTop />

            {/* Shared Layout: Mobile Floating Action Bar */}
            <AutoHideActionBar>
              <FloatingActionBar />
            </AutoHideActionBar>
          </div>
        </SiteReadyProvider>
      </CartProvider>
    </RestaurantProvider>
  )
}
