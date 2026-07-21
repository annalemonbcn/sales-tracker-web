import type {
  FollowUpActivity,
  FollowUpActivityType,
} from '@/features/follow-ups/domain/followUpActivity.model';
import { formatNullableDateTime } from '@/shared/lib/date';
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

type FollowUpActivityByType<Type extends FollowUpActivityType> = Extract<
  FollowUpActivity,
  { type: Type }
>;

type FollowUpActivityDescriptionFormatterMap = {
  [Type in FollowUpActivityType]: (
    activity: FollowUpActivityByType<Type>,
  ) => ReactNode;
};

const followUpActivityDescriptionFormatterMap = {
  follow_up_created: (activity) =>
    `by ${activity.user.name} for ${formatNullableDateTime(activity.metadata.dueDate)}`,
  follow_up_updated: (activity) =>
    createElement(
      Fragment,
      null,
      `by ${activity.user.name} at ${formatNullableDateTime(activity.createdAt)}`,
      createElement('br'),
      'From: ',
      createElement(
        'strong',
        null,
        formatNullableDateTime(activity.metadata.previousDueDate),
      ),
      ' to: ',
      createElement(
        'strong',
        null,
        formatNullableDateTime(activity.metadata.nextDueDate),
      ),
    ),
  follow_up_done: (activity) =>
    `by ${activity.user.name} at ${formatNullableDateTime(activity.metadata.completedAt)}`,
  follow_up_cancelled: (activity) =>
    ` by ${activity.user.name} at ${formatNullableDateTime(activity.metadata.cancelledAt)}`,
} satisfies FollowUpActivityDescriptionFormatterMap;

export const getFollowUpActivityDescription = (
  activity: FollowUpActivity,
): ReactNode => {
  const formatter = followUpActivityDescriptionFormatterMap[activity.type] as (
    activityToFormat: FollowUpActivity,
  ) => ReactNode;

  return formatter(activity);
};
