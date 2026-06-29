import { CalendarDays, X } from 'lucide-react';

import { useBusinessDetails } from '@/features/businesses/application/useBusinessDetails';
import { useDashboardSelectedBusiness } from '@/features/dashboard/presentation/providers/DashboardSelectedBusinessProvider';
import { formatNullableDateTime } from '@/shared/lib/date';
import { ErrorState, IconButton, LoadingState } from '@/shared/ui';

import styles from './BusinessDetailsPanel.module.css';
import {
  getActivityIcon,
  getActivityTypeLabel,
  getActivityVariant,
} from '../../lib/activityFormatters';
import { cn } from '@/shared/lib/cn';
import { BusinessDetailsPanelHeader } from './BusinessDetailsPanelHeader';
import { BusinessContactInformation } from './BusinessContactInformation';
import { BusinessNotes } from './BusinessNotes';

type BusinessDetailsPanelProps = {
  businessId: string;
  className?: string;
};

// TODO: refactor
export const BusinessDetailsPanel = ({
  businessId,
  className,
}: BusinessDetailsPanelProps) => {
  const { clearSelectedBusiness } = useDashboardSelectedBusiness();

  const { data: business, isError, isLoading } = useBusinessDetails(businessId);

  if (isLoading) {
    return (
      <aside className={cn(styles.panel, className)}>
        <PanelHeader title="Business details" onClose={clearSelectedBusiness} />
        <LoadingState message="Loading business details..." noBorder />
      </aside>
    );
  }

  if (isError || !business) {
    return (
      <aside className={cn(styles.panel, className)}>
        <PanelHeader title="Business details" onClose={clearSelectedBusiness} />
        <ErrorState
          title="We couldn't load this business"
          message="Please try it again in a moment."
          noBorder
        />
      </aside>
    );
  }

  return (
    <aside className={cn(styles.panel, className)}>
      <BusinessDetailsPanelHeader
        business={business}
        onClose={clearSelectedBusiness}
      />

      <div className={styles.content}>
        <BusinessContactInformation business={business} />

        <BusinessNotes business={business} />

        <section className={styles.section}>
          <SectionHeader title="Next action" actionLabel="Edit" />

          <div className={styles.nextActionCard}>
            <div className={styles.nextActionIcon}>
              <CalendarDays size={20} />
            </div>

            <div className={styles.nextActionContent}>
              <div className={styles.nextActionHeader}>
                <strong>Follow-up</strong>

                {business.nextFollowUpAt ? (
                  <span className={styles.nextActionBadge}>Scheduled</span>
                ) : null}
              </div>

              <p>{formatNullableDateTime(business.nextFollowUpAt)}</p>
              <span>
                {business.nextFollowUpAt
                  ? 'Review the next planned contact.'
                  : 'No next follow-up scheduled.'}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader title="Activity" actionLabel="View all" />

          {business.activities.length > 0 ? (
            <div className={styles.activityList}>
              {business.activities.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.type);

                return (
                  <ActivityItem
                    key={activity.id}
                    icon={<ActivityIcon size={18} />}
                    variant={getActivityVariant(activity.type)}
                    title={getActivityTypeLabel(activity.type)}
                    description={activity.notes ?? `By ${activity.user.name}`}
                    date={formatNullableDateTime(activity.createdAt)}
                  />
                );
              })}
            </div>
          ) : (
            <p className={styles.emptyText}>No activity yet.</p>
          )}
        </section>
      </div>
    </aside>
  );
};

type PanelHeaderProps = {
  title: string;
  onClose: () => void;
};

const PanelHeader = ({ title, onClose }: PanelHeaderProps) => (
  <div className={styles.header}>
    <h2 className={styles.title}>{title}</h2>

    <IconButton label="Close business details" onClick={onClose}>
      <X size={18} />
    </IconButton>
  </div>
);

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
};

const SectionHeader = ({ actionLabel, title }: SectionHeaderProps) => (
  <div className={styles.sectionHeader}>
    <h3 className={styles.sectionTitle}>{title}</h3>

    {actionLabel ? (
      <button className={styles.sectionAction} type="button">
        {actionLabel}
      </button>
    ) : null}
  </div>
);

type ActivityItemProps = {
  icon: React.ReactNode;
  variant: 'success' | 'primary' | 'warning' | 'danger';
  title: string;
  description: string;
  date: string;
};

const ActivityItem = ({
  date,
  description,
  icon,
  title,
  variant,
}: ActivityItemProps) => (
  <div className={styles.activityItem}>
    <span className={`${styles.activityIcon} ${styles[variant]}`}>{icon}</span>

    <div>
      <strong>{title}</strong>
      <p>{date}</p>
      <span>{description}</span>
    </div>
  </div>
);
