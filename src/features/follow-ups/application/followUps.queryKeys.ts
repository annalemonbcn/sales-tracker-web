import type { FollowUpFilters } from '../domain/followUpFilters.model';

const COMMON_KEYS = ['followUps'] as const;

export const followUpsQueryKeys = {
  all: COMMON_KEYS,
  lists: [...COMMON_KEYS, 'list'] as const,
  list: (filters: FollowUpFilters) =>
    [...followUpsQueryKeys.lists, filters] as const,
};
