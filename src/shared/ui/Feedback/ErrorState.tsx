import { AlertCircle } from 'lucide-react';

import styles from './Feedback.module.css';

type ErrorStateProps = {
  title?: string;
  message?: string;
};

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Please try again later.',
}: ErrorStateProps) => (
  <div className={styles.feedback}>
    <AlertCircle size={24} />

    <div>
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  </div>
);
