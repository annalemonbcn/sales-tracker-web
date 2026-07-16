import type {
  CreateBusinessRequest,
  GetBusinesses200,
  PostBusinesses201,
} from '@/shared/api/generated/salesTrackerApi';

export type GetBusinessesResponseDto = GetBusinesses200;
export type CreateBusinessRequestDto = CreateBusinessRequest;
export type CreateBusinessResponseDto = PostBusinesses201;
