import { CalendarDays, MessageCircle, Phone, Plus } from 'lucide-react';

type ActivityVariant = 'success' | 'primary' | 'warning' | 'danger';

export const getActivityTypeLabel = (type: string): string =>
  type
    .split('_')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

export const getActivityVariant = (type: string): ActivityVariant => {
  if (type.includes('created') || type.includes('added')) return 'success';
  if (type.includes('call') || type.includes('contact')) return 'primary';
  if (type.includes('meeting') || type.includes('follow')) return 'warning';

  return 'primary';
};

export const getActivityIcon = (type: string) => {
  if (type.includes('call')) return Phone;
  if (type.includes('meeting') || type.includes('follow')) return CalendarDays;
  if (type.includes('created') || type.includes('added')) return Plus;

  return MessageCircle;
};
