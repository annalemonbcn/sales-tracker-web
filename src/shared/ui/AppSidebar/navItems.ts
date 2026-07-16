import {
  Building2,
  Calendar,
  Clock,
  LayoutDashboard,
  Settings,
  SquareCheckBig,
} from 'lucide-react';

type SidebarNavItem = {
  icon: typeof LayoutDashboard;
  isEnabled: boolean;
  label: string;
  to: string;
};

export const navItems: SidebarNavItem[] = [
  {
    icon: LayoutDashboard,
    isEnabled: true,
    label: 'Dashboard',
    to: '/dashboard',
  },
  {
    icon: Building2,
    isEnabled: false,
    label: 'Businesses',
    to: '/businesses',
  },
  {
    icon: SquareCheckBig,
    isEnabled: false,
    label: 'Tasks',
    to: '/tasks',
  },
  {
    icon: Calendar,
    isEnabled: false,
    label: 'Calendar',
    to: '/calendar',
  },
  {
    icon: Clock,
    isEnabled: false,
    label: 'Activity',
    to: '/activity',
  },
  {
    icon: Settings,
    isEnabled: false,
    label: 'Settings',
    to: '/settings',
  },
];
