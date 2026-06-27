import type { BusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import type { SelectOption } from '@/shared/ui';

export type BusinessSelectFilterKey = Exclude<keyof BusinessFilters, 'search'>;

export type BusinessFilterSelectConfig = {
  key: BusinessSelectFilterKey;
  label: string;
  placeholder: string;
  value: string | null;
  options: SelectOption[];
  isDisabled: boolean;
  onChange: (value: string | null) => void;
};
