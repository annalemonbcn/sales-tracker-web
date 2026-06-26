import { useQuery } from '@tanstack/react-query';

import { getUsers } from '../infrastructure/users.api';

const COMMON_KEYS = ['users'];

export const useUsers = () =>
  useQuery({
    queryKey: [...COMMON_KEYS, 'useUsers'],
    queryFn: getUsers,
  });
