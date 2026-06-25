import type { ReactNode } from 'react';

import styles from './AppShell.module.css';

type AppShellProps = {
  children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => (
  <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <div className={styles.logo}>ST</div>
      <span className={styles.brandName}>Sales Tracker</span>
    </aside>

    <div className={styles.content}>
      <main className={styles.main}>{children}</main>
    </div>
  </div>
);
