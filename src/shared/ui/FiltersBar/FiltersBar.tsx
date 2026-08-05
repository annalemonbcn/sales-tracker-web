import { Button } from '../Button/Button';
import { Select, type SelectOption } from '../Select/Select';

import styles from './FiltersBar.module.css';

export type FilterSelectConfig = {
  isDisabled?: boolean;
  key: string;
  label: string;
  onChange: (value: string | null) => void;
  options: SelectOption[];
  placeholder: string;
  value: string | null;
};

type FiltersBarProps = {
  ariaLabel: string;
  clearFilters: () => void;
  filterSelects: FilterSelectConfig[];
  isClearButtonDisabled: boolean;
};

export const FiltersBar = ({
  ariaLabel,
  clearFilters,
  filterSelects,
  isClearButtonDisabled,
}: FiltersBarProps) => (
  <div className={styles.filters} aria-label={ariaLabel}>
    {filterSelects.map((filter) => (
      <Select
        key={filter.key}
        isDisabled={filter.isDisabled}
        label={filter.label}
        options={filter.options}
        placeholder={filter.placeholder}
        value={filter.value}
        onChange={filter.onChange}
      />
    ))}

    <Button
      disabled={isClearButtonDisabled}
      variant="secondary"
      onClick={clearFilters}
    >
      Clear filters
    </Button>
  </div>
);
