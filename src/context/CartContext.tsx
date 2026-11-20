'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { CartItem, ApiFoodItem } from '../types/api';

interface CartContextType {
  items: CartItem[];
  isHydrated: boolean;
  addToCart: (dish: ApiFoodItem | { id: string; name: string; price: number; image?: string; isVeg?: boolean }, quantity?: number, notes?: string) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  subtotal: number;
  taxAmount: number;
  deliveryCharge: number;
  discountAmount: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  grandTotal: number;
  totalItemCount: number;
  getItemQuantity: (dishId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'hestiiya_web_cart';
const TAX_PERCENT = 5; // 5% GST on Restaurant Dining/Takeaway

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const hasHydratedRef = useRef(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Storage unavailable
    } finally {
      hasHydratedRef.current = true;
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydratedRef.current) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [items]);

  const addToCart = useCallback(
    (dish: ApiFoodItem | { id: string; name: string; price: number; image?: string; isVeg?: boolean }, quantity = 1, notes?: string) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.dishId === dish.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
            notes: notes || updated[existingIndex].notes,
          };
          return updated;
        }

        const dishImage = typeof dish.image === 'string' ? dish.image : (dish.image as any)?.srcSmall || (dish.image as any)?.src || '';

        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          quantity,
          image: dishImage,
          isVeg: (dish as any).isVeg !== false,
          notes,
        };
        return [...prev, newItem];
      });

      setIsCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((dishId: string) => {
    setItems((prev) => prev.filter((item) => item.dishId !== dishId));
  }, []);

  const updateQuantity = useCallback((dishId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.dishId !== dishId));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.dishId === dishId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode('');
    setDiscountPercent(0);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const getItemQuantity = useCallback(
    (dishId: string) => {
      const found = items.find((item) => item.dishId === dishId);
      return found ? found.quantity : 0;
    },
    [items]
  );

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (discountPercent <= 0) return 0;
    return Math.round((subtotal * discountPercent) / 100);
  }, [subtotal, discountPercent]);

  const taxableAmount = Math.max(0, subtotal - discountAmount);

  const taxAmount = useMemo(() => {
    return Math.round((taxableAmount * TAX_PERCENT) / 100);
  }, [taxableAmount]);

  const deliveryCharge = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 499 ? 0 : 40; // Free delivery above Rs. 499
  }, [subtotal]);

  const grandTotal = useMemo(() => {
    if (subtotal === 0) return 0;
    return taxableAmount + taxAmount + deliveryCharge;
  }, [subtotal, taxableAmount, taxAmount, deliveryCharge]);

  const totalItemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const applyPromoCode = useCallback(
    (code: string) => {
      const clean = code.trim().toUpperCase();
      if (clean === 'WELCOME10') {
        setPromoCode('WELCOME10');
        setDiscountPercent(10);
        return true;
      }
      if (clean === 'FEAST20' && subtotal >= 800) {
        setPromoCode('FEAST20');
        setDiscountPercent(20);
        return true;
      }
      return false;
    },
    [subtotal]
  );

  const removePromoCode = useCallback(() => {
    setPromoCode('');
    setDiscountPercent(0);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        isHydrated,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        subtotal,
        taxAmount,
        deliveryCharge,
        discountAmount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        grandTotal,
        totalItemCount,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
