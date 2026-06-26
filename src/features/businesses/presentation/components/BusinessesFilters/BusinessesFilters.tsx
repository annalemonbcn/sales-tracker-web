import type { BusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import { useUsers } from '@/features/users/application/useUsers';
import { BusinessesFiltersView } from './BusinessesFiltersView';

type BusinessesFiltersProps = {
  filters: BusinessFilters;
  onFiltersChange: (filters: BusinessFilters) => void;
};

export const BusinessesFilters = ({
  filters,
  onFiltersChange,
}: BusinessesFiltersProps) => {
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
      filters={filters}
      isAssigneeDisabled={isUsersLoading || isUsersError}
      onFiltersChange={onFiltersChange}
    />
  );
};
