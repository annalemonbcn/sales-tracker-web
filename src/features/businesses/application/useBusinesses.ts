import { useQuery } from '@tanstack/react-query';

import { getBusinesses } from '../infrastructure/businesses.api';
import type { BusinessFilters } from '../domain/businessFilters.model';
import { businessesQueryKeys } from './businesses.queryKeys';

export const useBusinesses = (filters: BusinessFilters) =>
  useQuery({
    queryKey: businessesQueryKeys.list(filters),
    queryFn: () => getBusinesses(filters),
  });
