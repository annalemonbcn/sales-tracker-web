import { useForm } from 'react-hook-form';

import { useUpdateBusinessContactDetails } from '@/features/businesses/application/useUpdateBusinessContactDetails';
import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';
import { Button } from '@/shared/ui';

import panelStyles from '../BusinessDetailsPanel.module.css';
import styles from './BusinessContactInformation.module.css';

import { removeInstagramPrefix } from './contactInformation.helpers';
import type { ContactInformationFormValues } from './types';

type BusinessContactInformationFormProps = {
  business: BusinessDetail;
  onCancel: () => void;
  onSuccess: () => void;
};

export const BusinessContactInformationForm = ({
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
      instagram: business.details.instagram
        ? removeInstagramPrefix(business.details.instagram)
        : '',
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
    <section className={panelStyles.section}>
      <div className={panelStyles.sectionHeader}>
        <h3 className={panelStyles.sectionTitle}>Contact information</h3>
      </div>

      <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.contactField}>
          <span>Instagram</span>
          <input
            placeholder="instagram_business_username"
            {...register('instagram')}
          />
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
