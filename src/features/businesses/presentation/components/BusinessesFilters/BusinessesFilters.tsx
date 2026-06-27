import { BusinessesFiltersView } from './BusinessesFiltersView';
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
    <BusinessesFiltersView
      clearFilters={clearFilters}
      filterSelects={filterSelects}
      isClearButtonDisabled={isClearButtonDisabled}
    />
  );
};
