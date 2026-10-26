import { ApiClient } from './apiClient';
import type { CreateOrderDto, OrderResponse } from '../types/api';

export const ordersService = {
  createOrder: async (dto: CreateOrderDto): Promise<{ success: boolean; order: OrderResponse; message: string }> => {
    return ApiClient.post<{ success: boolean; order: OrderResponse; message: string }>('/orders', dto);
  },

  getOrder: async (orderNumber: string): Promise<{ success: boolean; order: OrderResponse }> => {
    return ApiClient.get<{ success: boolean; order: OrderResponse }>(`/orders/${orderNumber}`);
  },
};
