import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import {
  formatDateTimesInText,
  formatNullableDateTime,
} from '@/shared/lib/date';
import {
  ActivityTimeline,
  type ActivityTimelineItem,
  getActivityIcon,
  getActivityTypeLabel,
  getActivityVariant,
} from '@/shared/ui';

import styles from './FollowUpDetailsDrawer.module.css';

type FollowUpActivitySectionProps = {
  followUp: FollowUpTask;
};

export const FollowUpActivitySection = ({
  followUp,
}: FollowUpActivitySectionProps) => {
  const items: ActivityTimelineItem[] = followUp.activities.map((activity) => ({
    description: activity.notes
      ? formatDateTimesInText(activity.notes)
      : `Created by ${activity.user.name}`,
    icon: getActivityIcon(activity.type),
    id: activity.id,
    timestamp: formatNullableDateTime(activity.createdAt),
    title: getActivityTypeLabel(activity.type),
    variant: getActivityVariant(activity.type),
  }));

  return (
    <ActivityTimeline
      className={styles.section}
      emptyMessage="No activity has been recorded for this follow-up yet."
      items={items}
    />
  );
};
