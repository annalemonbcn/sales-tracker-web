import { useQuery } from '@tanstack/react-query';

import { getBusinesses } from '../infrastructure/businesses.api';

const COMMON_KEYS = ['businesses'];

export const useBusinesses = () =>
  useQuery({
    queryKey: [...COMMON_KEYS, 'useGetBusinesses'],
    queryFn: getBusinesses,
  });
