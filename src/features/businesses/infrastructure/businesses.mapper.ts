import type {
  BusinessDto,
  UserSummaryDto,
} from '@/shared/api/generated/salesTrackerApi';

import type { Business, UserSummary } from '../domain/business.model';
import type { GetBusinessesResponseDto } from './businesses.dto';

const mapUserSummaryDtoToDomain = (user: UserSummaryDto): UserSummary => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const mapBusinessDtoToDomain = (business: BusinessDto): Business => ({
  id: business.id,
  name: business.name,
  category: business.category,
  status: business.status,
  priority: business.priority,
  source: business.source,
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
