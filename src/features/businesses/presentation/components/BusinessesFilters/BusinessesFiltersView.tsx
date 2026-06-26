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
  isAssigneeDisabled: boolean;
};

export const BusinessesFiltersView = ({
  assigneeOptions,
  isAssigneeDisabled,
}: BusinessesFiltersViewProps) => {
  const { filters, updateFilter, clearFilters } = useDashboardBusinessFilters();

  return (
    <div className={styles.filters}>
      <Select
        label="Status"
        options={businessStatusOptions}
        placeholder="All statuses"
        value={filters.status}
        onChange={(value) => updateFilter('status', value)}
      />

      <Select
        label="Category"
        options={categoryOptions}
        placeholder="All categories"
        value={filters.category}
        onChange={(value) => updateFilter('category', value)}
      />

      <Select
        label="Priority"
        options={priorityOptions}
        placeholder="All priorities"
        value={filters.priority}
        onChange={(value) => updateFilter('priority', value)}
      />

      <Select
        label="Source"
        options={sourceOptions}
        placeholder="All sources"
        value={filters.source}
        onChange={(value) => updateFilter('source', value)}
      />

      <Select
        isDisabled={isAssigneeDisabled}
        label="Assignee"
        options={assigneeOptions}
        placeholder="All assignees"
        value={filters.assignedToId}
        onChange={(value) => updateFilter('assignedToId', value)}
      />

      <Button variant="secondary" onClick={clearFilters}>
        Clear filters
      </Button>
    </div>
  );
};
