import {
  mapBusinessDtoToDomain,
  mapUserSummaryDtoToDomain,
} from './businesses.mapper';
import type {
  GetBusinessDetailsResponseDto,
  UpdateBusinessResponseDto,
} from './businessDetails.dto';
import type {
  ActivityDto,
  BusinessDetailDto,
} from '@/shared/api/generated/salesTrackerApi';
import type { BusinessDetail } from '../domain/businessDetail.model';
import type { Activity } from '../domain/activity.model';

const mapActivityDtoToDomain = (activity: ActivityDto): Activity => ({
  id: activity.id,
  type: activity.type,
  notes: activity.notes,
  metadata: activity.metadata ?? null,
  user: mapUserSummaryDtoToDomain(activity.user),
  createdAt: activity.createdAt,
});

export const mapBusinessDetailDtoToDomain = (
  business: BusinessDetailDto,
): BusinessDetail => ({
  ...mapBusinessDtoToDomain(business),
  activities: business.activities.map(mapActivityDtoToDomain),
});

export const mapGetBusinessDetailResponseDtoToDomain = (
  response: GetBusinessDetailsResponseDto,
): BusinessDetail => {
  if (!response.data.business) {
    throw new Error('Business was not returned');
  }

  return mapBusinessDetailDtoToDomain(response.data.business);
};

export const mapUpdateBusinessResponseDtoToDomain = (
  response: UpdateBusinessResponseDto,
): BusinessDetail => {
  if (!response.data.business) {
    throw new Error('Business was not returned after update');
  }

  return mapBusinessDetailDtoToDomain(response.data.business);
};
