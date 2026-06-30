import { CalendarDays } from 'lucide-react';

import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';
import { cn } from '@/shared/lib/cn';
import { formatNullableDateTime } from '@/shared/lib/date';

import panelStyles from '../BusinessDetailsPanel.module.css';
import styles from './BusinessNextFollowUp.module.css';

type BusinessNextFollowUpProps = {
  business: BusinessDetail;
};

const FOLLOW_UP_TOOLTIP = 'Create and manage follow-ups from the Tasks view.';

export const BusinessNextFollowUp = ({
  business,
}: BusinessNextFollowUpProps) => {
  const hasNextFollowUp = Boolean(business.nextFollowUpAt);

  const cardContent = (
    <div className={styles.cardContent}>
      <div className={styles.icon}>
        <CalendarDays size={20} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <strong>
            {hasNextFollowUp ? 'Follow-up scheduled' : 'No follow-up yet'}
          </strong>

          {hasNextFollowUp ? (
            <span className={styles.badge}>Scheduled</span>
          ) : null}
        </div>

        <p>
          {hasNextFollowUp
            ? formatNullableDateTime(business.nextFollowUpAt)
            : 'There is no next follow-up planned for this business.'}
        </p>

        {hasNextFollowUp ? (
          <span>This follow-up will be managed from Tasks.</span>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className={styles.tooltipWrapper} data-tooltip={FOLLOW_UP_TOOLTIP}>
      <section
        className={cn(
          panelStyles.section,
          panelStyles.sectionCard,
          styles.followUpSection,
          hasNextFollowUp
            ? styles.followUpSectionScheduled
            : styles.followUpSectionEmpty,
        )}
      >
        <div className={panelStyles.sectionHeader}>
          <h3 className={panelStyles.sectionTitle}>Next action</h3>
        </div>

        {cardContent}
      </section>
    </div>
  );
};
