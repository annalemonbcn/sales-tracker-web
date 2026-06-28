import type { ReactNode } from 'react';
import { ExternalLink, Globe, AtSign, Mail, MapPin, Phone } from 'lucide-react';

import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';

import styles from './BusinessDetailsPanel.module.css';

type BusinessContactInformationProps = {
  business: BusinessDetail;
};

// TODO: add edit
export const BusinessContactInformation = ({
  business,
}: BusinessContactInformationProps) => {
  const { instagram, email, phone, website, address } = business.details;

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Contact information</h3>

      <div className={styles.contactList}>
        {instagram ? (
          <ContactRow
            icon={<AtSign size={18} />}
            label={instagram}
            actionIcon={<ExternalLink size={17} />}
          />
        ) : null}

        {email ? (
          <ContactRow
            icon={<Mail size={18} />}
            label={email}
            actionIcon={<ExternalLink size={17} />}
          />
        ) : null}

        <ContactRow
          icon={<Phone size={18} />}
          label={phone || 'No phone added yet'}
          actionIcon={phone ? <Phone size={17} /> : undefined}
          isMuted={!phone}
        />

        {website ? (
          <ContactRow
            icon={<Globe size={18} />}
            label={website}
            actionIcon={<ExternalLink size={17} />}
          />
        ) : null}

        <ContactRow
          icon={<MapPin size={18} />}
          label={address || 'No address added yet'}
          actionIcon={address ? <ExternalLink size={17} /> : undefined}
          isMuted={!address}
        />
      </div>
    </section>
  );
};

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  actionIcon?: ReactNode;
  isMuted?: boolean;
};

const ContactRow = ({
  actionIcon,
  icon,
  isMuted = false,
  label,
}: ContactRowProps) => (
  <div className={styles.contactRow}>
    <span className={styles.contactIcon}>{icon}</span>

    <span className={isMuted ? styles.contactLabelMuted : styles.contactLabel}>
      {label}
    </span>

    {actionIcon ? (
      <button className={styles.contactAction} type="button">
        {actionIcon}
      </button>
    ) : (
      <span />
    )}
  </div>
);
