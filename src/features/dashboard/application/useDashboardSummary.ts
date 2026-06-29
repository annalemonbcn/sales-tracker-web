import { useQuery } from '@tanstack/react-query';

import { getDashboardSummary } from '../infrastructure/dashboard.api';
import { dashboardQueryKeys } from './dashboard.queryKeys';

export const useDashboardSummary = () =>
  useQuery({
    queryKey: dashboardQueryKeys.summary(),
    queryFn: getDashboardSummary,
  });
