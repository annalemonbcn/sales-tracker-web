import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { GetBusinessesResponseDto } from './businesses.dto';
import type { BusinessFilters } from '../domain/businessFilters.model';

const salesTrackerApi = getSalesTrackerAPI();

const mapBusinessFiltersToParams = (filters: BusinessFilters) => ({
  status: filters.status ?? undefined,
  priority: filters.priority ?? undefined,
  assignedToId: filters.assignedToId ?? undefined,
});

export const businessesClient = {
  getAll: async (filters: BusinessFilters): Promise<GetBusinessesResponseDto> =>
    salesTrackerApi.getBusinesses(mapBusinessFiltersToParams(filters)),
};
