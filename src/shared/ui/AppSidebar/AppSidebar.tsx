import {
  Building2,
  Calendar,
  ChartNoAxesCombined,
  ChevronsLeft,
  Clock,
  LayoutDashboard,
  Settings,
  SquareCheckBig,
} from 'lucide-react';
import { Link, useRouterState } from '@tanstack/react-router';

import { cn } from '@/shared/lib/cn';
import { IconButton } from '@/shared/ui';

import styles from './AppSidebar.module.css';

type SidebarNavItem = {
  icon: typeof LayoutDashboard;
  isEnabled: boolean;
  label: string;
  to: string;
};

const navItems: SidebarNavItem[] = [
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

const isRouteActive = (pathname: string, to: string) =>
  pathname === to || pathname.startsWith(`${to}/`);

export const AppSidebar = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <ChartNoAxesCombined size={21} strokeWidth={2.4} />
          </div>
          <span className={styles.brandName}>Sales Tracker</span>
        </div>

        <IconButton
          className={styles.collapseButton}
          disabled
          label="Collapse sidebar"
          variant="secondary"
        >
          <ChevronsLeft size={18} />
        </IconButton>
      </div>

      <nav className={styles.menu} aria-label="Main menu">
        <div className={styles.menuHeader}>
          <span>Main menu</span>
        </div>

        <ul className={styles.navList}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(pathname, item.to);
            const itemClassName = cn(
              styles.navItem,
              isActive && styles.active,
              !item.isEnabled && styles.disabled,
            );

            return (
              <li key={item.to}>
                {item.isEnabled ? (
                  <Link className={itemClassName} to={item.to}>
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className={itemClassName}
                    role="link"
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
