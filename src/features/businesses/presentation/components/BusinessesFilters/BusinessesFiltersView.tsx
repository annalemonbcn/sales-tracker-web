import { useDashboardBusinessFilters } from '@/features/dashboard/presentation/providers/DashboardBusinessFiltersProvider';
import { Button, Select, type SelectOption } from '@/shared/ui';

import styles from './BusinessesFilters.module.css';
import {
  businessStatusOptions,
  categoryOptions,
  priorityOptions,
  sourceOptions,
} from './filterOptions';

type BusinessesFiltersViewProps = {
  assigneeOptions: SelectOption[];
  isAssigneeSelectDisabled: boolean;
  areBaseFiltersDisabled: boolean;
};

export const BusinessesFiltersView = ({
  assigneeOptions,
  isAssigneeSelectDisabled,
  areBaseFiltersDisabled,
}: BusinessesFiltersViewProps) => {
  const { filters, updateFilter, clearFilters } = useDashboardBusinessFilters();

  const isAnyFilterActive = Object.values(filters).some(Boolean);

  return (
    <div className={styles.filters}>
      <Select
        isDisabled={areBaseFiltersDisabled}
        label="Status"
        options={businessStatusOptions}
        placeholder="All statuses"
        value={filters.status}
        onChange={(value) => updateFilter('status', value)}
      />

      <Select
        isDisabled={areBaseFiltersDisabled}
        label="Category"
        options={categoryOptions}
        placeholder="All categories"
        value={filters.category}
        onChange={(value) => updateFilter('category', value)}
      />

      <Select
        isDisabled={areBaseFiltersDisabled}
        label="Priority"
        options={priorityOptions}
        placeholder="All priorities"
        value={filters.priority}
        onChange={(value) => updateFilter('priority', value)}
      />

      <Select
        isDisabled={areBaseFiltersDisabled}
        label="Source"
        options={sourceOptions}
        placeholder="All sources"
        value={filters.source}
        onChange={(value) => updateFilter('source', value)}
      />

      <Select
        isDisabled={isAssigneeSelectDisabled}
        label="Assignee"
        options={assigneeOptions}
        placeholder="All assignees"
        value={filters.assignedToId}
        onChange={(value) => updateFilter('assignedToId', value)}
      />

      <Button
        variant="secondary"
        onClick={clearFilters}
        disabled={!isAnyFilterActive}
      >
        Clear filters
      </Button>
    </div>
  );
};
