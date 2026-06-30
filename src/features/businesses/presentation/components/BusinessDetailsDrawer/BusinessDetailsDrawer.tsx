import { useEffect } from 'react';
import { BusinessDetailsPanel } from '../BusinessDetailsPanel';

import styles from './BusinessDetailsDrawer.module.css';

type BusinessDetailsDrawerProps = {
  businessId: string;
  onClose: () => void;
};

export const BusinessDetailsDrawer = ({
  businessId,
  onClose,
}: BusinessDetailsDrawerProps) => {
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
        aria-label="Close business details"
        className={styles.overlay}
        type="button"
        onClick={onClose}
      />

      <aside className={styles.drawer}>
        <BusinessDetailsPanel businessId={businessId} />
      </aside>
    </>
  );
};
