import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelFollowUp } from '../infrastructure/followUps.api';
import { followUpsQueryKeys } from './followUps.queryKeys';

export const useCancelFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelFollowUp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.lists,
      });
    },
  });
};
