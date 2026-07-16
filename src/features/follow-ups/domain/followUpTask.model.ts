import type {
  FollowUpTaskDtoStatus,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

export type FollowUpTaskStatus = FollowUpTaskDtoStatus;

export type FollowUpTaskBusiness = {
  id: string;
  name: string;
  category: string;
  status: string;
  priority: Priority | string;
};

export type FollowUpTaskAssignee = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type FollowUpTask = {
  assignedTo: FollowUpTaskAssignee;
  business: FollowUpTaskBusiness;
  completedAt: string | null;
  createdAt: string;
  dueDate: string;
  id: string;
  note: string | null;
  status: FollowUpTaskStatus;
  updatedAt: string;
};
