import type { ActivityType } from '@/shared/api/generated/salesTrackerApi';
import type { UserSummary } from '@/features/users/domain/user.model';

export type FollowUpActivityType = Extract<
  ActivityType,
  | 'follow_up_created'
  | 'follow_up_updated'
  | 'follow_up_done'
  | 'follow_up_cancelled'
>;

type FollowUpActivityBase = {
  createdAt: string;
  id: string;
  notes: string | null;
  user: UserSummary;
};

type FollowUpCreatedActivity = FollowUpActivityBase & {
  metadata: { dueDate: string };
  type: 'follow_up_created';
};

type FollowUpUpdatedActivity = FollowUpActivityBase & {
  metadata: { nextDueDate: string; previousDueDate: string };
  type: 'follow_up_updated';
};

type FollowUpDoneActivity = FollowUpActivityBase & {
  metadata: { completedAt: string };
  type: 'follow_up_done';
};

type FollowUpCancelledActivity = FollowUpActivityBase & {
  metadata: { cancelledAt: string };
  type: 'follow_up_cancelled';
};

export type FollowUpActivity =
  | FollowUpCreatedActivity
  | FollowUpUpdatedActivity
  | FollowUpDoneActivity
  | FollowUpCancelledActivity;
