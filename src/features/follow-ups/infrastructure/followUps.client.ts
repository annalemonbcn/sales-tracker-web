import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { FollowUpFilters } from '../domain/followUpFilters.model';
import type {
  CancelFollowUpResponseDto,
  GetFollowUpsResponseDto,
  MarkFollowUpDoneResponseDto,
  UpdateFollowUpRequestDto,
  UpdateFollowUpResponseDto,
} from './followUps.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const followUpsClient = {
  cancel: async (followUpId: string): Promise<CancelFollowUpResponseDto> =>
    salesTrackerApi.patchFollowUpsFollowUpIdCancel(followUpId),
  getAll: async (filters: FollowUpFilters): Promise<GetFollowUpsResponseDto> =>
    salesTrackerApi.getFollowUps(filters),
  markDone: async (followUpId: string): Promise<MarkFollowUpDoneResponseDto> =>
    salesTrackerApi.patchFollowUpsFollowUpIdDone(followUpId),
  update: async (
    followUpId: string,
    data: UpdateFollowUpRequestDto,
  ): Promise<UpdateFollowUpResponseDto> =>
    salesTrackerApi.patchFollowUpsFollowUpId(followUpId, data),
};
