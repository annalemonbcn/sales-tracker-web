import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

export type BusinessContactDetails = {
  instagram: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
};

// TODO: reusar features/User ?
export type UserSummary = {
  id: string;
  name: string;
  email: string;
  role: string;
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
