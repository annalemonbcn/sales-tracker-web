import { useForm } from 'react-hook-form';

import { useUpdateBusinessNotes } from '@/features/businesses/application/useUpdateBusinessNotes';
import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';
import { Button } from '@/shared/ui';

import panelStyles from '../BusinessDetailsPanel.module.css';
import styles from './BusinessNotes.module.css';
import type { BusinessNotesFormValues } from './types';

type BusinessNotesFormProps = {
  business: BusinessDetail;
  onCancel: () => void;
  onSuccess: () => void;
};

export const BusinessNotesForm = ({
  business,
  onCancel,
  onSuccess,
}: BusinessNotesFormProps) => {
  const { mutateAsync, isPending } = useUpdateBusinessNotes();

  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm<BusinessNotesFormValues>({
    defaultValues: {
      notes: business.notes ?? '',
    },
  });

  const onSubmit = async (values: BusinessNotesFormValues) => {
    await mutateAsync({
      businessId: business.id,
      data: {
        notes: values.notes.trim(),
      },
    });

    onSuccess();
  };

  return (
    <section className={panelStyles.section}>
      <div className={panelStyles.sectionHeader}>
        <h3 className={panelStyles.sectionTitle}>Notes</h3>
      </div>

      <form className={styles.notesForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.notesField}>
          <span>Notes</span>

          <textarea
            placeholder="Add useful context about this business..."
            rows={5}
            {...register('notes')}
          />
        </label>

        <div className={styles.notesFormActions}>
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
