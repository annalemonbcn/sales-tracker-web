import type { BusinessDetail } from '../domain/businessDetail.model';
import { businessDetailsClient } from './businessDetails.client';
import { mapGetBusinessDetailsResponseDtoToDomain } from './businessDetails.mapper';

export const getBusinessDetails = async (
  businessId: string,
): Promise<BusinessDetail> => {
  const response = await businessDetailsClient.getById(businessId);

  return mapGetBusinessDetailsResponseDtoToDomain(response);
};
