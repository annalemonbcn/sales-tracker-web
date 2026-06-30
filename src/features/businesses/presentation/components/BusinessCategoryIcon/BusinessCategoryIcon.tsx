import {
  Building2,
  Dumbbell,
  Hotel,
  Scissors,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Utensils,
} from 'lucide-react';

import type { Category } from '@/shared/api/generated/salesTrackerApi';
import { cn } from '@/shared/lib/cn';

import { getBusinessCategoryLabel } from '../../lib/formatters';

import styles from './BusinessCategoryIcon.module.css';

type BusinessCategoryIconSize = 'sm' | 'lg';

type BusinessCategoryIconProps = {
  category: Category;
  size?: BusinessCategoryIconSize;
};

const businessCategoryIconByCategory = {
  restaurant: Utensils,
  hairdresser: Scissors,
  beauty_center: Sparkles,
  hotel: Hotel,
  shop: ShoppingBag,
  gym: Dumbbell,
  clinic: Stethoscope,
  other: Building2,
} satisfies Record<Category, typeof Building2>;

const categoryIconClassNameByCategory = {
  restaurant: styles.restaurant,
  hairdresser: styles.hairdresser,
  beauty_center: styles.beautyCenter,
  hotel: styles.hotel,
  shop: styles.shop,
  gym: styles.gym,
  clinic: styles.clinic,
  other: styles.other,
} satisfies Record<Category, string>;

const iconSizeBySize = {
  sm: 18,
  lg: 26,
} satisfies Record<BusinessCategoryIconSize, number>;

export const BusinessCategoryIcon = ({
  category,
  size = 'sm',
}: BusinessCategoryIconProps) => {
  const Icon = businessCategoryIconByCategory[category];
  const categoryLabel = getBusinessCategoryLabel(category);

  return (
    <span
      aria-label={categoryLabel}
      className={cn(
        styles.icon,
        styles[size],
        categoryIconClassNameByCategory[category],
      )}
      title={categoryLabel}
    >
      <Icon size={iconSizeBySize[size]} />
    </span>
  );
};
