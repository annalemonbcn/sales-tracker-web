import type {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
} from '@/shared/api/generated/salesTrackerApi';
import type { BadgeVariant } from '@/shared/ui/Badge/Badge';

const businessCategoryLabelMap: Record<Category, string> = {
  restaurant: 'Restaurant',
  hairdresser: 'Hairdresser',
  beauty_center: 'Beauty Center',
  hotel: 'Hotel',
  shop: 'Shop',
  gym: 'Gym',
  clinic: 'Clinic',
  other: 'Other',
};

const businessStatusLabelMap: Record<BusinessStatus, string> = {
  new_lead: 'New Lead',
  assigned: 'Assigned',
  waiting_response: 'Waiting Response',
  interested: 'Interested',
  dossier_sent: 'Dossier Sent',
  meeting_scheduled: 'Meeting Scheduled',
  meeting_done: 'Meeting Done',
  proposal_sent: 'Proposal Sent',
  negotiating: 'Negotiating',
  won: 'Won',
  lost: 'Lost',
  recontact_later: 'Recontact Later',
  discarded: 'Discarded',
};

const businessLeadSourceLabelMap: Record<LeadSource, string> = {
  instagram: 'Instagram',
  google_maps: 'Google Maps',
  walk_in: 'Walk-in',
  referral: 'Referral',
  website: 'Website',
  existing_contact: 'Existing Contact',
  other: 'Other',
};

const badgeVariantByStatusMap: Record<BusinessStatus, BadgeVariant> = {
  new_lead: 'primary',
  assigned: 'primary',
  waiting_response: 'warning',
  interested: 'success',
  dossier_sent: 'success',
  meeting_scheduled: 'success',
  meeting_done: 'success',
  proposal_sent: 'success',
  negotiating: 'warning',
  won: 'success',
  lost: 'danger',
  recontact_later: 'warning',
  discarded: 'neutral',
};

const badgeVariantByPriorityMap: Record<Priority, BadgeVariant> = {
  low: 'neutral',
  medium: 'warning',
  high: 'danger',
};

const priorityLabelMap: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const getBusinessStatusLabel = (status: BusinessStatus): string =>
  businessStatusLabelMap[status];

export const getBusinessCategoryLabel = (category: Category): string =>
  businessCategoryLabelMap[category];

export const getBusinessSourceLabel = (source: LeadSource): string =>
  businessLeadSourceLabelMap[source];

export const getPriorityLabel = (priority: Priority): string =>
  priorityLabelMap[priority];

export const getBadgeVariantByStatus = (status: BusinessStatus): BadgeVariant =>
  badgeVariantByStatusMap[status];

export const getBadgeVariantByPriority = (priority: Priority): BadgeVariant =>
  badgeVariantByPriorityMap[priority];
