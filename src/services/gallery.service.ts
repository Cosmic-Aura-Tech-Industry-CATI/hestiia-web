import { ApiClient } from './apiClient';
import type { GalleryItem } from '../types/api';
import { GALLERY_ITEMS } from '../content/gallery';

export const galleryService = {
  getGallery: async (): Promise<GalleryItem[]> => {
    try {
      const res = await ApiClient.get<{ success: boolean; gallery: any[] }>('/gallery');
      if (res.success && Array.isArray(res.gallery) && res.gallery.length > 0) {
        return res.gallery;
      }
      throw new Error('Fallback to local gallery');
    } catch {
      return GALLERY_ITEMS.map((img, idx) => ({
        id: img.id || `img-${idx}`,
        title: img.title || 'Hestiiya Dining & Ambience',
        category: img.category || 'Dining',
        image: img.src || '',
        description: img.alt || '',
        isFeatured: idx < 3,
        displayOrder: idx,
      }));
    }
  },
};
