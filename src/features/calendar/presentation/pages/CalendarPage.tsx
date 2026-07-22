import { PageHeader } from '@/shared/ui';

import styles from './CalendarPage.module.css';

export const CalendarPage = () => (
  <div className={styles.page}>
    <PageHeader
      subtitle="View and manage your scheduled sales activities."
      title="Calendar"
    />

    <main className={styles.calendar}>
      <h1>Calendar Here</h1>
    </main>
  </div>
);
