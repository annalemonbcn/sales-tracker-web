import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { GetDashboardSummaryResponseDto } from './dashboard.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const dashboardClient = {
  getSummary: async (): Promise<GetDashboardSummaryResponseDto> =>
    salesTrackerApi.getDashboardSummary(),
};
