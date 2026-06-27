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

export const businessCategoryIconByCategory = {
  restaurant: Utensils,
  hairdresser: Scissors,
  beauty_center: Sparkles,
  hotel: Hotel,
  shop: ShoppingBag,
  gym: Dumbbell,
  clinic: Stethoscope,
  other: Building2,
} satisfies Record<Category, typeof Building2>;
