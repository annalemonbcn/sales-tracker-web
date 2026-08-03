import type {
  FollowUpActivity,
  FollowUpActivityType,
} from '@/features/follow-ups/domain/followUpActivity.model';
import { formatDatesInText, formatNullableDateTime } from '@/shared/lib/date';
import { createElement, Fragment, type ReactNode } from 'react';

const followUpActivityTypeLabelMap = {
  follow_up_created: 'Follow-up created',
  follow_up_updated: 'Follow-up updated',
  follow_up_done: 'Follow-up done',
  follow_up_cancelled: 'Follow-up cancelled',
} satisfies Record<FollowUpActivityType, string>;

export const getFollowUpActivityTypeLabel = (
  type: FollowUpActivityType,
): string => followUpActivityTypeLabelMap[type];

export const getFollowUpActivityDescription = (
  activity: FollowUpActivity,
): ReactNode => {
  const note = activity.notes?.trim();
  const description = `by ${activity.user.name} at ${formatNullableDateTime(activity.createdAt)}`;

  if (!note) {
    return description;
  }

  return createElement(
    Fragment,
    null,
    description,
    createElement('br'),
    `Note: ${formatDatesInText(note)}`,
  );
};
