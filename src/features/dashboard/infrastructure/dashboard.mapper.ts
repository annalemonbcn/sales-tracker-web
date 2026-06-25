import type { DashboardMetric } from '@/shared/api/generated/salesTrackerApi';

import type {
  DashboardSummary,
  DashboardSummaryMetric,
  DashboardTrendVariant,
} from '../domain/dashboardSummary.model';
import type { DashboardSummaryDto } from './dashboard.dto';

const mapTrendVariantDtoToDomain = (
  trendVariant?: DashboardMetric['trendVariant'],
): DashboardTrendVariant => trendVariant ?? 'neutral';

const mapDashboardMetricDtoToDomain = (
  metric?: DashboardMetric,
): DashboardSummaryMetric => ({
  value: metric?.value ?? 0,
  currentMonth: metric?.currentMonth ?? 0,
  trendVariant: mapTrendVariantDtoToDomain(metric?.trendVariant),
});

export const mapDashboardSummaryDtoToDomain = (
  dto: DashboardSummaryDto,
): DashboardSummary => {
  const metrics = dto.data?.metrics;

  return {
    totalBusinesses: mapDashboardMetricDtoToDomain(metrics?.totalBusinesses),
    contactedBusinesses: mapDashboardMetricDtoToDomain(
      metrics?.contactedBusinesses,
    ),
    pendingFollowUps: mapDashboardMetricDtoToDomain(metrics?.pendingFollowUps),
    highPriorityBusinesses: mapDashboardMetricDtoToDomain(
      metrics?.highPriorityBusinesses,
    ),
  };
};
