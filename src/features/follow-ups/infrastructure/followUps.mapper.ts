import type {
  FollowUpBusinessDto,
  FollowUpTaskDto,
} from '@/shared/api/generated/salesTrackerApi';
import type { BusinessSummary } from '@/features/businesses/domain/business.model';
import { mapUserSummaryDtoToDomain } from '@/features/users/infrastructure/users.mapper';

import type { FollowUpTask } from '../domain/followUpTask.model';
import type {
  CancelFollowUpResponseDto,
  GetFollowUpsResponseDto,
  MarkFollowUpDoneResponseDto,
  UpdateFollowUpResponseDto,
} from './followUps.dto';

const mapFollowUpBusinessDtoToDomain = (
  business: FollowUpBusinessDto,
): BusinessSummary => ({
  id: business.id,
  name: business.name,
  category: business.category,
  status: business.status,
  priority: business.priority,
});

export const mapFollowUpTaskDtoToDomain = (
  followUp: FollowUpTaskDto,
): FollowUpTask => ({
  id: followUp.id,
  status: followUp.status,
  type: followUp.type,
  title: followUp.title,
  dueDate: followUp.dueDate,
  note: followUp.note,
  completedAt: followUp.completedAt,
  assignedTo: mapUserSummaryDtoToDomain(followUp.assignedTo),
  business: mapFollowUpBusinessDtoToDomain(followUp.business),
  createdAt: followUp.createdAt,
  updatedAt: followUp.updatedAt,
});

export const mapGetFollowUpsResponseDtoToDomain = (
  response: GetFollowUpsResponseDto,
): FollowUpTask[] =>
  response.data.followUps?.map(mapFollowUpTaskDtoToDomain) ?? [];

export const mapUpdateFollowUpResponseDtoToDomain = (
  response: UpdateFollowUpResponseDto,
) => {
  if (!response.data.followUp) {
    throw new Error('Follow-up was not returned after update');
  }

  return response.data.followUp;
};

export const mapMarkFollowUpDoneResponseDtoToDomain = (
  response: MarkFollowUpDoneResponseDto,
) => {
  if (!response.data.followUp) {
    throw new Error('Follow-up was not returned after marking it done');
  }

  return response.data.followUp;
};

export const mapCancelFollowUpResponseDtoToDomain = (
  response: CancelFollowUpResponseDto,
) => {
  if (!response.data.followUp) {
    throw new Error('Follow-up was not returned after cancelling it');
  }

  return response.data.followUp;
};
