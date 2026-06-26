import { Badge, EmptyState } from '@/shared/ui';
import type { Business } from '../../domain/business.model';

import styles from './BusinessesTable.module.css';
import {
  getBadgeVariantByPriority,
  getBadgeVariantByStatus,
  getBusinessCategoryLabel,
  getBusinessStatusLabel,
  getPriorityLabel,
} from '../lib/formatters';
import { formatNullableDateTime } from '@/shared/lib/date';

type BusinessesTableProps = {
  businesses: Business[];
};

export const BusinessesTable = ({ businesses }: BusinessesTableProps) => {
  if (businesses.length === 0) {
    return (
      <EmptyState
        title="No businesses found"
        message="Create your first business to start tracking your sales pipeline."
      />
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Business</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Next follow-up</th>
          </tr>
        </thead>

        <tbody>
          {businesses.map((business) => (
            <tr key={business.id}>
              <td>
                <div className={styles.businessCell}>
                  <strong>{business.name}</strong>
                  <span>{business.source}</span>
                </div>
              </td>

              <td>{getBusinessCategoryLabel(business.category)}</td>

              <td>
                <Badge variant={getBadgeVariantByStatus(business.status)}>
                  {getBusinessStatusLabel(business.status)}
                </Badge>
              </td>

              <td>
                <Badge variant={getBadgeVariantByPriority(business.priority)}>
                  {getPriorityLabel(business.priority)}
                </Badge>
              </td>

              <td>{business.assignedTo?.name ?? 'Unassigned'}</td>

              <td>{formatNullableDateTime(business.nextFollowUpAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
