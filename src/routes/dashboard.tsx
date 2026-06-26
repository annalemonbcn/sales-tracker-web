import { createRoute } from '@tanstack/react-router';

import type { BusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import {
  mapBusinessFiltersToSearch,
  mapSearchToBusinessFilters,
} from '@/features/businesses/domain/businessFilters.model';
import { DashboardPage } from '@/features/dashboard/presentation/pages/DashboardPage';
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

const DashboardRouteComponent = () => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const businessFilters = mapSearchToBusinessFilters(search);

  const handleBusinessFiltersChange = (filters: BusinessFilters) => {
    navigate({
      search: () => mapBusinessFiltersToSearch(filters),
    });
  };

  return (
    <DashboardPage
      businessFilters={businessFilters}
      onBusinessFiltersChange={handleBusinessFiltersChange}
    />
  );
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
