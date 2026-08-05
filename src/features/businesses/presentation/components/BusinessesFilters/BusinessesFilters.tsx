import { FiltersBar } from '@/shared/ui';

import type { BusinessSelectFilterKey } from './types';
import { useBusinessesFilters } from './useBusinessesFilters';

type BusinessesFiltersProps = {
  isBusinessesFetching: boolean;
};

const filtersToUse = [
  'status',
  'category',
  'priority',
  'source',
  'assignedToId',
] satisfies BusinessSelectFilterKey[];

export const BusinessesFilters = ({
  isBusinessesFetching,
}: BusinessesFiltersProps) => {
  const { clearFilters, filterSelects, isClearButtonDisabled } =
    useBusinessesFilters({ isBusinessesFetching, filtersToUse });

  return (
    <FiltersBar
      ariaLabel="Business filters"
      clearFilters={clearFilters}
      filterSelects={filterSelects}
      isClearButtonDisabled={isClearButtonDisabled}
    />
  );
};
