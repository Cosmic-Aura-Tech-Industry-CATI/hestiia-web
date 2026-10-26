import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useRestaurant } from '../../context/RestaurantContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    subtotal,
    taxAmount,
    deliveryCharge,
    discountAmount,
    grandTotal,
    totalItemCount,
  } = useCart();
  const { isStoreOpen } = useRestaurant();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(10, 8, 7, 0.75)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#191410',
              borderLeft: '1px solid rgba(184, 154, 100, 0.25)',
              boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(184, 154, 100, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(184, 154, 100, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-brass, #B89A64)',
                  }}
                >
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif, "Cinzel", serif)',
                      fontSize: '18px',
                      color: 'var(--color-text-inverse, #F6EFE4)',
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    Dining Cart
                  </h3>
                  <span style={{ fontSize: '12px', color: 'rgba(246, 239, 228, 0.6)' }}>
                    {totalItemCount} {totalItemCount === 1 ? 'dish' : 'dishes'} selected
                  </span>
                </div>
              </div>

              <button
                onClick={closeCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(246, 239, 228, 0.7)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Store Paused Banner */}
            {!isStoreOpen && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '10px 16px',
                  fontSize: '12px',
                  color: '#F87171',
                  textAlign: 'center',
                }}
              >
                ⚠️ Online ordering is currently paused by the kitchen.
              </div>
            )}

            {/* Item List */}
            <div
              style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {items.length === 0 ? (
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'rgba(246, 239, 228, 0.6)',
                  }}
                >
                  <ShoppingBag size={48} color="rgba(184, 154, 100, 0.3)" style={{ marginBottom: '16px' }} />
                  <p style={{ margin: '0 0 12px', fontSize: '15px' }}>Your dining cart is empty</p>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/menu');
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid var(--color-brass, #B89A64)',
                      color: 'var(--color-brass, #B89A64)',
                      padding: '8px 18px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: 'rgba(38, 31, 26, 0.8)',
                      borderRadius: '10px',
                      border: '1px solid rgba(184, 154, 100, 0.15)',
                      padding: '12px 14px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          backgroundColor: '#120E0C',
                        }}
                      />
                    )}

                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {item.isVeg !== false && (
                          <span
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '2px',
                              border: '1px solid #2F7D4F',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#2F7D4F' }} />
                          </span>
                        )}
                        <h4
                          style={{
                            fontSize: '14px',
                            color: 'var(--color-text-inverse, #F6EFE4)',
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: 500,
                          }}
                        >
                          {item.name}
                        </h4>
                      </div>

                      <div style={{ marginTop: '4px', fontSize: '13px', color: 'var(--color-brass, #B89A64)', fontWeight: 600 }}>
                        ₹{item.price * item.quantity}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(24, 19, 16, 0.8)',
                        borderRadius: '6px',
                        border: '1px solid rgba(184, 154, 100, 0.2)',
                        padding: '3px 6px',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.dishId, item.quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-brass, #B89A64)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '2px',
                        }}
                      >
                        {item.quantity === 1 ? <Trash2 size={13} color="#EF4444" /> : <Minus size={13} />}
                      </button>

                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#F6EFE4', minWidth: '16px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.dishId, item.quantity + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-brass, #B89A64)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '2px',
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bill Summary & Checkout Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: '16px 20px',
                  backgroundColor: 'rgba(25, 20, 16, 0.95)',
                  borderTop: '1px solid rgba(184, 154, 100, 0.2)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(246, 239, 228, 0.7)' }}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ADE80' }}>
                      <span>Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(246, 239, 228, 0.7)' }}>
                    <span>Taxes & GST (5%)</span>
                    <span>₹{taxAmount}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(246, 239, 228, 0.7)' }}>
                    <span>Delivery Charge</span>
                    <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'var(--color-brass, #B89A64)',
                      fontWeight: 700,
                      fontSize: '16px',
                      paddingTop: '8px',
                      borderTop: '1px dashed rgba(184, 154, 100, 0.2)',
                    }}
                  >
                    <span>To Pay</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/cart');
                    }}
                    style={{
                      flex: 1,
                      padding: '11px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(38, 31, 26, 0.9)',
                      border: '1px solid rgba(184, 154, 100, 0.3)',
                      color: 'var(--color-brass, #B89A64)',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    View Cart
                  </button>

                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/checkout');
                    }}
                    disabled={!isStoreOpen}
                    style={{
                      flex: 1.5,
                      padding: '11px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-brass, #B89A64)',
                      border: 'none',
                      color: '#16110E',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      cursor: isStoreOpen ? 'pointer' : 'not-allowed',
                      opacity: isStoreOpen ? 1 : 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Checkout</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
