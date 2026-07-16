import type { UserRole } from '@/shared/api/generated/salesTrackerApi';

export type UserSummary = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type User = UserSummary;
