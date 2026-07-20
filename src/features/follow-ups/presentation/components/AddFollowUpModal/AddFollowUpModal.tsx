import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useBusinesses } from '@/features/businesses/application/useBusinesses';
import { initialBusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import { useUsers } from '@/features/users/application/useUsers';
import { followUpTypeLabelMap } from '@/features/follow-ups/presentation/components/FollowUpsTable/followUpsTableFormatters';
import { getInitialsAvatarUrl } from '@/shared/lib/avatar';
import {
  FollowUpType,
  Priority,
  type FollowUpType as FollowUpTypeValue,
  type Priority as PriorityValue,
} from '@/shared/api/generated/salesTrackerApi';
import { Button, Input, Modal, Select, type SelectOption } from '@/shared/ui';

import styles from './AddFollowUpModal.module.css';
import type { AddFollowUpFormValues } from './types';

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

const typeOptions: SelectOption<FollowUpTypeValue>[] = Object.values(
  FollowUpType,
).map((type) => ({
  label: followUpTypeLabelMap[type],
  value: type,
}));

const priorityLabels: Record<PriorityValue, string> = {
  high: 'High',
  low: 'Low',
  medium: 'Medium',
};

const priorityOptions: SelectOption<PriorityValue>[] = Object.values(
  Priority,
).map((priority) => ({
  label: priorityLabels[priority],
  value: priority,
}));

export const AddFollowUpModal = ({
  isOpen,
  onOpenChange,
}: AddFollowUpModalProps) => {
  const { data: businesses = [], isLoading: isBusinessesLoading } =
    useBusinesses(initialBusinessFilters);
  const { data: users = [], isLoading: isUsersLoading } = useUsers();

  const businessOptions = useMemo<SelectOption[]>(
    () =>
      businesses.map((business) => ({
        label: business.name,
        value: business.id,
      })),
    [businesses],
  );

  const assigneeOptions = useMemo<SelectOption[]>(
    () =>
      users.map((user) => ({
        avatarUrl: getInitialsAvatarUrl(user.name),
        label: user.name,
        value: user.id,
      })),
    [users],
  );

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
                isDisabled={isBusinessesLoading}
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
                isDisabled={isUsersLoading}
                label="Assignee *"
                options={assigneeOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <label className={styles.field}>
            <span>Due date *</span>
            <Input
              error={errors.dueDate?.message}
              type="datetime-local"
              {...register('dueDate', {
                required: 'Due date is required',
              })}
            />
          </label>

          <label className={styles.field}>
            <span>Title *</span>
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
            <span>Note</span>
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
