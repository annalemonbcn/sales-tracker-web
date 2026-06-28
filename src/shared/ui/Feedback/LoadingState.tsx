import { cn } from '@/shared/lib/cn';
import styles from './Feedback.module.css';

type LoadingStateProps = {
  message?: string;
  noBorder?: boolean;
};

export const LoadingState = ({
  message = 'Loading...',
  noBorder = false,
}: LoadingStateProps) => (
  <div className={cn(styles.feedback, noBorder && styles.noBorder)}>
    <div className={styles.spinner} />
    <p>{message}</p>
  </div>
);
