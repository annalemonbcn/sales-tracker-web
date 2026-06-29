import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

import styles from './BusinessContactInformation.module.css';

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  actionHref?: string;
  actionLabel?: string;
  actionIcon?: ReactNode;
  isMuted?: boolean;
};

export const ContactRow = ({
  actionHref,
  actionIcon = <ExternalLink size={17} />,
  actionLabel,
  icon,
  isMuted = false,
  label,
}: ContactRowProps) => (
  <div className={styles.contactRow}>
    <span className={styles.contactIcon}>{icon}</span>

    <span className={isMuted ? styles.contactLabelMuted : styles.contactLabel}>
      {label}
    </span>

    {actionHref ? (
      <a
        aria-label={actionLabel}
        className={styles.contactAction}
        href={actionHref}
        rel="noreferrer"
        target={actionHref.startsWith('http') ? '_blank' : undefined}
      >
        {actionIcon}
      </a>
    ) : (
      <span />
    )}
  </div>
);
