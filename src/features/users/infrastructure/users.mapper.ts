import type {
  UserDto,
  UserSummaryDto,
} from '@/shared/api/generated/salesTrackerApi';

import type { User, UserSummary } from '../domain/user.model';
import type { GetUsersResponseDto } from './users.dto';

export const mapUserSummaryDtoToDomain = (
  user: UserSummaryDto,
): UserSummary => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const mapUserDtoToDomain = (user: UserDto): User =>
  mapUserSummaryDtoToDomain(user);

export const mapGetUsersResponseDtoToDomain = (
  response: GetUsersResponseDto,
): User[] => response.data.users?.map(mapUserDtoToDomain) ?? [];
