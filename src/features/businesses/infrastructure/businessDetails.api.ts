import type { BusinessDetail } from '../domain/businessDetail.model';
import { businessDetailsClient } from './businessDetails.client';
import type { UpdateBusinessRequestDto } from './businessDetails.dto';
import {
  mapGetBusinessDetailResponseDtoToDomain,
  mapUpdateBusinessResponseDtoToDomain,
} from './businessDetails.mapper';

export const getBusinessDetails = async (
  businessId: string,
): Promise<BusinessDetail> => {
  const response = await businessDetailsClient.getById(businessId);

  return mapGetBusinessDetailResponseDtoToDomain(response);
};

export const updateBusiness = async (
  businessId: string,
  data: UpdateBusinessRequestDto,
): Promise<BusinessDetail> => {
  const response = await businessDetailsClient.update(businessId, data);

  return mapUpdateBusinessResponseDtoToDomain(response);
};
