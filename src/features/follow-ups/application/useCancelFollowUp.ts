import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getCurrentUserId } from '@/auth/currentUser';
import { cancelFollowUp } from '../infrastructure/followUps.api';
import { followUpsQueryKeys } from './followUps.queryKeys';

export const useCancelFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followUpId: string) =>
      cancelFollowUp(followUpId, { userId: getCurrentUserId() }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.lists,
      });
    },
  });
};
