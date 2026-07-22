import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getCurrentUserId } from '@/auth/currentUser';
import { markFollowUpDone } from '../infrastructure/followUps.api';
import { followUpsQueryKeys } from './followUps.queryKeys';

export const useMarkFollowUpDone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followUpId: string) =>
      markFollowUpDone(followUpId, { userId: getCurrentUserId() }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.lists,
      });
    },
  });
};
