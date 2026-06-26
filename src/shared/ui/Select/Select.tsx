import ReactSelect, { type StylesConfig } from 'react-select';

import styles from './Select.module.css';
import { selectStyles } from '@/features/businesses/presentation/components/BusinessesTable/selectStyles';

export type SelectOption<Value extends string = string> = {
  label: string;
  value: Value;
};

type SelectProps<Value extends string = string> = {
  label: string;
  value: Value | null;
  options: SelectOption<Value>[];
  placeholder?: string;
  isDisabled?: boolean;
  onChange: (value: Value | null) => void;
};

export const Select = <Value extends string = string>({
  label,
  value,
  options,
  placeholder = 'Select...',
  isDisabled = false,
  onChange,
}: SelectProps<Value>) => {
  const selectedOption =
    options.find((option) => option.value === value) ?? null;

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>

      <ReactSelect<SelectOption<Value>, false>
        classNamePrefix="appSelect"
        isClearable
        isDisabled={isDisabled}
        isSearchable
        options={options}
        placeholder={placeholder}
        styles={selectStyles as StylesConfig<SelectOption<Value>, false>}
        value={selectedOption}
        onChange={(option) => {
          onChange(option?.value ?? null);
        }}
      />
    </label>
  );
};
