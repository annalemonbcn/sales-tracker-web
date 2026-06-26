import type { UserDto } from '@/shared/api/generated/salesTrackerApi';

import type { User } from '../domain/user.model';
import type { GetUsersResponseDto } from './users.dto';

const mapUserDtoToDomain = (user: UserDto): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const mapGetUsersResponseDtoToDomain = (
  response: GetUsersResponseDto,
): User[] => response.data.users?.map(mapUserDtoToDomain) ?? [];
