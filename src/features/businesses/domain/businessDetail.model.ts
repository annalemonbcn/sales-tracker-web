import type {
  ActivityDto,
  BusinessContactDetailsDto,
} from '@/shared/api/generated/salesTrackerApi';
import type { Business } from './business.model';

export type Activity = ActivityDto;

type BusinessContactDetails = BusinessContactDetailsDto;

export type BusinessDetail = Business & {
  activities: Activity[];
  details: BusinessContactDetails;
};
