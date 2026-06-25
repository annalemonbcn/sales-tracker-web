import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './Card.module.css';

type CardRootProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export const CardRoot = ({ children, className, ...props }: CardRootProps) => (
  <article className={cn(styles.card, className)} {...props}>
    {children}
  </article>
);
