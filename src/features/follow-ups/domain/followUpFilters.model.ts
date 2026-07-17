import type {
  GetFollowUpsPriority,
  GetFollowUpsStatus,
} from '@/shared/api/generated/salesTrackerApi';
import type { FollowUpTaskType } from './followUpTask.model';

export type FollowUpFilters = {
  assignedToId?: string;
  businessId?: string;
  dueAfter?: string;
  dueBefore?: string;
  priority?: GetFollowUpsPriority;
  status?: GetFollowUpsStatus;
  type?: FollowUpTaskType;
};

export type FollowUpDueDatePreset = 'overdue' | 'today' | 'next_7_days';

export type FollowUpListFilters = {
  assignedToId: string | null;
  businessId: string | null;
  dueDate: FollowUpDueDatePreset | null;
  priority: GetFollowUpsPriority | null;
  status: GetFollowUpsStatus | null;
  type: FollowUpTaskType | null;
};

export const initialFollowUpListFilters: FollowUpListFilters = {
  assignedToId: null,
  businessId: null,
  dueDate: null,
  priority: null,
  status: null,
  type: null,
};

export const hasActiveFollowUpFilters = (
  filters: FollowUpListFilters,
): boolean => Object.values(filters).some((value) => value !== null);

type FollowUpFiltersSearch = {
  assignedToId?: string;
  businessId?: string;
  dueDate?: FollowUpDueDatePreset;
  priority?: GetFollowUpsPriority;
  status?: GetFollowUpsStatus;
  type?: FollowUpTaskType;
};

export const mapSearchToFollowUpListFilters = (
  search: FollowUpFiltersSearch,
): FollowUpListFilters => ({
  assignedToId: search.assignedToId ?? null,
  businessId: search.businessId ?? null,
  dueDate: search.dueDate ?? null,
  priority: search.priority ?? null,
  status: search.status ?? null,
  type: search.type ?? null,
});

export const mapFollowUpListFiltersToSearch = (
  filters: FollowUpListFilters,
): FollowUpFiltersSearch => ({
  assignedToId: filters.assignedToId ?? undefined,
  businessId: filters.businessId ?? undefined,
  dueDate: filters.dueDate ?? undefined,
  priority: filters.priority ?? undefined,
  status: filters.status ?? undefined,
  type: filters.type ?? undefined,
});

export const mapFollowUpListFiltersToApiFilters = (
  filters: FollowUpListFilters,
): FollowUpFilters => {
  const dateRange = getDueDateRange(filters.dueDate);

  return {
    assignedToId: filters.assignedToId ?? undefined,
    businessId: filters.businessId ?? undefined,
    priority: filters.priority ?? undefined,
    status: filters.status ?? undefined,
    type: filters.type ?? undefined,
    ...dateRange,
  };
};

const getDueDateRange = (
  dueDate: FollowUpDueDatePreset | null,
): Pick<FollowUpFilters, 'dueAfter' | 'dueBefore'> => {
  if (!dueDate) {
    return {};
  }

  const today = new Date();
  const startOfToday = startOfDay(today);
  const endOfToday = endOfDay(today);

  if (dueDate === 'overdue') {
    const endOfYesterday = new Date(startOfToday);
    endOfYesterday.setMilliseconds(-1);

    return {
      dueBefore: endOfYesterday.toISOString(),
    };
  }

  if (dueDate === 'today') {
    return {
      dueAfter: startOfToday.toISOString(),
      dueBefore: endOfToday.toISOString(),
    };
  }

  const endOfNextSevenDays = endOfDay(today);
  endOfNextSevenDays.setDate(endOfNextSevenDays.getDate() + 7);

  return {
    dueAfter: startOfToday.toISOString(),
    dueBefore: endOfNextSevenDays.toISOString(),
  };
};

const startOfDay = (date: Date): Date => {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);

  return nextDate;
};

const endOfDay = (date: Date): Date => {
  const nextDate = new Date(date);
  nextDate.setHours(23, 59, 59, 999);

  return nextDate;
};
