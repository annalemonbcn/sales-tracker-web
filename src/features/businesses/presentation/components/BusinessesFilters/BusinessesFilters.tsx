// src/features/businesses/presentation/components/BusinessesFilters/BusinessesFilters.tsx

import type { ChangeEvent } from 'react';

import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';
import { Button } from '@/shared/ui';
import type { User } from '@/features/users/domain/user.model';

import {
  initialBusinessFilters,
  type BusinessFilters,
} from '../../../domain/businessFilters.model';
import {
  getBusinessCategoryLabel,
  getBusinessSourceLabel,
  getBusinessStatusLabel,
  getPriorityLabel,
} from '../../lib/formatters';

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

type BusinessesFiltersProps = {
  filters: BusinessFilters;
  users: User[];
  onFiltersChange: (filters: BusinessFilters) => void;
};

export const BusinessesFilters = ({
  filters,
  users,
  onFiltersChange,
}: BusinessesFiltersProps) => {
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
          value={filters.assignedToId ?? ''}
          onChange={handleAssigneeChange}
        >
          <option value="">All assignees</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
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
