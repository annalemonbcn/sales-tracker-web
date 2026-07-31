import { createRoute } from '@tanstack/react-router';

import { DashboardRouteComponent } from '@/features/dashboard/presentation/pages/DashboardRouteComponent';
import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

import { Route as RootRoute } from './__root';

type DashboardSearch = {
  status?: BusinessStatus;
  category?: Category;
  priority?: Priority;
  source?: LeadSource;
  assignedToId?: string;
  search?: string;
};

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/dashboard',
  validateSearch: (search): DashboardSearch => ({
    status: search.status as BusinessStatus | undefined,
    category: search.category as Category | undefined,
    priority: search.priority as Priority | undefined,
    source: search.source as LeadSource | undefined,
    assignedToId:
      typeof search.assignedToId === 'string' ? search.assignedToId : undefined,
    search: typeof search.search === 'string' ? search.search : undefined,
  }),
  component: DashboardRouteComponent,
});
