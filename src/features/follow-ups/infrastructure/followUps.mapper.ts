import type {
  FollowUpBusinessDto,
  FollowUpTaskDto,
  UserSummaryDto,
} from '@/shared/api/generated/salesTrackerApi';

import type {
  FollowUpTask,
  FollowUpTaskAssignee,
  FollowUpTaskBusiness,
} from '../domain/followUpTask.model';
import type { GetFollowUpsResponseDto } from './followUps.dto';

const mapFollowUpAssigneeDtoToDomain = (
  assignee: UserSummaryDto,
): FollowUpTaskAssignee => ({
  id: assignee.id,
  name: assignee.name,
  email: assignee.email,
  role: assignee.role,
});

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
  assignedTo: mapFollowUpAssigneeDtoToDomain(followUp.assignedTo),
  business: mapFollowUpBusinessDtoToDomain(followUp.business),
  createdAt: followUp.createdAt,
  updatedAt: followUp.updatedAt,
});

export const mapGetFollowUpsResponseDtoToDomain = (
  response: GetFollowUpsResponseDto,
): FollowUpTask[] =>
  response.data.followUps?.map(mapFollowUpTaskDtoToDomain) ?? [];
