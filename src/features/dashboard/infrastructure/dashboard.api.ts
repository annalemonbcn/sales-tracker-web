import type { DashboardSummary } from '../domain/dashboardSummary.model';
import { dashboardClient } from './dashboard.client';
import { mapGetDashboardSummaryResponseDtoToDomain } from './dashboard.mapper';

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const dto = await dashboardClient.getSummary();

  return mapGetDashboardSummaryResponseDtoToDomain(dto);
};
