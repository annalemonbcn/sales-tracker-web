import { format } from 'date-fns';

import type { FollowUpTaskStatus } from '@/features/follow-ups/domain/followUpTask.model';
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
  cancelled: 'neutral',
  done: 'success',
  pending: 'warning',
};

export const formatFollowUpDueDate = (dueDate: string): string => {
  const parsedDate = new Date(dueDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Invalid date';
  }

  return format(parsedDate, 'MMM d, HH:mm');
};
