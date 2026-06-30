import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';
import {
  getBusinessCategoryLabel,
  getBusinessSourceLabel,
  getBusinessStatusLabel,
  getPriorityLabel,
} from '@/features/businesses/presentation/lib/formatters';

import panelStyles from '../BusinessDetailsPanel.module.css';
import styles from './BusinessOverview.module.css';
import type { SelectOption } from '@/shared/ui';

type BusinessOverviewViewProps = {
  business: BusinessDetail;
  onEdit: () => void;
};

export const BusinessOverviewView = ({
  business,
  onEdit,
}: BusinessOverviewViewProps) => (
  <section className={panelStyles.section}>
    <div className={panelStyles.sectionHeader}>
      <h3 className={panelStyles.sectionTitle}>Business details</h3>

      <button
        className={panelStyles.sectionAction}
        type="button"
        onClick={onEdit}
      >
        Edit
      </button>
    </div>

    <div className={styles.grid}>
      <OverviewField label="Name" value={business.name} />
      <OverviewField
        label="Category"
        value={getBusinessCategoryLabel(business.category)}
      />
      <OverviewField
        label="Status"
        value={getBusinessStatusLabel(business.status)}
      />
      <OverviewField
        label="Source"
        value={getBusinessSourceLabel(business.source)}
      />
      <OverviewField
        label="Priority"
        value={getPriorityLabel(business.priority)}
      />
      <OverviewField
        label="Assignee"
        value={business.assignedTo?.name || 'Unassigned'}
      />
    </div>
  </section>
);

type OverviewFieldProps = SelectOption;

const OverviewField = ({ label, value }: OverviewFieldProps) => (
  <div className={styles.field}>
    <span className={styles.label}>{label}</span>
    <div className={styles.valueBox}>{value}</div>
  </div>
);
