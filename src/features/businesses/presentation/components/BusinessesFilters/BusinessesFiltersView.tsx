import type { ChangeEvent } from 'react';

import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';
import { Button } from '@/shared/ui';

import {
  initialBusinessFilters,
  type BusinessFilters,
} from '@/features/businesses/domain/businessFilters.model';
import styles from './BusinessesFilters.module.css';
import {
  getBusinessCategoryLabel,
  getBusinessSourceLabel,
  getBusinessStatusLabel,
  getPriorityLabel,
} from '@/features/businesses/presentation/lib/formatters';

type SelectOption = {
  label: string;
  value: string;
};

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

const categoryOptions: Category[] = [
  'restaurant',
  'hairdresser',
  'beauty_center',
  'hotel',
  'shop',
  'gym',
  'clinic',
  'other',
];

const priorityOptions: Priority[] = ['low', 'medium', 'high'];

const sourceOptions: LeadSource[] = [
  'instagram',
  'google_maps',
  'walk_in',
  'referral',
  'website',
  'existing_contact',
  'other',
];

type BusinessesFiltersViewProps = {
  filters: BusinessFilters;
  assigneeOptions: SelectOption[];
  isAssigneeDisabled: boolean;
  onFiltersChange: (filters: BusinessFilters) => void;
};

export const BusinessesFiltersView = ({
  filters,
  assigneeOptions,
  isAssigneeDisabled,
  onFiltersChange,
}: BusinessesFiltersViewProps) => {
  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      status: event.target.value
        ? (event.target.value as BusinessStatus)
        : null,
    });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      category: event.target.value ? (event.target.value as Category) : null,
    });
  };

  const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      priority: event.target.value ? (event.target.value as Priority) : null,
    });
  };

  const handleSourceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      source: event.target.value ? (event.target.value as LeadSource) : null,
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
        <span>Category</span>
        <select value={filters.category ?? ''} onChange={handleCategoryChange}>
          <option value="">All categories</option>

          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {getBusinessCategoryLabel(category)}
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
        <span>Source</span>
        <select value={filters.source ?? ''} onChange={handleSourceChange}>
          <option value="">All sources</option>

          {sourceOptions.map((source) => (
            <option key={source} value={source}>
              {getBusinessSourceLabel(source)}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Assignee</span>
        <select
          disabled={isAssigneeDisabled}
          value={filters.assignedToId ?? ''}
          onChange={handleAssigneeChange}
        >
          <option value="">All assignees</option>

          {assigneeOptions.map((assignee) => (
            <option key={assignee.value} value={assignee.value}>
              {assignee.label}
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
