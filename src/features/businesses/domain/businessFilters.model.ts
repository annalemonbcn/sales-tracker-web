import type {
  BusinessStatus,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

export type BusinessFilters = {
  status: BusinessStatus | null;
  priority: Priority | null;
  assignedToId: string | null;
};

export const initialBusinessFilters: BusinessFilters = {
  status: null,
  priority: null,
  assignedToId: null,
};
