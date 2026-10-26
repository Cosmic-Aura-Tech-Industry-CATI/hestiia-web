import { useState, useEffect, useRef } from 'react'

interface AutoHideActionBarProps {
  children: React.ReactNode
}

export default function AutoHideActionBar({ children }: AutoHideActionBarProps) {
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollYRef.current

      // If near top, always show
      if (currentScrollY <= 80) {
        setIsHidden(false)
      } else if (delta > 12) {
        // Scrolling down -> hide
        setIsHidden(true)
      } else if (delta < -8) {
        // Scrolling up -> show
        setIsHidden(false)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        transform: isHidden ? 'translateY(130%)' : 'translateY(0%)',
        transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: isHidden ? 'none' : 'auto',
      }}
    >
      {children}
    </div>
  )
}
