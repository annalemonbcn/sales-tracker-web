import type { DashboardTrendVariant } from '@/features/dashboard/domain/dashboardSummary.model';
import type { ReactNode } from 'react';

export type DashboardMetricCardVariant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

export type DashboardMetricCardProps = {
  title: string;
  value: number;
  currentMonth: number;
  icon: ReactNode;
  variant?: DashboardMetricCardVariant;
  trendVariant: DashboardTrendVariant;
};
