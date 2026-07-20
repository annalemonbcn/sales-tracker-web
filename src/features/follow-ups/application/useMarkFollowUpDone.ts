import { useMutation, useQueryClient } from '@tanstack/react-query';

import { markFollowUpDone } from '../infrastructure/followUps.api';
import { followUpsQueryKeys } from './followUps.queryKeys';

export const useMarkFollowUpDone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markFollowUpDone,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.lists,
      });
    },
  });
};
