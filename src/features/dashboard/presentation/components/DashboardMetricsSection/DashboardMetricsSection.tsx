import { ErrorState, LoadingState } from '@/shared/ui';
import { useDashboardSummary } from '@/features/dashboard/application/useDashboardSummary';
import { DashboardMetrics } from '../DashboardMetrics';

export const DashboardMetricsSection = () => {
  const { data: summary, isError, isLoading } = useDashboardSummary();

  if (isLoading) {
    return <LoadingState message="Loading overview..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="We couldn't load your overview"
        message="Your business list may still be available below."
      />
    );
  }

  if (!summary) {
    return (
      <ErrorState
        title="No overview data yet"
        message="Once you start adding business activity, your metrics will appear here."
      />
    );
  }

  return <DashboardMetrics summary={summary} />;
};
