import {
  CalendarDays,
  ExternalLink,
  MapPin,
  MoreVertical,
  Phone,
  Send,
  UserRound,
  X,
} from 'lucide-react';

import { useBusinessDetails } from '@/features/businesses/application/useBusinessDetails';
import { useDashboardSelectedBusiness } from '@/features/dashboard/presentation/providers/DashboardSelectedBusinessProvider';
import { formatNullableDateTime } from '@/shared/lib/date';
import { Badge, ErrorState, IconButton, LoadingState } from '@/shared/ui';

import {
  getBadgeVariantByPriority,
  getBusinessCategoryLabel,
  getBusinessSourceLabel,
  getPriorityLabel,
} from '../../lib/formatters';

import styles from './BusinessDetailsPanel.module.css';
import {
  getActivityIcon,
  getActivityTypeLabel,
  getActivityVariant,
} from '../../lib/activityFormatters';

type BusinessDetailsPanelProps = {
  businessId: string;
  className?: string;
};

export const BusinessDetailsPanel = ({
  businessId,
  className,
}: BusinessDetailsPanelProps) => {
  const { clearSelectedBusiness } = useDashboardSelectedBusiness();

  const { data: business, isError, isLoading } = useBusinessDetails(businessId);

  if (isLoading) {
    return (
      <aside className={`${styles.panel} ${className ?? ''}`}>
        <PanelHeader title="Business details" onClose={clearSelectedBusiness} />
        <LoadingState message="Loading business details..." />
      </aside>
    );
  }

  if (isError || !business) {
    return (
      <aside className={`${styles.panel} ${className ?? ''}`}>
        <PanelHeader title="Business details" onClose={clearSelectedBusiness} />
        <ErrorState
          title="We couldn't load this business"
          message="Please try selecting it again in a moment."
        />
      </aside>
    );
  }

  return (
    <aside className={`${styles.panel} ${className ?? ''}`}>
      <div className={styles.header}>
        <div className={styles.businessIntro}>
          <div className={styles.categoryIcon}>
            <UserRound size={26} />
          </div>

          <div className={styles.businessMain}>
            <h2 className={styles.title}>{business.name}</h2>

            <div className={styles.badges}>
              <Badge variant="primary">
                {getBusinessCategoryLabel(business.category)}
              </Badge>

              <Badge variant={getBadgeVariantByPriority(business.priority)}>
                {getPriorityLabel(business.priority)}
              </Badge>
            </div>
          </div>
        </div>

        <div className={styles.headerActions}>
          <IconButton
            label="Close business details"
            onClick={clearSelectedBusiness}
          >
            <X size={18} />
          </IconButton>

          <IconButton label="More actions">
            <MoreVertical size={18} />
          </IconButton>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact information</h3>

          <div className={styles.contactList}>
            <ContactRow
              icon={<Phone size={19} />}
              label="No phone yet"
              actionIcon={<Phone size={18} />}
            />

            <ContactRow
              icon={<Send size={19} />}
              label={getBusinessSourceLabel(business.source)}
              actionIcon={<ExternalLink size={18} />}
            />

            <ContactRow
              icon={<MapPin size={19} />}
              label="No address yet"
              actionIcon={<ExternalLink size={18} />}
            />
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader title="Notes" actionLabel="Edit" />

          <div className={styles.notesBox}>
            {business.notes || 'No notes yet.'}
          </div>
        </section>

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

type ContactRowProps = {
  icon: React.ReactNode;
  label: string;
  actionIcon?: React.ReactNode;
};

const ContactRow = ({ actionIcon, icon, label }: ContactRowProps) => (
  <div className={styles.contactRow}>
    <span className={styles.contactIcon}>{icon}</span>
    <span className={styles.contactLabel}>{label}</span>

    {actionIcon ? (
      <button className={styles.contactAction} type="button">
        {actionIcon}
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
