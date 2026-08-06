import { createRoute } from '@tanstack/react-router';

import type { GetFollowUpsPriority } from '@/shared/api/generated/salesTrackerApi';
import { FollowUpsPage } from '@/features/follow-ups/presentation/pages';
import { FollowUpsFiltersProvider } from '@/features/follow-ups/presentation/providers';
import type {
  FollowUpDueDatePreset,
  FollowUpListStatus,
} from '@/features/follow-ups/domain/followUpFilters.model';
import type { FollowUpTaskType } from '@/features/follow-ups/domain/followUpTask.model';

import { Route as RootRoute } from './__root';

type TasksSearch = {
  assignedToId?: string;
  businessId?: string;
  dueDate?: FollowUpDueDatePreset;
  priority?: GetFollowUpsPriority;
  status?: FollowUpListStatus;
  type?: FollowUpTaskType;
};

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/tasks',
  validateSearch: (search): TasksSearch => ({
    assignedToId:
      typeof search.assignedToId === 'string' ? search.assignedToId : undefined,
    businessId:
      typeof search.businessId === 'string' ? search.businessId : undefined,
    dueDate:
      typeof search.dueDate === 'string'
        ? (search.dueDate as FollowUpDueDatePreset)
        : undefined,
    priority: search.priority as GetFollowUpsPriority | undefined,
    status: search.status as FollowUpListStatus | undefined,
    type:
      typeof search.type === 'string'
        ? (search.type as FollowUpTaskType)
        : undefined,
  }),
  component: () => (
    <FollowUpsFiltersProvider>
      <FollowUpsPage />
    </FollowUpsFiltersProvider>
  ),
});
