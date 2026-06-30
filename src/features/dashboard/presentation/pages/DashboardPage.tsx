import { Plus } from 'lucide-react';

import { BusinessDetailsDrawer } from '@/features/businesses/presentation/components/BusinessDetailsDrawer';
import { BusinessesSection } from '@/features/businesses/presentation/components/BusinessesSection';
import { useDashboardSelectedBusiness } from '@/features/dashboard/presentation/providers/DashboardSelectedBusinessProvider';
import { Button } from '@/shared/ui';

import { DashboardMetricsSection } from '../components/DashboardMetricsSection';

import styles from './DashboardPage.module.css';

export const DashboardPage = () => {
  const { clearSelectedBusiness, selectedBusinessId } =
    useDashboardSelectedBusiness();

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

      <div className={styles.body}>
        <div className={styles.mainContent}>
          <DashboardMetricsSection />

          <BusinessesSection />
        </div>
      </div>

      {selectedBusinessId ? (
        <BusinessDetailsDrawer
          businessId={selectedBusinessId}
          onClose={clearSelectedBusiness}
        />
      ) : null}
    </div>
  );
};
