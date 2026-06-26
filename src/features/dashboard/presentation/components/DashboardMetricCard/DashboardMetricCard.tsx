import type { ReactNode } from 'react';

import { ArrowUp } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Card } from '@/shared/ui';

import type { DashboardTrendVariant } from '../../../domain/dashboardSummary.model';

import styles from './DashboardMetricCard.module.css';

type DashboardMetricCardVariant = 'primary' | 'success' | 'warning' | 'danger';

type DashboardMetricCardProps = {
  title: string;
  value: number;
  currentMonth: number;
  icon: ReactNode;
  variant?: DashboardMetricCardVariant;
  trendVariant: DashboardTrendVariant;
};

const iconVariantClassNameByVariant: Record<
  DashboardMetricCardVariant,
  string
> = {
  primary: styles.iconPrimary,
  success: styles.iconSuccess,
  warning: styles.iconWarning,
  danger: styles.iconDanger,
};

const trendVariantClassNameByVariant: Record<DashboardTrendVariant, string> = {
  success: styles.trendSuccess,
  warning: styles.trendWarning,
  danger: styles.trendDanger,
  neutral: styles.trendNeutral,
};

export const DashboardMetricCard = ({
  title,
  value,
  currentMonth,
  icon,
  variant = 'primary',
  trendVariant,
}: DashboardMetricCardProps) => (
  <Card className={styles.card}>
    <div
      className={cn(styles.iconWrapper, iconVariantClassNameByVariant[variant])}
    >
      {icon}
    </div>

    <div className={styles.content}>
      <p className={styles.title}>{title}</p>
      <strong className={styles.value}>{value}</strong>

      <p className={styles.trend}>
        <span
          className={cn(
            styles.trendValue,
            trendVariantClassNameByVariant[trendVariant],
          )}
        >
          <ArrowUp size={14} />
          {currentMonth}
        </span>

        <span>this month</span>
      </p>
    </div>
  </Card>
);
