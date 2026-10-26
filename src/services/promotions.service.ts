import { ApiClient } from './apiClient';
import type { Promotion } from '../types/api';
import { OFFERS_CONFIG } from '../content/offers';

export const promotionsService = {
  getPromotions: async (): Promise<Promotion[]> => {
    try {
      const res = await ApiClient.get<{ success: boolean; promotions: any[] }>('/promotions');
      if (res.success && Array.isArray(res.promotions) && res.promotions.length > 0) {
        return res.promotions.filter((p) => p.isActive !== false);
      }
      throw new Error('Fallback to local offers');
    } catch {
      return (OFFERS_CONFIG.items || []).map((o, idx: number) => ({
        id: o.id || `offer-${idx}`,
        title: o.title,
        subtitle: o.description || 'Special Promotion',
        price: 0,
        originalPrice: 0,
        serves: '2-4 Guests',
        badge: o.code || 'Special',
        items: o.terms || [],
        image: o.image || '',
        isActive: true,
        displayOrder: idx,
      }));
    }
  },
};
