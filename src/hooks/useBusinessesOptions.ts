import { useMemo } from 'react';

import { useBusinesses } from '@/features/businesses/application/useBusinesses';
import { initialBusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import type { SelectOption } from '@/shared/ui';

export const useBusinessesOptions = () => {
  const {
    data: businesses = [],
    isError,
    isLoading,
  } = useBusinesses(initialBusinessFilters);

  const businessOptions = useMemo<SelectOption[]>(
    () =>
      businesses.map((business) => ({
        label: business.name,
        value: business.id,
      })),
    [businesses],
  );

  return {
    businessOptions,
    isBusinessOptionsError: isError,
    isBusinessOptionsLoading: isLoading,
    isBusinessSelectDisabled: isLoading || isError,
  };
};
