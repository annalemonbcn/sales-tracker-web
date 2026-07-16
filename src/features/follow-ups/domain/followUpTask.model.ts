import type { FollowUpTaskDtoStatus } from '@/shared/api/generated/salesTrackerApi';
import type { BusinessSummary } from '@/features/businesses/domain/business.model';
import type { UserSummary } from '@/features/users/domain/user.model';

export type FollowUpTaskStatus = FollowUpTaskDtoStatus;

export type FollowUpTask = {
  assignedTo: UserSummary;
  business: BusinessSummary;
  completedAt: string | null;
  createdAt: string;
  dueDate: string;
  id: string;
  note: string | null;
  status: FollowUpTaskStatus;
  updatedAt: string;
};
