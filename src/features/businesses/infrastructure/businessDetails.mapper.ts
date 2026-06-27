import { mapBusinessDtoToDomain } from './businesses.mapper';
import type { GetBusinessDetailsResponseDto } from './businessDetails.dto';
import type { BusinessDetailDto } from '@/shared/api/generated/salesTrackerApi';
import type { BusinessDetail } from '../domain/business.model';

export const mapBusinessDetailDtoToDomain = (
  business: BusinessDetailDto,
): BusinessDetail => {
  const businessDto = mapBusinessDtoToDomain(business);

  return {
    ...businessDto,
    activities: business.activities,
  };
};

export const mapGetBusinessDetailsResponseDtoToDomain = (
  response: GetBusinessDetailsResponseDto,
) => mapBusinessDetailDtoToDomain(response.data.business);
