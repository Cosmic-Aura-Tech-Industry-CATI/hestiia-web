import { Link } from 'react-router-dom'
import {
  Leaf,
  UtensilsCrossed,
  Users,
  ArrowRight,
  Sparkles,
  PartyPopper,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Music,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import BrandIntro from '../components/BrandIntro'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RESTAURANT } from '../content/restaurant'

import diningExpImg from '../assets/images/dining_experience.jpg'
import interiorImg from '../assets/images/restaurant_interior.jpg'
import thaliImg from '../assets/images/hero_thali.jpg'
import paneerImg from '../assets/images/paneer_butter_masala.jpg'
import dalImg from '../assets/images/dal_makhani.jpg'

export default function About() {
  useDocumentMeta(
    'Our Story & Dining Experience — Hestiia Restaurant',
    'Discover Hestiia in Shyam Nagar, Kanpur. 100% pure vegetarian dining, warm family hospitality, comfortable seating booths, and private gathering spaces.'
  )

  return (
    <>
      <PageHero
        title="Our Story &"
        accentWord="Hospitality"
        intro="Good food, pure ingredients, and real family moments in the heart of Shyam Nagar, Kanpur."
        currentPage="Our Story"
      />

      {/* 1. Core Brand Story with GSAP Visual Reveal */}
      <BrandIntro />

      {/* 2. Kitchen Truths & Pure Veg Promise (Visual Cards with Food Imagery) */}
      <section
        style={{
          padding: ' clamp(56px, 7vw, 84px) 0',
          backgroundColor: '#16110E',
          borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              The Hestiia Kitchen Promise
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(30px, 4vw, 46px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: '0 auto 12px',
              }}
            >
              Pure Food, Made with <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Love & Care</em>
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(246, 239, 228, 0.75)', maxWidth: '600px', margin: '0 auto' }}>
              We cook the way you would cook for family — fresh ingredients, strict vegetarian discipline, and unhurried authentic flavours.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {/* Card 1: 100% Shuddh Shakahari */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
            >
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={thaliImg}
                  alt="Certified Pure Vegetarian Thali at Hestiia"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(22, 17, 14, 0.95) 100%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(47, 125, 79, 0.9)',
                    color: '#FFFFFF',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <ShieldCheck size={14} />
                  100% Pure Veg
                </span>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-text-inverse)', margin: '0 0 10px' }}>
                    Zero Non-Veg Compromise
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                    Strictly pure vegetarian kitchen without any eggs, meat, or non-veg cross-contamination. Complete peace of mind for you and your family.
                  </p>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#4ADE80', fontSize: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={15} />
                  <span>Certified Pure Vegetarian Sanctuary</span>
                </div>
              </div>
            </div>

            {/* Card 2: Fresh Artisanal Paneer & Authentic Gravies */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
            >
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={paneerImg}
                  alt="Slow-cooked rich gravies and fresh paneer at Hestiia"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  position-style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(22, 17, 14, 0.95) 100%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(184, 154, 100, 0.9)',
                    color: '#1F1A16',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Sparkles size={14} />
                  Fresh Daily
                </span>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-text-inverse)', margin: '0 0 10px' }}>
                    Fresh Paneer & Real Spices
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                    We source velvety fresh paneer every morning, blend whole roasted spices in-house, and simmer our rich shahi gravies slowly for unmatched taste.
                  </p>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-brass)', fontSize: '12px', fontWeight: 600 }}>
                  <UtensilsCrossed size={15} />
                  <span>193 Handcrafted Menu Specialties</span>
                </div>
              </div>
            </div>

            {/* Card 3: Jain & Custom Adaptations */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
            >
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={dalImg}
                  alt="Jain and custom dietary preparations at Hestiia"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(22, 17, 14, 0.95) 100%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(38, 31, 26, 0.9)',
                    color: 'var(--color-brass-light)',
                    border: '1px solid rgba(184, 154, 100, 0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Leaf size={14} color="#4ADE80" />
                  Jain & Vegan Friendly
                </span>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-text-inverse)', margin: '0 0 10px' }}>
                    Cooked Your Way
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                    Looking for food without onion and garlic? Or mild curries for young kids and elders? Our kitchen happily prepares customized food just for you.
                  </p>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-brass-light)', fontSize: '12px', fontWeight: 600 }}>
                  <Sparkles size={15} />
                  <span>No Onion / No Garlic Options Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Complete Dining & Seating Experience (Merged Feature) */}
      <section
        id="experience"
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#1A1410',
          borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              Warm Hospitality & Ambiance
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4vw, 50px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: '0 auto 14px',
              }}
            >
              The Dining <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Experience</em>
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(246, 239, 228, 0.75)', maxWidth: '620px', margin: '0 auto' }}>
              From cozy private booths to warm golden chandelier lighting, our restaurant in Shyam Nagar is designed for comfortable, unhurried meals.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {/* Experience Card 1: Family Booths */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '220px' }}>
                <img
                  src={interiorImg}
                  alt="Comfortable family booth seating at Hestiia Kanpur"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(26, 20, 16, 0.9) 100%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '18px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                    backgroundColor: 'rgba(52, 168, 83, 0.2)',
                    color: '#4ADE80',
                    border: '1px solid rgba(52, 168, 83, 0.4)',
                  }}
                >
                  Confirmed Seating
                </span>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--color-text-inverse)', margin: '0 0 8px' }}>
                    Spacious Family Booths
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                    Generous 4-to-8 seater cushioned booths and family tables. Enough room for thalis, appetizers, and easy conversation across generations.
                  </p>
                </div>
                <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-brass)', fontSize: '13px' }}>
                  <Users size={16} />
                  <span>Groups from 4 to 25+ warmly welcomed</span>
                </div>
              </div>
            </div>

            {/* Experience Card 2: Private Gathering & Celebration Enclave */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '220px' }}>
                <img
                  src={diningExpImg}
                  alt="Private dining and celebration enclave at Hestiia"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(26, 20, 16, 0.9) 100%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '18px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                    backgroundColor: 'rgba(184, 154, 100, 0.2)',
                    color: 'var(--color-brass-light)',
                    border: '1px solid rgba(184, 154, 100, 0.4)',
                  }}
                >
                  Private Space Available
                </span>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--color-text-inverse)', margin: '0 0 8px' }}>
                    Private Dining & Kitty Enclaves
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                    Planning a birthday dinner, anniversary, or ladies' kitty party? We provide dedicated secluded seating with personalized group care.
                  </p>
                </div>
                <div style={{ marginTop: '18px' }}>
                  <Link
                    to="/party"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--color-brass)',
                      textDecoration: 'none',
                    }}
                  >
                    <span>View Party Details & Enquire</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Experience Card 3: Peaceful Ambience & Acoustic Evenings */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '220px', backgroundColor: '#130E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(184, 154, 100, 0.25) 0%, rgba(19, 14, 11, 0.95) 100%)`,
                  }}
                />
                <div style={{ position: 'relative', textAlign: 'center', zIndex: 1, padding: '20px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(184, 154, 100, 0.15)',
                      border: '1px solid rgba(184, 154, 100, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      color: 'var(--color-brass)',
                    }}
                  >
                    <Music size={28} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--color-text-inverse)' }}>
                    Soft Acoustic Melodies
                  </span>
                </div>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '18px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                    backgroundColor: 'rgba(184, 154, 100, 0.2)',
                    color: 'var(--color-brass-light)',
                    border: '1px solid rgba(184, 154, 100, 0.4)',
                  }}
                >
                  Weekend Evenings
                </span>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--color-text-inverse)', margin: '0 0 8px' }}>
                    Relaxed Atmosphere
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                    No loud distractions. Just warm golden lighting, peaceful acoustic music, and attentive table service that helps you unwind after a long day.
                  </p>
                </div>
                <div style={{ marginTop: '18px' }}>
                  <a
                    href={`tel:${RESTAURANT.phone.e164}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--color-brass)',
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={14} />
                    <span>Call Desk for Live Music Timings</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Celebrations & Party Banner */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 72px) 0',
          backgroundColor: '#16110E',
          borderTop: '1px solid rgba(184, 154, 100, 0.15)',
        }}
      >
        <div className="container">
          <div
            style={{
              padding: 'clamp(28px, 4vw, 44px)',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(46, 36, 29, 0.95) 0%, rgba(31, 26, 22, 0.98) 100%)',
              border: '1px solid rgba(184, 154, 100, 0.35)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <PartyPopper size={20} color="var(--color-brass)" />
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass)',
                  }}
                >
                  Family Gatherings & Celebrations
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(26px, 3.5vw, 36px)',
                  fontWeight: 300,
                  color: 'var(--color-text-inverse)',
                  margin: '0 0 10px',
                  lineHeight: 1.25,
                }}
              >
                Planning a Birthday, Kitty Party, or Anniversary?
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(246, 239, 228, 0.8)', margin: 0 }}>
                Let Hestiia host your special moments with customized pure vegetarian buffet spreads, beautiful table decor, and devoted hospitality for groups up to 25+ guests.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to="/party"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-brass)',
                  color: '#1F1A16',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 4px 18px rgba(184, 154, 100, 0.25)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Explore Party Packages</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA Band */}
      <PageClosingCta
        title="Come Dine with Us in"
        accentWord="Shyam Nagar"
        subtitle="Reserve your family table in advance or drop by anytime between 11:00 AM and 11:00 PM."
      />
    </>
  )
}
