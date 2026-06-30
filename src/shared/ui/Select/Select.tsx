import ReactSelect, {
  components,
  type SingleValueProps,
  type StylesConfig,
} from 'react-select';

import styles from './Select.module.css';
import { selectStyles } from '@/features/businesses/presentation/components/BusinessesTable/selectStyles';

export type SelectOption<Value extends string = string> = {
  label: string;
  value: Value;
  avatarUrl?: string;
};

type SelectProps<Value extends string = string> = {
  label: string;
  value: Value | null;
  options: SelectOption<Value>[];
  placeholder?: string;
  isDisabled?: boolean;
  isClearable?: boolean;
  onChange: (value: Value | null) => void;
};

export const Select = <Value extends string = string>({
  label,
  value,
  options,
  placeholder = 'Select...',
  isDisabled = false,
  isClearable = true,
  onChange,
}: SelectProps<Value>) => {
  const selectedOption =
    options.find((option) => option.value === value) ?? null;

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>

      <ReactSelect<SelectOption<Value>, false>
        classNamePrefix="appSelect"
        components={{ SingleValue: SingleValueWithAvatar }}
        isClearable={isClearable}
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

const SingleValueWithAvatar = <Value extends string = string>(
  props: SingleValueProps<SelectOption<Value>, false>,
) => {
  const avatarUrl = props.data.avatarUrl;

  return (
    <components.SingleValue {...props}>
      {avatarUrl ? (
        <span className={styles.singleValueWithAvatar}>
          <img src={avatarUrl} alt="" />
          <span>{props.data.label}</span>
        </span>
      ) : (
        props.data.label
      )}
    </components.SingleValue>
  );
};
