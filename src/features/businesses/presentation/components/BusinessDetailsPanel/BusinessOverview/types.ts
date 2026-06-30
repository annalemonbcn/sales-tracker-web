import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';

export type BusinessOverviewProps = {
  business: BusinessDetail;
};

export type BusinessOverviewFormValues = {
  name: string;
  category: Category;
  status: BusinessStatus;
  source: LeadSource;
  priority: Priority;
  assignedToId: string | null;
};
