import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  CreditCard,
  Phone,
  User,
  MapPin,
  FileText,
  ArrowRight,
  Banknote,
  QrCode,
  AlertCircle,
  Copy,
  Check,
  Smartphone,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useCart } from '../context/CartContext'
import { useRestaurant } from '../context/RestaurantContext'
import { ordersService } from '../services/orders.service'
import type { CreateOrderDto } from '../types/api'

export default function Checkout() {
  useDocumentMeta(
    'Dining & Takeaway Checkout',
    'Complete your order or table reservation at Hestiia Restaurant in Shyam Nagar, Kanpur.'
  )

  const { items, subtotal, taxAmount, deliveryCharge, discountAmount, grandTotal, promoCode, clearCart } = useCart()
  const { isStoreOpen } = useRestaurant()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    fulfillmentType: 'delivery' as 'delivery' | 'pickup' | 'dine-in',
    paymentMethod: 'upi' as 'upi' | 'cod' | 'online',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pendingUpiOrder, setPendingUpiOrder] = useState<any | null>(null)
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false)
  const [copiedUpi, setCopiedUpi] = useState(false)

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isUpiModalOpen) {
      navigate('/menu')
    }
  }, [items, navigate, isUpiModalOpen])

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please enter your full name and phone number.')
      return
    }

    if (formData.fulfillmentType === 'delivery' && !formData.address.trim()) {
      setErrorMessage('Please enter your complete delivery address in Kanpur.')
      return
    }

    try {
      setIsSubmitting(true)

      const payload: CreateOrderDto = {
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        customerEmail: formData.email.trim() || undefined,
        deliveryAddress:
          formData.fulfillmentType === 'delivery'
            ? `${formData.address.trim()}${formData.landmark ? `, Landmark: ${formData.landmark.trim()}` : ''}`
            : undefined,
        fulfillmentType: formData.fulfillmentType,
        items: items.map((i) => ({
          dishId: i.dishId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          total: i.price * i.quantity,
          image: i.image,
        })),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes.trim() || undefined,
        discountCode: promoCode || undefined,
      }

      const res = await ordersService.createOrder(payload)

      if (res.success && res.order) {
        // Resilient session storage for order tracking
        try {
          sessionStorage.setItem(`last_placed_order_${res.order.orderNumber}`, JSON.stringify(res.order))
        } catch {
          // storage error ignored
        }

        clearCart()

        if (formData.paymentMethod === 'upi') {
          setPendingUpiOrder(res.order)
          setIsUpiModalOpen(true)
        } else {
          navigate(`/order-success/${res.order.orderNumber}`)
        }
      } else {
        setErrorMessage(res.message || 'Failed to place order. Please check connection and try again.')
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while creating your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        title="Dining Order"
        accentWord="Checkout"
        intro="Review order specifications and coordinate dining preferences directly with our hospitality team."
        currentPage="Checkout"
      />

      <section style={{ padding: '64px 0 80px', backgroundColor: '#16110E', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'start' }}>
            {/* Left: Customer Information & Order Details Form */}
            <form
              onSubmit={handleSubmitOrder}
              style={{
                backgroundColor: 'rgba(38, 31, 26, 0.8)',
                borderRadius: '16px',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                padding: '32px',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4)',
              }}
            >
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-text-inverse)', margin: '0 0 24px', fontWeight: 400 }}>
                Guest & Delivery Details
              </h2>

              {errorMessage && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    color: '#F87171',
                    fontSize: '13px',
                    marginBottom: '20px',
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Fulfillment Type Radio Bar */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '8px', fontWeight: 500 }}>
                  Order Type / Service
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {(['delivery', 'pickup', 'dine-in'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, fulfillmentType: type })}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: formData.fulfillmentType === type ? 'var(--color-brass)' : 'rgba(24, 19, 16, 0.8)',
                        color: formData.fulfillmentType === type ? '#16110E' : '#F6EFE4',
                        border: formData.fulfillmentType === type ? '1px solid var(--color-brass)' : '1px solid rgba(184, 154, 100, 0.2)',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {type === 'delivery' ? 'Home Delivery' : type === 'pickup' ? 'Takeaway Pickup' : 'Dine-In Pre-order'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px 11px 36px',
                        borderRadius: '8px',
                        backgroundColor: '#191410',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                    <User size={15} color="var(--color-brass)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                    Phone Number (for order SMS) *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px 11px 36px',
                        borderRadius: '8px',
                        backgroundColor: '#191410',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                    <Phone size={15} color="var(--color-brass)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  </div>
                </div>
              </div>

              {/* Email (Optional) */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                  Email Address (for receipt & invoice)
                </label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#191410',
                    border: '1px solid rgba(184, 154, 100, 0.3)',
                    color: '#F6EFE4',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Delivery Address (if Delivery selected) */}
              {formData.fulfillmentType === 'delivery' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                    Delivery Address (Kanpur) *
                  </label>
                  <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <textarea
                      required
                      rows={2}
                      placeholder="House/Flat No., Building, Street Name, Shyam Nagar / Kanpur locality"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px 11px 36px',
                        borderRadius: '8px',
                        backgroundColor: '#191410',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        color: '#F6EFE4',
                        fontSize: '13px',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                    <MapPin size={15} color="var(--color-brass)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  </div>

                  <input
                    type="text"
                    placeholder="Nearby Landmark (Optional)"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#191410',
                      border: '1px solid rgba(184, 154, 100, 0.25)',
                      color: '#F6EFE4',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              {/* Special Instructions */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '6px' }}>
                  Cooking or Dining Notes (Optional)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="e.g. Less spicy, extra green chutney, cutlery required"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 36px',
                      borderRadius: '8px',
                      backgroundColor: '#191410',
                      border: '1px solid rgba(184, 154, 100, 0.25)',
                      color: '#F6EFE4',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <FileText size={15} color="var(--color-brass)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'rgba(246, 239, 228, 0.7)', marginBottom: '10px', fontWeight: 500 }}>
                  Select Payment Option
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'upi', label: 'UPI / QR Code at Doorstep or Counter', icon: QrCode },
                    { id: 'cod', label: 'Cash on Delivery / Dining (COD)', icon: Banknote },
                    { id: 'online', label: 'Instant Online Payment / Netbanking', icon: CreditCard },
                  ].map((p) => {
                    const Icon = p.icon
                    const isSelected = formData.paymentMethod === p.id
                    return (
                      <label
                        key={p.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? 'rgba(184, 154, 100, 0.12)' : 'rgba(24, 19, 16, 0.6)',
                          border: isSelected ? '1px solid var(--color-brass)' : '1px solid rgba(184, 154, 100, 0.2)',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={p.id}
                          checked={isSelected}
                          onChange={() => setFormData({ ...formData, paymentMethod: p.id as any })}
                          style={{ accentColor: 'var(--color-brass)' }}
                        />
                        <Icon size={18} color={isSelected ? 'var(--color-brass)' : 'rgba(246, 239, 228, 0.6)'} />
                        <span style={{ fontSize: '13px', color: isSelected ? '#F6EFE4' : 'rgba(246, 239, 228, 0.8)', fontWeight: isSelected ? 600 : 400 }}>
                          {p.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isStoreOpen}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-brass)',
                  border: 'none',
                  color: '#16110E',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  cursor: isSubmitting || !isStoreOpen ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting || !isStoreOpen ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 24px rgba(184, 154, 100, 0.3)',
                }}
              >
                {isSubmitting ? (
                  <span>Transmitting Order to Kitchen...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order (₹{grandTotal})</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Right: Order Summary Sidebar */}
            <div
              style={{
                backgroundColor: 'rgba(38, 31, 26, 0.85)',
                borderRadius: '16px',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                padding: '28px',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--color-text-inverse)', margin: 0, fontWeight: 400 }}>
                  Order Summary
                </h3>
                <Link to="/cart" style={{ fontSize: '12px', color: 'var(--color-brass)', textDecoration: 'none' }}>
                  Edit Items
                </Link>
              </div>

              {/* Items List */}
              <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'rgba(246, 239, 228, 0.85)' }}>
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span style={{ fontWeight: 600, color: '#F6EFE4' }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Financial Breakup */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', borderTop: '1px solid rgba(184, 154, 100, 0.15)', paddingTop: '14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(246, 239, 228, 0.7)' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ADE80' }}>
                    <span>Discount ({promoCode})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(246, 239, 228, 0.7)' }}>
                  <span>GST (5%)</span>
                  <span>₹{taxAmount}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(246, 239, 228, 0.7)' }}>
                  <span>Delivery Charge</span>
                  <span>{deliveryCharge === 0 ? <strong style={{ color: '#4ADE80' }}>FREE</strong> : `₹${deliveryCharge}`}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: 'var(--color-brass)',
                    fontWeight: 700,
                    fontSize: '17px',
                    paddingTop: '10px',
                    borderTop: '1px dashed rgba(184, 154, 100, 0.25)',
                  }}
                >
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(184, 154, 100, 0.08)', border: '1px solid rgba(184, 154, 100, 0.15)', fontSize: '12px', color: 'rgba(246, 239, 228, 0.7)', lineHeight: 1.6 }}>
                ✓ Live status notifications via SMS<br />
                ✓ Freshly made upon order placement<br />
                ✓ Delivered hot in food-grade thermal packaging
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPI QR Payment Modal */}
      {isUpiModalOpen && pendingUpiOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#191410',
              border: '1.5px solid var(--color-brass)',
              borderRadius: '16px',
              padding: '32px 28px',
              maxWidth: '460px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '50%', backgroundColor: 'rgba(184, 154, 100, 0.15)', marginBottom: '12px' }}>
              <QrCode size={36} color="var(--color-brass)" />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#F6EFE4', margin: '0 0 6px' }}>
              Scan & Pay with Any UPI
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(246, 239, 228, 0.75)', margin: '0 0 16px' }}>
              Order <strong style={{ color: 'var(--color-brass)' }}>#{pendingUpiOrder.orderNumber}</strong> has been registered with our kitchen.
            </p>

            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '12px', display: 'inline-block', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=6&data=${encodeURIComponent(
                  `upi://pay?pa=7880840622@upi&pn=Hestiia+Restaurant&am=${pendingUpiOrder.grandTotal}&cu=INR&tn=Order+${pendingUpiOrder.orderNumber}`
                )}`}
                alt="Scan to pay via UPI"
                style={{ width: '200px', height: '200px', display: 'block' }}
              />
            </div>

            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-brass)', marginBottom: '12px' }}>
              Amount: ₹{pendingUpiOrder.grandTotal}
            </div>

            {/* UPI ID Copy Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '13px',
              }}
            >
              <span style={{ color: 'rgba(246, 239, 228, 0.85)' }}>UPI ID: <strong>7880840622@upi</strong></span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('7880840622@upi')
                  setCopiedUpi(true)
                  setTimeout(() => setCopiedUpi(false), 2000)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copiedUpi ? '#4ADE80' : 'var(--color-brass)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* 1-Click Pay for Mobile Devices */}
            <a
              href={`upi://pay?pa=7880840622@upi&pn=Hestiia+Restaurant&am=${pendingUpiOrder.grandTotal}&cu=INR&tn=Order+${pendingUpiOrder.orderNumber}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(184, 154, 100, 0.15)',
                border: '1px solid var(--color-brass)',
                color: 'var(--color-brass)',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                marginBottom: '14px',
                boxSizing: 'border-box',
              }}
            >
              <Smartphone size={16} />
              <span>Open Google Pay / PhonePe / Paytm</span>
            </a>

            {/* Track Order Confirmation */}
            <button
              type="button"
              onClick={() => {
                setIsUpiModalOpen(false)
                navigate(`/order-success/${pendingUpiOrder.orderNumber}`)
              }}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--color-brass), var(--color-brass-light))',
                border: 'none',
                color: '#16110E',
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(184, 154, 100, 0.3)',
              }}
            >
              <span>I Have Paid · Track Order</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <PageClosingCta />
    </>
  )
}
