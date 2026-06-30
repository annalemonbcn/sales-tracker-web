import { useDashboardBusinessFilters } from '@/features/dashboard/presentation/providers/DashboardBusinessFiltersProvider';
import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

import type {
  BusinessFilterSelectConfig,
  BusinessSelectFilterKey,
} from './types';
import { hasActiveBusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import {
  businessCategoryOptions,
  businessPriorityOptions,
  businessSourceOptions,
  businessStatusOptions,
} from '../../lib/businessSelectOptions';
import { useBusinessAssigneeOptions } from '../../hooks/useBusinessAssigneeOptions';

type UseBusinessesFiltersParams = {
  isBusinessesFetching: boolean;
  filtersToUse: BusinessSelectFilterKey[];
};

export const useBusinessesFilters = ({
  isBusinessesFetching,
  filtersToUse,
}: UseBusinessesFiltersParams) => {
  const { filters, updateFilter, clearFilters } = useDashboardBusinessFilters();

  const { assigneeOptions, isAssigneeOptionsError, isAssigneeOptionsLoading } =
    useBusinessAssigneeOptions({ includeUnassigned: true });

  const areBaseFiltersDisabled = isBusinessesFetching;

  const isAssigneeSelectDisabled =
    areBaseFiltersDisabled ||
    isAssigneeOptionsLoading ||
    isAssigneeOptionsError ||
    assigneeOptions.length === 0;

  const isAnyFilterActive = hasActiveBusinessFilters(filters);

  const filterSelectConfigByKey: Record<
    BusinessSelectFilterKey,
    BusinessFilterSelectConfig
  > = {
    status: {
      key: 'status',
      label: 'Status',
      placeholder: 'All statuses',
      value: filters.status,
      options: businessStatusOptions,
      isDisabled: areBaseFiltersDisabled,
      onChange: (value) => {
        updateFilter('status', value as BusinessStatus | null);
      },
    },

    category: {
      key: 'category',
      label: 'Category',
      placeholder: 'All categories',
      value: filters.category,
      options: businessCategoryOptions,
      isDisabled: areBaseFiltersDisabled,
      onChange: (value) => {
        updateFilter('category', value as Category | null);
      },
    },

    priority: {
      key: 'priority',
      label: 'Priority',
      placeholder: 'All priorities',
      value: filters.priority,
      options: businessPriorityOptions,
      isDisabled: areBaseFiltersDisabled,
      onChange: (value) => {
        updateFilter('priority', value as Priority | null);
      },
    },

    source: {
      key: 'source',
      label: 'Source',
      placeholder: 'All sources',
      value: filters.source,
      options: businessSourceOptions,
      isDisabled: areBaseFiltersDisabled,
      onChange: (value) => {
        updateFilter('source', value as LeadSource | null);
      },
    },

    assignedToId: {
      key: 'assignedToId',
      label: 'Assignee',
      placeholder: 'All assignees',
      value: filters.assignedToId,
      options: assigneeOptions,
      isDisabled: isAssigneeSelectDisabled,
      onChange: (value) => {
        updateFilter('assignedToId', value);
      },
    },
  };

  const filterSelects = filtersToUse.map((key) => filterSelectConfigByKey[key]);

  return {
    clearFilters,
    filterSelects,
    isClearButtonDisabled: !isAnyFilterActive || areBaseFiltersDisabled,
  };
};
