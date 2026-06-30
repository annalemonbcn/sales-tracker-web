import { useQueryClient } from '@tanstack/react-query';
import type { UpdateBusinessRequestDto } from '../infrastructure/businessDetails.dto';
import { useUpdateBusiness } from './useUpdateBusiness';
import { dashboardQueryKeys } from '@/features/dashboard/application/dashboard.queryKeys';

type UpdateBusinessOverviewData = Pick<
  UpdateBusinessRequestDto,
  'name' | 'category' | 'status' | 'source' | 'priority' | 'assignedToId'
>;

type UpdateBusinessOverviewParams = {
  businessId: string;
  data: UpdateBusinessOverviewData;
};

export const useUpdateBusinessOverview = () => {
  const queryClient = useQueryClient();
  const updateBusinessMutation = useUpdateBusiness();

  const invalidateDashboardSummary = () => {
    queryClient.invalidateQueries({
      queryKey: dashboardQueryKeys.summary(),
    });
  };

  return {
    ...updateBusinessMutation,

    mutate: (params: UpdateBusinessOverviewParams) => {
      updateBusinessMutation.mutate(params, {
        onSuccess: () => {
          invalidateDashboardSummary();
        },
      });
    },

    mutateAsync: async (params: UpdateBusinessOverviewParams) => {
      const updatedBusiness = await updateBusinessMutation.mutateAsync(params);

      invalidateDashboardSummary();

      return updatedBusiness;
    },
  };
};
