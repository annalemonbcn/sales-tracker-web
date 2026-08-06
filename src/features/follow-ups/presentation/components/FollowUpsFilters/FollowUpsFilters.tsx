import { businessPriorityOptions } from '@/features/businesses/presentation/lib/businessSelectOptions';
import {
  hasActiveFollowUpFilters,
  type FollowUpDueDatePreset,
  type FollowUpListStatus,
} from '@/features/follow-ups/domain/followUpFilters.model';
import type { FollowUpTaskType } from '@/features/follow-ups/domain/followUpTask.model';
import { useFollowUpsFilters } from '@/features/follow-ups/presentation/providers';
import { useAssigneeOptions, useBusinessesOptions } from '@/hooks';
import {
  FollowUpType,
  GetFollowUpsStatus,
  type GetFollowUpsPriority,
} from '@/shared/api/generated/salesTrackerApi';
import { FiltersBar, type SelectOption } from '@/shared/ui';
import { followUpTypeLabelMap } from '../FollowUpsTable/followUpsTableFormatters';

const statusOptions: SelectOption<FollowUpListStatus>[] = [
  {
    label: 'Pending',
    value: GetFollowUpsStatus.pending,
  },
  {
    label: 'Done',
    value: GetFollowUpsStatus.done,
  },
  {
    label: 'Cancelled',
    value: GetFollowUpsStatus.cancelled,
  },
  {
    label: 'Overdue',
    value: 'overdue',
  },
];

const dueDateOptions: SelectOption<FollowUpDueDatePreset>[] = [
  {
    label: 'Overdue',
    value: 'overdue',
  },
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Next 7 days',
    value: 'next_7_days',
  },
];

const typeOptions: SelectOption<FollowUpTaskType>[] = Object.values(
  FollowUpType,
).map((type) => ({
  label: followUpTypeLabelMap[type],
  value: type,
}));

type FollowUpsFiltersProps = {
  isFollowUpsFetching: boolean;
};

export const FollowUpsFilters = ({
  isFollowUpsFetching,
}: FollowUpsFiltersProps) => {
  const { clearFilters, filters, updateFilter } = useFollowUpsFilters();
  const { assigneeOptions, isAssigneeOptionsError, isAssigneeOptionsLoading } =
    useAssigneeOptions();
  const { businessOptions, isBusinessOptionsError, isBusinessOptionsLoading } =
    useBusinessesOptions();

  const isAssigneeSelectDisabled =
    isFollowUpsFetching ||
    isAssigneeOptionsLoading ||
    isAssigneeOptionsError ||
    assigneeOptions.length === 0;

  const isBusinessSelectDisabled =
    isFollowUpsFetching ||
    isBusinessOptionsLoading ||
    isBusinessOptionsError ||
    businessOptions.length === 0;

  return (
    <FiltersBar
      ariaLabel="Task filters"
      clearFilters={clearFilters}
      filterSelects={[
        {
          key: 'status',
          label: 'Status',
          options: statusOptions,
          placeholder: 'All statuses',
          value: filters.status,
          isDisabled: isFollowUpsFetching,
          onChange: (value) => {
            updateFilter('status', value as FollowUpListStatus | null);
          },
        },
        {
          key: 'priority',
          label: 'Priority',
          options: businessPriorityOptions,
          placeholder: 'All priorities',
          value: filters.priority,
          isDisabled: isFollowUpsFetching,
          onChange: (value) => {
            updateFilter('priority', value as GetFollowUpsPriority | null);
          },
        },
        {
          key: 'type',
          label: 'Type',
          options: typeOptions,
          placeholder: 'All types',
          value: filters.type,
          isDisabled: isFollowUpsFetching,
          onChange: (value) => {
            updateFilter('type', value as FollowUpTaskType | null);
          },
        },
        {
          key: 'assignedToId',
          label: 'Assignee',
          options: assigneeOptions,
          placeholder: 'All assignees',
          value: filters.assignedToId,
          isDisabled: isAssigneeSelectDisabled,
          onChange: (value) => {
            updateFilter('assignedToId', value);
          },
        },
        {
          key: 'businessId',
          label: 'Linked business',
          options: businessOptions,
          placeholder: 'All businesses',
          value: filters.businessId,
          isDisabled: isBusinessSelectDisabled,
          onChange: (value) => {
            updateFilter('businessId', value);
          },
        },
        {
          key: 'dueDate',
          label: 'Due date',
          options: dueDateOptions,
          placeholder: 'Any time',
          value: filters.dueDate,
          isDisabled: isFollowUpsFetching,
          onChange: (value) => {
            updateFilter('dueDate', value as FollowUpDueDatePreset | null);
          },
        },
      ]}
      isClearButtonDisabled={
        !hasActiveFollowUpFilters(filters) || isFollowUpsFetching
      }
    />
  );
};
