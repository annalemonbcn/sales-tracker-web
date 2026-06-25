import { Building2, Flag, Phone, Timer } from 'lucide-react';

import type { DashboardSummary } from '../../domain/dashboardSummary.model';
import { DashboardMetricCard } from './DashboardMetricCard';

import styles from './DashboardMetrics.module.css';

type DashboardMetricsProps = {
  summary: DashboardSummary;
};

export const DashboardMetrics = ({ summary }: DashboardMetricsProps) => (
  <section className={styles.metrics}>
    <DashboardMetricCard
      currentMonth={summary.totalBusinesses.currentMonth}
      icon={<Building2 size={24} />}
      title="Total businesses"
      trendVariant={summary.totalBusinesses.trendVariant}
      value={summary.totalBusinesses.value}
    />

    <DashboardMetricCard
      currentMonth={summary.contactedBusinesses.currentMonth}
      icon={<Phone size={24} />}
      title="Contacted"
      trendVariant={summary.contactedBusinesses.trendVariant}
      value={summary.contactedBusinesses.value}
      variant="success"
    />

    <DashboardMetricCard
      currentMonth={summary.pendingFollowUps.currentMonth}
      icon={<Timer size={24} />}
      title="Pending follow-ups"
      trendVariant={summary.pendingFollowUps.trendVariant}
      value={summary.pendingFollowUps.value}
      variant="warning"
    />

    <DashboardMetricCard
      currentMonth={summary.highPriorityBusinesses.currentMonth}
      icon={<Flag size={24} />}
      title="High priority"
      trendVariant={summary.highPriorityBusinesses.trendVariant}
      value={summary.highPriorityBusinesses.value}
      variant="danger"
    />
  </section>
);
