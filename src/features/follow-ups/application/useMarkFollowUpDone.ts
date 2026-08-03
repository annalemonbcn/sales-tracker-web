import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getCurrentUserId } from '@/auth/currentUser';
import { markFollowUpDone } from '../infrastructure/followUps.api';
import { followUpsQueryKeys } from './followUps.queryKeys';

type MarkFollowUpDoneParams = {
  followUpId: string;
  note?: string;
};

export const useMarkFollowUpDone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ followUpId, note }: MarkFollowUpDoneParams) =>
      markFollowUpDone(followUpId, {
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
