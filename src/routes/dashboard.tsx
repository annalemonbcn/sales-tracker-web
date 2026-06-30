import { createRoute } from '@tanstack/react-router';

import { DashboardPage } from '@/features/dashboard/presentation/pages/DashboardPage';
import { DashboardBusinessFiltersProvider } from '@/features/dashboard/presentation/providers/DashboardBusinessFiltersProvider';
import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

import { Route as RootRoute } from './__root';
import { DashboardSelectedBusinessProvider } from '@/features/dashboard/presentation/providers/DashboardSelectedBusinessProvider';

type DashboardSearch = {
  status?: BusinessStatus;
  category?: Category;
  priority?: Priority;
  source?: LeadSource;
  assignedToId?: string;
  search?: string;
};

const DashboardRouteComponent = () => (
  <DashboardBusinessFiltersProvider>
    <DashboardSelectedBusinessProvider>
      <DashboardPage />
    </DashboardSelectedBusinessProvider>
  </DashboardBusinessFiltersProvider>
);

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
