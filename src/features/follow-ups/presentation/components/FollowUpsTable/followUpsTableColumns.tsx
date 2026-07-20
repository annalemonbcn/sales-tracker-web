import type { ColumnDef } from '@tanstack/react-table';

import {
  getBadgeVariantByPriority,
  getPriorityLabel,
} from '@/features/businesses/presentation/lib/formatters';
import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';
import { getInitialsAvatarUrl } from '@/shared/lib/avatar';
import { Badge } from '@/shared/ui';

import styles from './FollowUpsTable.module.css';
import {
  followUpStatusLabelMap,
  followUpStatusVariantMap,
  followUpTypeLabelMap,
  followUpTypeVariantMap,
  formatFollowUpDueDate,
} from './followUpsTableFormatters';

export const followUpsTableColumns: ColumnDef<FollowUpTask>[] = [
  {
    accessorKey: 'title',
    header: 'Task',
    cell: ({ row }) => (
      <strong className={styles.taskName}>{row.original.title}</strong>
    ),
  },
  {
    accessorKey: 'business.name',
    header: 'Business',
    cell: ({ row }) => row.original.business.name,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const { type } = row.original;

      return (
        <Badge variant={followUpTypeVariantMap[type]}>
          {followUpTypeLabelMap[type]}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'business.priority',
    header: 'Priority',
    cell: ({ row }) => {
      const { priority } = row.original.business;

      return (
        <Badge variant={getBadgeVariantByPriority(priority)}>
          {getPriorityLabel(priority)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'assignedTo.name',
    header: 'Assignee',
    cell: ({ row }) => {
      const { name } = row.original.assignedTo;

      return (
        <div className={styles.assigneeCell}>
          <img src={getInitialsAvatarUrl(name)} alt="" />
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due date',
    cell: ({ row }) => formatFollowUpDueDate(row.original.dueDate),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <Badge variant={followUpStatusVariantMap[status]}>
          {followUpStatusLabelMap[status]}
        </Badge>
      );
    },
  },
];
