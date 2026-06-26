import type { ComponentType } from 'react';

import type { DashboardSummary } from '@/features/dashboard/domain/dashboardSummary.model';
import type { DashboardMetricCardVariant } from '../DashboardMetricCard/types';

export type DashboardMetricKey = keyof DashboardSummary;

export type DashboardMetricCardConfig = {
  key: DashboardMetricKey;
  title: string;
  icon: ComponentType<{ size?: number }>;
  variant?: DashboardMetricCardVariant;
};

export type DashboardMetricsProps = {
  summary: DashboardSummary;
};
