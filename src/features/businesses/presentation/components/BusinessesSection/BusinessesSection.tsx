import { useDashboardBusinessFilters } from '@/features/dashboard/presentation/providers/DashboardBusinessFiltersProvider';
import {
  Button,
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
} from '@/shared/ui';

import { useBusinesses } from '../../../application/useBusinesses';
import { BusinessesFilters } from '../BusinessesFilters';
import { BusinessesTable } from '../BusinessesTable';

import styles from './BusinessesSection.module.css';
import { Plus } from 'lucide-react';
import type { Business } from '@/features/businesses/domain/business.model';
import { hasActiveBusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import { useDashboardSelectedBusiness } from '@/features/dashboard/presentation/providers/DashboardSelectedBusinessProvider';

type BusinessesEmptyStateProps = {
  isAnyFilterActive: boolean;
  onClearFilters: () => void;
};

const BusinessesEmptyState = ({
  isAnyFilterActive,
  onClearFilters,
}: BusinessesEmptyStateProps) => {
  if (isAnyFilterActive) {
    return (
      <EmptyState
        title="No businesses match your filters"
        message="Try adjusting your filters or clear them to see all businesses."
        action={
          <Button variant="secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        }
      />
    );
  }

  return (
    <EmptyState
      title="No businesses yet"
      message="Create your first business to start tracking your sales pipeline."
      action={
        <Button>
          <Plus size={18} />
          Add business
        </Button>
      }
    />
  );
};

type BusinessesSectionContentProps = {
  businesses: Business[];
  isAnyFilterActive: boolean;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  selectedBusinessId: string | null;
  onBusinessSelect: (businessId: string) => void;
  onClearFilters: () => void;
};

const BusinessesSectionContent = ({
  businesses,
  isAnyFilterActive,
  isError,
  isFetching,
  isLoading,
  selectedBusinessId,
  onBusinessSelect,
  onClearFilters,
}: BusinessesSectionContentProps) => {
  if (isLoading) {
    return <LoadingState message="Loading your business list..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="We couldn't load your business list"
        message="Please refresh the page or try again in a moment."
      />
    );
  }

  if (businesses.length === 0) {
    return (
      <BusinessesEmptyState
        isAnyFilterActive={isAnyFilterActive}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <>
      {isFetching ? (
        <p className={styles.updatingText}>Refreshing results...</p>
      ) : null}

      <BusinessesTable
        businesses={businesses}
        selectedBusinessId={selectedBusinessId}
        onBusinessSelect={onBusinessSelect}
      />
    </>
  );
};

export const BusinessesSection = () => {
  const { clearFilters, filters } = useDashboardBusinessFilters();
  const { selectedBusinessId, toggleSelectedBusiness } =
    useDashboardSelectedBusiness();

  const {
    data: businesses = [],
    isError,
    isFetching,
    isLoading,
  } = useBusinesses(filters);

  const isAnyFilterActive = hasActiveBusinessFilters(filters);

  return (
    <Card className={styles.section}>
      <Card.Header>
        <Card.Title>Businesses</Card.Title>
        <Card.Description>
          Review your pipeline, priorities and upcoming follow-ups.
        </Card.Description>
      </Card.Header>

      <Card.Content className={styles.content}>
        <BusinessesFilters isBusinessesFetching={isLoading || isFetching} />

        <BusinessesSectionContent
          businesses={businesses}
          isAnyFilterActive={isAnyFilterActive}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
          selectedBusinessId={selectedBusinessId}
          onBusinessSelect={toggleSelectedBusiness}
          onClearFilters={clearFilters}
        />
      </Card.Content>
    </Card>
  );
};
