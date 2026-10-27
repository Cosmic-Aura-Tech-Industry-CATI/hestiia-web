import React from 'react'
import { Play, Pause } from 'lucide-react'
import { useAutoCarousel } from '../../hooks/useAutoCarousel'
import './snap-carousel.css'

interface SnapCarouselProps {
  children: React.ReactNode
  itemCount: number
  ariaLabel: string
  className?: string
  trackClassName?: string
  desktopWrapperClassName?: string
}

export default function SnapCarousel({
  children,
  itemCount,
  ariaLabel,
  className = '',
  trackClassName = '',
  desktopWrapperClassName = '',
}: SnapCarouselProps) {
  const { trackRef, activeIndex, scrollToIndex, isPaused, togglePause } = useAutoCarousel({
    itemCount,
    intervalMs: 3800,
  })

  return (
    <section
      className={`snap-carousel ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      {/* Wrapper that acts as grid on desktop and flex-snap track on mobile/tablet */}
      <div className={desktopWrapperClassName}>
        <div
          ref={trackRef}
          className={`snap-carousel__track ${trackClassName}`}
        >
          {children}
        </div>
      </div>

      {/* Dots and Accessible Pause/Play controls for Mobile/Tablet (< 1024px) */}
      {itemCount > 1 && (
        <div className="snap-carousel__controls" aria-label="Carousel controls">
          <div className="snap-carousel__dots" role="tablist" aria-label="Slides">
            {Array.from({ length: itemCount }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activeIndex === idx}
                aria-label={`Go to slide ${idx + 1} of ${itemCount}`}
                className={`snap-carousel__dot ${activeIndex === idx ? 'snap-carousel__dot--active' : ''}`}
                onClick={() => scrollToIndex(idx)}
              />
            ))}
          </div>

          <button
            type="button"
            className="snap-carousel__pause-btn"
            onClick={togglePause}
            aria-label={isPaused ? 'Resume auto-advance' : 'Pause auto-advance'}
          >
            {isPaused ? <Play size={11} aria-hidden="true" /> : <Pause size={11} aria-hidden="true" />}
            <span>{isPaused ? 'Play' : 'Pause'}</span>
          </button>
        </div>
      )}
    </section>
  )
}
