import type {
  GetFollowUps200,
  PatchFollowUpsFollowUpId200,
  PatchFollowUpsFollowUpIdCancel200,
  PatchFollowUpsFollowUpIdDone200,
  UpdateFollowUpRequest,
} from '@/shared/api/generated/salesTrackerApi';

export type GetFollowUpsResponseDto = GetFollowUps200;
export type CancelFollowUpResponseDto = PatchFollowUpsFollowUpIdCancel200;
export type MarkFollowUpDoneResponseDto = PatchFollowUpsFollowUpIdDone200;
export type UpdateFollowUpRequestDto = UpdateFollowUpRequest;
export type UpdateFollowUpResponseDto = PatchFollowUpsFollowUpId200;
