import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { smoothScroller } from '../lib/lenis'
import ScrollProgressBar from '../components/ui/ScrollProgressBar'
import FloatingActionBar from '../components/ui/FloatingActionBar'
import BlobCursor from '../components/reactbits/BlobCursor'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CartDrawer } from '../components/cart/CartDrawer'
import BackToTop from '../components/ui/BackToTop'
import AutoHideActionBar from '../components/ui/AutoHideActionBar'

if (typeof window !== 'undefined') {
  ;(window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger
}

export default function MainLayout() {
  const location = useLocation()

  // On route change: scroll to top using lenis/smoothScroller API, refresh ScrollTrigger
  useEffect(() => {
    // Reset scroll position immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    smoothScroller.scrollTo(0, { duration: 0.1 })

    // Refresh GSAP ScrollTrigger after new page DOM has painted
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)

    return () => {
      clearTimeout(refreshTimer)
    }
  }, [location.pathname])

  return (
    <>
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
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Layout: Footer */}
      <Footer />

      {/* Back to top button */}
      <BackToTop />

      {/* Shared Layout: Mobile Floating Action Bar */}
      <AutoHideActionBar>
        <FloatingActionBar />
      </AutoHideActionBar>
    </>
  )
}
