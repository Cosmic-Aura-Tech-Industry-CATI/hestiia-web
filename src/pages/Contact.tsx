import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Wallet,
  Navigation,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Send,
  UtensilsCrossed,
  PartyPopper,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RESTAURANT } from '../content/restaurant'
import { InstagramIcon } from '../components/icons/InstagramIcon'
import { bookingsService } from '../services/bookings.service'
import { partyService } from '../services/party.service'
import type { CreateBookingDto, BookingConfirmationDetails, CreatePartyInquiryDto } from '../types/api'
import { BookingPassModal } from '../components/BookingPassModal'

export default function Contact() {
  useDocumentMeta(
    'Visit & Reserve a Table | Contact Details',
    'Reserve a table at Hestiia Restaurant in Shyam Nagar, Kanpur. Direct online table booking, directions, operating hours 11 AM to 11 PM, and party dining assistance.'
  )

  const [searchParams] = useSearchParams()
  const initialMode = searchParams.get('type') === 'party' ? 'party' : 'table'
  const [bookingMode, setBookingMode] = useState<'table' | 'party'>(initialMode)

  useEffect(() => {
    if (searchParams.get('type') === 'party' || window.location.hash === '#party-form') {
      setBookingMode('party')
    }
  }, [searchParams])

  // 1. Table Reservation State
  const [formData, setFormData] = useState<CreateBookingDto>({
    customerName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '08:00 PM',
    guests: '4 Guests',
    occasion: 'Family Dinner',
    specialRequests: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null)
  const [activePass, setActivePass] = useState<BookingConfirmationDetails | null>(null)
  const [isPassModalOpen, setIsPassModalOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // 2. Party & Banquet Inquiry State
  const [partyFormData, setPartyFormData] = useState<CreatePartyInquiryDto>({
    customerName: '',
    phone: '',
    email: '',
    eventType: 'birthday',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    guestCount: 25,
    budgetRange: '₹500 – ₹750 per guest',
    specialRequirements: '',
  })
  const [isPartySubmitting, setIsPartySubmitting] = useState(false)
  const [submittedPartyInquiry, setSubmittedPartyInquiry] = useState<any | null>(null)
  const [partyErrorMsg, setPartyErrorMsg] = useState<string | null>(null)

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your full name and contact number.')
      return
    }

    try {
      setIsSubmitting(true)
      const res = await bookingsService.createBooking(formData)
      if (res.success && res.booking) {
        setSubmittedBooking(res.booking)
        const confirmationData: BookingConfirmationDetails = res.confirmation || {
          id: res.booking.id,
          bookingRef: res.booking.bookingRef || `HST-TB-RES-${res.booking.id.slice(-4)}`,
          customerName: res.booking.customerName,
          phone: res.booking.phone,
          email: res.booking.email,
          date: res.booking.date,
          time: res.booking.time,
          guests: res.booking.guests,
          occasion: res.booking.occasion,
          specialRequests: res.booking.specialRequests,
          status: res.booking.status,
          allocatedTable: res.booking.allocatedTable,
          holdPolicy: res.booking.holdPolicy || 'Table is held for 15 minutes beyond your reserved time slot before release.',
          restaurantDetails: {
            name: 'Hestiia Restaurant & Fine Dine',
            tagline: 'Pure Vegetarian Culinary Sanctuary',
            phone: '078808 40622',
            address: '1-B, Ram Puram, Shyam Nagar',
            city: 'Kanpur, Uttar Pradesh 208013',
            landmark: 'Opp. PAC Morh, Shyam Nagar',
            mapQuery: 'Hestiia+Restaurant+Shyam+Nagar+Kanpur',
          },
          createdAt: res.booking.createdAt,
        }
        setActivePass(confirmationData)
        setIsPassModalOpen(true)
      } else {
        setErrorMsg(res.message || 'Unable to register table booking. Please call our desk directly.')
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred. Please call restaurant desk or chat on WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePartySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPartyErrorMsg(null)

    if (!partyFormData.customerName.trim() || !partyFormData.phone.trim()) {
      setPartyErrorMsg('Please enter your full name and contact number.')
      return
    }

    try {
      setIsPartySubmitting(true)
      const res = await partyService.createInquiry(partyFormData)
      if (res.success && res.inquiry) {
        setSubmittedPartyInquiry(res.inquiry)
      } else {
        setPartyErrorMsg(res.message || 'Unable to register celebration inquiry. Please call our desk directly.')
      }
    } catch (err: any) {
      setPartyErrorMsg(err.message || 'Network error occurred. Please call banquet desk directly or chat on WhatsApp.')
    } finally {
      setIsPartySubmitting(false)
    }
  }

  // Map embed URL with address query (no API key required)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    'Hestiia Restaurant, 1-B, Ram Puram, Shyam Nagar, Kanpur, Uttar Pradesh 208013'
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`

  return (
    <>
      <PageHero
        title="Visit & Reserve at"
        accentWord="Hestiia"
        intro="Reserve your pure vegetarian dining table in Shyam Nagar, Kanpur, get live directions, or connect directly with our host."
        currentPage="Visit & Reserve"
      />

      <section
        id="reserve-form"
        style={{
          padding: '64px 0 80px',
          backgroundColor: '#16110E',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              marginBottom: '56px',
              alignItems: 'start',
            }}
          >
            {/* 1. Direct Table Reservation Form (Connected to Backend) */}
            <div
              style={{
                padding: 'clamp(28px, 4vw, 36px)',
                borderRadius: '16px',
                backgroundColor: 'rgba(38, 31, 26, 0.85)',
                border: '1px solid rgba(184, 154, 100, 0.3)',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Segmented Switcher: Table Reservation vs Party & Banquets */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  padding: '6px',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 154, 100, 0.25)',
                  marginBottom: '26px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setBookingMode('table')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: bookingMode === 'table' ? 700 : 500,
                    letterSpacing: '0.03em',
                    transition: 'all 0.25s ease',
                    background:
                      bookingMode === 'table'
                        ? 'linear-gradient(135deg, var(--color-brass), var(--color-brass-light))'
                        : 'transparent',
                    color: bookingMode === 'table' ? '#16110E' : 'rgba(246, 239, 228, 0.75)',
                    boxShadow:
                      bookingMode === 'table' ? '0 4px 14px rgba(184, 154, 100, 0.3)' : 'none',
                  }}
                >
                  <UtensilsCrossed size={16} />
                  <span>Table Dining (1–8)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingMode('party')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: bookingMode === 'party' ? 700 : 500,
                    letterSpacing: '0.03em',
                    transition: 'all 0.25s ease',
                    background:
                      bookingMode === 'party'
                        ? 'linear-gradient(135deg, var(--color-brass), var(--color-brass-light))'
                        : 'transparent',
                    color: bookingMode === 'party' ? '#16110E' : 'rgba(246, 239, 228, 0.75)',
                    boxShadow:
                      bookingMode === 'party' ? '0 4px 14px rgba(184, 154, 100, 0.3)' : 'none',
                  }}
                >
                  <PartyPopper size={16} />
                  <span>Parties & Banquets (10–200+)</span>
                </button>
              </div>

              {bookingMode === 'table' ? (
                <>
                  <div style={{ marginBottom: '24px' }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--color-brass)',
                        marginBottom: '8px',
                      }}
                    >
                      Instant Table Seating
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(26px, 3.5vw, 36px)',
                        fontWeight: 300,
                        color: 'var(--color-text-inverse)',
                        margin: '0 0 10px',
                      }}
                    >
                      Reserve Your <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Table</em>
                    </h2>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                      Fill in your details below for prompt seating confirmation by our table host.
                    </p>
                  </div>

              {submittedBooking ? (
                <div
                  style={{
                    backgroundColor: 'rgba(52, 168, 83, 0.12)',
                    border: '1px solid rgba(52, 168, 83, 0.4)',
                    borderRadius: '12px',
                    padding: '28px',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2 size={44} color="#4ADE80" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#F6EFE4', margin: '0 0 8px' }}>
                    Table Request Received!
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.85)', margin: '0 0 16px', lineHeight: 1.6 }}>
                    Thank you, <strong>{submittedBooking.customerName}</strong>. Your request for{' '}
                    <strong>{submittedBooking.guests}</strong> on <strong>{submittedBooking.date}</strong> at{' '}
                    <strong>{submittedBooking.time}</strong> has been sent to our desk. Our table manager will confirm shortly.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {activePass && (
                      <button
                        type="button"
                        onClick={() => setIsPassModalOpen(true)}
                        style={{
                          background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                          color: '#000',
                          padding: '10px 22px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        View VIP Dining Pass
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setIsPassModalOpen(false)
                        setSubmittedBooking(null)
                        setActivePass(null)
                        setFormData({
                          customerName: '',
                          phone: '',
                          email: '',
                          date: new Date().toISOString().split('T')[0],
                          time: '08:00 PM',
                          guests: '4 Guests',
                          occasion: 'Family Dinner',
                          specialRequests: '',
                        })
                      }}
                      style={{
                        background: 'none',
                        border: '1px solid var(--color-brass)',
                        color: 'var(--color-brass)',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Reserve Another Table
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  {errorMsg && (
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.35)',
                        color: '#FCA5A5',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '18px',
                      }}
                    >
                      <AlertCircle size={16} style={{ flexShrink: 0 }} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Guest Name <span style={{ color: '#F59E0B', fontWeight: 700 }}>* (Required)</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Phone Number <span style={{ color: '#F59E0B', fontWeight: 700 }}>* (Required)</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter 10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Date, Time Slot, Party Size */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Time Slot *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box',
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
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Guests *
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      >
                        <option value="2 Guests">2 Guests (Couple Table)</option>
                        <option value="4 Guests">4 Guests (Family Table)</option>
                        <option value="6 Guests">6 Guests (Booth)</option>
                        <option value="8+ Guests">8+ Guests (Large Table)</option>
                        <option value="15+ Guests">15+ Guests (Private Area)</option>
                      </select>
                    </div>
                  </div>

                  {/* Occasion & Special Requests */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '22px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Occasion
                      </label>
                      <select
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      >
                        <option value="Family Dinner">Family Dinner</option>
                        <option value="Casual Lunch">Casual Lunch</option>
                        <option value="Birthday Celebration">Birthday Celebration</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Kitty Party">Kitty Party</option>
                        <option value="Business Lunch">Business Lunch</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Special Requests (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jain food, baby chair, quiet corner"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-brass)',
                      border: 'none',
                      color: '#16110E',
                      fontSize: '13px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      boxShadow: '0 4px 18px rgba(184, 154, 100, 0.28)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    {isSubmitting ? 'Sending Request to Host...' : 'Confirm Table Reservation Request'}
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass)',
                    marginBottom: '8px',
                  }}
                >
                  Banquets & Celebrations
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(26px, 3.5vw, 36px)',
                    fontWeight: 300,
                    color: 'var(--color-text-inverse)',
                    margin: '0 0 10px',
                  }}
                >
                  Plan Your <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Celebration</em>
                </h2>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(246, 239, 228, 0.75)', margin: 0 }}>
                  Private banquet hall, curated pure vegetarian catering menus, and bespoke event arrangements.
                </p>
              </div>

              {submittedPartyInquiry ? (
                <div
                  style={{
                    backgroundColor: 'rgba(52, 168, 83, 0.12)',
                    border: '1px solid rgba(52, 168, 83, 0.4)',
                    borderRadius: '12px',
                    padding: '28px',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2 size={44} color="#4ADE80" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#F6EFE4', margin: '0 0 8px' }}>
                    Celebration Inquiry Received!
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.85)', margin: '0 0 16px', lineHeight: 1.6 }}>
                    Thank you, <strong>{submittedPartyInquiry.customerName}</strong>. Your banquet request for{' '}
                    <strong>{submittedPartyInquiry.guestCount} Guests</strong> on{' '}
                    <strong>{submittedPartyInquiry.preferredDate || 'your selected date'}</strong> has been registered.
                    Our banquet manager will call you at <strong>{submittedPartyInquiry.phone}</strong> to coordinate your custom menu.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                      href={`https://wa.me/917880840622?text=${encodeURIComponent(
                        `Hello Hestiia Banquet Team, I have submitted a celebration inquiry for ${submittedPartyInquiry.customerName} (${submittedPartyInquiry.eventType}, ${submittedPartyInquiry.guestCount} guests). Please share custom banquet menus and packages.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#25D366',
                        color: '#000',
                        padding: '10px 22px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      <MessageSquare size={16} />
                      Chat on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedPartyInquiry(null)
                        setPartyFormData({
                          customerName: '',
                          phone: '',
                          email: '',
                          eventType: 'birthday',
                          preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
                          guestCount: 25,
                          budgetRange: '₹500 – ₹750 per guest',
                          specialRequirements: '',
                        })
                      }}
                      style={{
                        background: 'none',
                        border: '1px solid var(--color-brass)',
                        color: 'var(--color-brass)',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Plan Another Event
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePartySubmit}>
                  {partyErrorMsg && (
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.35)',
                        color: '#FCA5A5',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '18px',
                      }}
                    >
                      <AlertCircle size={16} style={{ flexShrink: 0 }} />
                      <span>{partyErrorMsg}</span>
                    </div>
                  )}

                  {/* Host Name & Contact Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Host / Organizer Name <span style={{ color: '#F59E0B', fontWeight: 700 }}>* (Required)</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={partyFormData.customerName}
                        onChange={(e) => setPartyFormData({ ...partyFormData, customerName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Contact Phone Number <span style={{ color: '#F59E0B', fontWeight: 700 }}>* (Required)</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter 10-digit mobile number"
                        value={partyFormData.phone}
                        onChange={(e) => setPartyFormData({ ...partyFormData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Email & Event Type */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Email Address <span style={{ color: 'rgba(246, 239, 228, 0.45)', fontSize: '11px' }}>(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={partyFormData.email}
                        onChange={(e) => setPartyFormData({ ...partyFormData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Occasion / Event Type
                      </label>
                      <select
                        value={partyFormData.eventType}
                        onChange={(e) => setPartyFormData({ ...partyFormData, eventType: e.target.value as any })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      >
                        <option value="birthday" style={{ backgroundColor: '#1A1410', color: '#F6EFE4' }}>🎂 Birthday Party</option>
                        <option value="anniversary" style={{ backgroundColor: '#1A1410', color: '#F6EFE4' }}>💍 Wedding Anniversary</option>
                        <option value="corporate" style={{ backgroundColor: '#1A1410', color: '#F6EFE4' }}>💼 Corporate Lunch / Meeting</option>
                        <option value="family_gathering" style={{ backgroundColor: '#1A1410', color: '#F6EFE4' }}>👨‍👩‍👧‍👦 Family Reunion / Banquet</option>
                        <option value="other" style={{ backgroundColor: '#1A1410', color: '#F6EFE4' }}>✨ Kitty Party / Celebration</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date & Estimated Guests */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Preferred Event Date
                      </label>
                      <input
                        type="date"
                        value={partyFormData.preferredDate}
                        onChange={(e) => setPartyFormData({ ...partyFormData, preferredDate: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                        Estimated Guests (10 to 200+)
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={250}
                        value={partyFormData.guestCount}
                        onChange={(e) => setPartyFormData({ ...partyFormData, guestCount: Number(e.target.value) || 10 })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#16110E',
                          border: '1px solid rgba(184, 154, 100, 0.35)',
                          color: '#F6EFE4',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Package / Budget Preference */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                      Catering Package / Per-Plate Budget Range
                    </label>
                    <select
                      value={partyFormData.budgetRange}
                      onChange={(e) => setPartyFormData({ ...partyFormData, budgetRange: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#16110E',
                        border: '1px solid rgba(184, 154, 100, 0.35)',
                        color: '#F6EFE4',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="₹450 – ₹650 per guest" style={{ backgroundColor: '#1A1410', color: '#F6EFE4' }}>Classic Pure Veg Feast (₹450 – ₹650 / guest)</option>
                      <option value="₹650 – ₹850 per guest" style={{ backgroundColor: '#1A1410', color: '#F6EFE4' }}>Royal Banquet Spread (₹650 – ₹850 / guest)</option>
                      <option value="₹850 – ₹1,200+ per guest" style={{ backgroundColor: '#1A1410', color: '#F6EFE4' }}>Grand Luxury Celebration (₹850 – ₹1,200+ / guest)</option>
                      <option value="Custom Budget / Need Menu Consultation" style={{ backgroundColor: '#1A1410', color: '#F6EFE4' }}>Custom Menu / Discuss with Banquet Manager</option>
                    </select>
                  </div>

                  {/* Special Requirements */}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.8)', marginBottom: '6px', fontWeight: 500 }}>
                      Special Notes & Setup Preferences <span style={{ color: 'rgba(246, 239, 228, 0.45)', fontSize: '11px' }}>(Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Paneer tikka starters, balloon decoration setup, audio mic, Jain food options..."
                      value={partyFormData.specialRequirements}
                      onChange={(e) => setPartyFormData({ ...partyFormData, specialRequirements: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#16110E',
                        border: '1px solid rgba(184, 154, 100, 0.35)',
                        color: '#F6EFE4',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isPartySubmitting}
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, var(--color-brass), var(--color-brass-light))',
                      border: 'none',
                      color: '#16110E',
                      fontSize: '14px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      cursor: isPartySubmitting ? 'not-allowed' : 'pointer',
                      opacity: isPartySubmitting ? 0.7 : 1,
                      boxShadow: '0 4px 18px rgba(184, 154, 100, 0.28)',
                      transition: 'transform 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <Send size={16} />
                    {isPartySubmitting ? 'Sending Request to Banquet Team...' : 'Submit Celebration Inquiry'}
                  </button>
                </form>
              )}
            </>
          )}
            </div>

            {/* 2. Core Contact & Hours Card */}
            <div
              style={{
                padding: '36px 32px',
                borderRadius: '16px',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass)',
                    marginBottom: '8px',
                  }}
                >
                  Direct Contact & Info
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '30px',
                    fontWeight: 300,
                    color: 'var(--color-text-inverse)',
                    margin: 0,
                  }}
                >
                  Restaurant Desk
                </h3>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <MapPin size={20} color="var(--color-brass)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-inverse)', marginBottom: '4px' }}>
                    Address
                  </strong>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(246, 239, 228, 0.8)', margin: '0 0 10px' }}>
                    {RESTAURANT.address.fullDisplay}
                  </p>
                  <a
                    href={RESTAURANT.platforms.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      color: 'var(--color-brass)',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <Navigation size={13} />
                    <span>Get Directions on Map</span>
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Clock size={20} color="var(--color-brass)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-inverse)', marginBottom: '4px' }}>
                    Operating Hours
                  </strong>
                  <span style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.85)', display: 'block' }}>
                    Daily 11:00 AM to 11:00 PM (11:00 – 23:00)
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.5)' }}>
                    Lunch, Evening Snacks & Dinner Service
                  </span>
                </div>
              </div>

              {/* Price Range */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Wallet size={20} color="var(--color-brass)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-inverse)', marginBottom: '4px' }}>
                    Average Cost
                  </strong>
                  <span style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.85)' }}>
                    ₹200–400 per person · 100% Pure Veg
                  </span>
                </div>
              </div>

              {/* Quick Actions (Call & WhatsApp) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px', borderTop: '1px solid rgba(184, 154, 100, 0.15)' }}>
                <a
                  href={`tel:${RESTAURANT.phone.e164}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(184, 154, 100, 0.15)',
                    border: '1px solid rgba(184, 154, 100, 0.35)',
                    color: 'var(--color-brass)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={16} />
                  <span>Call Table Manager ({RESTAURANT.phone.display})</span>
                </a>

                <a
                  href={RESTAURANT.whatsapp.chatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(37, 211, 102, 0.12)',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    color: '#4ADE80',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Reserve via WhatsApp ({RESTAURANT.whatsapp.display})</span>
                </a>
              </div>
            </div>
          </div>

          {/* 3. Embedded Map & Partner Apps */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              alignItems: 'stretch',
              marginBottom: '56px',
            }}
          >
            {/* Embedded Google Map */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
                minHeight: '340px',
              }}
            >
              <iframe
                title="Hestiia Restaurant Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: '340px',
                  display: 'block',
                  filter: 'contrast(1.05) saturate(1.1)',
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Official Dining Platforms */}
            <div
              style={{
                padding: '32px',
                borderRadius: '16px',
                backgroundColor: 'rgba(38, 31, 26, 0.65)',
                border: '1px solid rgba(184, 154, 100, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass)',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Partner Portals
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '26px',
                    color: 'var(--color-text-inverse)',
                    margin: '0 0 12px',
                    fontWeight: 300,
                  }}
                >
                  Book via Food & Dining Apps
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.75)', lineHeight: 1.6, margin: 0 }}>
                  You can also view dining ratings, photos, and book table slots via our verified partner apps.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '10px',
                  marginTop: '20px',
                }}
              >
                <a
                  href={RESTAURANT.platforms.zomato}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(235, 53, 53, 0.12)',
                    border: '1px solid rgba(235, 53, 53, 0.35)',
                    color: 'var(--color-text-inverse)',
                    fontSize: '13px',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  <span>Zomato</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>

                <a
                  href={RESTAURANT.platforms.swiggy}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(252, 128, 25, 0.12)',
                    border: '1px solid rgba(252, 128, 25, 0.35)',
                    color: 'var(--color-text-inverse)',
                    fontSize: '13px',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  <span>Swiggy Dineout</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>

                <a
                  href={RESTAURANT.platforms.eazydiner}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(184, 154, 100, 0.15)',
                    border: '1px solid rgba(184, 154, 100, 0.35)',
                    color: 'var(--color-text-inverse)',
                    fontSize: '13px',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  <span>EazyDiner</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>

                <a
                  href={RESTAURANT.platforms.district}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(184, 154, 100, 0.15)',
                    border: '1px solid rgba(184, 154, 100, 0.35)',
                    color: 'var(--color-text-inverse)',
                    fontSize: '13px',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  <span>District</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>

                <a
                  href={RESTAURANT.platforms.justdial}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(184, 154, 100, 0.15)',
                    border: '1px solid rgba(184, 154, 100, 0.35)',
                    color: 'var(--color-text-inverse)',
                    fontSize: '13px',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  <span>Justdial</span>
                  <ExternalLink size={12} color="var(--color-brass)" />
                </a>

                {RESTAURANT.social.instagram && (
                  <a
                    href={RESTAURANT.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(225, 48, 108, 0.12)',
                      border: '1px solid rgba(225, 48, 108, 0.35)',
                      color: 'var(--color-text-inverse)',
                      fontSize: '13px',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    <span>Instagram</span>
                    <InstagramIcon size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Band */}
      <PageClosingCta
        title="We Look Forward to Your"
        accentWord="Visit"
        subtitle="Experience pure vegetarian dining crafted with care in Shyam Nagar, Kanpur."
      />

      {/* Instant VIP Digital Dining Pass Modal (Rendered to Root Body) */}
      {isPassModalOpen && activePass && (
        <BookingPassModal
          confirmation={activePass}
          onClose={() => setIsPassModalOpen(false)}
        />
      )}
    </>
  )
}
