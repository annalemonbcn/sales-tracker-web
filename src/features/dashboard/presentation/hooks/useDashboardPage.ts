import { useState } from 'react';

import { useBusinesses } from '@/features/businesses/application/useBusinesses';
import {
  initialBusinessFilters,
  type BusinessFilters,
} from '@/features/businesses/domain/businessFilters.model';

import { useDashboardSummary } from '../../application/useDashboardSummary';
import { useUsers } from '@/features/users/application/useUsers';

export const useDashboardPage = () => {
  const [businessFilters, setBusinessFilters] = useState<BusinessFilters>(
    initialBusinessFilters,
  );

  const {
    data: summary,
    isError: isSummaryError,
    isFetching: isSummaryLoading,
  } = useDashboardSummary();

  const {
    data: businesses = [],
    isError: isBusinessesError,
    isFetching: isBusinessesLoading,
  } = useBusinesses(businessFilters);

  const {
    data: users = [],
    isError: isUsersError,
    isFetching: isUsersLoading,
  } = useUsers();

  const isLoading = isSummaryLoading || isBusinessesLoading || isUsersLoading;
  const isError = isSummaryError || isBusinessesError || isUsersError;

  return {
    summary,
    businesses,
    users,
    businessFilters,
    setBusinessFilters,
    isLoading,
    isError,
    isBusinessesLoading,
  };
};
