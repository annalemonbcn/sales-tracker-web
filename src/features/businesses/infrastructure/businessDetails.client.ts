import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type {
  GetBusinessDetailsResponseDto,
  UpdateBusinessRequestDto,
  UpdateBusinessResponseDto,
} from './businessDetails.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const businessDetailsClient = {
  getById: async (businessId: string): Promise<GetBusinessDetailsResponseDto> =>
    salesTrackerApi.getBusiness(businessId),

  update: async (
    businessId: string,
    data: UpdateBusinessRequestDto,
  ): Promise<UpdateBusinessResponseDto> =>
    salesTrackerApi.updateBusiness(businessId, data),
};
