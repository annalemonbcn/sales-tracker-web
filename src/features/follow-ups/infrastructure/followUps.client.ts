import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { FollowUpFilters } from '../domain/followUpFilters.model';
import type {
  CancelFollowUpResponseDto,
  CancelFollowUpRequestDto,
  CreateFollowUpRequestDto,
  CreateFollowUpResponseDto,
  GetFollowUpsResponseDto,
  MarkFollowUpDoneResponseDto,
  MarkFollowUpDoneRequestDto,
  UpdateFollowUpRequestDto,
  UpdateFollowUpResponseDto,
} from './followUps.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const followUpsClient = {
  cancel: async (
    followUpId: string,
    data: CancelFollowUpRequestDto,
  ): Promise<CancelFollowUpResponseDto> =>
    salesTrackerApi.cancelFollowUp(followUpId, data),
  create: async (
    businessId: string,
    data: CreateFollowUpRequestDto,
  ): Promise<CreateFollowUpResponseDto> =>
    salesTrackerApi.createFollowUp(businessId, data),
  getAll: async (filters: FollowUpFilters): Promise<GetFollowUpsResponseDto> =>
    salesTrackerApi.getFollowUps(filters),
  markDone: async (
    followUpId: string,
    data: MarkFollowUpDoneRequestDto,
  ): Promise<MarkFollowUpDoneResponseDto> =>
    salesTrackerApi.markFollowUpDone(followUpId, data),
  update: async (
    followUpId: string,
    data: UpdateFollowUpRequestDto,
  ): Promise<UpdateFollowUpResponseDto> =>
    salesTrackerApi.updateFollowUp(followUpId, data),
};
