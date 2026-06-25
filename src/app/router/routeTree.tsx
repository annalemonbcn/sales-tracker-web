import { Route as rootRoute } from '@/routes/__root';
import { Route as indexRoute } from '@/routes/index';
import { Route as dashboardRoute } from '@/routes/dashboard';

export const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute]);
