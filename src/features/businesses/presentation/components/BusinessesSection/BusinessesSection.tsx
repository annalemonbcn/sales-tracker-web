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
          Track your businesses, priorities and next follow-ups.
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <BusinessesFilters
          filters={businessFilters}
          onFiltersChange={setBusinessFilters}
        />

        {isLoading ? <LoadingState message="Loading businesses..." /> : null}

        {isError ? (
          <ErrorState
            title="Could not load businesses"
            message="Check that the API is running and try again."
          />
        ) : null}

        {!isLoading && !isError ? (
          <>
            {isFetching ? (
              <p className={styles.updatingText}>Updating businesses...</p>
            ) : null}

            <BusinessesTable businesses={businesses} />
          </>
        ) : null}
      </Card.Content>
    </Card>
  );
};
