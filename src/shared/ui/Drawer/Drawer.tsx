/* eslint-disable react/only-export-components */
import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { IconButton } from '@/shared/ui/IconButton/IconButton';

import styles from './Drawer.module.css';

type DrawerProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  onClose: () => void;
};

const DrawerRoot = ({
  ariaLabel,
  children,
  className,
  onClose,
}: DrawerProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <button
        aria-label={ariaLabel}
        className={styles.overlay}
        type="button"
        onClick={onClose}
      />

      <aside className={cn(styles.drawer, className)}>{children}</aside>
    </>
  );
};

type DrawerHeaderProps = {
  children: ReactNode;
  closeLabel?: string;
  onClick: () => void;
};

const DrawerHeader = ({
  children,
  closeLabel = 'Close drawer',
  onClick,
}: DrawerHeaderProps) => (
  <header className={styles.header}>
    <div className={styles.headerContent}>{children}</div>

    <IconButton label={closeLabel} onClick={onClick}>
      <X size={18} />
    </IconButton>
  </header>
);

type DrawerBodyProps = {
  children: ReactNode;
  className?: string;
};

const DrawerBody = ({ children, className }: DrawerBodyProps) => (
  <div className={cn(styles.body, className)}>{children}</div>
);

type DrawerFooterProps = {
  children: ReactNode;
  className?: string;
};

const DrawerFooter = ({ children, className }: DrawerFooterProps) => (
  <footer className={cn(styles.footer, className)}>{children}</footer>
);

export const Drawer = Object.assign(DrawerRoot, {
  Body: DrawerBody,
  Footer: DrawerFooter,
  Header: DrawerHeader,
});
