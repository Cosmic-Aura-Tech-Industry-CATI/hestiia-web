import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  Sparkles, 
  Copy, 
  Check, 
  X, 
  MessageCircle, 
  Navigation, 
  Printer, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import type { BookingConfirmationDetails } from '../types/api';

interface BookingPassModalProps {
  confirmation: BookingConfirmationDetails;
  onClose: () => void;
}

export const BookingPassModal: React.FC<BookingPassModalProps> = ({ confirmation, onClose }) => {
  const [copied, setCopied] = useState(false);

  const {
    bookingRef,
    customerName,
    phone,
    date,
    time,
    guests,
    occasion,
    specialRequests,
    holdPolicy,
    restaurantDetails,
  } = confirmation;

  // Prevent background scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Google Calendar Link Generator
  const generateGoogleCalendarUrl = () => {
    try {
      const timeParts = time.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      let hours = 20;
      let minutes = 0;
      if (timeParts) {
        hours = parseInt(timeParts[1], 10);
        minutes = parseInt(timeParts[2], 10);
        const meridiem = (timeParts[3] || '').toUpperCase();
        if (meridiem === 'PM' && hours < 12) hours += 12;
        if (meridiem === 'AM' && hours === 12) hours = 0;
      }
      
      const [year, month, day] = date.split('-').map((v) => parseInt(v, 10));
      const startDate = new Date(year, (month || 1) - 1, day || 1, hours, minutes);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours window

      const formatCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
      const datesParam = `${formatCalDate(startDate)}/${formatCalDate(endDate)}`;

      const title = encodeURIComponent(`Dining at Hestiia Restaurant (${guests})`);
      const details = encodeURIComponent(
        `Table Reservation at Hestiia Fine Dine\nBooking Ref: ${bookingRef}\nGuest: ${customerName}\nOccasion: ${occasion}\n${specialRequests ? `Special Requests: ${specialRequests}\n` : ''}Table Hold Policy: ${holdPolicy}\nPhone: ${restaurantDetails.phone}`
      );
      const location = encodeURIComponent(`${restaurantDetails.address}, ${restaurantDetails.city}`);

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${datesParam}&details=${details}&location=${location}`;
    } catch {
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Dining at Hestiia Restaurant')}&location=${encodeURIComponent(restaurantDetails.address)}`;
    }
  };

  // Pre-formatted WhatsApp text for the customer to save or share
  const whatsappShareText = encodeURIComponent(
    `🍽️ *Hestiia Restaurant — VIP Dining Pass*\n\n` +
    `📋 *Booking Ref:* #${bookingRef}\n` +
    `👤 *Guest Name:* ${customerName}\n` +
    `📅 *Date:* ${date}\n` +
    `⏰ *Time Slot:* ${time}\n` +
    `👥 *Guests:* ${guests}\n` +
    `✨ *Occasion:* ${occasion}\n` +
    (specialRequests ? `📝 *Notes:* ${specialRequests}\n` : '') +
    `\n📍 *Venue:* ${restaurantDetails.address}, ${restaurantDetails.city} (${restaurantDetails.landmark})\n` +
    `⏱️ *Hold Policy:* ${holdPolicy}\n` +
    `📞 *Host Desk:* ${restaurantDetails.phone}\n\n` +
    `_Thank you for choosing Hestiia! We look forward to hosting you._`
  );

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '620px',
          backgroundColor: '#1C1613',
          border: '1px solid rgba(212, 175, 55, 0.45)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(212, 175, 55, 0.15)',
          overflow: 'hidden',
          margin: 'auto',
          color: '#F6EFE4',
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          animation: 'fadeIn 0.25s ease-out',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(38, 31, 26, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F6EFE4',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          aria-label="Close Dining Pass"
        >
          <X size={18} />
        </button>

        {/* Luxury Header Banner */}
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(64, 46, 26, 0.9) 0%, rgba(28, 22, 19, 1) 100%)',
            padding: '32px 24px 24px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '20px',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: '#F59E0B',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={14} color="#F59E0B" />
            <span>VIP Dining Reservation Pass</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: 'clamp(24px, 4vw, 30px)',
              fontWeight: 400,
              color: '#FFFFFF',
              margin: '0 0 6px',
              letterSpacing: '0.02em',
            }}
          >
            Table Reserved Successfully
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.8)', margin: '0 auto 16px', maxWidth: '420px', lineHeight: 1.5 }}>
            Namaste <strong style={{ color: '#FCD34D' }}>{customerName}</strong>! Your table is queued for hospitality hosting. Please show this pass or reference ID on arrival.
          </p>

          {/* Booking Ref Badge with Copy Action */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#120D0B',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              borderRadius: '10px',
              padding: '8px 16px',
            }}
          >
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(246, 239, 228, 0.6)', letterSpacing: '0.08em' }}>
              Booking Ref:
            </span>
            <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'monospace', color: '#FBBF24', letterSpacing: '0.08em' }}>
              #{bookingRef}
            </span>
            <button
              onClick={handleCopyRef}
              style={{
                background: 'none',
                border: 'none',
                color: copied ? '#34D399' : 'rgba(246, 239, 228, 0.7)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                padding: '4px 6px',
                borderRadius: '4px',
              }}
              title="Copy Reference Number"
            >
              {copied ? (
                <>
                  <Check size={14} color="#34D399" />
                  <span style={{ fontWeight: 600 }}>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pass Details Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Reservation Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '10px',
              backgroundColor: 'rgba(22, 17, 14, 0.8)',
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
            }}
          >
            <div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'rgba(246, 239, 228, 0.6)', marginBottom: '4px' }}>
                <CalendarIcon size={13} color="#F59E0B" /> Date
              </span>
              <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>{date}</strong>
            </div>

            <div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'rgba(246, 239, 228, 0.6)', marginBottom: '4px' }}>
                <Clock size={13} color="#F59E0B" /> Time
              </span>
              <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>{time}</strong>
            </div>

            <div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'rgba(246, 239, 228, 0.6)', marginBottom: '4px' }}>
                <Users size={13} color="#F59E0B" /> Guests
              </span>
              <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>{guests}</strong>
            </div>

            <div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'rgba(246, 239, 228, 0.6)', marginBottom: '4px' }}>
                <Sparkles size={13} color="#F59E0B" /> Occasion
              </span>
              <strong style={{ fontSize: '14px', color: '#FCD34D' }}>{occasion}</strong>
            </div>
          </div>

          {/* Guest & Special Request Info */}
          <div style={{ fontSize: '13px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '6px' }}>
              <span style={{ color: 'rgba(246, 239, 228, 0.6)' }}>Reserved For</span>
              <strong style={{ color: '#FFFFFF' }}>{customerName} ({phone})</strong>
            </div>

            {specialRequests && (
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '6px' }}>
                <span style={{ color: 'rgba(246, 239, 228, 0.6)' }}>Special Requests</span>
                <span style={{ color: '#FDE68A', fontStyle: 'italic' }}>"{specialRequests}"</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '6px' }}>
              <span style={{ color: 'rgba(246, 239, 228, 0.6)' }}>Reservation Status</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#34D399',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={13} color="#34D399" />
                Reserved & Sent to Host
              </span>
            </div>
          </div>

          {/* Table Hold Alert */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              fontSize: '12px',
              color: 'rgba(246, 239, 228, 0.85)',
              lineHeight: 1.5,
            }}
          >
            <AlertCircle size={16} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#FCD34D', display: 'block', marginBottom: '2px' }}>Table Hold Policy:</strong>
              <span>{holdPolicy || 'Your table is held for 15 minutes beyond your reserved time slot before release.'}</span>
            </div>
          </div>

          {/* Venue & Host Desk Details */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: 'rgba(22, 17, 14, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(246, 239, 228, 0.85)' }}>
              <MapPin size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                <strong style={{ color: '#FFFFFF' }}>{restaurantDetails.name}:</strong> {restaurantDetails.address}, {restaurantDetails.city} ({restaurantDetails.landmark})
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(246, 239, 228, 0.85)' }}>
              <Phone size={14} color="#F59E0B" style={{ flexShrink: 0 }} />
              <span>Host Desk Phone: <strong style={{ color: '#FCD34D' }}>{restaurantDetails.phone}</strong></span>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '10px',
              paddingTop: '6px',
            }}
          >
            {/* 1. Add to Calendar */}
            <a
              href={generateGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 14px',
                backgroundColor: '#261F1A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <CalendarIcon size={14} color="#F59E0B" />
              <span>Add to Calendar</span>
            </a>

            {/* 2. Save on WhatsApp */}
            <a
              href={`https://wa.me/?text=${whatsappShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 14px',
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                border: '1px solid rgba(16, 185, 129, 0.45)',
                color: '#6EE7B7',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <MessageCircle size={15} color="#34D399" />
              <span>Save on WhatsApp</span>
            </a>

            {/* 3. Get Directions */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${restaurantDetails.mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 14px',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#FCD34D',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Navigation size={14} color="#F59E0B" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Footer Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '12px',
            }}
          >
            <button
              onClick={() => window.print()}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(246, 239, 228, 0.65)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                padding: '6px 0',
              }}
            >
              <Printer size={15} />
              <span>Print Pass / Ticket</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#120D0B',
                border: 'none',
                padding: '9px 24px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
              }}
            >
              Done / Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BookingPassModal;
