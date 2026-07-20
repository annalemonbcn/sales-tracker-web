import { CalendarDays, CheckCircle2, ClipboardList, Timer } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Card } from '@/shared/ui';

import styles from './FollowUpsMetricsSection.module.css';

const metricCards = [
  {
    icon: <ClipboardList size={24} />,
    title: 'Total tasks',
    value: '64',
    trend: '+12 this week',
    variant: 'primary',
  },
  {
    icon: <CalendarDays size={24} />,
    title: 'Due today',
    value: '9',
    trend: '+2 vs yesterday',
    variant: 'warning',
  },
  {
    icon: <Timer size={24} />,
    title: 'Overdue',
    value: '6',
    trend: '-1 vs yesterday',
    variant: 'danger',
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: 'Completed this week',
    value: '18',
    trend: '+4 vs last week',
    variant: 'success',
  },
] as const;

const metricIconClassByVariant = {
  danger: styles.metricIconDanger,
  primary: styles.metricIconPrimary,
  success: styles.metricIconSuccess,
  warning: styles.metricIconWarning,
};

export const FollowUpsMetricsSection = () => (
  <section className={styles.metrics} aria-label="Task overview">
    {metricCards.map((metric) => (
      <Card className={styles.metricCard} key={metric.title}>
        <div
          className={cn(
            styles.metricIcon,
            metricIconClassByVariant[metric.variant],
          )}
        >
          {metric.icon}
        </div>

        <div>
          <p className={styles.metricTitle}>{metric.title}</p>
          <strong className={styles.metricValue}>{metric.value}</strong>
          <p className={styles.metricTrend}>{metric.trend}</p>
        </div>
      </Card>
    ))}
  </section>
);
