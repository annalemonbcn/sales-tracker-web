import { createRoute } from '@tanstack/react-router';

import { FollowUpsPage } from '@/features/follow-ups/presentation/pages';

import { Route as RootRoute } from './__root';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/tasks',
  component: FollowUpsPage,
});
