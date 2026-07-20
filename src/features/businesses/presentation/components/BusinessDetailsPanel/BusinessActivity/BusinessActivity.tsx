import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';
import { formatNullableDateTime } from '@/shared/lib/date';
import {
  ActivityTimeline,
  type ActivityTimelineItem,
  getActivityIcon,
  getActivityTypeLabel,
  getActivityVariant,
} from '@/shared/ui';

type BusinessActivityProps = {
  business: BusinessDetail;
};

export const BusinessActivity = ({ business }: BusinessActivityProps) => {
  const items: ActivityTimelineItem[] = business.activities.map((activity) => ({
    description: activity.notes || `Created by ${activity.user.name}`,
    icon: getActivityIcon(activity.type),
    id: activity.id,
    timestamp: formatNullableDateTime(activity.createdAt),
    title: getActivityTypeLabel(activity.type),
    variant: getActivityVariant(activity.type),
  }));

  return (
    <ActivityTimeline
      emptyMessage="No activity has been recorded for this business yet."
      items={items}
    />
  );
};
