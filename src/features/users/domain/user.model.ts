import type { UserRole } from '@/shared/api/generated/salesTrackerApi';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
