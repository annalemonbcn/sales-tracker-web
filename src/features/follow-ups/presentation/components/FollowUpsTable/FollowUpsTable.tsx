import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { DataTable } from '@/shared/ui';

import { followUpsTableColumns } from './followUpsTableColumns';

type FollowUpsTableProps = {
  followUps: FollowUpTask[];
  onFollowUpSelect: (followUp: FollowUpTask) => void;
  selectedFollowUpId: string | null;
};

export const FollowUpsTable = ({
  followUps,
  onFollowUpSelect,
  selectedFollowUpId,
}: FollowUpsTableProps) => (
  <DataTable
    columns={followUpsTableColumns}
    data={followUps}
    getRowId={(followUp) => followUp.id}
    selectedRowId={selectedFollowUpId}
    onRowClick={onFollowUpSelect}
  />
);
