import { Controller, useForm } from 'react-hook-form';

import {
  FOLLOW_UP_TASK_TYPES,
  type FollowUpTaskType,
} from '@/features/follow-ups/domain/followUpTask.model';
import { followUpTypeLabelMap } from '@/features/follow-ups/presentation/components/FollowUpsTable/followUpsTableFormatters';
import { useAssigneeOptions, useBusinessesOptions } from '@/hooks';
import { Button, Input, Modal, Select, type SelectOption } from '@/shared/ui';

import styles from './AddFollowUpModal.module.css';
import type { AddFollowUpFormValues, AddFollowUpPriority } from './types';

type AddFollowUpModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const defaultValues: AddFollowUpFormValues = {
  assignedToId: null,
  businessId: null,
  dueDate: '',
  note: '',
  priority: null,
  title: '',
  type: null,
};

const typeOptions: SelectOption<FollowUpTaskType>[] = FOLLOW_UP_TASK_TYPES.map(
  (type) => ({
    label: followUpTypeLabelMap[type],
    value: type,
  }),
);

const priorityLabels: Record<AddFollowUpPriority, string> = {
  high: 'High',
  low: 'Low',
  medium: 'Medium',
};

const priorities: AddFollowUpPriority[] = ['low', 'medium', 'high'];

const priorityOptions: SelectOption<AddFollowUpPriority>[] = priorities.map(
  (priority) => ({
    label: priorityLabels[priority],
    value: priority,
  }),
);

export const AddFollowUpModal = ({
  isOpen,
  onOpenChange,
}: AddFollowUpModalProps) => {
  const { businessOptions, isBusinessSelectDisabled } = useBusinessesOptions();
  const { assigneeOptions, isAssigneeSelectDisabled } = useAssigneeOptions();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<AddFollowUpFormValues>({
    defaultValues,
    mode: 'onChange',
  });

  const handleOpenChange = (nextIsOpen: boolean) => {
    onOpenChange(nextIsOpen);

    if (!nextIsOpen) {
      reset(defaultValues);
    }
  };

  return (
    <Modal
      description="Schedule a task for a business and assign its owner."
      isOpen={isOpen}
      title="Create new task"
      onOpenChange={handleOpenChange}
    >
      <form className={styles.form} onSubmit={handleSubmit(() => undefined)}>
        <div className={styles.body}>
          <Controller
            control={control}
            name="businessId"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isClearable={false}
                isDisabled={isBusinessSelectDisabled}
                label="Business *"
                options={businessOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="assignedToId"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isClearable={false}
                isDisabled={isAssigneeSelectDisabled}
                label="Assignee *"
                options={assigneeOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Due date *</span>
            <Input
              error={errors.dueDate?.message}
              type="datetime-local"
              {...register('dueDate', {
                required: 'Due date is required',
              })}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Title *</span>
            <Input
              error={errors.title?.message}
              placeholder="Follow up with the business"
              {...register('title', {
                validate: (value) =>
                  value.trim().length > 0 || 'Title is required',
              })}
            />
          </label>

          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isClearable={false}
                label="Type *"
                options={typeOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="priority"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isClearable={false}
                label="Priority *"
                options={priorityOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <label className={styles.fieldWide}>
            <span className={styles.fieldLabel}>Note</span>
            <textarea
              className={styles.textarea}
              placeholder="Add context or next steps..."
              {...register('note')}
            />
          </label>
        </div>

        <div className={styles.footer}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              handleOpenChange(false);
            }}
          >
            Cancel
          </Button>

          <Button disabled={!isValid} type="submit">
            Create task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
