import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import { IconButton } from '@/shared/ui/IconButton/IconButton';

import styles from './Modal.module.css';

// TODO: for children use ReactNode or PropsWithChildren?
type ModalProps = {
  children: ReactNode;
  description?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
};

export const Modal = ({
  children,
  description,
  isOpen,
  onOpenChange,
  title,
}: ModalProps) => (
  <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />

      <Dialog.Content className={styles.content}>
        <div className={styles.header}>
          <div>
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
            {description ? (
              <Dialog.Description className={styles.description}>
                {description}
              </Dialog.Description>
            ) : null}
          </div>

          <Dialog.Close asChild>
            <IconButton label="Close modal" variant="ghost">
              <X size={19} />
            </IconButton>
          </Dialog.Close>
        </div>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
