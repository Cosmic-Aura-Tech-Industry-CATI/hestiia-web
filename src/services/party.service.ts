import { ApiClient } from './apiClient';
import type { CreatePartyInquiryDto, PartyInquiryResponse } from '../types/api';

export const partyService = {
  createInquiry: async (dto: CreatePartyInquiryDto): Promise<{ success: boolean; inquiry: PartyInquiryResponse; message: string }> => {
    return ApiClient.post<{ success: boolean; inquiry: PartyInquiryResponse; message: string }>('/party-inquiries', dto);
  },
};
