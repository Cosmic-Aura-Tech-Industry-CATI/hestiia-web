/**
 * API Data Models & Frontend Contracts for Hestiiya Web
 * Perfectly synced with hestiiya-backend
 */

export interface ApiFoodItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  fullDescription?: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  isVeg: boolean;
  isSignature?: boolean;
  spiceLevel: 1 | 2 | 3;
  preparationTime?: string;
  ingredients?: string[];
  chefNote?: string;
  available: boolean;
  displayOrder?: number;
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder?: number;
  isActive: boolean;
}

export interface CartItem {
  id: string;
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isVeg?: boolean;
  notes?: string;
}

export interface OrderItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
}

export interface CreateOrderDto {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: string;
  fulfillmentType: 'dine-in' | 'pickup' | 'delivery';
  items: OrderItem[];
  paymentMethod: 'online' | 'cod' | 'upi';
  notes?: string;
  discountCode?: string;
}

export interface OrderStatusHistoryItem {
  status: string;
  timestamp: string;
  actor: string;
  note?: string;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: string;
  fulfillmentType: 'dine-in' | 'pickup' | 'delivery';
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  deliveryCharge: number;
  discountAmount: number;
  grandTotal: number;
  paymentMethod: 'online' | 'cod' | 'upi';
  paymentStatus: 'pending' | 'authorized' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'completed' | 'cancelled';
  notes?: string;
  statusHistory: OrderStatusHistoryItem[];
  invoiceNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingDto {
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  specialRequests?: string;
}

export interface BookingResponse {
  id: string;
  bookingRef?: string;
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  specialRequests?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'rescheduled' | 'rejected' | 'completed' | 'cancelled';
  allocatedTable?: string;
  holdPolicy?: string;
  createdAt: string;
}

export interface BookingConfirmationDetails {
  id: string;
  bookingRef: string;
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  specialRequests?: string;
  status: string;
  allocatedTable?: string;
  holdPolicy: string;
  restaurantDetails: {
    name: string;
    tagline: string;
    phone: string;
    address: string;
    city: string;
    landmark: string;
    mapQuery: string;
  };
  confirmedAt?: string;
  createdAt: string;
}

export interface CreateBookingResponse {
  success: boolean;
  bookingId: string;
  bookingRef: string;
  message: string;
  booking: BookingResponse;
  confirmation: BookingConfirmationDetails;
}

export interface CreatePartyInquiryDto {
  customerName: string;
  phone: string;
  email?: string;
  eventType: 'birthday' | 'anniversary' | 'corporate' | 'family_gathering' | 'other';
  preferredDate: string;
  guestCount: number;
  budgetRange?: string;
  specialRequirements?: string;
}

export interface PartyInquiryResponse {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  eventType: string;
  preferredDate: string;
  guestCount: number;
  status: string;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  dishName?: string;
  source: 'website' | 'google' | 'direct';
  isApproved: boolean;
  staffReply?: string;
  createdAt: string;
}

export interface CreateReviewDto {
  customerName: string;
  rating: number;
  comment: string;
  dishName?: string;
}

export interface RestaurantSettings {
  restaurantName: string;
  tagline: string;
  eyebrow?: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  timezone: string;
  currency: string;
  currencySymbol: string;
  taxRatePercent: number;
  deliveryFee: number;
  minOrderValue: number;
  orderAcceptanceEnabled: boolean;
  tableReservationEnabled: boolean;
  invoicePrefix: string;
  zomatoRating?: string;
  socialInstagram?: string;
  socialFacebook?: string;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  serves: string;
  badge: string;
  items: string[];
  image: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  displayOrder: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  isFeatured: boolean;
  displayOrder: number;
}
