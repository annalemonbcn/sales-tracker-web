import type {
  CancelFollowUp200,
  CancelFollowUpBody,
  CreateFollowUp201,
  CreateFollowUpRequest,
  GetFollowUps200,
  MarkFollowUpDone200,
  MarkFollowUpDoneBody,
  UpdateFollowUp200,
  UpdateFollowUpRequest,
} from '@/shared/api/generated/salesTrackerApi';

export type CreateFollowUpRequestDto = CreateFollowUpRequest;
export type CreateFollowUpResponseDto = CreateFollowUp201;
export type GetFollowUpsResponseDto = GetFollowUps200;
export type CancelFollowUpRequestDto = CancelFollowUpBody;
export type CancelFollowUpResponseDto = CancelFollowUp200;
export type MarkFollowUpDoneRequestDto = MarkFollowUpDoneBody;
export type MarkFollowUpDoneResponseDto = MarkFollowUpDone200;
export type UpdateFollowUpRequestDto = UpdateFollowUpRequest;
export type UpdateFollowUpResponseDto = UpdateFollowUp200;
