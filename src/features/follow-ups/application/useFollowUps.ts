import { useQuery } from '@tanstack/react-query';

import type { FollowUpFilters } from '../domain/followUpFilters.model';
import { getFollowUps } from '../infrastructure/followUps.api';
import { followUpsQueryKeys } from './followUps.queryKeys';

export const useFollowUps = (filters: FollowUpFilters) =>
  useQuery({
    queryKey: followUpsQueryKeys.list(filters),
    queryFn: () => getFollowUps(filters),
  });
