import type { UpdateBusinessRequestDto } from '../infrastructure/businessDetails.dto';
import { useUpdateBusiness } from './useUpdateBusiness';

type UpdateBusinessContactDetailsData = Pick<
  UpdateBusinessRequestDto,
  'instagram' | 'email' | 'phone' | 'website' | 'address'
>;

type UpdateBusinessContactDetailsParams = {
  businessId: string;
  data: UpdateBusinessContactDetailsData;
};

export const useUpdateBusinessContactDetails = () => {
  const updateBusinessMutation = useUpdateBusiness();

  return {
    ...updateBusinessMutation,

    mutate: (params: UpdateBusinessContactDetailsParams) => {
      updateBusinessMutation.mutate(params);
    },

    mutateAsync: (params: UpdateBusinessContactDetailsParams) =>
      updateBusinessMutation.mutateAsync(params),
  };
};
