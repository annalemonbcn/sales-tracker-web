import type { SelectOption } from '@/shared/ui';
import type { StylesConfig } from 'react-select';

export const selectStyles: StylesConfig<SelectOption<string>, false> = {
  control: (base) => ({
    ...base,
    fontSize: '0.875rem',
  }),
  input: (base) => ({
    ...base,
    fontSize: '0.875rem',
  }),
  option: (base) => ({
    ...base,
    fontSize: '0.875rem',
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: '0.875rem',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '0.875rem',
  }),
};
