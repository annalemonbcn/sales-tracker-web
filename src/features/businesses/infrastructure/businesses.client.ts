import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { BusinessesDto } from './businesses.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const businessesClient = {
  getAll: async (): Promise<BusinessesDto> => salesTrackerApi.getBusinesses(),
};
