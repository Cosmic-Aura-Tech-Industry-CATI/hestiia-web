import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Home, Phone, Clock, ChefHat, Truck, AlertCircle, RefreshCw } from 'lucide-react'
import PageHero from '../components/PageHero'
import PageClosingCta from '../components/PageClosingCta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { RESTAURANT } from '../content/restaurant'
import { ordersService } from '../services/orders.service'
import type { OrderResponse } from '../types/api'

export default function OrderSuccess() {
  const { orderNumber } = useParams<{ orderNumber?: string }>()
  const [searchInput, setSearchInput] = useState('')
  const [order, setOrder] = useState<OrderResponse | null>(null)
  const [loading, setLoading] = useState(Boolean(orderNumber))
  const [error, setError] = useState<string | null>(null)

  useDocumentMeta(
    orderNumber ? `Track Order #${orderNumber} | Hestiia` : 'Track Your Order | Hestiia Restaurant',
    'Live food order preparation and delivery tracking at Hestiia Restaurant Kanpur.'
  )

  const fetchOrder = (num: string) => {
    setLoading(true)
    setError(null)
    ordersService
      .getOrder(num)
      .then((res) => {
        if (res.success && res.order) {
          setOrder(res.order)
        } else {
          setError('Order not found. Please check your order reference number.')
        }
      })
      .catch((err) => {
        setError(err.message || 'Unable to fetch order status. Please verify your connection.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (orderNumber) {
      fetchOrder(orderNumber)
      const interval = setInterval(() => fetchOrder(orderNumber), 15000)
      return () => clearInterval(interval)
    }
  }, [orderNumber])

  const getStepIndex = (status?: string) => {
    switch (status) {
      case 'pending':
        return 0
      case 'confirmed':
        return 1
      case 'preparing':
        return 2
      case 'ready_for_pickup':
      case 'out_for_delivery':
        return 3
      case 'completed':
        return 4
      case 'cancelled':
        return -1
      default:
        return 1
    }
  }

  const currentStep = getStepIndex(order?.orderStatus)

  return (
    <>
      <PageHero
        title={orderNumber ? 'Live Order' : 'Track Your'}
        accentWord={orderNumber ? 'Tracking' : 'Order'}
        intro={orderNumber ? `Real-time updates for Order #${orderNumber}` : 'Enter your order reference number to view kitchen status.'}
        currentPage="Order Status"
      />

      <section style={{ padding: '64px 0 80px', backgroundColor: '#16110E', minHeight: '65vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          {/* Order Search Box if no orderNumber in route */}
          {!orderNumber && !order && (
            <div
              style={{
                backgroundColor: 'rgba(38, 31, 26, 0.75)',
                borderRadius: '16px',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                padding: '36px',
                textAlign: 'center',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.35)',
                marginBottom: '40px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--color-text-inverse)', margin: '0 0 16px', fontWeight: 400 }}>
                Find Your Order
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (searchInput.trim()) fetchOrder(searchInput.trim())
                }}
                style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto' }}
              >
                <input
                  type="text"
                  placeholder="e.g. ORD-12345"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#191410',
                    border: '1px solid rgba(184, 154, 100, 0.3)',
                    color: '#F6EFE4',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '12px 22px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-brass)',
                    border: 'none',
                    color: '#16110E',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Track
                </button>
              </form>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-brass)' }}>
              <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 16px' }} />
              <p style={{ fontSize: '15px' }}>Fetching latest kitchen status...</p>
            </div>
          )}

          {error && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                color: '#F87171',
                marginBottom: '32px',
              }}
            >
              <AlertCircle size={32} style={{ margin: '0 auto 12px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>{error}</p>
            </div>
          )}

          {order && (
            <div
              style={{
                backgroundColor: 'rgba(38, 31, 26, 0.85)',
                borderRadius: '16px',
                border: '1px solid rgba(184, 154, 100, 0.25)',
                padding: '36px',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
              }}
            >
              {/* Header Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--color-brass)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                    Order Status
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--color-text-inverse)', margin: '4px 0 0', fontWeight: 400 }}>
                    #{order.orderNumber}
                  </h2>
                </div>

                <div
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    backgroundColor:
                      order.orderStatus === 'completed'
                        ? 'rgba(74, 222, 128, 0.15)'
                        : order.orderStatus === 'cancelled'
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(184, 154, 100, 0.15)',
                    border: `1px solid ${
                      order.orderStatus === 'completed'
                        ? '#4ADE80'
                        : order.orderStatus === 'cancelled'
                        ? '#EF4444'
                        : 'var(--color-brass)'
                    }`,
                    color:
                      order.orderStatus === 'completed'
                        ? '#4ADE80'
                        : order.orderStatus === 'cancelled'
                        ? '#F87171'
                        : 'var(--color-brass)',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {order.orderStatus.replace('_', ' ')}
                </div>
              </div>

              {/* 4-Step Visual Stepper */}
              {order.orderStatus !== 'cancelled' && (
                <div style={{ margin: '32px 0 40px', position: 'relative' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '12px',
                      textAlign: 'center',
                    }}
                  >
                    {[
                      { label: 'Received', icon: Clock, desc: 'Sent to Kitchen' },
                      { label: 'Confirmed', icon: CheckCircle2, desc: 'Accepted by Chef' },
                      { label: 'Preparing', icon: ChefHat, desc: 'Cooking Pure Veg' },
                      { label: order.fulfillmentType === 'delivery' ? 'On the Way' : 'Ready', icon: Truck, desc: 'Hot & Packed' },
                    ].map((step, idx) => {
                      const Icon = step.icon
                      const isDone = currentStep >= idx + 1
                      const isCurrent = currentStep === idx + 1
                      return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div
                            style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              backgroundColor: isDone ? 'var(--color-brass)' : isCurrent ? 'rgba(184, 154, 100, 0.25)' : 'rgba(24, 19, 16, 0.8)',
                              border: isCurrent ? '2px solid var(--color-brass)' : isDone ? 'none' : '1px solid rgba(184, 154, 100, 0.2)',
                              color: isDone ? '#16110E' : isCurrent ? 'var(--color-brass)' : 'rgba(246, 239, 228, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '10px',
                              transition: 'all 0.3s',
                            }}
                          >
                            <Icon size={20} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: isDone || isCurrent ? '#F6EFE4' : 'rgba(246, 239, 228, 0.5)' }}>
                            {step.label}
                          </span>
                          <span style={{ fontSize: '10px', color: 'rgba(246, 239, 228, 0.4)', marginTop: '2px' }}>
                            {step.desc}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Order Summary & Details Card */}
              <div
                style={{
                  backgroundColor: 'rgba(24, 19, 16, 0.7)',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 154, 100, 0.15)',
                  padding: '20px',
                  marginBottom: '28px',
                }}
              >
                <h4 style={{ fontSize: '14px', color: 'var(--color-brass)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Ordered Delicacies ({order.items.length})
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'rgba(246, 239, 228, 0.85)' }}>
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <span style={{ fontWeight: 600 }}>₹{item.total}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(184, 154, 100, 0.15)', paddingTop: '12px', fontSize: '15px', fontWeight: 700, color: 'var(--color-brass)' }}>
                  <span>Total Amount Paid / Payable</span>
                  <span>₹{order.grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
                <Link
                  to="/"
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
                    textDecoration: 'none',
                  }}
                >
                  <Home size={15} />
                  <span>Home</span>
                </Link>

                <a
                  href={`tel:${RESTAURANT.phone.e164}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(38, 31, 26, 0.9)',
                    border: '1px solid rgba(184, 154, 100, 0.35)',
                    color: 'var(--color-text-inverse)',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={15} color="var(--color-brass)" />
                  <span>Call Restaurant Desk</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <PageClosingCta />
    </>
  )
}
