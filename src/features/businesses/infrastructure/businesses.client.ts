import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { BusinessFilters } from '../domain/businessFilters.model';
import type { GetBusinessesResponseDto } from './businesses.dto';

const salesTrackerApi = getSalesTrackerAPI();

const mapBusinessFiltersToParams = (filters: BusinessFilters) => ({
  status: filters.status ?? undefined,
  category: filters.category ?? undefined,
  priority: filters.priority ?? undefined,
  source: filters.source ?? undefined,
  assignedToId: filters.assignedToId ?? undefined,
  search: filters.search || undefined,
});

export const businessesClient = {
  getAll: async (filters: BusinessFilters): Promise<GetBusinessesResponseDto> =>
    salesTrackerApi.getBusinesses(mapBusinessFiltersToParams(filters)),
};
