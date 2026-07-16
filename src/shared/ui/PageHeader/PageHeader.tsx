import { Plus } from 'lucide-react';

import { Button } from '@/shared/ui/Button/Button';

import styles from './PageHeader.module.css';

type PageHeaderProps = {
  actionLabel?: string;
  onActionClick?: () => void;
  subtitle?: string;
  title: string;
};

export const PageHeader = ({
  actionLabel,
  onActionClick,
  subtitle,
  title,
}: PageHeaderProps) => (
  <header className={styles.header}>
    <div>
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>

    {actionLabel && onActionClick ? (
      <Button onClick={onActionClick}>
        <Plus size={18} />
        {actionLabel}
      </Button>
    ) : null}
  </header>
);
