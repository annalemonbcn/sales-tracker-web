import {
  CalendarDays,
  Check,
  ClipboardCheck,
  Ban,
  RefreshCw,
  UserRound,
} from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { flushSync } from 'react-dom';

import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { getPriorityLabel } from '@/features/businesses/presentation/lib/formatters';
import { getInitialsAvatarUrl } from '@/shared/lib/avatar';
import { cn } from '@/shared/lib/cn';
import { Badge, Button, Drawer, Input, Select } from '@/shared/ui';
import panelStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessDetailsPanel.module.css';
import businessOverviewStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessOverview/BusinessOverview.module.css';
import { useBusinessAssigneeOptions } from '@/features/businesses/presentation/hooks/useBusinessAssigneeOptions';
import { businessPriorityOptions } from '@/features/businesses/presentation/lib/businessSelectOptions';
import { useUpdateFollowUp } from '@/features/follow-ups/application/useUpdateFollowUp';
import { useUpdateBusiness } from '@/features/businesses/application/useUpdateBusiness';
import { followUpsQueryKeys } from '@/features/follow-ups/application/followUps.queryKeys';
import type { Priority } from '@/shared/api/generated/salesTrackerApi';
import { useMarkFollowUpDone } from '@/features/follow-ups/application/useMarkFollowUpDone';
import { useCancelFollowUp } from '@/features/follow-ups/application/useCancelFollowUp';

import styles from './FollowUpDetailsDrawer.module.css';
import {
  followUpTypeLabelMap,
  followUpTypeVariantMap,
  followUpStatusLabelMap,
  formatFollowUpDueDate,
} from '../FollowUpsTable/followUpsTableFormatters';

type FollowUpDetailsDrawerProps = {
  followUp: FollowUpTask;
  onClose: () => void;
};

type BusinessDetailsFormValues = {
  assignedToId: string;
  dueDate: string;
  priority: Priority;
};

const formatDateForInput = (dateValue: string): string => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  );

  return offsetDate.toISOString().slice(0, 16);
};

const parseInputDateToIso = (dateValue: string): string =>
  new Date(dateValue).toISOString();

