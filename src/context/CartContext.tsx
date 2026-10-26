import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { CartItem, ApiFoodItem } from '../types/api';

interface CartContextType {
  items: CartItem[];
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
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
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

        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          quantity,
          image: dish.image,
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
      const found = items.find((i) => i.dishId === dishId);
      return found ? found.quantity : 0;
    },
    [items]
  );

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const totalItemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const taxAmount = useMemo(() => {
    return Math.round((subtotal * TAX_PERCENT) / 100);
  }, [subtotal]);

  // Delivery fee: ₹40 if subtotal > 0 and < ₹500, free delivery over ₹500
  const deliveryCharge = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 500 ? 0 : 40;
  }, [subtotal]);

  const discountAmount = useMemo(() => {
    if (discountPercent <= 0) return 0;
    return Math.round((subtotal * discountPercent) / 100);
  }, [subtotal, discountPercent]);

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal + taxAmount + deliveryCharge - discountAmount);
  }, [subtotal, taxAmount, deliveryCharge, discountAmount]);

  const applyPromoCode = useCallback((code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HESTIIYA10' || clean === 'WELCOME10') {
      setPromoCode(clean);
      setDiscountPercent(10);
      return true;
    }
    if (clean === 'FEAST20') {
      setPromoCode(clean);
      setDiscountPercent(20);
      return true;
    }
    return false;
  }, []);

  const removePromoCode = useCallback(() => {
    setPromoCode('');
    setDiscountPercent(0);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
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
