import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './Card.module.css';

type CardContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const CardContent = ({
  children,
  className,
  ...props
}: CardContentProps) => (
  <div className={cn(styles.content, className)} {...props}>
    {children}
  </div>
);
