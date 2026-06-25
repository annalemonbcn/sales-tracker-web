import { useBusinesses } from '@/features/businesses/application/useBusinesses';
import { useDashboardSummary } from '../../application/useDashboardSummary';

export const useDashboardPage = () => {
  const {
    data: summary,
    isError: isSummaryError,
    isLoading: isSummaryLoading,
  } = useDashboardSummary();

  const {
    data: businesses = [],
    isError: isBusinessesError,
    isLoading: isBusinessesLoading,
  } = useBusinesses();

  const isLoading = isSummaryLoading || isBusinessesLoading;
  const isError = isSummaryError || isBusinessesError;

  return {
    summary,
    businesses,
    isLoading,
    isError,
  };
};
