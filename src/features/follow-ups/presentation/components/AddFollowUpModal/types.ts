import type {
  FollowUpType,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

export type AddFollowUpFormValues = {
  assignedToId: string | null;
  businessId: string | null;
  dueDate: string;
  note: string;
  priority: Priority | null;
  title: string;
  type: FollowUpType | null;
};
