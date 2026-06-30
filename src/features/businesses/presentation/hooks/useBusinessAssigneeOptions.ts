import { UNASSIGNED_ASSIGNEE_FILTER_VALUE } from '@/features/businesses/domain/businessFilters.model';
import { useUsers } from '@/features/users/application/useUsers';
import { getInitialsAvatarUrl } from '@/shared/lib/avatar';
import type { SelectOption } from '@/shared/ui';

type UseBusinessAssigneeOptionsParams = {
  includeUnassigned?: boolean;
};

export const useBusinessAssigneeOptions = ({
  includeUnassigned = false,
}: UseBusinessAssigneeOptionsParams = {}) => {
  const { data: users = [], isError, isLoading } = useUsers();

  const assigneeOptions: SelectOption[] = users.map((user) => ({
    label: user.name,
    value: user.id,
    avatarUrl: getInitialsAvatarUrl(user.name),
  }));

  const unassignedOption: SelectOption = {
    label: 'Unassigned',
    value: UNASSIGNED_ASSIGNEE_FILTER_VALUE,
  };

  const options = includeUnassigned
    ? [unassignedOption, ...assigneeOptions]
    : assigneeOptions;

  return {
    assigneeOptions: options,
    isAssigneeOptionsError: isError,
    isAssigneeOptionsLoading: isLoading,
    isAssigneeSelectDisabled: isLoading || isError,
  };
};
