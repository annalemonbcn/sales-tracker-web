import type {
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';

export type AddBusinessFormValues = {
  address: string;
  assignedToId: string | null;
  category: Category | null;
  email: string;
  instagram: string;
  name: string;
  notes: string;
  phone: string;
  priority: Priority | null;
  source: LeadSource | null;
  website: string;
};
