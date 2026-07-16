import type {
  FollowUpBusinessDto,
  FollowUpTaskDto,
} from '@/shared/api/generated/salesTrackerApi';
import { mapUserSummaryDtoToDomain } from '@/features/users/infrastructure/users.mapper';

import type {
  FollowUpTask,
  FollowUpTaskBusiness,
} from '../domain/followUpTask.model';
import type { GetFollowUpsResponseDto } from './followUps.dto';

const mapFollowUpBusinessDtoToDomain = (
  business: FollowUpBusinessDto,
): FollowUpTaskBusiness => ({
  id: business.id,
  name: business.name,
  category: business.category,
  status: business.status,
  priority: business.priority,
});

// TODO: double check mappers
export const mapFollowUpTaskDtoToDomain = (
  followUp: FollowUpTaskDto,
): FollowUpTask => ({
  id: followUp.id,
  status: followUp.status,
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
