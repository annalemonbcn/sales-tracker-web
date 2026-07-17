import { useContext } from 'react';

import { FollowUpsFiltersContext } from './FollowUpsFiltersContext';

export const useFollowUpsFilters = () => {
  const context = useContext(FollowUpsFiltersContext);

  if (!context) {
    throw new Error(
      'useFollowUpsFilters must be used within FollowUpsFiltersProvider',
    );
  }

  return context;
};
