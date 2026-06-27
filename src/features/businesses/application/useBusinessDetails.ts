import { useQuery } from '@tanstack/react-query';

import { getBusinessDetails } from '../infrastructure/businessDetails.api';

const COMMON_KEYS = ['business-detail'];

export const useBusinessDetails = (businessId: string | null) =>
  useQuery({
    queryKey: [...COMMON_KEYS, 'useBusinessDetails', businessId],
    queryFn: () => getBusinessDetails(businessId as string),
    enabled: Boolean(businessId),
  });
