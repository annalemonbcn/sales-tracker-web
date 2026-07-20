import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div className={styles.wrapper}>
      <input
        className={cn(styles.input, error && styles.inputError, className)}
        ref={ref}
        {...props}
      />

      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  ),
);

Input.displayName = 'Input';
