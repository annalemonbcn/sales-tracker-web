import { Card, ErrorState, LoadingState } from '@/shared/ui';

import { useBusinesses } from '../../../application/useBusinesses';
import type { BusinessFilters } from '../../../domain/businessFilters.model';
import { BusinessesFilters } from '../BusinessesFilters';
import { BusinessesTable } from '../BusinessesTable';

import styles from './BusinessesSection.module.css';

type BusinessesSectionProps = {
  filters: BusinessFilters;
  onFiltersChange: (filters: BusinessFilters) => void;
};

export const BusinessesSection = ({
  filters,
  onFiltersChange,
}: BusinessesSectionProps) => {
  const {
    data: businesses = [],
    isError,
    isFetching,
    isLoading,
  } = useBusinesses(filters);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Businesses</Card.Title>
        <Card.Description>
          Review your pipeline, priorities and upcoming follow-ups.
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <BusinessesFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
        />

        {isLoading ? (
          <LoadingState message="Loading your business list..." />
        ) : null}

        {isError ? (
          <ErrorState
            title="We couldn’t load your business list"
            message="Please refresh the page or try again in a moment."
          />
        ) : null}

        {!isLoading && !isError ? (
          <>
            {isFetching ? (
              <p className={styles.updatingText}>Refreshing results...</p>
            ) : null}

            <BusinessesTable businesses={businesses} />
          </>
        ) : null}
      </Card.Content>
    </Card>
  );
};
