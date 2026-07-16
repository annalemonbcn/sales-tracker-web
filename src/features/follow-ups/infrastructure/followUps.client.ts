import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { FollowUpFilters } from '../domain/followUpFilters.model';
import type { GetFollowUpsResponseDto } from './followUps.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const followUpsClient = {
  getAll: async (filters: FollowUpFilters): Promise<GetFollowUpsResponseDto> =>
    salesTrackerApi.getFollowUps(filters),
};
