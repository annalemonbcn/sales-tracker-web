import { createRoute } from '@tanstack/react-router';

import { DashboardPage } from '@/features/dashboard/presentation/pages/DashboardPage';

import { Route as rootRoute } from './__root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});
