import type { ReactNode } from 'react';
import { useState } from 'react';
import { ExternalLink, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { InstagramIcon } from '@/shared/ui/icons/InstagramIcon';

import { useForm } from 'react-hook-form';

import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';

import { Button } from '@/shared/ui';
import { useUpdateBusinessContactDetails } from '@/features/businesses/application/useUpdateBusinessContactDetails';

import styles from './BusinessDetailsPanel.module.css';

type BusinessContactInformationProps = {
  business: BusinessDetail;
};

export const BusinessContactInformation = ({
  business,
}: BusinessContactInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <BusinessContactInformationForm
        business={business}
        onCancel={() => {
          setIsEditing(false);
        }}
        onSuccess={() => {
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <BusinessContactInformationView
      business={business}
      onEdit={() => {
        setIsEditing(true);
      }}
    />
  );
};

type BusinessContactInformationViewProps = {
  business: BusinessDetail;
  onEdit: () => void;
};

type ContactInformationFormValues = {
  instagram: string;
  email: string;
  phone: string;
  website: string;
  address: string;
};

const BusinessContactInformationView = ({
  business,
  onEdit,
}: BusinessContactInformationViewProps) => {
  const { address, email, instagram, phone, website } = business.details;

  const instagramUsername = instagram?.replace(/^@/, '') ?? null;

  const instagramUrl = instagramUsername
    ? `https://instagram.com/${instagramUsername}`
    : null;

  const websiteUrl = website ? getWebsiteUrl(website) : null;

  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address,
      )}`
    : null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Contact information</h3>

        <button className={styles.sectionAction} type="button" onClick={onEdit}>
          Edit
        </button>
      </div>

      <div className={styles.contactList}>
        <ContactRow
          actionHref={instagramUrl ?? undefined}
          actionLabel="Open Instagram profile"
          icon={<InstagramIcon size={18} />}
          isMuted={!instagramUsername}
          label={instagramUsername || 'No Instagram added yet'}
        />

        <ContactRow
          actionHref={email ? `mailto:${email}` : undefined}
          actionLabel="Send email"
          icon={<Mail size={18} />}
          isMuted={!email}
          label={email || 'No email added yet'}
        />

        <ContactRow
          actionHref={phone ? `tel:${phone}` : undefined}
          actionIcon={<Phone size={17} />}
          actionLabel="Call phone number"
          icon={<Phone size={18} />}
          isMuted={!phone}
          label={phone || 'No phone added yet'}
        />

        <ContactRow
          actionHref={websiteUrl ?? undefined}
          actionLabel="Open website"
          icon={<Globe size={18} />}
          isMuted={!website}
          label={website || 'No website added yet'}
        />

        <ContactRow
          actionHref={mapsUrl ?? undefined}
          actionLabel="Open address in Google Maps"
          icon={<MapPin size={18} />}
          isMuted={!address}
          label={address || 'No address added yet'}
        />
      </div>
    </section>
  );
};

type BusinessContactInformationFormProps = {
  business: BusinessDetail;
  onCancel: () => void;
  onSuccess: () => void;
};

const BusinessContactInformationForm = ({
  business,
  onCancel,
  onSuccess,
}: BusinessContactInformationFormProps) => {
  const { mutateAsync, isPending } = useUpdateBusinessContactDetails();

  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm<ContactInformationFormValues>({
    defaultValues: {
      instagram: business.details.instagram?.replace(/^@/, '') ?? '',
      email: business.details.email ?? '',
      phone: business.details.phone ?? '',
      website: business.details.website ?? '',
      address: business.details.address ?? '',
    },
  });

  const onSubmit = async (values: ContactInformationFormValues) => {
    await mutateAsync({
      businessId: business.id,
      data: {
        instagram: values.instagram.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        website: values.website.trim(),
        address: values.address.trim(),
      },
    });

    onSuccess();
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Contact information</h3>
      </div>

      <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.contactField}>
          <span>Instagram</span>
          <input placeholder="business_username" {...register('instagram')} />
        </label>

        <label className={styles.contactField}>
          <span>Email</span>
          <input
            placeholder="hello@business.com"
            type="email"
            {...register('email')}
          />
        </label>

        <label className={styles.contactField}>
          <span>Phone</span>
          <input
            placeholder="+34 600 000 000"
            type="tel"
            {...register('phone')}
          />
        </label>

        <label className={styles.contactField}>
          <span>Website</span>
          <input placeholder="business.com" {...register('website')} />
        </label>

        <label className={styles.contactField}>
          <span>Address</span>
          <input placeholder="Street, city" {...register('address')} />
        </label>

        <div className={styles.contactFormActions}>
          <Button
            disabled={isPending}
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button disabled={isPending || !isDirty} type="submit">
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </section>
  );
};

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  actionHref?: string;
  actionLabel?: string;
  actionIcon?: ReactNode;
  isMuted?: boolean;
};

const ContactRow = ({
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

const getWebsiteUrl = (website: string): string => {
  if (website.startsWith('http://') || website.startsWith('https://')) {
    return website;
  }

  return `https://${website}`;
};
