import {
  BusinessStatus,
  Category,
  LeadSource,
  Priority,
  type BusinessStatus as BusinessStatusType,
  type Category as CategoryType,
  type LeadSource as LeadSourceType,
  type Priority as PriorityType,
} from '@/shared/api/generated/salesTrackerApi';
import type { SelectOption } from '@/shared/ui';

import {
  getBusinessCategoryLabel,
  getBusinessSourceLabel,
  getBusinessStatusLabel,
  getPriorityLabel,
} from '../../lib/formatters';

const mapValuesToOptions = <Value extends string>(
  values: Value[],
  getLabel: (value: Value) => string,
): SelectOption<Value>[] =>
  values.map((value) => ({
    label: getLabel(value),
    value,
  }));

export const businessStatusOptions = mapValuesToOptions(
  Object.values(BusinessStatus) as BusinessStatusType[],
  getBusinessStatusLabel,
);

export const categoryOptions = mapValuesToOptions(
  Object.values(Category) as CategoryType[],
  getBusinessCategoryLabel,
);

export const priorityOptions = mapValuesToOptions(
  Object.values(Priority) as PriorityType[],
  getPriorityLabel,
);

export const sourceOptions = mapValuesToOptions(
  Object.values(LeadSource) as LeadSourceType[],
  getBusinessSourceLabel,
);
