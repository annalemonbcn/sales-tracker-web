import { dashboardQueryKeys } from '@/features/dashboard/application/dashboard.queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createBusiness } from '../infrastructure/businesses.api';
import type { CreateBusinessRequestDto } from '../infrastructure/businesses.dto';
import { businessesQueryKeys } from './businesses.queryKeys';

export const useCreateBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBusinessRequestDto) => createBusiness(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: businessesQueryKeys.lists,
      });

      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.summary(),
      });
    },
  });
};
