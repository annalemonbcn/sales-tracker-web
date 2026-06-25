import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './Card.module.css';

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

export const CardTitle = ({
  children,
  className,
  ...props
}: CardTitleProps) => (
  <h2 className={cn(styles.title, className)} {...props}>
    {children}
  </h2>
);
