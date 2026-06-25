import type { ReactNode } from 'react';

import { Card } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

import styles from './DashboardMetricCard.module.css';

type DashboardMetricCardVariant = 'primary' | 'success' | 'warning' | 'danger';

type DashboardMetricCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  variant?: DashboardMetricCardVariant;
};

export const DashboardMetricCard = ({
  title,
  value,
  icon,
  variant = 'primary',
}: DashboardMetricCardProps) => (
  <Card className={styles.card}>
    <div className={cn(styles.iconWrapper, styles[variant])}>{icon}</div>

    <div>
      <p className={styles.title}>{title}</p>
      <strong className={styles.value}>{value}</strong>
    </div>
  </Card>
);
