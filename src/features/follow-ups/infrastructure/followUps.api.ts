import type { FollowUpFilters } from '../domain/followUpFilters.model';
import type { FollowUpTask } from '../domain/followUpTask.model';
import { followUpsClient } from './followUps.client';
import type {
  CreateFollowUpRequestDto,
  UpdateFollowUpRequestDto,
} from './followUps.dto';
import {
  mapCancelFollowUpResponseDtoToDomain,
  mapCreateFollowUpResponseDtoToDomain,
  mapGetFollowUpsResponseDtoToDomain,
  mapMarkFollowUpDoneResponseDtoToDomain,
  mapUpdateFollowUpResponseDtoToDomain,
} from './followUps.mapper';

export const createFollowUp = async (
  businessId: string,
  data: CreateFollowUpRequestDto,
) => {
  const response = await followUpsClient.create(businessId, data);

  return mapCreateFollowUpResponseDtoToDomain(response);
};

export const getFollowUps = async (
  filters: FollowUpFilters,
): Promise<FollowUpTask[]> => {
  const response = await followUpsClient.getAll(filters);

  return mapGetFollowUpsResponseDtoToDomain(response);
};

export const updateFollowUp = async (
  followUpId: string,
  data: UpdateFollowUpRequestDto,
) => {
  const response = await followUpsClient.update(followUpId, data);

  return mapUpdateFollowUpResponseDtoToDomain(response);
};

export const markFollowUpDone = async (followUpId: string) => {
  const response = await followUpsClient.markDone(followUpId);

  return mapMarkFollowUpDoneResponseDtoToDomain(response);
};

export const cancelFollowUp = async (followUpId: string) => {
  const response = await followUpsClient.cancel(followUpId);

  return mapCancelFollowUpResponseDtoToDomain(response);
};
