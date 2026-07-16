import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { DataTable } from '@/shared/ui';

import { followUpsTableColumns } from './followUpsTableColumns';

type FollowUpsTableProps = {
  followUps: FollowUpTask[];
};

export const FollowUpsTable = ({ followUps }: FollowUpsTableProps) => (
  <DataTable
    columns={followUpsTableColumns}
    data={followUps}
    getRowId={(followUp) => followUp.id}
  />
);
