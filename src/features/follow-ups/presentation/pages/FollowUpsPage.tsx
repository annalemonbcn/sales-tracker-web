import { useState } from 'react';

import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { FollowUpDetailsDrawer } from '@/features/follow-ups/presentation/components/FollowUpDetailsDrawer';
import { FollowUpsMetricsSection } from '@/features/follow-ups/presentation/components/FollowUpsMetricsSection';
import { FollowUpsSection } from '@/features/follow-ups/presentation/components/FollowUpsSection';
import { PageHeader } from '@/shared/ui';

import styles from './FollowUpsPage.module.css';

export const FollowUpsPage = () => {
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUpTask | null>(
    null,
  );

  return (
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

          <FollowUpsSection
            selectedFollowUpId={selectedFollowUp?.id ?? null}
            onFollowUpSelect={setSelectedFollowUp}
          />
        </div>
      </div>

      {selectedFollowUp ? (
        <FollowUpDetailsDrawer
          followUp={selectedFollowUp}
          onClose={() => {
            setSelectedFollowUp(null);
          }}
        />
      ) : null}
    </div>
  );
};
