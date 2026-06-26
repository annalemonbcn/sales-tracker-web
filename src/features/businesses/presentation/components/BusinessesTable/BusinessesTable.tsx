import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { EmptyState } from '@/shared/ui';

import type { Business } from '../../../domain/business.model';
import { businessesTableColumns } from './businessesTableColumns';

import styles from './BusinessesTable.module.css';

type BusinessesTableProps = {
  businesses: Business[];
};

export const BusinessesTable = ({ businesses }: BusinessesTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: businesses,
    columns: businessesTableColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (businesses.length === 0) {
    return (
      <EmptyState
        title="No businesses found"
        message="Create your first business to start tracking your sales pipeline."
      />
    );
  }

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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
