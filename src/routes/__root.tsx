import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { AppShell } from '@/shared/ui/AppShell/AppShell';

export const Route = createRootRoute({
  component: () => (
    <>
      <AppShell>
        <Outlet />
      </AppShell>

      <TanStackRouterDevtools />
    </>
  ),
});
