import type {
  CreateFollowUpRequest,
  GetFollowUps200,
  PatchFollowUpsFollowUpId200,
  PatchFollowUpsFollowUpIdCancelBody,
  PatchFollowUpsFollowUpIdCancel200,
  PatchFollowUpsFollowUpIdDoneBody,
  PatchFollowUpsFollowUpIdDone200,
  PostBusinessesBusinessIdFollowUps201,
  UpdateFollowUpRequest,
} from '@/shared/api/generated/salesTrackerApi';

export type CreateFollowUpRequestDto = CreateFollowUpRequest;
export type CreateFollowUpResponseDto = PostBusinessesBusinessIdFollowUps201;
export type GetFollowUpsResponseDto = GetFollowUps200;
export type CancelFollowUpRequestDto = PatchFollowUpsFollowUpIdCancelBody;
export type CancelFollowUpResponseDto = PatchFollowUpsFollowUpIdCancel200;
export type MarkFollowUpDoneRequestDto = PatchFollowUpsFollowUpIdDoneBody;
export type MarkFollowUpDoneResponseDto = PatchFollowUpsFollowUpIdDone200;
export type UpdateFollowUpRequestDto = UpdateFollowUpRequest;
export type UpdateFollowUpResponseDto = PatchFollowUpsFollowUpId200;
