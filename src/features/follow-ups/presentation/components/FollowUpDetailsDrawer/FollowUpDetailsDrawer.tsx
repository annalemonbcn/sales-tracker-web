import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { Drawer } from '@/shared/ui';

import styles from './FollowUpDetailsDrawer.module.css';
import { FollowUpActivitySection } from './FollowUpActivitySection';
import { FollowUpBusinessDetailsCard } from './FollowUpBusinessDetailsCard';
import { FollowUpDetailsFooter } from './FollowUpDetailsFooter';
import { FollowUpDetailsHeader } from './FollowUpDetailsHeader';
import { FollowUpNotesSection } from './FollowUpNotesSection';
import { useFollowUpDetailsDrawer } from './useFollowUpDetailsDrawer';

type FollowUpDetailsDrawerProps = {
  followUp: FollowUpTask;
  onClose: () => void;
};

export const FollowUpDetailsDrawer = ({
  followUp,
  onClose,
}: FollowUpDetailsDrawerProps) => {
  const drawer = useFollowUpDetailsDrawer({ followUp });

  return (
    <Drawer
      ariaLabel="Close follow-up details"
      className={styles.drawer}
      onClose={onClose}
    >
      <Drawer.Header closeLabel="Close follow-up details" onClick={onClose}>
        <FollowUpDetailsHeader followUp={drawer.currentFollowUp} />
      </Drawer.Header>

      <Drawer.Body className={styles.content}>
        <FollowUpBusinessDetailsCard
          assigneeOptions={drawer.assigneeOptions}
          businessPriorityOptions={drawer.businessPriorityOptions}
          control={drawer.formControl}
          dueDateField={drawer.dueDateField}
          dueDateInputRef={drawer.dueDateInputRef}
          followUp={drawer.currentFollowUp}
          isAssigneeSelectDisabled={drawer.isAssigneeSelectDisabled}
          isDirty={drawer.formState.isDirty}
          isEditing={drawer.isEditingBusinessDetails}
          isSaving={drawer.isSavingBusinessDetails}
          isValid={drawer.formState.isValid}
          onCancel={drawer.stopEditingBusinessDetails}
          onEdit={drawer.editBusinessDetails}
          onSubmit={drawer.saveBusinessDetails}
        />

        <FollowUpNotesSection
          followUp={drawer.currentFollowUp}
          isEditing={drawer.isEditingNotes}
          isSaving={drawer.isSavingNotes}
          notesField={drawer.notesField}
          notesFormState={drawer.notesFormState}
          onCancel={drawer.stopEditingNotes}
          onEdit={drawer.editNotes}
          onSubmit={drawer.saveNotes}
        />

        <FollowUpActivitySection followUp={drawer.currentFollowUp} />
      </Drawer.Body>

      <FollowUpDetailsFooter
        followUp={drawer.currentFollowUp}
        isCancelling={drawer.isCancellingFollowUp}
        isMarkingComplete={drawer.isMarkingComplete}
        isSavingBusinessDetails={drawer.isSavingBusinessDetails}
        onCancel={drawer.cancelFollowUp}
        onMarkComplete={drawer.markComplete}
        onReschedule={drawer.reschedule}
      />
    </Drawer>
  );
};
