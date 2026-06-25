import { Building2, Flag, Phone, Timer } from 'lucide-react';

import type { DashboardSummary } from '../../domain/dashboardSummary.model';
import { DashboardMetricCard } from './DashboardMetricCard';

import styles from './DashboardMetrics.module.css';

type DashboardMetricsProps = {
  summary: DashboardSummary;
};

export const DashboardMetrics = ({ summary }: DashboardMetricsProps) => {
  console.log('summary', summary);
  return (
    <section className={styles.metrics}>
      <DashboardMetricCard
        icon={<Building2 size={24} />}
        title="Total businesses"
        value={summary.totalBusinesses.value}
      />

      <DashboardMetricCard
        icon={<Phone size={24} />}
        title="Contacted"
        value={summary.contactedBusinesses.value}
        variant="success"
      />

      <DashboardMetricCard
        icon={<Timer size={24} />}
        title="Pending follow-ups"
        value={summary.pendingFollowUps.value}
        variant="warning"
      />

      <DashboardMetricCard
        icon={<Flag size={24} />}
        title="High priority"
        value={summary.highPriorityBusinesses.value}
        variant="danger"
      />
    </section>
  );
};
