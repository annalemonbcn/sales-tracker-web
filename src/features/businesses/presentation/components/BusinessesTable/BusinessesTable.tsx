import { DataTable } from '@/shared/ui';

import type { Business } from '../../../domain/business.model';
import { businessesTableColumns } from './businessesTableColumns';

type BusinessesTableProps = {
  businesses: Business[];
  selectedBusinessId: string | null;
  onBusinessSelect: (businessId: string) => void;
};

export const BusinessesTable = ({
  businesses,
  selectedBusinessId,
  onBusinessSelect,
}: BusinessesTableProps) => (
  <DataTable
    columns={businessesTableColumns}
    data={businesses}
    getRowId={(business) => business.id}
    selectedRowId={selectedBusinessId}
    onRowClick={(business) => {
      onBusinessSelect(business.id);
    }}
  />
);
