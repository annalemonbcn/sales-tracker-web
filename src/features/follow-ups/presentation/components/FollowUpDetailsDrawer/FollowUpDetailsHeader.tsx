import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { Badge } from '@/shared/ui';
import { ClockAlert } from 'lucide-react';

import styles from './FollowUpDetailsDrawer.module.css';
import {
  followUpTypeLabelMap,
  followUpTypeVariantMap,
} from '../FollowUpsTable/followUpsTableFormatters';

type FollowUpDetailsHeaderProps = {
  followUp: FollowUpTask;
};

export const FollowUpDetailsHeader = ({
  followUp,
}: FollowUpDetailsHeaderProps) => (
  <div className={styles.headerContent}>
    <h2 className={styles.title}>{followUp.title}</h2>

    <div className={styles.headerBadges}>
      {followUp.isOverdue ? (
        <Badge variant="overdue">
          <ClockAlert aria-hidden="true" size={14} />
          Overdue
        </Badge>
      ) : null}

      <Badge variant={followUpTypeVariantMap[followUp.type]}>
        {followUpTypeLabelMap[followUp.type]}
      </Badge>
    </div>
  </div>
);
