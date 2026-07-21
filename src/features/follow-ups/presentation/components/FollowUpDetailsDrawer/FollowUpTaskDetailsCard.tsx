import {
  Controller,
  type Control,
  type UseFormRegisterReturn,
} from 'react-hook-form';

import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { getInitialsAvatarUrl } from '@/shared/lib/avatar';
import { cn } from '@/shared/lib/cn';
import { Button, Input, Select, type SelectOption } from '@/shared/ui';

import panelStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessDetailsPanel.module.css';
import businessOverviewStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessOverview/BusinessOverview.module.css';

import {
  followUpStatusLabelMap,
  formatFollowUpDueDate,
} from '../FollowUpsTable/followUpsTableFormatters';
import { FollowUpDetailField } from './FollowUpDetailField';
import styles from './FollowUpDetailsDrawer.module.css';
import type { FollowUpDetailsFormValues } from './useFollowUpDetailsDrawer';

type FollowUpTaskDetailsCardProps = {
  assigneeOptions: SelectOption[];
  control: Control<FollowUpDetailsFormValues>;
  dueDateField: UseFormRegisterReturn<'dueDate'>;
  dueDateInputRef: React.MutableRefObject<HTMLInputElement | null>;
  followUp: FollowUpTask;
  isEditable: boolean;
  isAssigneeSelectDisabled: boolean;
  isDirty: boolean;
  isEditing: boolean;
  isSaving: boolean;
  isValid: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: () => void;
};

export const FollowUpTaskDetailsCard = ({
  assigneeOptions,
  control,
  dueDateField,
  dueDateInputRef,
  followUp,
  isEditable,
  isAssigneeSelectDisabled,
  isDirty,
  isEditing,
  isSaving,
  isValid,
  onCancel,
  onEdit,
  onSubmit,
}: FollowUpTaskDetailsCardProps) => (
  <section
    className={cn(
      panelStyles.section,
      panelStyles.sectionCard,
      styles.followUpCard,
    )}
  >
    <div className={panelStyles.sectionHeader}>
      <h3 className={panelStyles.sectionTitle}>Follow-up details</h3>
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
      <form className={businessOverviewStyles.form} onSubmit={onSubmit}>
        <div className={businessOverviewStyles.formGrid}>
          <Controller
            control={control}
            name="assignedToId"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isDisabled={isAssigneeSelectDisabled}
                label="Assignee"
                options={assigneeOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <label className={businessOverviewStyles.formField}>
            <span>Due date</span>
            <Input
              type="datetime-local"
              {...dueDateField}
              ref={(inputElement) => {
                dueDateField.ref(inputElement);
                dueDateInputRef.current = inputElement;
              }}
            />
          </label>

          <FollowUpDetailField
            label="Status"
            tooltip="Status is updated through task actions, so it is not editable in this section."
            value={followUpStatusLabelMap[followUp.status]}
          />
        </div>

        <div className={businessOverviewStyles.formActions}>
          <Button
            disabled={isSaving}
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            disabled={
              isSaving || !isDirty || !isValid || isAssigneeSelectDisabled
            }
            type="submit"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    ) : (
      <div className={businessOverviewStyles.grid}>
        <FollowUpDetailField
          avatarUrl={getInitialsAvatarUrl(followUp.assignedTo.name)}
          label="Assignee"
          value={followUp.assignedTo.name}
        />
        <FollowUpDetailField
          label="Due date"
          value={formatFollowUpDueDate(followUp.dueDate)}
        />
        <FollowUpDetailField
          label="Status"
          value={followUpStatusLabelMap[followUp.status]}
        />
      </div>
    )}
  </section>
);
