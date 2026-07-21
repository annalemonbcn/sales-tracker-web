import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import {
  getFollowUpActivityDescription,
  getFollowUpActivityTypeLabel,
} from '@/features/follow-ups/presentation/lib/followUpActivityFormatters';
import {
  ActivityTimeline,
  type ActivityTimelineItem,
  getActivityIcon,
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
    description: getFollowUpActivityDescription(activity),
    icon: getActivityIcon(activity.type),
    id: activity.id,
    title: getFollowUpActivityTypeLabel(activity.type),
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
