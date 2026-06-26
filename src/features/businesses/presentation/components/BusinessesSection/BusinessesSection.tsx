import { useState } from 'react';

import { Card, ErrorState, LoadingState } from '@/shared/ui';

import { useBusinesses } from '@/features/businesses/application/useBusinesses';
import {
  initialBusinessFilters,
  type BusinessFilters,
} from '@/features/businesses/domain/businessFilters.model';

import styles from './BusinessesSection.module.css';
import { BusinessesTable } from '@/features/businesses/presentation/components/BusinessesTable';
import { BusinessesFilters } from '@/features/businesses/presentation/components/BusinessesFilters';

export const BusinessesSection = () => {
  const [businessFilters, setBusinessFilters] = useState<BusinessFilters>(
    initialBusinessFilters,
  );

  const {
    data: businesses = [],
    isError,
    isFetching,
    isLoading,
  } = useBusinesses(businessFilters);

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
          filters={businessFilters}
          onFiltersChange={setBusinessFilters}
        />

        {isLoading ? (
          <LoadingState message="Loading your business list..." />
        ) : null}

        {isError ? (
          <ErrorState
            title="We couldn't load your business list"
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
