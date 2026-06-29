import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';

export type BusinessNotesProps = {
  business: BusinessDetail;
};

export type BusinessNotesFormValues = {
  notes: string;
};
