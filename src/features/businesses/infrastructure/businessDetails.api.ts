import type { Business } from '../domain/business.model';
import { businessDetailsClient } from './businessDetails.client';
import { mapGetBusinessDetailsResponseDtoToDomain } from './businessDetails.mapper';

export const getBusinessDetails = async (
  businessId: string,
): Promise<Business> => {
  const response = await businessDetailsClient.getById(businessId);

  return mapGetBusinessDetailsResponseDtoToDomain(response);
};
