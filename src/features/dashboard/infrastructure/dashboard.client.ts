import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { DashboardSummaryDto } from './dashboard.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const dashboardClient = {
  getSummary: async (): Promise<DashboardSummaryDto> =>
    salesTrackerApi.getDashboardSummary(),
};
