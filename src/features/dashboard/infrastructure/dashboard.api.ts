import { apiClient } from '@/shared/api/apiClient';

import type { DashboardSummary } from '../domain/dashboardSummary.model';
import type { DashboardSummaryDto } from './dashboard.dto';
import { mapDashboardSummaryDtoToDomain } from './dashboard.mapper';

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response =
    await apiClient.get<DashboardSummaryDto>('/dashboard/summary');

  return mapDashboardSummaryDtoToDomain(response.data);
};
