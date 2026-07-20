import { useMemo } from 'react';

import { UNASSIGNED_ASSIGNEE_FILTER_VALUE } from '@/features/businesses/domain/businessFilters.model';
import { useUsers } from '@/features/users/application/useUsers';
import { getInitialsAvatarUrl } from '@/shared/lib/avatar';
import type { SelectOption } from '@/shared/ui';

type UseAssigneeOptionsParams = {
  includeUnassigned?: boolean;
};

export const useAssigneeOptions = ({
  includeUnassigned = false,
}: UseAssigneeOptionsParams = {}) => {
  const { data: users = [], isError, isLoading } = useUsers();

  const assigneeOptions = useMemo<SelectOption[]>(() => {
    const userOptions = users.map((user) => ({
      avatarUrl: getInitialsAvatarUrl(user.name),
      label: user.name,
      value: user.id,
    }));

    return includeUnassigned
      ? [
          {
            label: 'Unassigned',
            value: UNASSIGNED_ASSIGNEE_FILTER_VALUE,
          },
          ...userOptions,
        ]
      : userOptions;
  }, [includeUnassigned, users]);

  return {
    assigneeOptions,
    isAssigneeOptionsError: isError,
    isAssigneeOptionsLoading: isLoading,
    isAssigneeSelectDisabled: isLoading || isError,
  };
};
