import type {
  FollowUpTaskDtoStatus,
  FollowUpType,
} from '@/shared/api/generated/salesTrackerApi';
import type { BusinessSummary } from '@/features/businesses/domain/business.model';
import type { UserSummary } from '@/features/users/domain/user.model';

export type FollowUpTaskStatus = FollowUpTaskDtoStatus;
export type FollowUpTaskType = FollowUpType;

export type FollowUpTask = {
  assignedTo: UserSummary;
  business: BusinessSummary;
  completedAt: string | null;
  createdAt: string;
  dueDate: string;
  id: string;
  note: string | null;
  status: FollowUpTaskStatus;
  title: string;
  type: FollowUpTaskType;
  updatedAt: string;
};