export const FollowUpDetailsDrawer = ({
  followUp,
  onClose,
}: FollowUpDetailsDrawerProps) => {
  const [currentFollowUp, setCurrentFollowUp] = useState(followUp);
  const [isEditingBusinessDetails, setIsEditingBusinessDetails] =
    useState(false);
  const dueDateInputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();
  const updateFollowUpMutation = useUpdateFollowUp();
  const updateBusinessMutation = useUpdateBusiness();
  const markFollowUpDoneMutation = useMarkFollowUpDone();
  const cancelFollowUpMutation = useCancelFollowUp();
  const { assigneeOptions, isAssigneeSelectDisabled } =
    useBusinessAssigneeOptions();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isDirty, isValid },
  } = useForm<BusinessDetailsFormValues>({
    mode: 'onChange',
    defaultValues: {
      assignedToId: currentFollowUp.assignedTo.id,
      dueDate: formatDateForInput(currentFollowUp.dueDate),
      priority: currentFollowUp.business.priority,
    },
  });

  useEffect(() => {
    setCurrentFollowUp(followUp);
  }, [followUp]);

  useEffect(() => {
    reset({
      assignedToId: currentFollowUp.assignedTo.id,
      dueDate: formatDateForInput(currentFollowUp.dueDate),
      priority: currentFollowUp.business.priority,
    });
  }, [currentFollowUp, reset]);

  const isSavingBusinessDetails =
    updateFollowUpMutation.isPending || updateBusinessMutation.isPending;

  const handleBusinessDetailsSubmit = async (
    values: BusinessDetailsFormValues,
  ) => {
    const updatedFollowUp = await updateFollowUpMutation.mutateAsync({
      followUpId: currentFollowUp.id,
      data: {
        assignedToId: values.assignedToId,
        dueDate: parseInputDateToIso(values.dueDate),
      },
    });

    const updatedBusiness = await updateBusinessMutation.mutateAsync({
      businessId: currentFollowUp.business.id,
      data: {
        priority: values.priority,
      },
    });

    setCurrentFollowUp((previousFollowUp) => ({
      ...previousFollowUp,
      assignedTo: updatedFollowUp.assignedTo,
      business: {
        ...previousFollowUp.business,
        priority: updatedBusiness.priority,
      },
      dueDate: updatedFollowUp.dueDate,
      updatedAt: updatedFollowUp.updatedAt,
    }));

    queryClient.invalidateQueries({
      queryKey: followUpsQueryKeys.lists,
    });

    setIsEditingBusinessDetails(false);
  };

  const handleMarkComplete = async () => {
    const updatedFollowUp = await markFollowUpDoneMutation.mutateAsync(
      currentFollowUp.id,
    );

    setCurrentFollowUp((previousFollowUp) => ({
      ...previousFollowUp,
      completedAt: updatedFollowUp.completedAt,
      status: updatedFollowUp.status,
      updatedAt: updatedFollowUp.updatedAt,
    }));
  };

  const handleCancelFollowUp = async () => {
    const updatedFollowUp = await cancelFollowUpMutation.mutateAsync(
      currentFollowUp.id,
    );

    setCurrentFollowUp((previousFollowUp) => ({
      ...previousFollowUp,
      completedAt: updatedFollowUp.completedAt,
      status: updatedFollowUp.status,
      updatedAt: updatedFollowUp.updatedAt,
    }));
  };

  const handleReschedule = () => {
    flushSync(() => {
      setIsEditingBusinessDetails(true);
    });

    const dueDateInput = dueDateInputRef.current;

    if (!dueDateInput) {
      return;
    }

    dueDateInput.focus();

    if ('showPicker' in dueDateInput) {
      try {
        dueDateInput.showPicker();
      } catch {
        // Some browsers only allow showPicker during stricter user activation windows.
      }
    }
  };

  const dueDateField = register('dueDate', { required: true });

  return (
    <Drawer
      ariaLabel="Close follow-up details"
      className={styles.drawer}
      onClose={onClose}
    >
      <Drawer.Header closeLabel="Close follow-up details" onClick={onClose}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{currentFollowUp.title}</h2>
          <Badge
            className={styles.headerBadge}
            variant={followUpTypeVariantMap[currentFollowUp.type]}
          >
            {followUpTypeLabelMap[currentFollowUp.type]}
          </Badge>
        </div>
      </Drawer.Header>

      <Drawer.Body className={styles.content}>
        <section
          className={cn(
            panelStyles.section,
            panelStyles.sectionCard,
            styles.businessCard,
          )}
        >
          <div className={panelStyles.sectionHeader}>
            <h3 className={panelStyles.sectionTitle}>Business details</h3>
            {!isEditingBusinessDetails ? (
              <button
                className={panelStyles.sectionAction}
                type="button"
                onClick={() => {
                  setIsEditingBusinessDetails(true);
                }}
              >
                Edit
              </button>
            ) : null}
          </div>

          {isEditingBusinessDetails ? (
            <form
              className={businessOverviewStyles.form}
              onSubmit={handleSubmit(handleBusinessDetailsSubmit)}
            >
              <div className={businessOverviewStyles.formGrid}>
                <BusinessField
                  label="Business name"
                  tooltip="This comes from the linked business, so it is not editable from this task."
                  value={currentFollowUp.business.name}
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
                  value={followUpStatusLabelMap[currentFollowUp.status]}
                />
              </div>

              <div className={businessOverviewStyles.formActions}>
                <Button
                  disabled={isSavingBusinessDetails}
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    reset();
                    setIsEditingBusinessDetails(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  disabled={
                    isSavingBusinessDetails ||
                    !isDirty ||
                    !isValid ||
                    isAssigneeSelectDisabled
                  }
                  type="submit"
                >
                  {isSavingBusinessDetails ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          ) : (
            <div className={businessOverviewStyles.grid}>
              <BusinessField
                label="Business name"
                value={currentFollowUp.business.name}
              />
              <BusinessField
                avatarUrl={getInitialsAvatarUrl(
                  currentFollowUp.assignedTo.name,
                )}
                label="Assignee"
                value={currentFollowUp.assignedTo.name}
              />
              <BusinessField
                label="Due date"
                value={formatFollowUpDueDate(currentFollowUp.dueDate)}
              />
              <BusinessField
                label="Priority"
                value={getPriorityLabel(currentFollowUp.business.priority)}
              />
              <BusinessField
                label="Status"
                value={followUpStatusLabelMap[currentFollowUp.status]}
              />
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Description / Notes</h3>
            <button className={styles.sectionAction} type="button">
              Edit
            </button>
          </div>
          <p className={styles.notes}>
            {currentFollowUp.note || 'No notes were added for this follow-up.'}
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Activity</h3>
            <button className={styles.sectionAction} type="button">
              View all
            </button>
          </div>

          <ol className={styles.activityList}>
            <li className={styles.activityItem}>
              <span className={styles.activityIcon}>
                <ClipboardCheck size={14} />
              </span>
              <div>
                <strong>Task created</strong>
                <p>{formatFollowUpDueDate(currentFollowUp.createdAt)}</p>
              </div>
            </li>

            <li className={styles.activityItem}>
              <span className={styles.activityIcon}>
                <UserRound size={14} />
              </span>
              <div>
                <strong>Assigned to {currentFollowUp.assignedTo.name}</strong>
                <p>{currentFollowUp.business.name}</p>
              </div>
            </li>

            <li className={styles.activityItem}>
              <span className={styles.activityIcon}>
                <CalendarDays size={14} />
              </span>
              <div>
                <strong>Reminder set</strong>
                <p>{formatFollowUpDueDate(currentFollowUp.dueDate)}</p>
              </div>
            </li>
          </ol>
        </section>
      </Drawer.Body>

      <Drawer.Footer className={styles.footer}>
        <Button
          className={styles.primaryAction}
          disabled={
            currentFollowUp.status === 'done' ||
            markFollowUpDoneMutation.isPending
          }
          size="lg"
          onClick={handleMarkComplete}
        >
          <Check size={18} />
          {markFollowUpDoneMutation.isPending
            ? 'Marking...'
            : currentFollowUp.status === 'done'
              ? 'Completed'
              : 'Mark complete'}
        </Button>

        <div className={styles.secondaryActions}>
          <Button
            className={styles.secondaryAction}
            disabled={isSavingBusinessDetails}
            variant="secondary"
            onClick={handleReschedule}
          >
            <RefreshCw size={16} />
            Reschedule
          </Button>

          <Button
            className={cn(styles.secondaryAction, styles.cancelAction)}
            disabled={
              currentFollowUp.status === 'cancelled' ||
              cancelFollowUpMutation.isPending
            }
            variant="secondary"
            onClick={handleCancelFollowUp}
          >
            <Ban size={16} />
            {cancelFollowUpMutation.isPending
              ? 'Cancelling...'
              : currentFollowUp.status === 'cancelled'
                ? 'Cancelled'
                : 'Cancel'}
          </Button>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
};

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
