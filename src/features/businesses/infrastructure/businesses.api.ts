import type { Business } from '../domain/business.model';
import type { BusinessFilters } from '../domain/businessFilters.model';
import { businessesClient } from './businesses.client';
import { mapGetBusinessesResponseDtoToDomain } from './businesses.mapper';

export const getBusinesses = async (
  filters: BusinessFilters,
): Promise<Business[]> => {
  const response = await businessesClient.getAll(filters);

  return mapGetBusinessesResponseDtoToDomain(response);
};
