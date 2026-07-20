import { Ban, Check, RefreshCw } from 'lucide-react';

import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { cn } from '@/shared/lib/cn';
import { Button, Drawer } from '@/shared/ui';

import styles from './FollowUpDetailsDrawer.module.css';

type FollowUpDetailsFooterProps = {
  followUp: FollowUpTask;
  isCancelling: boolean;
  isMarkingComplete: boolean;
  isSavingFollowUpDetails: boolean;
  onCancel: () => void;
  onMarkComplete: () => void;
  onReschedule: () => void;
};

export const FollowUpDetailsFooter = ({
  followUp,
  isCancelling,
  isMarkingComplete,
  isSavingFollowUpDetails,
  onCancel,
  onMarkComplete,
  onReschedule,
}: FollowUpDetailsFooterProps) => (
  <Drawer.Footer className={styles.footer}>
    <Button
      className={styles.primaryAction}
      disabled={followUp.status === 'done' || isMarkingComplete}
      size="lg"
      onClick={onMarkComplete}
    >
      <Check size={18} />
      {isMarkingComplete
        ? 'Marking...'
        : followUp.status === 'done'
          ? 'Completed'
          : 'Mark complete'}
    </Button>

    <div className={styles.secondaryActions}>
      <Button
        className={styles.secondaryAction}
        disabled={isSavingFollowUpDetails}
        variant="secondary"
        onClick={onReschedule}
      >
        <RefreshCw size={16} />
        Reschedule
      </Button>

      <Button
        className={cn(styles.secondaryAction, styles.cancelAction)}
        disabled={followUp.status === 'cancelled' || isCancelling}
        variant="secondary"
        onClick={onCancel}
      >
        <Ban size={16} />
        {isCancelling
          ? 'Cancelling...'
          : followUp.status === 'cancelled'
            ? 'Cancelled'
            : 'Cancel'}
      </Button>
    </div>
  </Drawer.Footer>
);
