import { useQuery } from '@tanstack/react-query';

import { getBusinessDetails } from '../infrastructure/businessDetails.api';
import { businessesQueryKeys } from './businesses.queryKeys';

export const useBusinessDetails = (businessId: string | null) =>
  useQuery({
    queryKey: businessesQueryKeys.detail(businessId as string),
    queryFn: () => getBusinessDetails(businessId as string),
    enabled: Boolean(businessId),
  });
