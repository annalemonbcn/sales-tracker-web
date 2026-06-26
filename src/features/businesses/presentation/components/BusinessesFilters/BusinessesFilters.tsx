import type { ChangeEvent } from 'react';

import type {
  BusinessStatus,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';
import { Button } from '@/shared/ui';

import {
  initialBusinessFilters,
  type BusinessFilters,
} from '../../../domain/businessFilters.model';
import type { Business } from '../../../domain/business.model';
import { getBusinessStatusLabel, getPriorityLabel } from '../../lib/formatters';

import styles from './BusinessesFilters.module.css';

const businessStatusOptions: BusinessStatus[] = [
  'new_lead',
  'assigned',
  'waiting_response',
  'interested',
  'dossier_sent',
  'meeting_scheduled',
  'meeting_done',
  'proposal_sent',
  'negotiating',
  'won',
  'lost',
  'recontact_later',
  'discarded',
];

const priorityOptions: Priority[] = ['low', 'medium', 'high'];

type BusinessesFiltersProps = {
  businesses: Business[];
  filters: BusinessFilters;
  onFiltersChange: (filters: BusinessFilters) => void;
};

export const BusinessesFilters = ({
  businesses,
  filters,
  onFiltersChange,
}: BusinessesFiltersProps) => {
  const assigneeOptions = businesses
    .map((business) => business.assignedTo)
    .filter((assignee): assignee is NonNullable<typeof assignee> =>
      Boolean(assignee),
    )
    .filter(
      (assignee, index, assignees) =>
        assignees.findIndex((item) => item.id === assignee.id) === index,
    );

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      status: event.target.value
        ? (event.target.value as BusinessStatus)
        : null,
    });
  };

  const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      priority: event.target.value ? (event.target.value as Priority) : null,
    });
  };

  const handleAssigneeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      assignedToId: event.target.value || null,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange(initialBusinessFilters);
  };

  return (
    <div className={styles.filters}>
      <label className={styles.field}>
        <span>Status</span>
        <select value={filters.status ?? ''} onChange={handleStatusChange}>
          <option value="">All statuses</option>

          {businessStatusOptions.map((status) => (
            <option key={status} value={status}>
              {getBusinessStatusLabel(status)}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Priority</span>
        <select value={filters.priority ?? ''} onChange={handlePriorityChange}>
          <option value="">All priorities</option>

          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {getPriorityLabel(priority)}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Assignee</span>
        <select
          value={filters.assignedToId ?? ''}
          onChange={handleAssigneeChange}
        >
          <option value="">All assignees</option>

          {assigneeOptions.map((assignee) => (
            <option key={assignee.id} value={assignee.id}>
              {assignee.name}
            </option>
          ))}
        </select>
      </label>

      <Button variant="secondary" onClick={handleClearFilters}>
        Clear filters
      </Button>
    </div>
  );
};
