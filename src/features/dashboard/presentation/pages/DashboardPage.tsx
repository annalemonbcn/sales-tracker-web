import styles from './DashboardPage.module.css';

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Overview of your leads and businesses.
          </p>
        </div>
      </header>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Sales Tracker frontend ready</h2>
        <p className={styles.cardText}>
          Next step: connect GET /dashboard/summary.
        </p>
      </section>
    </div>
  );
}
