import { useState } from 'react';

import { AddBusinessModal } from '@/features/businesses/presentation/components/AddBusinessModal';
import { BusinessDetailsDrawer } from '@/features/businesses/presentation/components/BusinessDetailsDrawer';
import { BusinessesSection } from '@/features/businesses/presentation/components/BusinessesSection';
import { useDashboardSelectedBusiness } from '@/features/dashboard/presentation/providers/DashboardSelectedBusinessProvider';
import { PageHeader } from '@/shared/ui';

import { DashboardMetricsSection } from '../components/DashboardMetricsSection';

import styles from './DashboardPage.module.css';

export const DashboardPage = () => {
  const [isAddBusinessModalOpen, setIsAddBusinessModalOpen] = useState(false);
  const { clearSelectedBusiness, selectBusiness, selectedBusinessId } =
    useDashboardSelectedBusiness();

  return (
    <div className={styles.page}>
      <PageHeader
        actionLabel="Add business"
        subtitle="Overview of your leads and businesses."
        title="Dashboard"
        onActionClick={() => {
          setIsAddBusinessModalOpen(true);
        }}
      />

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

      <AddBusinessModal
        isOpen={isAddBusinessModalOpen}
        onOpenChange={setIsAddBusinessModalOpen}
        onSuccess={(business) => {
          selectBusiness(business.id);
        }}
      />
    </div>
  );
};
