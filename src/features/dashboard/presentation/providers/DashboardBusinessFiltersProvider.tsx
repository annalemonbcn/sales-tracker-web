import { createContext, useContext, type ReactNode } from 'react';

import type { BusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import {
  initialBusinessFilters,
  mapBusinessFiltersToSearch,
  mapSearchToBusinessFilters,
} from '@/features/businesses/domain/businessFilters.model';
import { Route } from '@/routes/dashboard';

type DashboardBusinessFiltersContextValue = {
  filters: BusinessFilters;
  updateFilter: <Key extends keyof BusinessFilters>(
    key: Key,
    value: BusinessFilters[Key],
  ) => void;
  updateFilters: (filters: BusinessFilters) => void;
  clearFilters: () => void;
};

const DashboardBusinessFiltersContext =
  createContext<DashboardBusinessFiltersContextValue | null>(null);

type DashboardBusinessFiltersProviderProps = {
  children: ReactNode;
};

export const DashboardBusinessFiltersProvider = ({
  children,
}: DashboardBusinessFiltersProviderProps) => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const filters = mapSearchToBusinessFilters(search);

  const updateFilters = (nextFilters: BusinessFilters) => {
    navigate({
      search: () => mapBusinessFiltersToSearch(nextFilters),
    });
  };

  const updateFilter = <Key extends keyof BusinessFilters>(
    key: Key,
    value: BusinessFilters[Key],
  ) => {
    updateFilters({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    updateFilters(initialBusinessFilters);
  };

  return (
    <DashboardBusinessFiltersContext.Provider
      value={{
        filters,
        updateFilter,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </DashboardBusinessFiltersContext.Provider>
  );
};

export const useDashboardBusinessFilters = () => {
  const context = useContext(DashboardBusinessFiltersContext);

  if (!context) {
    throw new Error(
      'useDashboardBusinessFilters must be used within DashboardBusinessFiltersProvider',
    );
  }

  return context;
};
