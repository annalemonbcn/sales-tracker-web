import type { ReactNode } from 'react';

import { AppSidebar } from '@/shared/ui/AppSidebar';

import styles from './AppShell.module.css';

type AppShellProps = {
  children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => (
  <div className={styles.shell}>
    <AppSidebar />

    <div className={styles.content}>
      <main className={styles.main}>{children}</main>
    </div>
  </div>
);
