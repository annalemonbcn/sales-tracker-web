import { useQuery } from '@tanstack/react-query';

import { getDashboardSummary } from '../infrastructure/dashboard.api';

const COMMON_KEYS = ['dashboard'];

export const useDashboardSummary = () =>
  useQuery({
    queryKey: [...COMMON_KEYS, 'summary'],
    queryFn: getDashboardSummary,
  });
