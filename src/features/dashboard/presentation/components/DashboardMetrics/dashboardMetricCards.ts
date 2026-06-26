import { Building2, Flag, Phone, Timer } from 'lucide-react';
import type { DashboardMetricCardConfig } from './types';

export const dashboardMetricCards = [
  {
    key: 'totalBusinesses',
    title: 'Total businesses',
    icon: Building2,
  },
  {
    key: 'contactedBusinesses',
    title: 'Contacted',
    icon: Phone,
    variant: 'success',
  },
  {
    key: 'pendingFollowUps',
    title: 'Pending follow-ups',
    icon: Timer,
    variant: 'warning',
  },
  {
    key: 'highPriorityBusinesses',
    title: 'High priority',
    icon: Flag,
    variant: 'danger',
  },
] satisfies DashboardMetricCardConfig[];
