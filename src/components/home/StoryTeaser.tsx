import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import interiorImg from '../../assets/images/restaurant_interior.jpg'
import RevealImage from '../reactbits/RevealImage'
import SplitText from '../reactbits/SplitText'
import ScrollReveal from '../reactbits/ScrollReveal'
import DrawLine from '../reactbits/DrawLine'
import Magnet from '../reactbits/Magnet'
import ClickSpark from '../reactbits/ClickSpark'
import './story-teaser.css'

export default function StoryTeaser() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section
      className="story-teaser section section-dark section-ambient-glow"
      aria-labelledby="story-teaser-title"
    >
      <div className="container">
        <div className="story-teaser__grid">
          {/* Floating Gold Ornament (Drifting slowly on desktop) */}
          <div className="story-teaser__ornament" aria-hidden="true">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="44" strokeDasharray="3 3" opacity="0.6" />
              <path d="M50 8 L50 92 M8 50 L92 50" opacity="0.5" />
              <path d="M50 20 L58 42 L80 50 L58 58 L50 80 L42 58 L20 50 L42 42 Z" fill="currentColor" fillOpacity="0.15" />
              <circle cx="50" cy="50" r="4" fill="currentColor" />
            </svg>
          </div>

          {/* 1 Photo: RevealImage with clip wipe left-to-right, inner scale settle & desktop parallax */}
          <div className="story-teaser__image-col">
            <RevealImage
              src={interiorImg}
              alt="Hestiia Restaurant Dining Sanctuary Interior in Shyam Nagar, Kanpur"
              aspectRatio="4/3"
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(31, 26, 22, 0.6) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
            </RevealImage>
          </div>

          {/* 60-word text + Title line reveal + DrawLine + ScrollReveal + Magnet/ClickSpark Button */}
          <div className="story-teaser__content-col">
            <span className="story-teaser__eyebrow">
              Our Philosophy · Kanpur
            </span>

            {/* SplitText Line Reveal for Title */}
            <SplitText
              as="h2"
              className="story-teaser__title"
              delay={0.1}
              stagger={0.06}
            >
              A Sanctuary of Pure Vegetarian Heritage.
            </SplitText>

            {/* Gold DrawLine under Title */}
            <DrawLine
              color="var(--color-brass, #B89A64)"
              height="2px"
              origin="left"
              duration={1.0}
              style={{ width: '68px', margin: '14px 0 20px 0' }}
            />

            {/* Existing ScrollReveal word-by-word (import unchanged) */}
            <ScrollReveal className="story-teaser__body">
              Rooted in Shyam Nagar, Hestiia is a certified pure vegetarian dining sanctuary where slow-simmered culinary traditions meet calm hospitality. Our kitchen honors authentic North Indian recipes, wok-tossed Indo-Chinese specialities, and hand-kneaded tandoori breads, crafted purely with cold-pressed oils, rich dairy, and fresh garden herbs for peaceful family feasts.
            </ScrollReveal>

            {/* Button: Magnet on desktop + ClickSpark on click */}
            <div className="story-teaser__btn-wrap">
              <Magnet disabled={isMobile} strength={0.25} padding={28}>
                <ClickSpark sparkColor="var(--color-brass, #B89A64)" sparkCount={8}>
                  <Link
                    to="/about"
                    className="btn btn-outline story-teaser__btn"
                    aria-label="Read our story about Hestiia pure vegetarian restaurant in Kanpur"
                  >
                    <span>Read Our Story</span>
                    <ArrowRight size={14} className="story-btn__arrow" />
                  </Link>
                </ClickSpark>
              </Magnet>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
