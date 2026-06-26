import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { GetBusinessesResponseDto } from './businesses.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const businessesClient = {
  getAll: async (): Promise<GetBusinessesResponseDto> =>
    salesTrackerApi.getBusinesses(),
};
