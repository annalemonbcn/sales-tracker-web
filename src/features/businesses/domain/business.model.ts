import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';
import type { UserSummary } from '@/features/users/domain/user.model';

export type BusinessContactDetails = {
  instagram: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
};

export type BusinessSummary = {
  id: string;
  name: string;
  category: Category;
  status: BusinessStatus;
  priority: Priority;
};

export type Business = {
  id: string;
  name: string;
  category: Category;
  status: BusinessStatus;
  priority: Priority;
  source: LeadSource;
  details: BusinessContactDetails;
  notes: string | null;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  createdBy: UserSummary;
  assignedTo: UserSummary | null;
  createdAt: string;
  updatedAt: string;
};
