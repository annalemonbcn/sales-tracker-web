import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { GetBusinessDetailsResponseDto } from './businessDetails.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const businessDetailsClient = {
  getById: async (businessId: string): Promise<GetBusinessDetailsResponseDto> =>
    salesTrackerApi.getBusinessesBusinessId(businessId),
};
