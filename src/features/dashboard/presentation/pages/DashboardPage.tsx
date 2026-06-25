import { Plus } from 'lucide-react';

import { Badge, Button, Card } from '@/shared/ui';

import styles from './DashboardPage.module.css';

export const DashboardPage = () => (
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

    <Card>
      <Card.Header>
        <Card.Title>Sales Tracker frontend ready</Card.Title>
        <Card.Description>
          Reusable UI base created with CSS Modules.
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <div className={styles.demoRow}>
          <Badge variant="primary">New lead</Badge>
          <Badge variant="success">Contacted</Badge>
          <Badge variant="warning">Follow-up pending</Badge>
          <Badge variant="danger">High priority</Badge>
        </div>
      </Card.Content>
    </Card>
  </div>
);
