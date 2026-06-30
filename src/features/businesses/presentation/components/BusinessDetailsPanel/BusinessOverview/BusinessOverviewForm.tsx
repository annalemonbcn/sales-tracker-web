import { Controller, useForm } from 'react-hook-form';

import { useUpdateBusinessOverview } from '@/features/businesses/application/useUpdateBusinessOverview';
import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';
import { Button, Input, Select } from '@/shared/ui';

import panelStyles from '../BusinessDetailsPanel.module.css';
import styles from './BusinessOverview.module.css';
import type { BusinessOverviewFormValues } from './types';
import { useBusinessOverview } from './useBusinessOverview';
import { cn } from '@/shared/lib/cn';

type BusinessOverviewFormProps = {
  business: BusinessDetail;
  onCancel: () => void;
  onSuccess: () => void;
};

export const BusinessOverviewForm = ({
  business,
  onCancel,
  onSuccess,
}: BusinessOverviewFormProps) => {
  const { mutateAsync, isPending } = useUpdateBusinessOverview();

  const {
    assigneeOptions,
    businessCategoryOptions,
    isAssigneeSelectDisabled,
    businessPriorityOptions,
    businessSourceOptions,
    businessStatusOptions,
  } = useBusinessOverview();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<BusinessOverviewFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: business.name,
      category: business.category,
      status: business.status,
      source: business.source,
      priority: business.priority,
      assignedToId: business.assignedTo?.id ?? null,
    },
  });

  const onSubmit = async (values: BusinessOverviewFormValues) => {
    await mutateAsync({
      businessId: business.id,
      data: {
        name: values.name.trim(),
        category: values.category,
        status: values.status,
        source: values.source,
        priority: values.priority,
        assignedToId: values.assignedToId,
      },
    });

    onSuccess();
  };

  return (
    <section className={cn(panelStyles.section, panelStyles.sectionCard)}>
      <div className={panelStyles.sectionHeader}>
        <h3 className={panelStyles.sectionTitle}>Business details</h3>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGrid}>
          <label className={styles.formField}>
            <span>Name</span>

            <Input
              error={errors.name?.message}
              placeholder="Business name"
              {...register('name', {
                validate: (value) =>
                  value.trim().length > 0 || 'Business name is required',
              })}
            />
          </label>

          <Controller
            control={control}
            name="category"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                label="Category"
                options={businessCategoryOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="status"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                label="Status"
                options={businessStatusOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="source"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                label="Source"
                options={businessSourceOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="priority"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                label="Priority"
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
        </div>

        <div className={styles.formActions}>
          <Button
            disabled={isPending}
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button disabled={isPending || !isDirty || !isValid} type="submit">
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </section>
  );
};
