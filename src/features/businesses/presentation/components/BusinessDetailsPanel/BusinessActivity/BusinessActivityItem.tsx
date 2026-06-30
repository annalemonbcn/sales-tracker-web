import type { Activity } from '@/features/businesses/domain/activity.model';
import { cn } from '@/shared/lib/cn';
import { formatNullableDateTime } from '@/shared/lib/date';

import styles from './BusinessActivity.module.css';

import {
  getActivityIcon,
  getActivityTypeLabel,
  getActivityVariant,
  type ActivityVariant,
} from './activityFormatters';

type BusinessActivityItemProps = {
  activity: Activity;
};

const activityVariantClassNameByVariant = {
  success: styles.success,
  primary: styles.primary,
  warning: styles.warning,
  danger: styles.danger,
  neutral: styles.neutral,
} satisfies Record<ActivityVariant, string>;

export const BusinessActivityItem = ({
  activity,
}: BusinessActivityItemProps) => {
  const ActivityIcon = getActivityIcon(activity.type);
  const activityVariant = getActivityVariant(activity.type);

  return (
    <div className={styles.activityItem}>
      <span
        className={cn(
          styles.activityIcon,
          activityVariantClassNameByVariant[activityVariant],
        )}
      >
        <ActivityIcon size={18} />
      </span>

      <div className={styles.activityContent}>
        <strong>{getActivityTypeLabel(activity.type)}</strong>

        <p>{formatNullableDateTime(activity.createdAt)}</p>

        <span>{activity.notes || `Created by ${activity.user.name}`}</span>
      </div>
    </div>
  );
};
