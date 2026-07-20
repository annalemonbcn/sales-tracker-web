import { useMutation, useQueryClient } from '@tanstack/react-query';

import { businessesQueryKeys } from '@/features/businesses/application/businesses.queryKeys';
import { dashboardQueryKeys } from '@/features/dashboard/application/dashboard.queryKeys';

import { createFollowUp } from '../infrastructure/followUps.api';
import type { CreateFollowUpRequestDto } from '../infrastructure/followUps.dto';
import { followUpsQueryKeys } from './followUps.queryKeys';

type CreateFollowUpParams = {
  businessId: string;
  data: CreateFollowUpRequestDto;
};

export const useCreateFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ businessId, data }: CreateFollowUpParams) =>
      createFollowUp(businessId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followUpsQueryKeys.lists });
      queryClient.invalidateQueries({ queryKey: businessesQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.summary(),
      });
    },
  });
};
