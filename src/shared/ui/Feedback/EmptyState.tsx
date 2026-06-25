import styles from './Feedback.module.css';

type EmptyStateProps = {
  title: string;
  message?: string;
};

export const EmptyState = ({ title, message }: EmptyStateProps) => (
  <div className={styles.empty}>
    <strong>{title}</strong>
    {message ? <p>{message}</p> : null}
  </div>
);
