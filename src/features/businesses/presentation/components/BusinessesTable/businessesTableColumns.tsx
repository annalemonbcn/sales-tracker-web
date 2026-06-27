import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/shared/ui';
import { formatNullableDate } from '@/shared/lib/date';

import type { Business } from '@/features/businesses/domain/business.model';
import {
  getBadgeVariantByPriority,
  getBadgeVariantByStatus,
  getBusinessCategoryLabel,
  getBusinessSourceLabel,
  getBusinessStatusLabel,
  getPriorityLabel,
} from '../../lib/formatters';

import styles from './BusinessesTable.module.css';
import { businessCategoryIconByCategory } from './businessCategoryIcons';
import type { Category } from '@/shared/api/generated/salesTrackerApi';
import { cn } from '@/shared/lib/cn';

const categoryIconClassNameByCategory = {
  restaurant: styles.categoryIconRestaurant,
  hairdresser: styles.categoryIconHairdresser,
  beauty_center: styles.categoryIconBeautyCenter,
  hotel: styles.categoryIconHotel,
  shop: styles.categoryIconShop,
  gym: styles.categoryIconGym,
  clinic: styles.categoryIconClinic,
  other: styles.categoryIconOther,
} satisfies Record<Category, string>;

export const businessesTableColumns: ColumnDef<Business>[] = [
  {
    accessorKey: 'name',
    header: 'Business name',
    cell: ({ row }) => {
      const business = row.original;
      const CategoryIcon = businessCategoryIconByCategory[business.category];
      const categoryLabel = getBusinessCategoryLabel(business.category);

      return (
        <div className={styles.businessNameCell}>
          <span
            className={cn(
              styles.categoryIcon,
              categoryIconClassNameByCategory[business.category],
            )}
            aria-label={categoryLabel}
            title={categoryLabel}
          >
            <CategoryIcon size={18} />
          </span>

          <strong className={styles.businessName}>{business.name}</strong>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => getBusinessCategoryLabel(row.original.category),
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => getBusinessSourceLabel(row.original.source),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const { priority } = row.original;

      return (
        <Badge variant={getBadgeVariantByPriority(priority)}>
          {getPriorityLabel(priority)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <Badge variant={getBadgeVariantByStatus(status)}>
          {getBusinessStatusLabel(status)}
        </Badge>
      );
    },
  },
  {
    id: 'assignedTo',
    header: 'Assignee',
    accessorFn: (business) => business.assignedTo?.name ?? 'Unassigned',
    cell: ({ row }) => {
      const name = row.original.assignedTo?.name ?? 'Unassigned';
      const imgSrc = `https://api.dicebear.com/10.x/initials/svg?seed=${name}`;

      return (
        <div className={styles.assigneeCell}>
          <img src={imgSrc} alt="" />
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: 'lastContactedAt',
    header: 'Last Contact',
    cell: ({ row }) => formatNullableDate(row.original.lastContactedAt),
  },
  {
    accessorKey: 'nextFollowUpAt',
    header: 'Next follow-up',
    cell: ({ row }) => formatNullableDate(row.original.nextFollowUpAt),
  },
];
