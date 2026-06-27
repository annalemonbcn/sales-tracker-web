import { BusinessesFiltersView } from './BusinessesFiltersView';
import { useBusinessesFilters } from './useBusinessesFilters';

type BusinessesFiltersProps = {
  isBusinessesFetching: boolean;
};

export const BusinessesFilters = ({
  isBusinessesFetching,
}: BusinessesFiltersProps) => {
  const { assigneeOptions, isAssigneeSelectDisabled, areBaseFiltersDisabled } =
    useBusinessesFilters({ isBusinessesFetching });

  return (
    <BusinessesFiltersView
      assigneeOptions={assigneeOptions}
      isAssigneeSelectDisabled={isAssigneeSelectDisabled}
      areBaseFiltersDisabled={areBaseFiltersDisabled}
    />
  );
};
