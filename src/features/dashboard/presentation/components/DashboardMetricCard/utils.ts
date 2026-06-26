import type { DashboardMetricCardVariant } from './types';
import styles from './DashboardMetricCard.module.css';
import type { DashboardTrendVariant } from '@/features/dashboard/domain/dashboardSummary.model';

export const iconVariantClassNameByVariant: Record<
  DashboardMetricCardVariant,
  string
> = {
  primary: styles.iconPrimary,
  success: styles.iconSuccess,
  warning: styles.iconWarning,
  danger: styles.iconDanger,
};

export const trendVariantClassNameByVariant: Record<
  DashboardTrendVariant,
  string
> = {
  success: styles.trendSuccess,
  warning: styles.trendWarning,
  danger: styles.trendDanger,
  neutral: styles.trendNeutral,
};
