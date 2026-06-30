import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

import styles from './BusinessContactInformation.module.css';

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  actionHref?: string;
  actionLabel?: string;
  isMuted?: boolean;
};

export const ContactRow = ({
  actionHref,
  actionLabel,
  icon,
  isMuted = false,
  label,
  value,
}: ContactRowProps) => (
  <div className={styles.contactRow}>
    <span className={styles.contactIcon}>{icon}</span>

    <span className={styles.contactLabel}>{label}</span>

    <span className={isMuted ? styles.contactValueMuted : styles.contactValue}>
      {value}
    </span>

    {actionHref ? (
      <a
        aria-label={actionLabel}
        className={styles.contactAction}
        href={actionHref}
        rel="noreferrer"
        target={actionHref.startsWith('http') ? '_blank' : undefined}
      >
        <ExternalLink size={17} />
      </a>
    ) : (
      <span />
    )}
  </div>
);
