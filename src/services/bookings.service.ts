import { ApiClient } from './apiClient';
import type { CreateBookingDto, CreateBookingResponse, BookingConfirmationDetails } from '../types/api';

export const bookingsService = {
  createBooking: async (dto: CreateBookingDto): Promise<CreateBookingResponse> => {
    const payload = {
      ...dto,
      name: (dto as any).name || dto.customerName,
      customerName: dto.customerName || (dto as any).name,
      requests: (dto as any).requests || dto.specialRequests,
      specialRequests: dto.specialRequests || (dto as any).requests,
    };
    return ApiClient.post<CreateBookingResponse>('/bookings', payload);
  },

  verifyBooking: async (ref: string): Promise<{ success: boolean; confirmation: BookingConfirmationDetails }> => {
    return ApiClient.get<{ success: boolean; confirmation: BookingConfirmationDetails }>(`/bookings/verify/${encodeURIComponent(ref)}`);
  },
};
