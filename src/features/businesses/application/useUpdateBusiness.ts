import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { BusinessDetail } from '../domain/businessDetail.model';
import { updateBusiness } from '../infrastructure/businessDetails.api';
import type { UpdateBusinessRequestDto } from '../infrastructure/businessDetails.dto';
import { businessesQueryKeys } from './businesses.queryKeys';

type UpdateBusinessParams = {
  businessId: string;
  data: UpdateBusinessRequestDto;
};

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ businessId, data }: UpdateBusinessParams) =>
      updateBusiness(businessId, data),

    onSuccess: (updatedBusiness: BusinessDetail) => {
      queryClient.setQueryData(
        businessesQueryKeys.detail(updatedBusiness.id),
        updatedBusiness,
      );

      queryClient.invalidateQueries({
        queryKey: businessesQueryKeys.lists,
      });
    },
  });
};
