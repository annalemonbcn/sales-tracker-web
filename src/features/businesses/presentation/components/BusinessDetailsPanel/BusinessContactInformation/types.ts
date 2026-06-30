import type { BusinessDetail } from '@/features/businesses/domain/businessDetail.model';

export type BusinessContactInformationProps = {
  business: BusinessDetail;
};

export type ContactInformationFormValues = {
  instagram: string;
  email: string;
  phone: string;
  website: string;
  address: string;
};
