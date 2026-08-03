import { format } from 'date-fns';

import type {
  FollowUpTaskStatus,
  FollowUpTaskType,
} from '@/features/follow-ups/domain/followUpTask.model';
import type { BadgeVariant } from '@/shared/ui/Badge/Badge';

export const followUpStatusLabelMap: Record<FollowUpTaskStatus, string> = {
  cancelled: 'Cancelled',
  done: 'Done',
  pending: 'Pending',
};

export const followUpStatusVariantMap: Record<
  FollowUpTaskStatus,
  BadgeVariant
> = {
  cancelled: 'danger',
  done: 'success',
  pending: 'warning',
};

export const followUpTypeLabelMap: Record<FollowUpTaskType, string> = {
  call: 'Call',
  dossier: 'Dossier',
  email: 'Email',
  instagram_message: 'Instagram Message',
  meeting: 'Meeting',
  other: 'Other',
  proposal: 'Proposal',
  visit: 'Visit',
};

export const followUpTypeVariantMap: Record<FollowUpTaskType, BadgeVariant> = {
  call: 'primary',
  dossier: 'indigo',
  email: 'warning',
  instagram_message: 'pink',
  meeting: 'teal',
  other: 'yellow',
  proposal: 'purple',
  visit: 'success',
};

export const formatFollowUpDueDate = (dueDate: string): string => {
  const parsedDate = new Date(dueDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Invalid date';
  }

  return format(parsedDate, 'MMM d, HH:mm');
};
