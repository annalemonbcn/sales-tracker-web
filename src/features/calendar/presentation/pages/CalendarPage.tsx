import { useState } from 'react';

import type { FollowUpFilters } from '@/features/follow-ups/domain/followUpFilters.model';
import { PageHeader } from '@/shared/ui';

import { CalendarFilters } from '../components/CalendarFilters/CalendarFilters';
import { MonthCalendar } from '../components/MonthCalendar/MonthCalendar';

import styles from './CalendarPage.module.css';

export const CalendarPage = () => {
  const [filters, setFilters] = useState<FollowUpFilters>({});

  return (
    <div className={styles.page}>
      <PageHeader
        subtitle="View and manage your scheduled sales activities."
        title="Calendar"
      />

      <main className={styles.content}>
        <CalendarFilters filters={filters} onChange={setFilters} />
        <MonthCalendar filters={filters} />
      </main>
    </div>
  );
};
