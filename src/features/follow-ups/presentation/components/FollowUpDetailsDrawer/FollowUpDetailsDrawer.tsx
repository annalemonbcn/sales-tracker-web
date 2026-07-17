import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import {
  getBadgeVariantByPriority,
  getPriorityLabel,
} from '@/features/businesses/presentation/lib/formatters';
import { Badge, Drawer } from '@/shared/ui';

import styles from './FollowUpDetailsDrawer.module.css';
import {
  followUpStatusLabelMap,
  followUpStatusVariantMap,
  followUpTypeLabelMap,
  followUpTypeVariantMap,
  formatFollowUpDueDate,
} from '../FollowUpsTable/followUpsTableFormatters';

type FollowUpDetailsDrawerProps = {
  followUp: FollowUpTask;
  onClose: () => void;
};

export const FollowUpDetailsDrawer = ({
  followUp,
  onClose,
}: FollowUpDetailsDrawerProps) => (
  <Drawer
    ariaLabel="Close follow-up details"
    className={styles.drawer}
    onClose={onClose}
  >
    <Drawer.Header closeLabel="Close follow-up details" onClick={onClose}>
      <div>
        <p className={styles.eyebrow}>Task details</p>
        <h2 className={styles.title}>{followUp.note || 'Follow-up task'}</h2>
      </div>
    </Drawer.Header>

    <Drawer.Body className={styles.content}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Overview</h3>

        <dl className={styles.detailsList}>
          <div>
            <dt>Status</dt>
            <dd>
              <Badge variant={followUpStatusVariantMap[followUp.status]}>
                {followUpStatusLabelMap[followUp.status]}
              </Badge>
            </dd>
          </div>

          <div>
            <dt>Type</dt>
            <dd>
              <Badge variant={followUpTypeVariantMap[followUp.type]}>
                {followUpTypeLabelMap[followUp.type]}
              </Badge>
            </dd>
          </div>

          <div>
            <dt>Due date</dt>
            <dd>{formatFollowUpDueDate(followUp.dueDate)}</dd>
          </div>

          <div>
            <dt>Assignee</dt>
            <dd>{followUp.assignedTo.name}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Business</h3>

        <dl className={styles.detailsList}>
          <div>
            <dt>Name</dt>
            <dd>{followUp.business.name}</dd>
          </div>

          <div>
            <dt>Priority</dt>
            <dd>
              <Badge
                variant={getBadgeVariantByPriority(followUp.business.priority)}
              >
                {getPriorityLabel(followUp.business.priority)}
              </Badge>
            </dd>
          </div>
        </dl>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Notes</h3>
        <p className={styles.notes}>
          {followUp.note || 'No notes were added for this follow-up.'}
        </p>
      </section>
    </Drawer.Body>
  </Drawer>
);
