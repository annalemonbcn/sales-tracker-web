import { useUsers } from '@/features/users/application/useUsers';

import { BusinessesFiltersView } from './BusinessesFiltersView';

export const BusinessesFilters = () => {
  const {
    data: users = [],
    isError: isUsersError,
    isLoading: isUsersLoading,
  } = useUsers();

  const assigneeOptions = users.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  return (
    <BusinessesFiltersView
      assigneeOptions={assigneeOptions}
      isAssigneeDisabled={isUsersLoading || isUsersError}
    />
  );
};
