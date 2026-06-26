import type { User } from '../domain/user.model';
import { usersClient } from './users.client';
import { mapGetUsersResponseDtoToDomain } from './users.mapper';

export const getUsers = async (): Promise<User[]> => {
  const response = await usersClient.getAll();

  return mapGetUsersResponseDtoToDomain(response);
};
