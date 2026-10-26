import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Tag, ShieldCheck } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useCart } from '../context/CartContext'
import { useRestaurant } from '../context/RestaurantContext'

export default function Cart() {
  useDocumentMeta(
    'Your Dining Cart',
    'Review your curated pure vegetarian dishes before ordering or dining at Hestiia Restaurant Kanpur.'
  )

  const {
    items,
    updateQuantity,
    clearCart,
    subtotal,
    taxAmount,
    deliveryCharge,
    discountAmount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    grandTotal,
    totalItemCount,
  } = useCart()

  const { isStoreOpen } = useRestaurant()
  const navigate = useNavigate()

  const [couponInput, setCouponInput] = useState('')
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null)

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!couponInput.trim()) return
    const success = applyPromoCode(couponInput)
    if (success) {
      setCouponMsg({ text: `Coupon ${couponInput.toUpperCase()} applied successfully!` })
      setCouponInput('')
    } else {
      setCouponMsg({ text: 'Invalid coupon code. Try WELCOME10 or FEAST20', error: true })
    }
  }

  return (
    <>
      <PageHero
        title="Your Dining"
        accentWord="Cart"
        intro="Review your pure vegetarian selections for dining or takeaway from our Shyam Nagar kitchen."
        currentPage="Cart"
      />

      <section style={{ padding: '64px 0 80px', backgroundColor: '#16110E', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 20px' }}>
          {items.length === 0 ? (
            /* Empty State */
            <div
              style={{
                maxWidth: '560px',
                margin: '0 auto',
                padding: '48px 36px',
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                borderRadius: '16px',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                textAlign: 'center',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(184, 154, 100, 0.15)',
                  border: '1px solid rgba(184, 154, 100, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <ShoppingBag size={26} color="var(--color-brass)" />
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '28px',
                  margin: '0 0 12px 0',
                  color: 'var(--color-text-inverse)',
                  fontWeight: 300,
                }}
              >
                Your Cart is Currently <em style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>Empty</em>
              </h2>

              <p style={{ fontSize: '14px', color: 'rgba(246, 239, 228, 0.75)', lineHeight: 1.7, margin: '0 0 28px 0' }}>
                Explore our complete 193-dish pure vegetarian menu to curate your dining selection or call us to order directly.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link
                  to="/menu"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '13px 26px',
                    backgroundColor: 'var(--color-brass)',
                    color: '#1F1A16',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                  }}
                >
                  <span>Browse Full Menu</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ) : (
            /* Active Cart: Two Column Layout */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
                alignItems: 'start',
              }}
            >
              {/* Left Column: Dish List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-text-inverse)', margin: 0, fontWeight: 400 }}>
                    Order Selections ({totalItemCount})
                  </h2>
                  <button
                    onClick={clearCart}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(246, 239, 228, 0.5)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: 'rgba(38, 31, 26, 0.8)',
                      borderRadius: '12px',
                      border: '1px solid rgba(184, 154, 100, 0.2)',
                      padding: '16px 20px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          backgroundColor: '#120E0C',
                        }}
                      />
                    )}

                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '3px',
                            border: '1.5px solid #2F7D4F',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#2F7D4F' }} />
                        </span>
                        <h4 style={{ fontSize: '16px', color: 'var(--color-text-inverse)', margin: 0, fontWeight: 500 }}>
                          {item.name}
                        </h4>
                      </div>

                      <div style={{ marginTop: '6px', fontSize: '14px', color: 'var(--color-brass)', fontWeight: 600 }}>
                        ₹{item.price} each · <span style={{ color: '#F6EFE4' }}>₹{item.price * item.quantity}</span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backgroundColor: 'rgba(24, 19, 16, 0.9)',
                        borderRadius: '6px',
                        border: '1px solid rgba(184, 154, 100, 0.3)',
                        padding: '6px 10px',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.dishId, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-brass)', cursor: 'pointer', display: 'flex' }}
                        title="Decrease"
                      >
                        {item.quantity === 1 ? <Trash2 size={14} color="#EF4444" /> : <Minus size={14} />}
                      </button>

                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#F6EFE4', minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.dishId, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-brass)', cursor: 'pointer', display: 'flex' }}
                        title="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                <Link
                  to="/menu"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--color-brass)',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    marginTop: '8px',
                  }}
                >
                  <Plus size={15} />
                  <span>Add more dishes from Menu</span>
                </Link>
              </div>

              {/* Right Column: Bill Details & Promo Card */}
              <div
                style={{
                  backgroundColor: 'rgba(38, 31, 26, 0.85)',
                  borderRadius: '16px',
                  border: '1px solid rgba(184, 154, 100, 0.25)',
                  padding: '28px',
                  boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4)',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--color-text-inverse)', margin: '0 0 20px', fontWeight: 400 }}>
                  Order Summary
                </h3>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ position: 'relative', flexGrow: 1 }}>
                      <input
                        type="text"
                        placeholder="Enter Promo Code (e.g. WELCOME10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px 10px 36px',
                          borderRadius: '8px',
                          border: '1px solid rgba(184, 154, 100, 0.3)',
                          backgroundColor: '#191410',
                          color: '#F6EFE4',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                      <Tag size={15} color="var(--color-brass)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                    </div>

                    <button
                      type="submit"
                      style={{
                        padding: '0 18px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(184, 154, 100, 0.2)',
                        border: '1px solid rgba(184, 154, 100, 0.4)',
                        color: 'var(--color-brass)',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Apply
                    </button>
                  </div>

                  {couponMsg && (
                    <div style={{ fontSize: '12px', marginTop: '6px', color: couponMsg.error ? '#F87171' : '#4ADE80' }}>
                      {couponMsg.text}
                    </div>
                  )}

                  {promoCode && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(74, 222, 128, 0.1)',
                        border: '1px solid rgba(74, 222, 128, 0.3)',
                        fontSize: '12px',
                        color: '#4ADE80',
                      }}
                    >
                      <span>Code <strong>{promoCode}</strong> applied</span>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '11px' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Line Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', borderTop: '1px solid rgba(184, 154, 100, 0.15)', paddingTop: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(246, 239, 228, 0.8)' }}>
                    <span>Items Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ADE80' }}>
                      <span>Promo Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(246, 239, 228, 0.8)' }}>
                    <span>GST & Restaurant Tax (5%)</span>
                    <span>₹{taxAmount}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(246, 239, 228, 0.8)' }}>
                    <span>Delivery Packaging</span>
                    <span>{deliveryCharge === 0 ? <strong style={{ color: '#4ADE80' }}>FREE</strong> : `₹${deliveryCharge}`}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'var(--color-brass)',
                      fontWeight: 700,
                      fontSize: '18px',
                      paddingTop: '12px',
                      borderTop: '1px dashed rgba(184, 154, 100, 0.25)',
                    }}
                  >
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate('/checkout')}
                  disabled={!isStoreOpen}
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
                    cursor: isStoreOpen ? 'pointer' : 'not-allowed',
                    opacity: isStoreOpen ? 1 : 0.6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 24px rgba(184, 154, 100, 0.25)',
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>

                {!isStoreOpen && (
                  <p style={{ textAlign: 'center', fontSize: '12px', color: '#F87171', margin: '8px 0 0' }}>
                    Online orders are currently paused by the kitchen.
                  </p>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px', fontSize: '12px', color: 'rgba(246, 239, 228, 0.5)' }}>
                  <ShieldCheck size={14} color="var(--color-brass)" />
                  <span>100% Pure Vegetarian Preparation Verified</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <PageClosingCta />
    </>
  )
}
