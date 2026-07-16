import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './DataTable.module.css';

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  getRowId: (row: TData) => string;
  onRowClick?: (row: TData) => void;
  selectedRowId?: string | null;
};

export const DataTable = <TData,>({
  columns,
  data,
  getRowId,
  onRowClick,
  selectedRowId = null,
}: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const rowSelection: RowSelectionState = selectedRowId
    ? { [selectedRowId]: true }
    : {};

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    getRowId,
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
                className={cn(
                  styles.row,
                  onRowClick && styles.clickableRow,
                  isSelected && styles.selectedRow,
                )}
                onClick={() => {
                  onRowClick?.(row.original);
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
