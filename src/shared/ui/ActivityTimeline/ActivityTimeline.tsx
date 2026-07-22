import { useState, type ComponentType, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './ActivityTimeline.module.css';

export type ActivityTimelineVariant =
  | 'success'
  | 'primary'
  | 'warning'
  | 'danger'
  | 'neutral';

export type ActivityTimelineItem = {
  description?: ReactNode;
  icon: ComponentType<{ size?: number }>;
  id: string;
  timestamp?: string;
  title: string;
  variant: ActivityTimelineVariant;
};

type ActivityTimelineProps = {
  className?: string;
  emptyMessage: string;
  items: ActivityTimelineItem[];
  title?: string;
};

const MAX_VISIBLE_ACTIVITIES = 3;

export const ActivityTimeline = ({
  className,
  emptyMessage,
  items,
  title = 'Activity',
}: ActivityTimelineProps) => {
  const [showAllActivities, setShowAllActivities] = useState(false);
  const hasMoreActivities = items.length > MAX_VISIBLE_ACTIVITIES;
  const visibleActivities = showAllActivities
    ? items
    : items.slice(0, MAX_VISIBLE_ACTIVITIES);

  return (
    <section className={cn(styles.section, className)}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>

        {hasMoreActivities ? (
          <button
            className={styles.sectionAction}
            type="button"
            onClick={() => {
              setShowAllActivities((currentValue) => !currentValue);
            }}
          >
            {showAllActivities ? 'Show less' : 'View all'}
          </button>
        ) : null}
      </div>

      {items.length > 0 ? (
        <div className={styles.activityList}>
          {visibleActivities.map((activity) => {
            const ActivityIcon = activity.icon;

            return (
              <div className={styles.activityItem} key={activity.id}>
                <span
                  className={cn(styles.activityIcon, styles[activity.variant])}
                >
                  <ActivityIcon size={18} />
                </span>

                <div className={styles.activityContent}>
                  <strong className={styles.activityTitle}>
                    {activity.title}
                  </strong>
                  {activity.timestamp ? <p>{activity.timestamp}</p> : null}
                  {activity.description ? (
                    <span>{activity.description}</span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>{emptyMessage}</div>
      )}
    </section>
  );
};
