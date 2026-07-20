import type { ActivityType } from '@/shared/api/generated/salesTrackerApi';
import type { UserSummary } from '@/features/users/domain/user.model';

export type FollowUpActivityType = Extract<
  ActivityType,
  | 'follow_up_created'
  | 'follow_up_updated'
  | 'follow_up_done'
  | 'follow_up_cancelled'
>;

export type FollowUpActivity = {
  createdAt: string;
  id: string;
  metadata: unknown;
  notes: string | null;
  type: FollowUpActivityType;
  user: UserSummary;
};
