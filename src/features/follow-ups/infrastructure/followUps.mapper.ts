import type {
  ActivityDto,
  FollowUpBusinessDto,
  FollowUpTaskDto,
} from '@/shared/api/generated/salesTrackerApi';
import type { BusinessSummary } from '@/features/businesses/domain/business.model';
import { mapUserSummaryDtoToDomain } from '@/features/users/infrastructure/users.mapper';

import type { FollowUpTask } from '../domain/followUpTask.model';
import type {
  FollowUpActivity,
  FollowUpActivityType,
} from '../domain/followUpActivity.model';
import type {
  CancelFollowUpResponseDto,
  CreateFollowUpResponseDto,
  GetFollowUpsResponseDto,
  MarkFollowUpDoneResponseDto,
  UpdateFollowUpResponseDto,
} from './followUps.dto';

export const mapCreateFollowUpResponseDtoToDomain = (
  response: CreateFollowUpResponseDto,
) => {
  if (!response.data.followUp) {
    throw new Error('Follow-up was not returned after create');
  }

  return response.data.followUp;
};

const mapFollowUpBusinessDtoToDomain = (
  business: FollowUpBusinessDto,
): BusinessSummary => ({
  id: business.id,
  name: business.name,
  category: business.category,
  status: business.status,
  priority: business.priority,
});

const followUpActivityTypes = new Set<FollowUpActivityType>([
  'follow_up_created',
  'follow_up_updated',
  'follow_up_done',
  'follow_up_cancelled',
]);

const isFollowUpActivityType = (
  type: ActivityDto['type'],
): type is FollowUpActivityType =>
  followUpActivityTypes.has(type as FollowUpActivityType);

type FollowUpActivityBase = Pick<
  FollowUpActivity,
  'createdAt' | 'id' | 'notes' | 'user'
>;

const followUpActivityMappers: Record<
  FollowUpActivityType,
  (
    activity: ActivityDto,
    baseActivity: FollowUpActivityBase,
  ) => FollowUpActivity
> = {
  follow_up_created: (activity, baseActivity) => ({
    ...baseActivity,
    metadata: { dueDate: getActivityMetadataDate(activity, 'dueDate') },
    type: 'follow_up_created',
  }),
  follow_up_updated: (activity, baseActivity) => ({
    ...baseActivity,
    metadata: {
      nextDueDate: getActivityMetadataDate(activity, 'nextDueDate'),
      previousDueDate: getActivityMetadataDate(activity, 'previousDueDate'),
    },
    type: 'follow_up_updated',
  }),
  follow_up_done: (activity, baseActivity) => ({
    ...baseActivity,
    metadata: {
      completedAt: getActivityMetadataDate(activity, 'completedAt'),
    },
    type: 'follow_up_done',
  }),
  follow_up_cancelled: (activity, baseActivity) => ({
    ...baseActivity,
    metadata: {
      cancelledAt: getActivityMetadataDate(activity, 'cancelledAt'),
    },
    type: 'follow_up_cancelled',
  }),
};

const mapFollowUpActivityDtoToDomain = (
  activity: ActivityDto,
): FollowUpActivity => {
  if (!isFollowUpActivityType(activity.type)) {
    throw new Error(`Unexpected follow-up activity type: ${activity.type}`);
  }

  const baseActivity = {
    createdAt: activity.createdAt,
    id: activity.id,
    notes: activity.notes,
    user: mapUserSummaryDtoToDomain(activity.user),
  };

  return followUpActivityMappers[activity.type](activity, baseActivity);
};

const getActivityMetadataDate = (
  activity: ActivityDto,
  key: string,
): string => {
  const value = activity.metadata?.[key];

  if (typeof value !== 'string') {
    throw new Error(
      `Missing ${key} metadata for follow-up activity ${activity.id}`,
    );
  }

  return value;
};

export const mapFollowUpTaskDtoToDomain = (
  followUp: FollowUpTaskDto,
): FollowUpTask => ({
  activities: followUp.activities.map(mapFollowUpActivityDtoToDomain),
  id: followUp.id,
  status: followUp.status,
  type: followUp.type,
  title: followUp.title,
  dueDate: followUp.dueDate,
  isOverdue: followUp.isOverdue,
  note: followUp.note,
  completedAt: followUp.completedAt,
  assignedTo: mapUserSummaryDtoToDomain(followUp.assignedTo),
  business: mapFollowUpBusinessDtoToDomain(followUp.business),
  createdAt: followUp.createdAt,
  updatedAt: followUp.updatedAt,
});

export const mapGetFollowUpsResponseDtoToDomain = (
  response: GetFollowUpsResponseDto,
): FollowUpTask[] =>
  response.data.followUps?.map(mapFollowUpTaskDtoToDomain) ?? [];

export const mapUpdateFollowUpResponseDtoToDomain = (
  response: UpdateFollowUpResponseDto,
) => {
  if (!response.data.followUp) {
    throw new Error('Follow-up was not returned after update');
  }

  return response.data.followUp;
};

export const mapMarkFollowUpDoneResponseDtoToDomain = (
  response: MarkFollowUpDoneResponseDto,
) => {
  if (!response.data.followUp) {
    throw new Error('Follow-up was not returned after marking it done');
  }

  return response.data.followUp;
};

export const mapCancelFollowUpResponseDtoToDomain = (
  response: CancelFollowUpResponseDto,
) => {
  if (!response.data.followUp) {
    throw new Error('Follow-up was not returned after cancelling it');
  }

  return response.data.followUp;
};
