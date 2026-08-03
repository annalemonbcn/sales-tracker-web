import { Ban, Check, MessageSquareText } from 'lucide-react';
import { useState } from 'react';

import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { Button, Modal, Stepper, type StepperStep } from '@/shared/ui';

import styles from './FollowUpActionStepperModal.module.css';

export type FollowUpAction = 'cancel' | 'complete';

type FollowUpActionStepperModalProps = {
  action: FollowUpAction;
  followUp: FollowUpTask;
  isOpen: boolean;
  isSubmitting: boolean;
  onConfirm: (note?: string) => Promise<void>;
  onOpenChange: (isOpen: boolean) => void;
};

const steps: StepperStep[] = [
  {
    description: 'Review and confirm the action.',
    label: 'Confirmation',
  },
  {
    description: 'Add context for the activity timeline.',
    isOptional: true,
    label: 'Add a note',
  },
];

const actionContent = {
  cancel: {
    confirmation:
      'The task will be cancelled and removed from your pending work.',
    confirmLabel: 'Cancel task',
    description: 'Confirm the cancellation and optionally leave some context.',
    notePlaceholder: 'Why is this task being cancelled?',
    pendingLabel: 'Cancelling...',
    title: 'Cancel follow-up',
  },
  complete: {
    confirmation:
      'The task will be marked as complete and recorded in the activity timeline.',
    confirmLabel: 'Mark complete',
    description: 'Confirm completion and optionally add an outcome or summary.',
    notePlaceholder: 'Add the outcome or any useful context...',
    pendingLabel: 'Marking...',
    title: 'Complete follow-up',
  },
} satisfies Record<
  FollowUpAction,
  {
    confirmation: string;
    confirmLabel: string;
    description: string;
    notePlaceholder: string;
    pendingLabel: string;
    title: string;
  }
>;

export const FollowUpActionStepperModal = ({
  action,
  followUp,
  isOpen,
  isSubmitting,
  onConfirm,
  onOpenChange,
}: FollowUpActionStepperModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [note, setNote] = useState('');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const content = actionContent[action];

  const closeModal = () => {
    setActiveStep(0);
    setNote('');
    setSubmissionError(null);
    onOpenChange(false);
  };

  const confirmAction = async () => {
    const trimmedNote = note.trim();

    setSubmissionError(null);

    try {
      await onConfirm(trimmedNote || undefined);
      closeModal();
    } catch {
      setSubmissionError(
        'The action could not be completed. Please try again.',
      );
    }
  };

  return (
    <Modal
      description={content.description}
      isOpen={isOpen}
      title={content.title}
      onOpenChange={(nextIsOpen) => {
        if (nextIsOpen) {
          onOpenChange(true);
          return;
        }

        closeModal();
      }}
    >
      <Stepper activeStep={activeStep} steps={steps} />

      <div className={styles.body}>
        {activeStep === 0 ? (
          <div className={styles.confirmation}>
            <span
              className={
                action === 'cancel' ? styles.cancelIcon : styles.completeIcon
              }
              aria-hidden="true"
            >
              {action === 'cancel' ? <Ban size={24} /> : <Check size={24} />}
            </span>

            <div>
              <h3>
                {action === 'cancel'
                  ? 'Cancel this follow-up?'
                  : 'Mark this follow-up as complete?'}
              </h3>
              <p>{content.confirmation}</p>
              <strong>{followUp.title}</strong>
            </div>
          </div>
        ) : (
          <label className={styles.noteField}>
            <span className={styles.noteLabel}>
              <MessageSquareText aria-hidden="true" size={18} />
              Note
              <span>Optional</span>
            </span>
            <textarea
              autoFocus
              placeholder={content.notePlaceholder}
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
              }}
            />
            <small>You can continue without adding a note.</small>
            {submissionError ? (
              <p className={styles.submissionError} role="alert">
                {submissionError}
              </p>
            ) : null}
          </label>
        )}
      </div>

      <div className={styles.footer}>
        <Button
          disabled={isSubmitting}
          type="button"
          variant="secondary"
          onClick={closeModal}
        >
          Close
        </Button>

        <div className={styles.footerActions}>
          {activeStep === 1 ? (
            <Button
              type="button"
              variant="secondary"
              disabled={isSubmitting}
              onClick={() => {
                setActiveStep(0);
              }}
            >
              Back
            </Button>
          ) : null}

          {activeStep === 0 ? (
            <Button
              disabled={isSubmitting}
              type="button"
              onClick={() => {
                setActiveStep(1);
              }}
            >
              Continue
            </Button>
          ) : (
            <Button
              disabled={isSubmitting}
              type="button"
              variant={action === 'cancel' ? 'danger' : 'primary'}
              onClick={confirmAction}
            >
              {isSubmitting ? content.pendingLabel : content.confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
