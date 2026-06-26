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
