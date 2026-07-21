import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui';

import panelStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessDetailsPanel.module.css';
import notesStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessNotes/BusinessNotes.module.css';

import styles from './FollowUpDetailsDrawer.module.css';
import type { NotesFormValues } from './useFollowUpDetailsDrawer';
import type { FormState, UseFormRegisterReturn } from 'react-hook-form';

type FollowUpNotesSectionProps = {
  followUp: FollowUpTask;
  isEditing: boolean;
  isEditable: boolean;
  isSaving: boolean;
  notesField: UseFormRegisterReturn<'note'>;
  notesFormState: FormState<NotesFormValues>;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: () => void;
};

export const FollowUpNotesSection = ({
  followUp,
  isEditing,
  isEditable,
  isSaving,
  notesField,
  notesFormState,
  onCancel,
  onEdit,
  onSubmit,
}: FollowUpNotesSectionProps) => (
  <section
    className={cn(
      panelStyles.section,
      panelStyles.sectionCard,
      styles.notesCard,
    )}
  >
    <div className={panelStyles.sectionHeader}>
      <h3 className={panelStyles.sectionTitle}>Notes</h3>
      {!isEditing ? (
        <button
          className={cn(panelStyles.sectionAction, styles.editAction)}
          disabled={!isEditable}
          type="button"
          onClick={onEdit}
        >
          Edit
        </button>
      ) : null}
    </div>

    {isEditing && isEditable ? (
      <form className={notesStyles.notesForm} onSubmit={onSubmit}>
        <label className={notesStyles.notesField}>
          <span>Notes</span>

          <textarea
            placeholder="Add useful context about this follow-up..."
            rows={5}
            {...notesField}
          />
        </label>

        <div className={notesStyles.notesFormActions}>
          <Button
            disabled={isSaving}
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button disabled={isSaving || !notesFormState.isDirty} type="submit">
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    ) : (
      <div className={notesStyles.notesBox}>
        {followUp.note || 'No notes were added for this follow-up.'}
      </div>
    )}
  </section>
);
