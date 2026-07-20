import {
  Controller,
  type Control,
  type UseFormRegisterReturn,
} from 'react-hook-form';

import { getPriorityLabel } from '@/features/businesses/presentation/lib/formatters';
import { getInitialsAvatarUrl } from '@/shared/lib/avatar';
import { cn } from '@/shared/lib/cn';
import { Button, Input, Select, type SelectOption } from '@/shared/ui';
import panelStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessDetailsPanel.module.css';
import businessOverviewStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessOverview/BusinessOverview.module.css';
import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';

import styles from './FollowUpDetailsDrawer.module.css';
import type { BusinessDetailsFormValues } from './useFollowUpDetailsDrawer';
import {
  followUpStatusLabelMap,
  formatFollowUpDueDate,
} from '../FollowUpsTable/followUpsTableFormatters';

type FollowUpBusinessDetailsCardProps = {
  assigneeOptions: SelectOption[];
  businessPriorityOptions: SelectOption<
    BusinessDetailsFormValues['priority']
  >[];
  control: Control<BusinessDetailsFormValues>;
  dueDateField: UseFormRegisterReturn<'dueDate'>;
  dueDateInputRef: React.MutableRefObject<HTMLInputElement | null>;
  followUp: FollowUpTask;
  isAssigneeSelectDisabled: boolean;
  isDirty: boolean;
  isEditing: boolean;
  isSaving: boolean;
  isValid: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: () => void;
};

export const FollowUpBusinessDetailsCard = ({
  assigneeOptions,
  businessPriorityOptions,
  control,
  dueDateField,
  dueDateInputRef,
  followUp,
  isAssigneeSelectDisabled,
  isDirty,
  isEditing,
  isSaving,
  isValid,
  onCancel,
  onEdit,
  onSubmit,
}: FollowUpBusinessDetailsCardProps) => (
  <section
    className={cn(
      panelStyles.section,
      panelStyles.sectionCard,
      styles.businessCard,
    )}
  >
    <div className={panelStyles.sectionHeader}>
      <h3 className={panelStyles.sectionTitle}>Business details</h3>
      {!isEditing ? (
        <button
          className={panelStyles.sectionAction}
          type="button"
          onClick={onEdit}
        >
          Edit
        </button>
      ) : null}
    </div>

    {isEditing ? (
      <form className={businessOverviewStyles.form} onSubmit={onSubmit}>
        <div className={businessOverviewStyles.formGrid}>
          <BusinessField
            label="Business name"
            tooltip="This comes from the linked business, so it is not editable from this task."
            value={followUp.business.name}
          />

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

          <Controller
            control={control}
            name="priority"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                label="Priority"
                options={businessPriorityOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <BusinessField
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
        <BusinessField label="Business name" value={followUp.business.name} />
        <BusinessField
          avatarUrl={getInitialsAvatarUrl(followUp.assignedTo.name)}
          label="Assignee"
          value={followUp.assignedTo.name}
        />
        <BusinessField
          label="Due date"
          value={formatFollowUpDueDate(followUp.dueDate)}
        />
        <BusinessField
          label="Priority"
          value={getPriorityLabel(followUp.business.priority)}
        />
        <BusinessField
          label="Status"
          value={followUpStatusLabelMap[followUp.status]}
        />
      </div>
    )}
  </section>
);

type BusinessFieldProps = {
  avatarUrl?: string;
  label: string;
  tooltip?: string;
  value: string;
};

const BusinessField = ({
  avatarUrl,
  label,
  tooltip,
  value,
}: BusinessFieldProps) => (
  <div
    className={cn(
      businessOverviewStyles.field,
      tooltip && styles.tooltipWrapper,
    )}
    data-tooltip={tooltip}
    tabIndex={tooltip ? 0 : undefined}
  >
    <span className={businessOverviewStyles.label}>{label}</span>

    <div className={businessOverviewStyles.valueBox}>
      {avatarUrl ? (
        <img
          className={businessOverviewStyles.valueAvatar}
          src={avatarUrl}
          alt=""
        />
      ) : null}

      <span className={businessOverviewStyles.valueText}>{value}</span>
    </div>
  </div>
);
