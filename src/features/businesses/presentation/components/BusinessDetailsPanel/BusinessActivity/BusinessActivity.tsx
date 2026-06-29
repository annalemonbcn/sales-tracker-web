import { useState } from 'react';

import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';

import panelStyles from '../BusinessDetailsPanel.module.css';
import styles from './BusinessActivity.module.css';
import { BusinessActivityItem } from './BusinessActivityItem';

type BusinessActivityProps = {
  business: BusinessDetail;
};

const DEFAULT_VISIBLE_ACTIVITIES = 3;

export const BusinessActivity = ({ business }: BusinessActivityProps) => {
  const [showAllActivities, setShowAllActivities] = useState(false);

  const activities = business.activities;
  const hasActivities = activities.length > 0;
  const hasHiddenActivities = activities.length > DEFAULT_VISIBLE_ACTIVITIES;

  const visibleActivities = showAllActivities
    ? activities
    : activities.slice(0, DEFAULT_VISIBLE_ACTIVITIES);

  return (
    <section className={panelStyles.section}>
      <div className={panelStyles.sectionHeader}>
        <h3 className={panelStyles.sectionTitle}>Activity</h3>

        {hasHiddenActivities ? (
          <button
            className={panelStyles.sectionAction}
            type="button"
            onClick={() => {
              setShowAllActivities((currentValue) => !currentValue);
            }}
          >
            {showAllActivities ? 'Show less' : 'View all'}
          </button>
        ) : null}
      </div>

      {hasActivities ? (
        <div className={styles.activityList}>
          {visibleActivities.map((activity) => (
            <BusinessActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          No activity has been recorded for this business yet.
        </div>
      )}
    </section>
  );
};
