import type {
  DashboardMetric,
  DashboardMetricTrendVariant,
} from '@/shared/api/generated/salesTrackerApi';

export type DashboardTrendVariant = DashboardMetricTrendVariant;

export type DashboardSummaryMetric = DashboardMetric;

export type DashboardSummary = {
  totalBusinesses: DashboardSummaryMetric;
  contactedBusinesses: DashboardSummaryMetric;
  pendingFollowUps: DashboardSummaryMetric;
  highPriorityBusinesses: DashboardSummaryMetric;
};
