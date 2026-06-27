import { Plus } from 'lucide-react';

import { BusinessesSection } from '@/features/businesses/presentation/components/BusinessesSection';
import { Button } from '@/shared/ui';

import { DashboardMetricsSection } from '../components/DashboardMetricsSection';

import styles from './DashboardPage.module.css';
import { cn } from '@/shared/lib/cn';
import { useDashboardSelectedBusiness } from '../providers/DashboardSelectedBusinessProvider';

export const DashboardPage = () => {
  const { selectedBusinessId } = useDashboardSelectedBusiness();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Overview of your leads and businesses.
          </p>
        </div>

        <Button>
          <Plus size={18} />
          Add business
        </Button>
      </header>

      <div
        className={cn(styles.body, selectedBusinessId && styles.bodyWithPanel)}
      >
        <div className={styles.mainContent}>
          <DashboardMetricsSection />

          <BusinessesSection />
        </div>

        {selectedBusinessId ? (
          <aside className={styles.businessPanel}>Business panel</aside>
        ) : null}
      </div>
    </div>
  );
};
