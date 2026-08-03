import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './Badge.module.css';

export type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'pink'
  | 'teal'
  | 'purple'
  | 'indigo'
  | 'overdue'
  | 'yellow';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

export const Badge = ({
  children,
  variant = 'neutral',
  className,
  ...props
}: BadgeProps) => (
  <span className={cn(styles.badge, styles[variant], className)} {...props}>
    {children}
  </span>
);
