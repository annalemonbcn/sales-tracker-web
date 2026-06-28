import { mapBusinessDtoToDomain } from './businesses.mapper';
import type { GetBusinessDetailsResponseDto } from './businessDetails.dto';
import type {
  BusinessContactDetailsDto,
  BusinessDetailDto,
} from '@/shared/api/generated/salesTrackerApi';
import type { BusinessDetail } from '../domain/businessDetail.model';

const mapBusinessCOntactDetailsDtoToDomain = (
  details: BusinessContactDetailsDto,
): BusinessContactDetailsDto => details;

export const mapBusinessDetailDtoToDomain = (
  business: BusinessDetailDto,
): BusinessDetail => {
  const businessDto = mapBusinessDtoToDomain(business);

  return {
    ...businessDto,
    activities: business.activities,
    details: mapBusinessCOntactDetailsDtoToDomain(business.details),
  };
};

export const mapGetBusinessDetailsResponseDtoToDomain = (
  response: GetBusinessDetailsResponseDto,
) => mapBusinessDetailDtoToDomain(response.data.business);
