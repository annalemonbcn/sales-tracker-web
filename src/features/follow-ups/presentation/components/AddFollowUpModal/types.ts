import type {
  FollowUpTask,
  FollowUpTaskType,
} from '@/features/follow-ups/domain/followUpTask.model';

export type AddFollowUpPriority = FollowUpTask['business']['priority'];

export type AddFollowUpFormValues = {
  assignedToId: string | null;
  businessId: string | null;
  dueDate: string;
  note: string;
  priority: AddFollowUpPriority | null;
  title: string;
  type: FollowUpTaskType | null;
};
