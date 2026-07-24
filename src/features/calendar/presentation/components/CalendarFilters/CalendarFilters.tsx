import { businessPriorityOptions } from '@/features/businesses/presentation/lib/businessSelectOptions';
import type { FollowUpFilters } from '@/features/follow-ups/domain/followUpFilters.model';
import type { FollowUpTaskType } from '@/features/follow-ups/domain/followUpTask.model';
import { followUpTypeLabelMap } from '@/features/follow-ups/presentation/components/FollowUpsTable/followUpsTableFormatters';
import { useAssigneeOptions, useBusinessesOptions } from '@/hooks';
import {
  FollowUpType,
  GetFollowUpsStatus,
  type GetFollowUpsPriority,
  type GetFollowUpsStatus as GetFollowUpsStatusType,
} from '@/shared/api/generated/salesTrackerApi';
import { Button, Card, Select, type SelectOption } from '@/shared/ui';

import styles from './CalendarFilters.module.css';

const statusOptions: SelectOption<GetFollowUpsStatusType>[] = [
  { label: 'Pending', value: GetFollowUpsStatus.pending },
  { label: 'Done', value: GetFollowUpsStatus.done },
  { label: 'Cancelled', value: GetFollowUpsStatus.cancelled },
];

const typeOptions: SelectOption<FollowUpTaskType>[] = Object.values(
  FollowUpType,
).map((type) => ({
  label: followUpTypeLabelMap[type],
  value: type,
}));

type CalendarFiltersProps = {
  filters: FollowUpFilters;
  onChange: (filters: FollowUpFilters) => void;
};

export const CalendarFilters = ({
  filters,
  onChange,
}: CalendarFiltersProps) => {
  const { assigneeOptions, isAssigneeOptionsError, isAssigneeOptionsLoading } =
    useAssigneeOptions();
  const { businessOptions, isBusinessOptionsError, isBusinessOptionsLoading } =
    useBusinessesOptions();

  const updateFilter = <Key extends keyof FollowUpFilters>(
    key: Key,
    value: FollowUpFilters[Key],
  ) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <Card>
      <Card.Content>
        <div className={styles.filters} aria-label="Calendar filters">
          <Select
            isDisabled={isAssigneeOptionsLoading || isAssigneeOptionsError}
            label="Assignee"
            options={assigneeOptions}
            placeholder="All assignees"
            value={filters.assignedToId ?? null}
            onChange={(value) => {
              updateFilter('assignedToId', value ?? undefined);
            }}
          />

          <Select
            label="Status"
            options={statusOptions}
            placeholder="All statuses"
            value={filters.status ?? null}
            onChange={(value) => {
              updateFilter(
                'status',
                (value as GetFollowUpsStatusType | null) ?? undefined,
              );
            }}
          />

          <Select
            label="Priority"
            options={businessPriorityOptions}
            placeholder="All priorities"
            value={filters.priority ?? null}
            onChange={(value) => {
              updateFilter(
                'priority',
                (value as GetFollowUpsPriority | null) ?? undefined,
              );
            }}
          />

          <Select
            label="Type"
            options={typeOptions}
            placeholder="All types"
            value={filters.type ?? null}
            onChange={(value) => {
              updateFilter(
                'type',
                (value as FollowUpTaskType | null) ?? undefined,
              );
            }}
          />

          <Select
            isDisabled={isBusinessOptionsLoading || isBusinessOptionsError}
            label="Business"
            options={businessOptions}
            placeholder="All businesses"
            value={filters.businessId ?? null}
            onChange={(value) => {
              updateFilter('businessId', value ?? undefined);
            }}
          />

          <Button
            disabled={
              !filters.assignedToId &&
              !filters.businessId &&
              !filters.priority &&
              !filters.status &&
              !filters.type
            }
            variant="secondary"
            onClick={() => {
              onChange({});
            }}
          >
            Clear filters
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
