import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getCurrentUserId } from '@/auth/currentUser';
import { cancelFollowUp } from '../infrastructure/followUps.api';
import { followUpsQueryKeys } from './followUps.queryKeys';

type CancelFollowUpParams = {
  followUpId: string;
  note?: string;
};

export const useCancelFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ followUpId, note }: CancelFollowUpParams) =>
      cancelFollowUp(followUpId, {
        userId: getCurrentUserId(),
        ...(note ? { note } : {}),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.lists,
      });
    },
  });
};
