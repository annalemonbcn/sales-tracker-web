import { createContext } from 'react';

import type { FollowUpListFilters } from '@/features/follow-ups/domain/followUpFilters.model';

export type FollowUpsFiltersContextValue = {
  clearFilters: () => void;
  filters: FollowUpListFilters;
  updateFilter: <Key extends keyof FollowUpListFilters>(
    key: Key,
    value: FollowUpListFilters[Key],
  ) => void;
  updateFilters: (filters: FollowUpListFilters) => void;
};

export const FollowUpsFiltersContext =
  createContext<FollowUpsFiltersContextValue | null>(null);
