import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';
import { Badge } from '@/shared/ui';

import { BusinessCategoryIcon } from '../BusinessCategoryIcon';
import {
  getBadgeVariantByPriority,
  getBusinessCategoryLabel,
  getPriorityLabel,
} from '../../lib/formatters';

import styles from './BusinessDetailsPanel.module.css';

type BusinessDetailsPanelHeaderProps = {
  business: BusinessDetail;
};

export const BusinessDetailsPanelHeader = ({
  business,
}: BusinessDetailsPanelHeaderProps) => (
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
);
