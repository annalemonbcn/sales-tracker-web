import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getCurrentUserId } from '@/auth/currentUser';
import { updateFollowUp } from '../infrastructure/followUps.api';
import type { UpdateFollowUpRequestDto } from '../infrastructure/followUps.dto';
import { followUpsQueryKeys } from './followUps.queryKeys';

type UpdateFollowUpParams = {
  data: Omit<UpdateFollowUpRequestDto, 'userId'>;
  followUpId: string;
};

export const useUpdateFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, followUpId }: UpdateFollowUpParams) =>
      updateFollowUp(followUpId, {
        ...data,
        userId: getCurrentUserId(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.lists,
      });
    },
  });
};
