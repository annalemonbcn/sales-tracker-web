import { Plus } from 'lucide-react';

import { Button, Card, ErrorState, LoadingState } from '@/shared/ui';

import { DashboardMetrics } from '../components/DashboardMetrics';

import styles from './DashboardPage.module.css';
import { BusinessesTable } from '@/features/businesses/presentation/components/BusinessesTable';
import { useDashboardPage } from '../hooks/useDashboardPage';

export const DashboardPage = () => {
  const { summary, businesses, isLoading, isError } = useDashboardPage();

  if (isLoading) {
    return <LoadingState message="Loading..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load dashboard"
        message="Check that the API is running and try again."
      />
    );
  }

  if (!summary) {
    return (
      <ErrorState
        title="No dashboard data"
        message="The API did not return dashboard summary data."
      />
    );
  }

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

      <DashboardMetrics summary={summary} />

      <Card>
        <Card.Header>
          <Card.Title>Businesses</Card.Title>
          <Card.Description>
            Track your businesses, priorities and next follow-ups.
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <BusinessesTable businesses={businesses} />
        </Card.Content>
      </Card>
    </div>
  );
};
