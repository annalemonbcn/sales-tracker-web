import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './Card.module.css';

type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export const CardDescription = ({
  children,
  className,
  ...props
}: CardDescriptionProps) => (
  <p className={cn(styles.description, className)} {...props}>
    {children}
  </p>
);
