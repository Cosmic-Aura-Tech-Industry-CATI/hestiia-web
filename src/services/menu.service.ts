import { ApiClient } from './apiClient';
import type { ApiFoodItem, ApiCategory } from '../types/api';
import { DISHES, MENU_CATEGORIES } from '../content/menu';

export const menuService = {
  getDishes: async (params?: { category?: string; search?: string }): Promise<ApiFoodItem[]> => {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.set('category', params.category);
      if (params?.search) query.set('search', params.search);

      const res = await ApiClient.get<{ success: boolean; dishes: any[] }>(`/menu?${query.toString()}`);
      if (res.success && Array.isArray(res.dishes) && res.dishes.length > 0) {
        return res.dishes.map((d) => ({
          id: d.id || d._id,
          name: d.name,
          slug: d.slug,
          category: d.category,
          description: d.description || '',
          fullDescription: d.fullDescription,
          price: Number(d.price) || 0,
          compareAtPrice: d.compareAtPrice ? Number(d.compareAtPrice) : undefined,
          image: d.image || '',
          isVeg: d.isVeg !== false,
          isSignature: Boolean(d.isSignature),
          spiceLevel: d.spiceLevel || 1,
          preparationTime: d.preparationTime,
          ingredients: d.ingredients || [],
          chefNote: d.chefNote,
          available: d.available !== false,
          displayOrder: d.displayOrder || 0,
        }));
      }
      throw new Error('Fallback to local dishes');
    } catch {
      // Graceful Fallback to bundled local content
      return DISHES.map((d, index) => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        category: d.categoryId,
        description: d.description,
        fullDescription: d.detail?.story,
        price: d.price,
        compareAtPrice: undefined,
        image: d.image?.srcSmall || d.image?.src || '',
        isVeg: true,
        isSignature: d.popular,
        spiceLevel: (d.spiceLevel as 1 | 2 | 3) || 1,
        preparationTime: '15-20 mins',
        ingredients: d.detail?.ingredients || [],
        chefNote: undefined,
        available: true,
        displayOrder: index,
      }));
    }
  },

  getCategories: async (): Promise<ApiCategory[]> => {
    try {
      const res = await ApiClient.get<{ success: boolean; categories: any[] }>('/categories');
      if (res.success && Array.isArray(res.categories) && res.categories.length > 0) {
        return res.categories.map((c) => ({
          id: c.id || c.slug,
          name: c.name,
          slug: c.slug,
          description: c.description,
          displayOrder: c.displayOrder || 0,
          isActive: c.isActive !== false,
        }));
      }
      throw new Error('Fallback to local categories');
    } catch {
      return MENU_CATEGORIES.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.id,
        description: c.seoIntro,
        displayOrder: c.order,
        isActive: true,
      }));
    }
  },
};
