import { useState } from 'react'
import { Users, Phone, Calendar, MessageSquare, Sparkles, CheckCircle2, AlertCircle, Send } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RESTAURANT } from '../content/restaurant'
import { partyService } from '../services/party.service'
import type { CreatePartyInquiryDto } from '../types/api'

export default function Party() {
  useDocumentMeta(
    'Parties & Celebration Enquiries | Hestiia',
    'Plan family celebrations, kitty parties, birthdays, and banquets at Hestiia Restaurant in Shyam Nagar, Kanpur with custom pure vegetarian catering.'
  )

  const [formData, setFormData] = useState<CreatePartyInquiryDto>({
    customerName: '',
    phone: '',
    email: '',
    eventType: 'birthday',
    preferredDate: '',
    guestCount: 20,
    budgetRange: '₹5,000 – ₹15,000',
    specialRequirements: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedInquiry, setSubmittedInquiry] = useState<any | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your full name and contact number.')
      return
    }

    try {
      setIsSubmitting(true)
      const res = await partyService.createInquiry(formData)
      if (res.success && res.inquiry) {
        setSubmittedInquiry(res.inquiry)
      } else {
        setErrorMsg(res.message || 'Unable to register inquiry. Please contact our desk directly.')
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
        title="Parties & Private"
        accentWord="Celebrations"
        intro="Dedicated pure vegetarian gathering spaces, customized multi-course menus, and attentive hospitality in Shyam Nagar."
        currentPage="Parties & Enquiries"
      />

      <section style={{ padding: '64px 0 80px', backgroundColor: '#16110E' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              backgroundColor: 'rgba(38, 31, 26, 0.8)',
              borderRadius: '16px',
              border: '1px solid rgba(184, 154, 100, 0.25)',
              padding: 'clamp(28px, 4vw, 44px)',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={18} color="var(--color-brass)" />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brass)',
                }}
              >
                Celebration Arrangements
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 300,
                color: 'var(--color-text-inverse)',
                margin: '0 0 16px',
              }}
            >
              Celebrate Life’s Milestones at <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Hestiia</em>
            </h2>

            <p style={{ color: 'rgba(246, 239, 228, 0.78)', lineHeight: 1.7, margin: '0 0 28px', fontSize: '14px' }}>
              From intimate birthday gatherings and kitty parties to multi-course family anniversary banquets, our kitchen prepares authentic pure vegetarian spreads tailored to your group size and taste preferences.
            </p>

            {submittedInquiry ? (
              <div
                style={{
                  backgroundColor: 'rgba(52, 168, 83, 0.12)',
                  border: '1px solid rgba(52, 168, 83, 0.4)',
                  borderRadius: '12px',
                  padding: '32px',
                  textAlign: 'center',
                  marginBottom: '28px',
                }}
              >
                <CheckCircle2 size={42} color="#4ADE80" style={{ margin: '0 auto 14px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#F6EFE4', margin: '0 0 8px' }}>
                  Celebration Inquiry Registered!
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.8)', margin: '0 0 20px', lineHeight: 1.6 }}>
                  Thank you, <strong>{submittedInquiry.customerName}</strong>. Our celebration banquet manager will call you at{' '}
                  <strong>{submittedInquiry.phone}</strong> to coordinate your customized multi-course menu.
                </p>
                <button
                  onClick={() => setSubmittedInquiry(null)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--color-brass)',
                    color: 'var(--color-brass)',
                    padding: '9px 20px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} style={{ marginBottom: '32px' }}>
                {errorMsg && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      color: '#F87171',
                      fontSize: '13px',
                      marginBottom: '16px',
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                      Host / Organizer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#191410',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#191410',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                      Occasion / Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#191410',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    >
                      <option value="birthday">Birthday Party</option>
                      <option value="anniversary">Wedding Anniversary</option>
                      <option value="corporate">Corporate Lunch / Meeting</option>
                      <option value="family_gathering">Family Reunion / Banquet</option>
                      <option value="other">Kitty Party / Other Celebration</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                      Estimated Guests
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={200}
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) || 10 })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#191410',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#191410',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                    Special Menu Preferences or Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need customized paneer dishes, specific dessert counter, sound setup..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#191410',
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
                    padding: '14px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-brass)',
                    border: 'none',
                    color: '#16110E',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Party & Banquet Inquiry'}</span>
                </button>
              </form>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '28px',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: 'rgba(26, 20, 16, 0.6)',
                border: '1px solid rgba(184, 154, 100, 0.15)',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Users size={22} color="var(--color-brass)" />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-inverse)' }}>
                    Group Enquiries
                  </strong>
                  <span style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.65)' }}>10 to 40+ Guests</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Calendar size={22} color="var(--color-brass)" />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-inverse)' }}>
                    Kitchen Hours
                  </strong>
                  <span style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.65)' }}>{RESTAURANT.hours.displayText}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a
                href={`tel:${RESTAURANT.phone.e164}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 22px',
                  backgroundColor: 'var(--color-brass)',
                  color: '#1F1A16',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                }}
              >
                <Phone size={15} />
                <span>Call {RESTAURANT.phone.display}</span>
              </a>

              <a
                href={RESTAURANT.whatsapp.chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                  color: '#4ADE80',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <MessageSquare size={15} />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <PageClosingCta
        title="Plan Your Celebration with"
        accentWord="Us"
        subtitle="Speak directly with our banquet manager to customize your pure vegetarian gathering in Shyam Nagar."
      />
    </>
  )
}
