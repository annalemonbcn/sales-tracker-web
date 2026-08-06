import type { BusinessFilters } from '@/features/businesses/domain/businessFilters.model';
import type { FilterSelectConfig } from '@/shared/ui';

export type BusinessSelectFilterKey = Exclude<keyof BusinessFilters, 'search'>;

export type BusinessFilterSelectConfig = FilterSelectConfig & {
  key: BusinessSelectFilterKey;
};
