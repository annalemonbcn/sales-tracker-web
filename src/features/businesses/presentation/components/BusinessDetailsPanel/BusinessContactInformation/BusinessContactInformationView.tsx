import { Globe, Mail, MapPin, Phone } from 'lucide-react';

import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';
import { InstagramIcon } from '@/shared/ui/icons/InstagramIcon';

import panelStyles from '../BusinessDetailsPanel.module.css';
import { ContactInformationSection } from './ContactInformationSection';
import { ContactRow } from './ContactRow';
import {
  getInstagramUrl,
  getMapsUrl,
  getWebsiteUrl,
  removeInstagramPrefix,
} from './contactInformation.helpers';
import styles from './BusinessContactInformation.module.css';

type BusinessContactInformationViewProps = {
  business: BusinessDetail;
  onEdit: () => void;
};

export const BusinessContactInformationView = ({
  business,
  onEdit,
}: BusinessContactInformationViewProps) => {
  const { address, email, instagram, phone, website } = business.details;

  const instagramUsername = instagram ? removeInstagramPrefix(instagram) : null;

  const instagramUrl = instagram ? getInstagramUrl(instagram) : null;
  const websiteUrl = website ? getWebsiteUrl(website) : null;
  const mapsUrl = address ? getMapsUrl(address) : null;

  return (
    <ContactInformationSection
      action={
        <button
          className={panelStyles.sectionAction}
          type="button"
          onClick={onEdit}
        >
          Edit
        </button>
      }
    >
      <div className={styles.contactList}>
        <ContactRow
          actionHref={instagramUrl ?? undefined}
          actionLabel="Open Instagram profile"
          icon={<InstagramIcon size={18} />}
          isMuted={!instagramUsername}
          label="Instagram"
          value={instagramUsername || 'No Instagram added yet'}
        />

        <ContactRow
          actionHref={email ? `mailto:${email}` : undefined}
          actionLabel="Send email"
          icon={<Mail size={18} />}
          isMuted={!email}
          label="Email"
          value={email || 'No email added yet'}
        />

        <ContactRow
          actionHref={phone ? `tel:${phone}` : undefined}
          actionLabel="Call phone number"
          icon={<Phone size={18} />}
          isMuted={!phone}
          label="Phone"
          value={phone || 'No phone added yet'}
        />

        <ContactRow
          actionHref={websiteUrl ?? undefined}
          actionLabel="Open website"
          icon={<Globe size={18} />}
          isMuted={!website}
          label="Website"
          value={website || 'No website added yet'}
        />

        <ContactRow
          actionHref={mapsUrl ?? undefined}
          actionLabel="Open address in Google Maps"
          icon={<MapPin size={18} />}
          isMuted={!address}
          label="Address"
          value={address || 'No address added yet'}
        />
      </div>
    </ContactInformationSection>
  );
};
