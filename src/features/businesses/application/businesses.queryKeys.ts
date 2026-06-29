import type { BusinessFilters } from '../domain/businessFilters.model';

const COMMON_KEYS = ['businesses'] as const;

export const businessesQueryKeys = {
  all: COMMON_KEYS,
  lists: [...COMMON_KEYS, 'list'] as const,
  list: (filters: BusinessFilters) =>
    [...businessesQueryKeys.lists, filters] as const,
  details: [...COMMON_KEYS, 'detail'] as const,
  detail: (businessId: string) =>
    [...businessesQueryKeys.details, businessId] as const,
};
