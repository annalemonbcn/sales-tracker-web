import { createRoute } from '@tanstack/react-router';

import { CalendarPage } from '@/features/calendar/presentation/pages';

import { Route as RootRoute } from './__root';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/calendar',
  component: CalendarPage,
});
