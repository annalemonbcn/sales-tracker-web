import type { BusinessSummary } from '@/features/businesses/domain/business.model';
import type { UserSummary } from '@/features/users/domain/user.model';

import type { FollowUpActivity } from './followUpActivity.model';

export const FOLLOW_UP_TASK_STATUSES = [
  'pending',
  'done',
  'cancelled',
] as const;

export const FOLLOW_UP_TASK_TYPES = [
  'call',
  'email',
  'instagram_message',
  'visit',
  'meeting',
  'proposal',
  'dossier',
  'other',
] as const;

export type FollowUpTaskStatus = (typeof FOLLOW_UP_TASK_STATUSES)[number];
export type FollowUpTaskType = (typeof FOLLOW_UP_TASK_TYPES)[number];

export type FollowUpTask = {
  activities: FollowUpActivity[];
  assignedTo: UserSummary;
  business: BusinessSummary;
  completedAt: string | null;
  createdAt: string;
  dueDate: string;
  id: string;
  isOverdue: boolean;
  note: string | null;
  status: FollowUpTaskStatus;
  title: string;
  type: FollowUpTaskType;
  updatedAt: string;
};
