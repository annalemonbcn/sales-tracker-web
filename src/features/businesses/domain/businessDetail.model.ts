import type { ActivityDto } from '@/shared/api/generated/salesTrackerApi';
import type { Business } from './business.model';

type Activity = ActivityDto;

export type BusinessDetail = Business & {
  activities: Activity[];
};
