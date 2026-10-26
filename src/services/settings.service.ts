import { ApiClient } from './apiClient';
import type { RestaurantSettings } from '../types/api';
import { RESTAURANT } from '../content/restaurant';

export const settingsService = {
  getSettings: async (): Promise<RestaurantSettings> => {
    try {
      const res = await ApiClient.get<{ success: boolean; settings: any }>('/settings');
      if (res.success && res.settings) {
        return res.settings;
      }
      throw new Error('Fallback to local settings');
    } catch {
      return {
        restaurantName: RESTAURANT.name,
        tagline: RESTAURANT.tagline,
        eyebrow: 'Pure Vegetarian Dining',
        description: 'Authentic pure vegetarian restaurant in Shyam Nagar, Kanpur.',
        address: `${RESTAURANT.address.line1}, ${RESTAURANT.address.locality}, ${RESTAURANT.address.city}`,
        phone: RESTAURANT.phone.e164,
        whatsapp: RESTAURANT.phone.e164,
        email: 'info@hestiiya.com',
        openingHours: RESTAURANT.hours.displayText,
        timezone: 'Asia/Kolkata',
        currency: 'INR',
        currencySymbol: '₹',
        taxRatePercent: 5,
        deliveryFee: 40,
        minOrderValue: 200,
        orderAcceptanceEnabled: true,
        tableReservationEnabled: true,
        invoicePrefix: 'HST',
        zomatoRating: '4.4',
      };
    }
  },
};
