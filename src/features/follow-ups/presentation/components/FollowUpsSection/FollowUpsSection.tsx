import { useFollowUps } from '@/features/follow-ups/application/useFollowUps';
import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { Card, EmptyState, ErrorState, LoadingState } from '@/shared/ui';

import { FollowUpsFilters } from '../FollowUpsFilters';
import { FollowUpsTable } from '../FollowUpsTable';

import styles from './FollowUpsSection.module.css';

type FollowUpsSectionContentProps = {
  followUps: FollowUpTask[];
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
};

const FollowUpsSectionContent = ({
  followUps,
  isError,
  isFetching,
  isLoading,
}: FollowUpsSectionContentProps) => {
  if (isLoading) {
    return <LoadingState message="Loading tasks..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="We couldn't load your tasks"
        message="Please refresh the page or try again in a moment."
      />
    );
  }

  if (followUps.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        message="Follow-ups and reminders will appear here once they are created."
      />
    );
  }

  return (
    <>
      {isFetching ? (
        <p className={styles.updatingText}>Refreshing tasks...</p>
      ) : null}

      <FollowUpsTable followUps={followUps} />
    </>
  );
};

export const FollowUpsSection = () => {
  const {
    data: followUps = [],
    isError,
    isFetching,
    isLoading,
  } = useFollowUps({});

  return (
    <Card className={styles.section}>
      <Card.Header>
        <Card.Title>Tasks</Card.Title>
        <Card.Description>
          Review follow-ups, reminders and upcoming sales work.
        </Card.Description>
      </Card.Header>

      <Card.Content className={styles.content}>
        <FollowUpsFilters isFollowUpsFetching={isLoading || isFetching} />

        <FollowUpsSectionContent
          followUps={followUps}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </Card.Content>
    </Card>
  );
};
