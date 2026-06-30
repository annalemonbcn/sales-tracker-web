import { X } from 'lucide-react';

import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';
import { Badge, IconButton } from '@/shared/ui';

import { BusinessCategoryIcon } from '../BusinessCategoryIcon';
import {
  getBadgeVariantByPriority,
  getBusinessCategoryLabel,
  getPriorityLabel,
} from '../../lib/formatters';

import styles from './BusinessDetailsPanel.module.css';

type BusinessDetailsPanelHeaderProps = {
  business: BusinessDetail;
  onClose: () => void;
};

export const BusinessDetailsPanelHeader = ({
  business,
  onClose,
}: BusinessDetailsPanelHeaderProps) => (
  <div className={styles.header}>
    <div className={styles.businessIntro}>
      <BusinessCategoryIcon category={business.category} size="lg" />

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
      <IconButton label="Close business details" onClick={onClose}>
        <X size={18} />
      </IconButton>
    </div>
  </div>
);
