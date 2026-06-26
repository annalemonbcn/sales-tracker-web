import { ArrowUp } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Card } from '@/shared/ui';

import styles from './DashboardMetricCard.module.css';
import type { DashboardMetricCardProps } from './types';
import {
  iconVariantClassNameByVariant,
  trendVariantClassNameByVariant,
} from './utils';

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
