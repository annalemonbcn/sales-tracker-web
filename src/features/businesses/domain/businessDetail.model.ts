import type { BusinessContactDetailsDto } from '@/shared/api/generated/salesTrackerApi';
import type { Business } from './business.model';
import type { Activity } from './activity.model';

type BusinessContactDetails = BusinessContactDetailsDto;

export type BusinessDetail = Business & {
  activities: Activity[];
  details: BusinessContactDetails;
};
