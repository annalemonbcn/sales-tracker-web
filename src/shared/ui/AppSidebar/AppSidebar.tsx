import {
  ChartNoAxesCombined,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
} from 'lucide-react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';

import { cn } from '@/shared/lib/cn';
import { IconButton } from '@/shared/ui';

import styles from './AppSidebar.module.css';
import { SidebarMiniCalendar } from './SidebarMiniCalendar';
import { navItems } from './navItems';

const isRouteActive = (pathname: string, to: string) =>
  pathname === to || pathname.startsWith(`${to}/`);

export const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const shouldShowMiniCalendar = !isRouteActive(pathname, '/tasks');

  const expandSidebar = () => setIsCollapsed(false);

  return (
    <aside
      className={cn(styles.sidebar, isCollapsed && styles.collapsed)}
      data-collapsed={isCollapsed}
    >
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <ChartNoAxesCombined size={21} strokeWidth={2.4} />
          </div>
          <span className={styles.brandName}>Sales Tracker</span>
        </div>

        <IconButton
          className={styles.collapseButton}
          label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => {
            setIsCollapsed((currentValue) => !currentValue);
          }}
          variant="secondary"
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? (
            <ChevronsRight size={18} />
          ) : (
            <ChevronsLeft size={18} />
          )}
        </IconButton>
      </div>

      <nav className={styles.menu} aria-label="Main menu">
        <button
          aria-controls="sidebar-main-menu"
          aria-expanded={isMainMenuOpen}
          className={styles.menuHeader}
          type="button"
          onClick={() => {
            setIsMainMenuOpen((currentValue) => !currentValue);
          }}
        >
          <span>Main menu</span>
          {isMainMenuOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
        </button>

        <ul
          className={cn(
            styles.navList,
            !isMainMenuOpen && !isCollapsed && styles.navListClosed,
          )}
          id="sidebar-main-menu"
        >
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
                  <Link
                    aria-label={isCollapsed ? item.label : undefined}
                    className={itemClassName}
                    onClick={expandSidebar}
                    to={item.to}
                  >
                    <Icon size={20} />
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    aria-label={isCollapsed ? item.label : undefined}
                    aria-disabled="true"
                    className={itemClassName}
                    onClick={isCollapsed ? expandSidebar : undefined}
                    role="link"
                  >
                    <Icon size={20} />
                    <span className={styles.navLabel}>{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {shouldShowMiniCalendar ? <SidebarMiniCalendar /> : null}
    </aside>
  );
};
