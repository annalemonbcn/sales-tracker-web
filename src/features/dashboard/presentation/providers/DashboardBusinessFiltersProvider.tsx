import type { ReactNode } from 'react';

import type { BusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import {
  initialBusinessFilters,
  mapBusinessFiltersToSearch,
  mapSearchToBusinessFilters,
} from '@/features/businesses/domain/businessFilters.model';
import { Route } from '@/routes/dashboard';
import { DashboardBusinessFiltersContext } from './DashboardBusinessFiltersContext';

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
