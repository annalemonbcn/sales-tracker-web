import type { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input = ({ className, error, ...props }: InputProps) => (
  <div className={styles.wrapper}>
    <input
      className={cn(styles.input, error && styles.inputError, className)}
      {...props}
    />

    {error ? <p className={styles.error}>{error}</p> : null}
  </div>
);
