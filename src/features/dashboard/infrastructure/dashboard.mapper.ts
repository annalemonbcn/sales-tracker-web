import type { DashboardSummary } from '../domain/dashboardSummary.model';
import type { DashboardSummaryDto } from './dashboard.dto';

export const mapDashboardSummaryDtoToDomain = (
  dto: DashboardSummaryDto,
): DashboardSummary => ({
  totalBusinesses: dto.totalBusinesses,
  contactedBusinesses: dto.contactedBusinesses,
  pendingFollowUps: dto.pendingFollowUps,
  highPriorityBusinesses: dto.highPriorityBusinesses,
});
