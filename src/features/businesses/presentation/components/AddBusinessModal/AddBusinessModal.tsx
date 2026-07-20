import { Controller, useForm } from 'react-hook-form';

import { useCreateBusiness } from '@/features/businesses/application/useCreateBusiness';
import type { Business } from '@/features/businesses/domain/business.model';
import {
  businessCategoryOptions,
  businessPriorityOptions,
  businessSourceOptions,
} from '@/features/businesses/presentation/lib/businessSelectOptions';
import { Button, Input, Modal, Select } from '@/shared/ui';
import { useAssigneeOptions } from '@/hooks';

import styles from './AddBusinessModal.module.css';
import type { AddBusinessFormValues } from './types';

const temporaryCreatedById = '22222222-2222-4222-8222-222222222222';

type AddBusinessModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess?: (business: Business) => void;
};

const defaultValues: AddBusinessFormValues = {
  address: '',
  assignedToId: null,
  category: null,
  email: '',
  instagram: '',
  name: '',
  notes: '',
  phone: '',
  priority: null,
  source: null,
  website: '',
};

export const AddBusinessModal = ({
  isOpen,
  onOpenChange,
  onSuccess,
}: AddBusinessModalProps) => {
  const { mutateAsync, isPending } = useCreateBusiness();
  const { assigneeOptions, isAssigneeSelectDisabled } = useAssigneeOptions();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<AddBusinessFormValues>({
    defaultValues,
    mode: 'onChange',
  });

  const handleOpenChange = (nextIsOpen: boolean) => {
    onOpenChange(nextIsOpen);

    if (!nextIsOpen) {
      reset(defaultValues);
    }
  };

  const mapOptionalTextValue = (value: string): string | undefined => {
    const trimmedValue = value.trim();

    return trimmedValue.length > 0 ? trimmedValue : undefined;
  };

  const onSubmit = async (values: AddBusinessFormValues) => {
    if (!values.category || !values.priority || !values.source) {
      return;
    }

    const createdBusiness = await mutateAsync({
      name: values.name.trim(),
      category: values.category,
      source: values.source,
      priority: values.priority,
      instagram: mapOptionalTextValue(values.instagram),
      email: mapOptionalTextValue(values.email),
      phone: mapOptionalTextValue(values.phone),
      website: mapOptionalTextValue(values.website),
      address: mapOptionalTextValue(values.address),
      notes: mapOptionalTextValue(values.notes),
      createdById: temporaryCreatedById,
      assignedToId: values.assignedToId ?? undefined,
    });

    reset(defaultValues);
    onOpenChange(false);
    onSuccess?.(createdBusiness);
  };

  return (
    <Modal
      description="Create a new business and add its contact details."
      isOpen={isOpen}
      title="Add business"
      onOpenChange={handleOpenChange}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.body}>
          <label className={styles.field}>
            <span>Name *</span>
            <Input
              error={errors.name?.message}
              placeholder="Green Leaf Gym"
              {...register('name', {
                validate: (value) =>
                  value.trim().length > 0 || 'Business name is required',
              })}
            />
          </label>

          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isClearable={false}
                label="Category *"
                options={businessCategoryOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="source"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isClearable={false}
                label="Source *"
                options={businessSourceOptions}
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
                options={businessPriorityOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="assignedToId"
            render={({ field }) => (
              <Select
                isDisabled={isAssigneeSelectDisabled}
                label="Assignee"
                options={assigneeOptions}
                placeholder="Unassigned"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <label className={styles.field}>
            <span>Instagram</span>
            <Input placeholder="@business" {...register('instagram')} />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <Input placeholder="hello@business.com" {...register('email')} />
          </label>

          <label className={styles.field}>
            <span>Phone</span>
            <Input placeholder="+34 600 000 000" {...register('phone')} />
          </label>

          <label className={styles.field}>
            <span>Website</span>
            <Input
              placeholder="https://business.com"
              {...register('website')}
            />
          </label>

          <label className={styles.field}>
            <span>Address</span>
            <Input placeholder="Street, city" {...register('address')} />
          </label>

          <label className={styles.fieldWide}>
            <span>Notes</span>
            <textarea
              className={styles.textarea}
              placeholder="Add context, next steps or relevant notes..."
              {...register('notes')}
            />
          </label>
        </div>

        <div className={styles.footer}>
          <Button
            disabled={isPending}
            type="button"
            variant="secondary"
            onClick={() => {
              handleOpenChange(false);
            }}
          >
            Cancel
          </Button>

          <Button disabled={isPending || !isValid} type="submit">
            {isPending ? 'Adding...' : 'Add business'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
