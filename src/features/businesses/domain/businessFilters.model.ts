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

export const initialBusinessFilters: BusinessFilters = {
  status: null,
  category: null,
  priority: null,
  source: null,
  assignedToId: null,
  search: '',
};

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
  assignedToId: search.assignedToId ?? null,
  search: search.search ?? '',
});

export const mapBusinessFiltersToSearch = (
  filters: BusinessFilters,
): BusinessFiltersSearch => ({
  status: filters.status ?? undefined,
  category: filters.category ?? undefined,
  priority: filters.priority ?? undefined,
  source: filters.source ?? undefined,
  assignedToId: filters.assignedToId ?? undefined,
  search: filters.search || undefined,
});
