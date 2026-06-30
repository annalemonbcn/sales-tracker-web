import type { UpdateBusinessRequestDto } from '../infrastructure/businessDetails.dto';
import { useUpdateBusiness } from './useUpdateBusiness';

type UpdateBusinessNotesData = Pick<UpdateBusinessRequestDto, 'notes'>;

type UpdateBusinessNotesParams = {
  businessId: string;
  data: UpdateBusinessNotesData;
};

export const useUpdateBusinessNotes = () => {
  const updateBusinessMutation = useUpdateBusiness();

  return {
    ...updateBusinessMutation,

    mutate: (params: UpdateBusinessNotesParams) => {
      updateBusinessMutation.mutate(params);
    },

    mutateAsync: (params: UpdateBusinessNotesParams) =>
      updateBusinessMutation.mutateAsync(params),
  };
};
