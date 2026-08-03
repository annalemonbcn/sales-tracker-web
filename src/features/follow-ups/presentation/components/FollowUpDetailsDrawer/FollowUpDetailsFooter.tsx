import { Ban, Check, RefreshCw } from 'lucide-react';
import { useState } from 'react';

import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { cn } from '@/shared/lib/cn';
import { Button, Drawer } from '@/shared/ui';

import styles from './FollowUpDetailsDrawer.module.css';
import {
  FollowUpActionStepperModal,
  type FollowUpAction,
} from './FollowUpActionStepperModal';

type FollowUpDetailsFooterProps = {
  followUp: FollowUpTask;
  isCancelling: boolean;
  isMarkingComplete: boolean;
  isSavingFollowUpDetails: boolean;
  onCancel: (note?: string) => Promise<void>;
  onMarkComplete: (note?: string) => Promise<void>;
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
}: FollowUpDetailsFooterProps) => {
  const [activeAction, setActiveAction] = useState<FollowUpAction | null>(null);

  const markCompleteButton = (
    <Button
      className={
        followUp.isOverdue ? styles.secondaryAction : styles.primaryAction
      }
      disabled={followUp.status !== 'pending' || isMarkingComplete}
      size={followUp.isOverdue ? 'md' : 'lg'}
      onClick={() => {
        setActiveAction('complete');
      }}
    >
      <Check size={18} />
      {followUp.status === 'done' ? 'Completed' : 'Mark complete'}
    </Button>
  );
  const rescheduleButton = (
    <Button
      className={
        followUp.isOverdue ? styles.primaryAction : styles.secondaryAction
      }
      disabled={followUp.status !== 'pending' || isSavingFollowUpDetails}
      size={followUp.isOverdue ? 'lg' : 'md'}
      variant="secondary"
      onClick={onReschedule}
    >
      <RefreshCw size={followUp.isOverdue ? 18 : 16} />
      Reschedule
    </Button>
  );

  return (
    <>
      <Drawer.Footer className={styles.footer}>
        {followUp.isOverdue ? rescheduleButton : markCompleteButton}

        <div className={styles.secondaryActions}>
          {followUp.isOverdue ? markCompleteButton : rescheduleButton}

          <Button
            className={cn(styles.secondaryAction, styles.cancelAction)}
            disabled={
              followUp.status === 'done' ||
              followUp.status === 'cancelled' ||
              isCancelling
            }
            variant="secondary"
            onClick={() => {
              setActiveAction('cancel');
            }}
          >
            <Ban size={16} />
            {followUp.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
          </Button>
        </div>
      </Drawer.Footer>

      {activeAction ? (
        <FollowUpActionStepperModal
          action={activeAction}
          followUp={followUp}
          isOpen
          isSubmitting={
            activeAction === 'cancel' ? isCancelling : isMarkingComplete
          }
          onConfirm={activeAction === 'cancel' ? onCancel : onMarkComplete}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setActiveAction(null);
            }
          }}
        />
      ) : null}
    </>
  );
};
