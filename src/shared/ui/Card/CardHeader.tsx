import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './Card.module.css';

type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const CardHeader = ({
  children,
  className,
  ...props
}: CardHeaderProps) => (
  <div className={cn(styles.header, className)} {...props}>
    {children}
  </div>
);
