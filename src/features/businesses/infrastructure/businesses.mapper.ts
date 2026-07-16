import type { BusinessDto } from '@/shared/api/generated/salesTrackerApi';
import { mapUserSummaryDtoToDomain } from '@/features/users/infrastructure/users.mapper';

import type { Business } from '../domain/business.model';
import type { GetBusinessesResponseDto } from './businesses.dto';

export const mapBusinessDtoToDomain = (business: BusinessDto): Business => ({
  id: business.id,
  name: business.name,
  category: business.category,
  status: business.status,
  priority: business.priority,
  source: business.source,
  details: {
    instagram: business.details.instagram,
    email: business.details.email,
    phone: business.details.phone,
    website: business.details.website,
    address: business.details.address,
  },
  notes: business.notes,
  lastContactedAt: business.lastContactedAt,
  nextFollowUpAt: business.nextFollowUpAt,
  createdBy: mapUserSummaryDtoToDomain(business.createdBy),
  assignedTo: business.assignedTo
    ? mapUserSummaryDtoToDomain(business.assignedTo)
    : null,
  createdAt: business.createdAt,
  updatedAt: business.updatedAt,
});

export const mapGetBusinessesResponseDtoToDomain = (
  response: GetBusinessesResponseDto,
): Business[] => response.data.businesses?.map(mapBusinessDtoToDomain) ?? [];
