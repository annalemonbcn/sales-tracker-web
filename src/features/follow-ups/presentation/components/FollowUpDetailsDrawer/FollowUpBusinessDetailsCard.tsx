import { getPriorityLabel } from '@/features/businesses/presentation/lib/formatters';
import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { cn } from '@/shared/lib/cn';

import panelStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessDetailsPanel.module.css';
import businessOverviewStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessOverview/BusinessOverview.module.css';

import { FollowUpDetailField } from './FollowUpDetailField';
import styles from './FollowUpDetailsDrawer.module.css';

type FollowUpBusinessDetailsCardProps = {
  followUp: FollowUpTask;
};

export const FollowUpBusinessDetailsCard = ({
  followUp,
}: FollowUpBusinessDetailsCardProps) => (
  <section
    className={cn(
      panelStyles.section,
      panelStyles.sectionCard,
      styles.businessCard,
    )}
  >
    <h3 className={panelStyles.sectionTitle}>Business details</h3>

    <div className={businessOverviewStyles.grid}>
      <FollowUpDetailField
        label="Business name"
        value={followUp.business.name}
      />
      <FollowUpDetailField
        label="Priority"
        value={getPriorityLabel(followUp.business.priority)}
      />
    </div>
  </section>
);
