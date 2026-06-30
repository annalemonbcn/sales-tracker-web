import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import {
  UNASSIGNED_ASSIGNEE_FILTER_VALUE,
  UNASSIGNED_ASSIGNEE_SEARCH_VALUE,
  type BusinessFilters,
} from '../domain/businessFilters.model';
import type { GetBusinessesResponseDto } from './businesses.dto';

const salesTrackerApi = getSalesTrackerAPI();

const mapAssignedToIdFilterToApi = (
  assignedToId: string | null,
): string | undefined => {
  if (!assignedToId) return undefined;

  if (assignedToId === UNASSIGNED_ASSIGNEE_FILTER_VALUE) {
    return UNASSIGNED_ASSIGNEE_SEARCH_VALUE;
  }

  return assignedToId;
};

const mapBusinessFiltersToParams = (filters: BusinessFilters) => ({
  status: filters.status ?? undefined,
  category: filters.category ?? undefined,
  priority: filters.priority ?? undefined,
  source: filters.source ?? undefined,
  assignedToId: mapAssignedToIdFilterToApi(filters.assignedToId),
  search: filters.search || undefined,
});

export const businessesClient = {
  getAll: async (filters: BusinessFilters): Promise<GetBusinessesResponseDto> =>
    salesTrackerApi.getBusinesses(mapBusinessFiltersToParams(filters)),
};
