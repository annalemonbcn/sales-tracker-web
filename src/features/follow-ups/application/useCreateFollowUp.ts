import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getCurrentUserId } from '@/auth/currentUser';
import { businessesQueryKeys } from '@/features/businesses/application/businesses.queryKeys';
import { dashboardQueryKeys } from '@/features/dashboard/application/dashboard.queryKeys';

import { createFollowUp } from '../infrastructure/followUps.api';
import type { CreateFollowUpRequestDto } from '../infrastructure/followUps.dto';
import { followUpsQueryKeys } from './followUps.queryKeys';

type CreateFollowUpParams = {
  businessId: string;
  data: Omit<CreateFollowUpRequestDto, 'userId'>;
};

export const useCreateFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ businessId, data }: CreateFollowUpParams) =>
      createFollowUp(businessId, {
        ...data,
        userId: getCurrentUserId(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followUpsQueryKeys.lists });
      queryClient.invalidateQueries({ queryKey: businessesQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.summary(),
      });
    },
  });
};
