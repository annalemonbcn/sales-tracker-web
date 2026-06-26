import { getSalesTrackerAPI } from '@/shared/api/generated/salesTrackerApi';

import type { GetUsersResponseDto } from './users.dto';

const salesTrackerApi = getSalesTrackerAPI();

export const usersClient = {
  getAll: async (): Promise<GetUsersResponseDto> => salesTrackerApi.getUsers(),
};
