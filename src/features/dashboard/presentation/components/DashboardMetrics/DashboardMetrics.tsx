import { DashboardMetricCard } from '../DashboardMetricCard';

import styles from './DashboardMetrics.module.css';
import type { DashboardMetricsProps } from './types';
import { dashboardMetricCards } from './dashboardMetricCards';

export const DashboardMetrics = ({ summary }: DashboardMetricsProps) => (
  <section className={styles.metrics}>
    {dashboardMetricCards.map(({ key, title, icon: Icon, variant }) => {
      const metric = summary[key];

      return (
        <DashboardMetricCard
          key={key}
          currentMonth={metric.currentMonth}
          icon={<Icon size={24} />}
          title={title}
          trendVariant={metric.trendVariant}
          value={metric.value}
          variant={variant}
        />
      );
    })}
  </section>
);
