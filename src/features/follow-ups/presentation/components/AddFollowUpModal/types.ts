import type { FollowUpTaskType } from '@/features/follow-ups/domain/followUpTask.model';

export type AddFollowUpFormValues = {
  assignedToId: string | null;
  businessId: string | null;
  dueDate: string;
  note: string;
  title: string;
  type: FollowUpTaskType | null;
};
