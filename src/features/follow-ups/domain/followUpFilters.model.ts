import type {
  GetFollowUpsPriority,
  GetFollowUpsStatus,
} from '@/shared/api/generated/salesTrackerApi';

export type FollowUpFilters = {
  assignedToId?: string;
  businessId?: string;
  dueAfter?: string;
  dueBefore?: string;
  priority?: GetFollowUpsPriority;
  status?: GetFollowUpsStatus;
};
