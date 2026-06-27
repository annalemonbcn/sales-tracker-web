import { X } from 'lucide-react';

import { useBusinessDetails } from '@/features/businesses/application/useBusinessDetails';
import { useDashboardSelectedBusiness } from '@/features/dashboard/presentation/providers/DashboardSelectedBusinessProvider';
import { Badge, ErrorState, IconButton, LoadingState } from '@/shared/ui';

import {
  getBadgeVariantByPriority,
  getBadgeVariantByStatus,
  getBusinessCategoryLabel,
  getBusinessSourceLabel,
  getBusinessStatusLabel,
  getPriorityLabel,
} from '../../lib/formatters';

import styles from './BusinessDetailsPanel.module.css';

type BusinessDetailsPanelProps = {
  businessId: string;
};

export const BusinessDetailsPanel = ({
  businessId,
}: BusinessDetailsPanelProps) => {
  const { clearSelectedBusiness } = useDashboardSelectedBusiness();

  const { data: business, isError, isLoading } = useBusinessDetails(businessId);

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Selected business</p>
          <h2 className={styles.title}>
            {business?.name ?? 'Business details'}
          </h2>
        </div>

        <IconButton
          label="Close business details"
          onClick={clearSelectedBusiness}
        >
          <X size={18} />
        </IconButton>
      </div>

      {isLoading ? (
        <LoadingState message="Loading business details..." />
      ) : null}

      {isError ? (
        <ErrorState
          title="We couldn't load this business"
          message="Please try selecting it again in a moment."
        />
      ) : null}

      {!isLoading && !isError && business ? (
        <div className={styles.content}>
          <section className={styles.summary}>
            <div>
              <span className={styles.label}>Category</span>
              <p className={styles.value}>
                {getBusinessCategoryLabel(business.category)}
              </p>
            </div>

            <div>
              <span className={styles.label}>Source</span>
              <p className={styles.value}>
                {getBusinessSourceLabel(business.source)}
              </p>
            </div>
          </section>

          <section className={styles.badges}>
            <Badge variant={getBadgeVariantByStatus(business.status)}>
              {getBusinessStatusLabel(business.status)}
            </Badge>

            <Badge variant={getBadgeVariantByPriority(business.priority)}>
              {getPriorityLabel(business.priority)}
            </Badge>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Assignment</h3>

            <div className={styles.detailsList}>
              <div>
                <span className={styles.label}>Assignee</span>
                <p className={styles.value}>
                  {business.assignedTo?.name ?? 'Unassigned'}
                </p>
              </div>

              <div>
                <span className={styles.label}>Created by</span>
                <p className={styles.value}>{business.createdBy.name}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Notes</h3>
            <p className={styles.notes}>{business.notes || 'No notes yet.'}</p>
          </section>
        </div>
      ) : null}
    </aside>
  );
};
