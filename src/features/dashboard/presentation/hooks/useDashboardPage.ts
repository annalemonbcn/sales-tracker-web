import { useState } from 'react';

import { useBusinesses } from '@/features/businesses/application/useBusinesses';
import {
  initialBusinessFilters,
  type BusinessFilters,
} from '@/features/businesses/domain/businessFilters.model';

import { useDashboardSummary } from '../../application/useDashboardSummary';

export const useDashboardPage = () => {
  const [businessFilters, setBusinessFilters] = useState<BusinessFilters>(
    initialBusinessFilters,
  );

  const {
    data: summary,
    isError: isSummaryError,
    isLoading: isSummaryLoading,
  } = useDashboardSummary();

  const {
    data: businesses = [],
    isError: isBusinessesError,
    isFetching: isBusinessesFetching,
    isLoading: isBusinessesLoading,
  } = useBusinesses(businessFilters);

  const isLoading = isSummaryLoading || isBusinessesLoading;
  const isError = isSummaryError || isBusinessesError;

  return {
    summary,
    businesses,
    businessFilters,
    setBusinessFilters,
    isLoading,
    isError,
    isBusinessesFetching,
  };
};
