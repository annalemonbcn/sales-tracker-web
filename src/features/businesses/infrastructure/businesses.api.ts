import type { Business } from '../domain/business.model';
import { businessesClient } from './businesses.client';
import { mapBusinessesDtoToDomain } from './businesses.mapper';

export const getBusinesses = async (): Promise<Business[]> => {
  const dto = await businessesClient.getAll();

  return mapBusinessesDtoToDomain(dto);
};
