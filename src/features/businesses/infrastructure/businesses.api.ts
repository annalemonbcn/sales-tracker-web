import type { Business } from '../domain/business.model';
import { businessesClient } from './businesses.client';
import { mapGetBusinessesResponseDtoToDomain } from './businesses.mapper';

export const getBusinesses = async (): Promise<Business[]> => {
  const response = await businessesClient.getAll();

  return mapGetBusinessesResponseDtoToDomain(response);
};
