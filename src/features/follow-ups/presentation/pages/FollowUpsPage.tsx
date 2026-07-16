import { FollowUpsMetricsSection } from '@/features/follow-ups/presentation/components/FollowUpsMetricsSection';
import { FollowUpsSection } from '@/features/follow-ups/presentation/components/FollowUpsSection';
import { PageHeader } from '@/shared/ui';

import styles from './FollowUpsPage.module.css';

export const FollowUpsPage = () => (
  <div className={styles.page}>
    <PageHeader
      actionLabel="New task"
      subtitle="Manage follow-ups, meetings, reminders and sales to-dos."
      title="Tasks"
      onActionClick={() => {}}
    />

    <div className={styles.body}>
      <div className={styles.mainContent}>
        <FollowUpsMetricsSection />

        <FollowUpsSection />
      </div>
    </div>
  </div>
);
