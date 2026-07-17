import type { ReactNode } from 'react';

import type { FollowUpListFilters } from '@/features/follow-ups/domain/followUpFilters.model';
import {
  initialFollowUpListFilters,
  mapFollowUpListFiltersToSearch,
  mapSearchToFollowUpListFilters,
} from '@/features/follow-ups/domain/followUpFilters.model';
import { Route } from '@/routes/tasks';
import { FollowUpsFiltersContext } from './FollowUpsFiltersContext';

type FollowUpsFiltersProviderProps = {
  children: ReactNode;
};

export const FollowUpsFiltersProvider = ({
  children,
}: FollowUpsFiltersProviderProps) => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const filters = mapSearchToFollowUpListFilters(search);

  const updateFilters = (nextFilters: FollowUpListFilters) => {
    navigate({
      search: () => mapFollowUpListFiltersToSearch(nextFilters),
    });
  };

  const updateFilter = <Key extends keyof FollowUpListFilters>(
    key: Key,
    value: FollowUpListFilters[Key],
  ) => {
    updateFilters({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    updateFilters(initialFollowUpListFilters);
  };

  return (
    <FollowUpsFiltersContext.Provider
      value={{
        clearFilters,
        filters,
        updateFilter,
        updateFilters,
      }}
    >
      {children}
    </FollowUpsFiltersContext.Provider>
  );
};
