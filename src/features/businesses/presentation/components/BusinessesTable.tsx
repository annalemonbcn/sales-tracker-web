import type { Business } from '../../domain/business.model';

import styles from './BusinessesTable.module.css';

type BusinessesTableProps = {
  businesses: Business[];
};

export const BusinessesTable = ({ businesses }: BusinessesTableProps) => (
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
            <td>{business.name}</td>
            <td>{business.category}</td>
            <td>{business.status}</td>
            <td>{business.priority}</td>
            <td>{business.assignedTo?.name ?? 'Unassigned'}</td>
            <td>{business.nextFollowUpAt ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
