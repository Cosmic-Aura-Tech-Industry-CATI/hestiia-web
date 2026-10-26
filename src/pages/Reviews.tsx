import { useState, useEffect } from 'react'
import { Star, ExternalLink, Edit3, X, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RATINGS } from '../content/ratings'
import { RESTAURANT } from '../content/restaurant'
import { reviewsService } from '../services/reviews.service'
import type { ReviewItem, CreateReviewDto } from '../types/api'

export default function Reviews() {
  useDocumentMeta(
    'Guest Reviews & Verified Ratings | Hestiia',
    'Read verified dining reviews and ratings for Hestiia Restaurant in Shyam Nagar, Kanpur across Google, Zomato, EazyDiner, and Justdial.'
  )

  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reviewForm, setReviewForm] = useState<CreateReviewDto>({
    customerName: '',
    rating: 5,
    comment: '',
    dishName: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSuccess, setSubmittedSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const googleWriteReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJXQe5b0X_vDsR3bK2mCq0PBI'
  const googleViewAllUrl = RESTAURANT.platforms.googleMaps

  useEffect(() => {
    reviewsService
      .getApprovedReviews()
      .then((data) => setReviews(data))
      .catch(() => {})
  }, [])

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!reviewForm.customerName.trim() || !reviewForm.comment.trim()) {
      setErrorMsg('Please enter your name and a brief review of your dining experience.')
      return
    }

    try {
      setIsSubmitting(true)
      const res = await reviewsService.submitReview(reviewForm)
      if (res.success) {
        setSubmittedSuccess(true)
        setReviewForm({ customerName: '', rating: 5, comment: '', dishName: '' })
      } else {
        setErrorMsg(res.message || 'Unable to submit review. Please try again.')
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        title="Verified Guest"
        accentWord="Impressions"
        intro="Authentic community reviews and verified ratings from dining platforms across Kanpur."
        currentPage="Reviews"
      />

      {/* 1. Platform Ratings Grid */}
      <section style={{ padding: '64px 0 48px', backgroundColor: '#1A1410' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
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
              Independent Platform Ratings
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: 0,
              }}
            >
              Our Community <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Scorecard</em>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {[
              { name: 'Google Reviews', rating: 4.6, count: '1,200+ Verified Diners', score: '4.6 / 5.0' },
              { name: 'Zomato Dining', rating: RATINGS.find((r) => r.platform === 'Zomato')?.score || 4.4, count: '164+ Delivery & Dining', score: '4.4 / 5.0' },
              { name: 'EazyDiner', rating: RATINGS.find((r) => r.platform === 'EazyDiner')?.score || 4.2, count: '733+ Reviews', score: 'Top Choice' },
              { name: 'Pure Vegetarian', rating: 5.0, count: '100% Satvik Kitchen', score: 'Kanpur Standard' },
            ].map((p, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px 20px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(38, 31, 26, 0.75)',
                  border: '1px solid rgba(184, 154, 100, 0.2)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-brass)', marginBottom: '4px' }}>
                  {p.rating} ★
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#F6EFE4', marginBottom: '4px' }}>
                  {p.name}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.6)' }}>
                  {p.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Diner Testimonials & Live Submissions */}
      <section style={{ padding: '64px 0 80px', backgroundColor: '#16110E' }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div>
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
                Verified Guest Quotes
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  fontWeight: 300,
                  color: 'var(--color-text-inverse)',
                  margin: 0,
                }}
              >
                Words from <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Our Diners</em>
              </h2>
            </div>

            <button
              onClick={() => {
                setIsModalOpen(true)
                setSubmittedSuccess(false)
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-brass)',
                color: '#16110E',
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <Edit3 size={15} />
              <span>Share Your Dining Experience</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            {reviews.map((r) => (
              <div
                key={r.id}
                style={{
                  padding: '28px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(38, 31, 26, 0.75)',
                  border: '1px solid rgba(184, 154, 100, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', color: 'var(--color-brass)', marginBottom: '12px' }}>
                    {[...Array(r.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--color-brass)" stroke="var(--color-brass)" />
                    ))}
                  </div>

                  <blockquote
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-serif)',
                      fontSize: '17px',
                      lineHeight: 1.6,
                      color: 'var(--color-text-inverse)',
                      fontStyle: 'italic',
                    }}
                  >
                    “{r.comment}”
                  </blockquote>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(184, 154, 100, 0.12)',
                    fontSize: '12px',
                  }}
                >
                  <span style={{ color: '#F6EFE4', fontWeight: 600 }}>{r.customerName}</span>
                  {r.dishName && <span style={{ color: 'var(--color-brass)' }}>Fav: {r.dishName}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            <a
              href={googleWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '6px',
                backgroundColor: 'rgba(38, 31, 26, 0.8)',
                border: '1px solid rgba(184, 154, 100, 0.35)',
                color: 'var(--color-text-inverse)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <Edit3 size={15} color="var(--color-brass)" />
              <span>Review on Google Maps</span>
            </a>

            <a
              href={googleViewAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '6px',
                backgroundColor: 'rgba(38, 31, 26, 0.8)',
                border: '1px solid rgba(184, 154, 100, 0.35)',
                color: 'var(--color-text-inverse)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={15} color="var(--color-brass)" />
              <span>View All Google Reviews</span>
            </a>
          </div>
        </div>
      </section>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(10, 8, 6, 0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#191410',
              borderRadius: '16px',
              border: '1px solid rgba(184, 154, 100, 0.3)',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'rgba(246, 239, 228, 0.6)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            {submittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={48} color="#4ADE80" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#F6EFE4', margin: '0 0 10px' }}>
                  Thank You for Your Feedback!
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.8)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Your review has been submitted to the Hestiiya hospitality team and will be published following moderation.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-brass)',
                    border: 'none',
                    color: '#16110E',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--color-text-inverse)', margin: '0 0 8px' }}>
                  Leave a Dining Review
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.65)', margin: '0 0 20px' }}>
                  Help fellow diners discover Kanpur's premier pure vegetarian delicacies.
                </p>

                {errorMsg && (
                  <div style={{ color: '#F87171', fontSize: '12px', marginBottom: '14px' }}>
                    {errorMsg}
                  </div>
                )}

                {/* Star Rating Picker */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '8px' }}>
                    Your Rating
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: s })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                      >
                        <Star
                          size={24}
                          fill={s <= reviewForm.rating ? 'var(--color-brass)' : 'transparent'}
                          stroke={s <= reviewForm.rating ? 'var(--color-brass)' : 'rgba(246, 239, 228, 0.4)'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikas Gupta"
                    value={reviewForm.customerName}
                    onChange={(e) => setReviewForm({ ...reviewForm, customerName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#120E0C',
                      border: '1px solid rgba(184, 154, 100, 0.3)',
                      color: '#F6EFE4',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Favorite Dish */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                    Dish You Ordered (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Paneer Lababdar, Dal Makhani"
                    value={reviewForm.dishName}
                    onChange={(e) => setReviewForm({ ...reviewForm, dishName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#120E0C',
                      border: '1px solid rgba(184, 154, 100, 0.3)',
                      color: '#F6EFE4',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Comment */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                    Your Experience & Comments *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share what you loved about our food, ambience, or service..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#120E0C',
                      border: '1px solid rgba(184, 154, 100, 0.3)',
                      color: '#F6EFE4',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-brass)',
                    border: 'none',
                    color: '#16110E',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  {isSubmitting ? 'Posting Review...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. Closing CTA Band */}
      <PageClosingCta
        title="Experience the Quality for"
        accentWord="Yourself"
        subtitle="Join our community of satisfied diners at Shyam Nagar, Kanpur."
      />
    </>
  )
}
