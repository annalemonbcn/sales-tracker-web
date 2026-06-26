import { Plus } from 'lucide-react';

import type { BusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import { BusinessesSection } from '@/features/businesses/presentation/components/BusinessesSection';
import { Button } from '@/shared/ui';

import { DashboardMetricsSection } from '../components/DashboardMetricsSection';

import styles from './DashboardPage.module.css';

type DashboardPageProps = {
  businessFilters: BusinessFilters;
  onBusinessFiltersChange: (filters: BusinessFilters) => void;
};

export const DashboardPage = ({
  businessFilters,
  onBusinessFiltersChange,
}: DashboardPageProps) => (
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

    <DashboardMetricsSection />

    <BusinessesSection
      filters={businessFilters}
      onFiltersChange={onBusinessFiltersChange}
    />
  </div>
);
