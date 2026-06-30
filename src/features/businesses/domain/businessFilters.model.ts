import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

export type BusinessFilters = {
  status: BusinessStatus | null;
  category: Category | null;
  priority: Priority | null;
  source: LeadSource | null;
  assignedToId: string | null;
  search: string;
};

export const UNASSIGNED_ASSIGNEE_FILTER_VALUE = '__unassigned__';

export const UNASSIGNED_ASSIGNEE_SEARCH_VALUE = 'unassigned';

const mapAssignedToIdSearchToFilter = (
  assignedToId: string | undefined,
): string | null => {
  if (!assignedToId) return null;

  if (assignedToId === UNASSIGNED_ASSIGNEE_SEARCH_VALUE) {
    return UNASSIGNED_ASSIGNEE_FILTER_VALUE;
  }

  return assignedToId;
};

const mapAssignedToIdFilterToSearch = (
  assignedToId: string | null,
): string | undefined => {
  if (!assignedToId) return undefined;

  if (assignedToId === UNASSIGNED_ASSIGNEE_FILTER_VALUE) {
    return UNASSIGNED_ASSIGNEE_SEARCH_VALUE;
  }

  return assignedToId;
};

export const initialBusinessFilters: BusinessFilters = {
  status: null,
  category: null,
  priority: null,
  source: null,
  assignedToId: null,
  search: '',
};

export const hasActiveBusinessFilters = (filters: BusinessFilters): boolean =>
  Object.values(filters).some((value) => value !== '' && value !== null);

type BusinessFiltersSearch = {
  status?: BusinessStatus;
  category?: Category;
  priority?: Priority;
  source?: LeadSource;
  assignedToId?: string;
  search?: string;
};

export const mapSearchToBusinessFilters = (
  search: BusinessFiltersSearch,
): BusinessFilters => ({
  status: search.status ?? null,
  category: search.category ?? null,
  priority: search.priority ?? null,
  source: search.source ?? null,
  assignedToId: mapAssignedToIdSearchToFilter(search.assignedToId),
  search: search.search ?? '',
});

export const mapBusinessFiltersToSearch = (
  filters: BusinessFilters,
): BusinessFiltersSearch => ({
  status: filters.status ?? undefined,
  category: filters.category ?? undefined,
  priority: filters.priority ?? undefined,
  source: filters.source ?? undefined,
  assignedToId: mapAssignedToIdFilterToSearch(filters.assignedToId),
  search: filters.search || undefined,
});
