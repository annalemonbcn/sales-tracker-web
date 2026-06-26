import { ErrorState, LoadingState } from '@/shared/ui';
import { useDashboardSummary } from '@/features/dashboard/application/useDashboardSummary';
import { DashboardMetrics } from '../DashboardMetrics';

export const DashboardMetricsSection = () => {
  const { data: summary, isError, isLoading } = useDashboardSummary();

  if (isLoading) {
    return <LoadingState message="Loading dashboard metrics..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load dashboard metrics"
        message="The rest of the dashboard may still be available."
      />
    );
  }

  if (!summary) {
    return (
      <ErrorState
        title="No dashboard metrics"
        message="The API did not return dashboard summary data."
      />
    );
  }

  return <DashboardMetrics summary={summary} />;
};
