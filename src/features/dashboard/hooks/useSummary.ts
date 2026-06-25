import { useDashboardSummary } from '../application/useDashboardSummary';

const useSummary = () => {
  const { data, isError, isLoading } = useDashboardSummary();

  return { data, isError, isLoading };
};

export default useSummary;
