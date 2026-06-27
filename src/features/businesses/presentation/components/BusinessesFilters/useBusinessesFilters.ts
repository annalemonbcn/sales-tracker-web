import { useUsers } from '@/features/users/application/useUsers';

type UseBusinessesFiltersParams = {
  isBusinessesFetching: boolean;
};

export const useBusinessesFilters = ({
  isBusinessesFetching,
}: UseBusinessesFiltersParams) => {
  const {
    data: users = [],
    isError: isUsersError,
    isLoading: isUsersLoading,
  } = useUsers();

  const assigneeOptions = users.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  const areBaseFiltersDisabled = isBusinessesFetching;

  const isAssigneeSelectDisabled =
    areBaseFiltersDisabled ||
    isUsersLoading ||
    isUsersError ||
    assigneeOptions.length === 0;

  return {
    assigneeOptions,
    areBaseFiltersDisabled,
    isAssigneeSelectDisabled,
  };
};
