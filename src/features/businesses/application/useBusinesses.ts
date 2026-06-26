import { useQuery } from '@tanstack/react-query';

import { getBusinesses } from '../infrastructure/businesses.api';
import type { BusinessFilters } from '../domain/businessFilters.model';

const COMMON_KEYS = ['businesses'];

export const useBusinesses = (filters: BusinessFilters) =>
  useQuery({
    queryKey: [...COMMON_KEYS, 'useGetBusinesses', filters],
    queryFn: () => getBusinesses(filters),
  });
