import { AlertCircle } from 'lucide-react';

import styles from './Feedback.module.css';
import { cn } from '@/shared/lib/cn';

type ErrorStateProps = {
  title?: string;
  message?: string;
  noBorder?: boolean;
};

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Please try again later.',
  noBorder = false,
}: ErrorStateProps) => (
  <div className={cn(styles.feedback, noBorder && styles.noBorder)}>
    <AlertCircle size={24} />

    <div>
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  </div>
);
