import { Button, Card, Select } from '@/shared/ui';

import styles from './CalendarFilters.module.css';

const filters = ['Assignee', 'Status', 'Priority', 'Type', 'Business'] as const;

export const CalendarFilters = () => (
  <Card>
    <Card.Content>
      <div className={styles.filters} aria-label="Calendar filters">
        {filters.map((filter) => (
          <Select
            isClearable={false}
            key={filter}
            label={filter}
            options={[]}
            placeholder="All"
            value={null}
            onChange={() => undefined}
          />
        ))}

        <Button disabled variant="secondary">
          Clear filters
        </Button>
      </div>
    </Card.Content>
  </Card>
);
