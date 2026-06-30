import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';

import panelStyles from '../BusinessDetailsPanel.module.css';
import styles from './BusinessNotes.module.css';
import { cn } from '@/shared/lib/cn';

type BusinessNotesViewProps = {
  business: BusinessDetail;
  onEdit: () => void;
};

export const BusinessNotesView = ({
  business,
  onEdit,
}: BusinessNotesViewProps) => (
  <section className={cn(panelStyles.section, panelStyles.sectionCard)}>
    <div className={panelStyles.sectionHeader}>
      <h3 className={panelStyles.sectionTitle}>Notes</h3>

      <button
        className={panelStyles.sectionAction}
        type="button"
        onClick={onEdit}
      >
        Edit
      </button>
    </div>

    <div className={styles.notesBox}>
      {business.notes || 'No notes added yet.'}
    </div>
  </section>
);
