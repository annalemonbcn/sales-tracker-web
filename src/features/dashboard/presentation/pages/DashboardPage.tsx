import { Plus } from 'lucide-react';

import { Button, Card, ErrorState, LoadingState } from '@/shared/ui';

import { DashboardMetrics } from '../components/DashboardMetrics';

import styles from './DashboardPage.module.css';
import { useDashboardSummary } from '../../application/useDashboardSummary';

export const DashboardPage = () => {
  const { data, isError, isLoading } = useDashboardSummary();

  if (isLoading) return <LoadingState message="Loading dashboard..." />;

  if (isError)
    return (
      <ErrorState
        title="Could not load dashboard"
        message="Check that the API is running and try again."
      />
    );

  if (!data)
    return (
      <ErrorState
        title="No dashboard data"
        message="The API did not return dashboard summary data."
      />
    );

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

      <DashboardMetrics summary={data} />

      <Card>
        <Card.Header>
          <Card.Title>Businesses</Card.Title>
          <Card.Description>
            Next step: connect GET /businesses and render TanStack Table.
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <div className={styles.placeholder}>
            Businesses table coming next.
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};
