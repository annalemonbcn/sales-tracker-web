import type {
  ActivityDto,
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
  UserSummaryDto,
} from '@/shared/api/generated/salesTrackerApi';

// TODO: reusar features/User ?
export type UserSummary = UserSummaryDto;

export type Business = {
  id: string;
  name: string;
  category: Category;
  status: BusinessStatus;
  priority: Priority;
  source: LeadSource;
  notes: string | null;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  createdBy: UserSummary;
  assignedTo: UserSummary | null;
  createdAt: string;
  updatedAt: string;
};

type Activity = ActivityDto;

export type BusinessDetail = Business & {
  activities: Activity[];
};
