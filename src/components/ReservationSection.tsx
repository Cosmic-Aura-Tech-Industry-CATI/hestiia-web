import { useState } from 'react'
import { Phone, MapPin, ExternalLink, Calendar, Navigation, CheckCircle2 } from 'lucide-react'
import ClickSpark from './reactbits/ClickSpark'
import { InstagramIcon } from './icons/InstagramIcon'
import { RESTAURANT } from '../content/restaurant'
import { RESERVATION_PROVIDERS } from '../content/reservations'
import { bookingsService } from '../services/bookings.service'
import type { CreateBookingDto } from '../types/api'

export default function ReservationSection() {
  const [formData, setFormData] = useState<CreateBookingDto>({
    customerName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '08:00 PM',
    guests: '2 Guests',
    occasion: 'Dinner',
    specialRequests: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number for table coordination.')
      return
    }

    try {
      setIsSubmitting(true)
      const res = await bookingsService.createBooking(formData)
      if (res.success && res.booking) {
        setSubmittedBooking(res.booking)
      } else {
        setErrorMsg(res.message || 'Unable to confirm booking. Please call the restaurant desk directly.')
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred. Please call restaurant desk.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="reservation-section section" id="visit" aria-labelledby="visit-title" style={{ backgroundColor: '#1F1A16', borderTop: '1px solid rgba(184, 154, 100, 0.15)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(40px, 6vw, 60px)', alignItems: 'start' }}>
          {/* Left Column: Direct Table Reservation Form */}
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
                marginBottom: '12px',
              }}
            >
              Direct Reservations & Dining
            </span>

            <h2
              id="visit-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: 'var(--color-text-inverse)',
                marginBottom: '16px',
              }}
            >
              Reserve Your Table <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>With Our Host.</em>
            </h2>

            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(246, 239, 228, 0.75)', marginBottom: '24px' }}>
              Book your pure vegetarian dining experience directly with our kitchen desk, or use our official partner platforms below.
            </p>

            {submittedBooking ? (
              <div
                style={{
                  backgroundColor: 'rgba(52, 168, 83, 0.12)',
                  border: '1px solid rgba(52, 168, 83, 0.4)',
                  borderRadius: '12px',
                  padding: '28px',
                  textAlign: 'center',
                  marginBottom: '28px',
                }}
              >
                <CheckCircle2 size={38} color="#4ADE80" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#F6EFE4', margin: '0 0 8px' }}>
                  Table Reservation Request Received!
                </h4>
                <p style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.8)', margin: '0 0 16px', lineHeight: 1.6 }}>
                  Thank you, <strong>{submittedBooking.customerName}</strong>. Our host has received your request for{' '}
                  <strong>{submittedBooking.guests}</strong> on <strong>{submittedBooking.date}</strong> at{' '}
                  <strong>{submittedBooking.time}</strong>.
                </p>
                <button
                  onClick={() => setSubmittedBooking(null)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--color-brass)',
                    color: 'var(--color-brass)',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleBookingSubmit}
                style={{
                  backgroundColor: 'rgba(38, 31, 26, 0.8)',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 154, 100, 0.25)',
                  padding: '24px',
                  marginBottom: '28px',
                }}
              >
                {errorMsg && (
                  <div style={{ color: '#F87171', fontSize: '12px', marginBottom: '12px' }}>
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '4px' }}>
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amit Verma"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#16110E',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '4px' }}>
                      Phone (for confirmation) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#16110E',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '4px' }}>
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#16110E',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '12px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '4px' }}>
                      Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#16110E',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '12px',
                        outline: 'none',
                      }}
                    >
                      <option value="12:30 PM">Lunch — 12:30 PM</option>
                      <option value="01:30 PM">Lunch — 01:30 PM</option>
                      <option value="02:30 PM">Lunch — 02:30 PM</option>
                      <option value="07:00 PM">Dinner — 07:00 PM</option>
                      <option value="08:00 PM">Dinner — 08:00 PM</option>
                      <option value="09:00 PM">Dinner — 09:00 PM</option>
                      <option value="10:00 PM">Dinner — 10:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '4px' }}>
                      Party Size
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#16110E',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '12px',
                        outline: 'none',
                      }}
                    >
                      <option value="2 Guests">2 Guests (Table)</option>
                      <option value="4 Guests">4 Guests (Family)</option>
                      <option value="6 Guests">6 Guests (Group)</option>
                      <option value="8+ Guests">8+ Guests (Celebration)</option>
                      <option value="15+ Guests">15+ Guests (Private Area)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--color-brass)',
                    border: 'none',
                    color: '#16110E',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  {isSubmitting ? 'Confirming with Host...' : 'Request Table Reservation'}
                </button>
              </form>
            )}

            {/* Provider Buttons with ClickSpark */}
            <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-brass)', marginBottom: '10px' }}>
              Or Reserve via Partner Apps
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {RESERVATION_PROVIDERS.map((provider) => (
                <ClickSpark key={provider.id} sparkColor="var(--color-brass-light)">
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${provider.label} (opens in new tab)`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      backgroundColor: 'rgba(38, 31, 26, 0.7)',
                      color: 'var(--color-text-inverse)',
                      border: '1px solid rgba(184, 154, 100, 0.2)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={15} color="var(--color-brass)" />
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{provider.label}</span>
                    </div>
                    <ExternalLink size={14} color="var(--color-brass)" />
                  </a>
                </ClickSpark>
              ))}
            </div>
          </div>

          {/* Right Column: Location, Contact & Hours Card */}
          <div
            style={{
              padding: '36px',
              backgroundColor: 'rgba(38, 31, 26, 0.85)',
              borderRadius: '12px',
              border: '1px solid rgba(184, 154, 100, 0.2)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300, color: 'var(--color-text-inverse)', margin: '0 0 24px' }}>
              Find & Contact Us
            </h3>

            {/* Address */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
              <MapPin size={20} color="var(--color-brass)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div>
                <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-brass)', marginBottom: '4px' }}>
                  Address
                </span>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--color-text-inverse)', lineHeight: 1.5 }}>
                  {RESTAURANT.address.line1} <br />
                  {RESTAURANT.address.locality}, {RESTAURANT.address.city} <br />
                  {RESTAURANT.address.state} — {RESTAURANT.address.postalCode}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
              <Phone size={20} color="var(--color-brass)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div>
                <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-brass)', marginBottom: '4px' }}>
                  Direct Phone & Enquiries
                </span>
                <a
                  href={`tel:${RESTAURANT.phone.e164}`}
                  style={{
                    fontSize: '16px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    color: 'var(--color-brass-light)',
                    textDecoration: 'none',
                  }}
                >
                  {RESTAURANT.phone.display}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div style={{ marginBottom: '32px' }}>
              <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-brass)', marginBottom: '4px' }}>
                Service Hours
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: 'rgba(246, 239, 228, 0.7)' }}>
                {RESTAURANT.hours.displayText}
              </p>
            </div>

            {/* Actions: Directions + Instagram */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={RESTAURANT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: 'rgba(184, 154, 100, 0.15)',
                  border: '1px solid rgba(184, 154, 100, 0.3)',
                  color: 'var(--color-brass-light)',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <Navigation size={15} />
                <span>Get Directions</span>
              </a>

              <a
                href={RESTAURANT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(184, 154, 100, 0.2)',
                  color: 'var(--color-text-inverse)',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  textDecoration: 'none',
                }}
              >
                <InstagramIcon size={15} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
