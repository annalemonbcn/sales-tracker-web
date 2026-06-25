import styles from './Feedback.module.css';

type LoadingStateProps = {
  message?: string;
};

export const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => (
  <div className={styles.feedback}>
    <div className={styles.spinner} />
    <p>{message}</p>
  </div>
);
