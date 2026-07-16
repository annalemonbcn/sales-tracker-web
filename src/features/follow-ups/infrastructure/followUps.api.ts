import type { FollowUpFilters } from '../domain/followUpFilters.model';
import type { FollowUpTask } from '../domain/followUpTask.model';
import { followUpsClient } from './followUps.client';
import { mapGetFollowUpsResponseDtoToDomain } from './followUps.mapper';

export const getFollowUps = async (
  filters: FollowUpFilters,
): Promise<FollowUpTask[]> => {
  const response = await followUpsClient.getAll(filters);

  return mapGetFollowUpsResponseDtoToDomain(response);
};
