import {
  CalendarDays,
  CheckCircle2,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  RefreshCcw,
  Send,
  UserRound,
  XCircle,
} from 'lucide-react';

import type { ActivityType } from '@/shared/api/generated/salesTrackerApi';

import type { ActivityTimelineVariant } from './ActivityTimeline';

const activityTypeLabelMap = {
  business_created: 'Business created',
  business_assigned: 'Business assigned',
  instagram_message_sent: 'Instagram message sent',
  email_sent: 'Email sent',
  phone_call_done: 'Phone call done',
  visit_done: 'Visit done',
  response_received: 'Response received',
  dossier_sent: 'Dossier sent',
  meeting_scheduled: 'Meeting scheduled',
  meeting_done: 'Meeting done',
  proposal_sent: 'Proposal sent',
  follow_up_created: 'Follow-up created',
  follow_up_done: 'Follow-up done',
  follow_up_cancelled: 'Follow-up cancelled',
  follow_up_updated: 'Follow-up updated',
  status_changed: 'Status changed',
  priority_changed: 'Priority changed',
  note_added: 'Note added',
} satisfies Record<ActivityType, string>;

const activityIconMap = {
  business_created: Plus,
  business_assigned: UserRound,
  instagram_message_sent: MessageCircle,
  email_sent: Mail,
  phone_call_done: Phone,
  visit_done: CalendarDays,
  response_received: MessageCircle,
  dossier_sent: FileText,
  meeting_scheduled: CalendarDays,
  meeting_done: CheckCircle2,
  proposal_sent: Send,
  follow_up_created: Plus,
  follow_up_done: CheckCircle2,
  follow_up_cancelled: XCircle,
  follow_up_updated: RefreshCcw,
  status_changed: RefreshCcw,
  priority_changed: RefreshCcw,
  note_added: FileText,
} satisfies Record<ActivityType, typeof Plus>;

const activityVariantMap = {
  business_created: 'success',
  business_assigned: 'primary',
  instagram_message_sent: 'primary',
  email_sent: 'primary',
  phone_call_done: 'primary',
  visit_done: 'primary',
  response_received: 'primary',
  dossier_sent: 'primary',
  meeting_scheduled: 'warning',
  meeting_done: 'success',
  proposal_sent: 'primary',
  follow_up_created: 'warning',
  follow_up_done: 'success',
  follow_up_cancelled: 'danger',
  follow_up_updated: 'warning',
  status_changed: 'neutral',
  priority_changed: 'neutral',
  note_added: 'neutral',
} satisfies Record<ActivityType, ActivityTimelineVariant>;

export const getActivityTypeLabel = (type: ActivityType): string =>
  activityTypeLabelMap[type];

export const getActivityIcon = (type: ActivityType) => activityIconMap[type];

export const getActivityVariant = (
  type: ActivityType,
): ActivityTimelineVariant => activityVariantMap[type];
