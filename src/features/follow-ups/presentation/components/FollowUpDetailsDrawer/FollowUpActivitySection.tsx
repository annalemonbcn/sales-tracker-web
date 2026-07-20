import { CalendarDays, ClipboardCheck, UserRound } from 'lucide-react';

import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';

import styles from './FollowUpDetailsDrawer.module.css';
import { formatFollowUpDueDate } from '../FollowUpsTable/followUpsTableFormatters';

type FollowUpActivitySectionProps = {
  followUp: FollowUpTask;
};

export const FollowUpActivitySection = ({
  followUp,
}: FollowUpActivitySectionProps) => (
  <section className={styles.section}>
    <div className={styles.sectionHeader}>
      <h3 className={styles.sectionTitle}>Activity</h3>
      <button className={styles.sectionAction} type="button">
        View all
      </button>
    </div>

    <ol className={styles.activityList}>
      <li className={styles.activityItem}>
        <span className={styles.activityIcon}>
          <ClipboardCheck size={14} />
        </span>
        <div>
          <strong>Task created</strong>
          <p>{formatFollowUpDueDate(followUp.createdAt)}</p>
        </div>
      </li>

      <li className={styles.activityItem}>
        <span className={styles.activityIcon}>
          <UserRound size={14} />
        </span>
        <div>
          <strong>Assigned to {followUp.assignedTo.name}</strong>
          <p>{followUp.business.name}</p>
        </div>
      </li>

      <li className={styles.activityItem}>
        <span className={styles.activityIcon}>
          <CalendarDays size={14} />
        </span>
        <div>
          <strong>Reminder set</strong>
          <p>{formatFollowUpDueDate(followUp.dueDate)}</p>
        </div>
      </li>
    </ol>
  </section>
);
