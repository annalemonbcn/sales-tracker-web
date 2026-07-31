import { createContext, useContext } from 'react';

import type { BusinessFilters } from '@/features/businesses/domain/businessFilters.model';

export type DashboardBusinessFiltersContextValue = {
  filters: BusinessFilters;
  updateFilter: <Key extends keyof BusinessFilters>(
    key: Key,
    value: BusinessFilters[Key],
  ) => void;
  updateFilters: (filters: BusinessFilters) => void;
  clearFilters: () => void;
};

export const DashboardBusinessFiltersContext =
  createContext<DashboardBusinessFiltersContextValue | null>(null);

export const useDashboardBusinessFilters = () => {
  const context = useContext(DashboardBusinessFiltersContext);

  if (!context) {
    throw new Error(
      'useDashboardBusinessFilters must be used within DashboardBusinessFiltersProvider',
    );
  }

  return context;
};
