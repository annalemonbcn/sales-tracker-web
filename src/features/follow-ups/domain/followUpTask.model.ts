import type {
  FollowUpTaskDtoStatus,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';
import type { UserSummary } from '@/features/users/domain/user.model';

export type FollowUpTaskStatus = FollowUpTaskDtoStatus;

export type FollowUpTaskBusiness = {
  id: string;
  name: string;
  category: string;
  status: string;
  priority: Priority | string;
};

export type FollowUpTask = {
  assignedTo: UserSummary;
  business: FollowUpTaskBusiness;
  completedAt: string | null;
  createdAt: string;
  dueDate: string;
  id: string;
  note: string | null;
  status: FollowUpTaskStatus;
  updatedAt: string;
};
