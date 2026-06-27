import type { ReactNode } from 'react';
import styles from './Feedback.module.css';
import { AlertCircle } from 'lucide-react';

type EmptyStateProps = {
  title: string;
  message?: string;
  action?: ReactNode;
};

export const EmptyState = ({ action, message, title }: EmptyStateProps) => (
  <div className={styles.empty}>
    <AlertCircle size={24} />

    <div>
      <strong>{title}</strong>
      {message ? <p>{message}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  </div>
);
