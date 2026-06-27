import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import type { Business } from '../../../domain/business.model';
import { businessesTableColumns } from './businessesTableColumns';

import styles from './BusinessesTable.module.css';
import { cn } from '@/shared/lib/cn';

type BusinessesTableProps = {
  businesses: Business[];
  selectedBusinessId: string | null;
  onBusinessSelect: (business: Business | null) => void;
};

export const BusinessesTable = ({
  businesses,
  selectedBusinessId,
  onBusinessSelect,
}: BusinessesTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const rowSelection: RowSelectionState = selectedBusinessId
    ? { [selectedBusinessId]: true }
    : {};

  const table = useReactTable({
    data: businesses,
    columns: businessesTableColumns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    getRowId: (business) => business.id,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortDirection = header.column.getIsSorted();

                return (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        className={styles.headerButton}
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {sortDirection === 'asc' ? <ArrowUp size={14} /> : null}

                        {sortDirection === 'desc' ? (
                          <ArrowDown size={14} />
                        ) : null}

                        {!sortDirection ? <ChevronsUpDown size={14} /> : null}
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isSelected = row.getIsSelected();

            return (
              <tr
                key={row.id}
                className={cn(styles.row, isSelected && styles.selectedRow)}
                onClick={() => {
                  onBusinessSelect(isSelected ? null : row.original);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
