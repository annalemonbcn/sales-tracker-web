import type { BusinessDto } from '@/shared/api/generated/salesTrackerApi';

import type { Business } from '../domain/business.model';
import type { BusinessesDto } from './businesses.dto';

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
  assignedToName: business.assignedTo?.name ?? null,
  createdByName: business.createdBy.name,
  createdAt: business.createdAt,
  updatedAt: business.updatedAt,
});

export const mapBusinessesDtoToDomain = (dto: BusinessesDto): Business[] =>
  dto.data.businesses?.map(mapBusinessDtoToDomain) ?? [];
