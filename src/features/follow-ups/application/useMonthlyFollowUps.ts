import { endOfMonth, startOfMonth } from 'date-fns';
import { useMemo } from 'react';

import { useFollowUps } from './useFollowUps';

type UseMonthlyFollowUpsParams = {
  assignedToId: string;
  month: Date;
};

export const useMonthlyFollowUps = ({
  assignedToId,
  month,
}: UseMonthlyFollowUpsParams) => {
  const filters = useMemo(() => {
    const dueAfter = startOfMonth(month);
    const dueBefore = endOfMonth(month);

    return {
      assignedToId,
      dueAfter: dueAfter.toISOString(),
      dueBefore: dueBefore.toISOString(),
    };
  }, [assignedToId, month]);

  return useFollowUps(filters);
};
