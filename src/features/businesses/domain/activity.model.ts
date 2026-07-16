import type { ActivityType } from '@/shared/api/generated/salesTrackerApi';
import type { UserSummary } from '@/features/users/domain/user.model';

export type Activity = {
  id: string;
  type: ActivityType;
  notes: string | null;
  metadata: unknown;
  user: UserSummary;
  createdAt: string;
};
