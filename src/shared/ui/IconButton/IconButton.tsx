import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './IconButton.module.css';

type IconButtonVariant = 'secondary' | 'ghost';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label: string;
  variant?: IconButtonVariant;
};

export const IconButton = ({
  children,
  label,
  variant = 'secondary',
  className,
  type = 'button',
  ...props
}: IconButtonProps) => (
  <button
    aria-label={label}
    className={cn(styles.button, styles[variant], className)}
    type={type}
    {...props}
  >
    {children}
  </button>
);
