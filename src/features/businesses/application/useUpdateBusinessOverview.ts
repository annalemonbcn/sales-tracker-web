import type { UpdateBusinessRequestDto } from '../infrastructure/businessDetails.dto';
import { useUpdateBusiness } from './useUpdateBusiness';

type UpdateBusinessOverviewData = Pick<
  UpdateBusinessRequestDto,
  'name' | 'category' | 'status' | 'source' | 'priority' | 'assignedToId'
>;

type UpdateBusinessOverviewParams = {
  businessId: string;
  data: UpdateBusinessOverviewData;
};

export const useUpdateBusinessOverview = () => {
  const updateBusinessMutation = useUpdateBusiness();

  return {
    ...updateBusinessMutation,

    mutate: (params: UpdateBusinessOverviewParams) => {
      updateBusinessMutation.mutate(params);
    },

    mutateAsync: (params: UpdateBusinessOverviewParams) =>
      updateBusinessMutation.mutateAsync(params),
  };
};
