import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';

import styles from './FollowUpsTable.module.css';
import { followUpsTableColumns } from './followUpsTableColumns';

type FollowUpsTableProps = {
  followUps: FollowUpTask[];
};

export const FollowUpsTable = ({ followUps }: FollowUpsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: followUps,
    columns: followUpsTableColumns,
    state: {
      sorting,
    },
    getRowId: (followUp) => followUp.id,
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.row}>
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
