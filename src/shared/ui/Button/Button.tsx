import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    className={cn(styles.button, styles[variant], styles[size], className)}
    type={type}
    {...props}
  >
    {children}
  </button>
);
