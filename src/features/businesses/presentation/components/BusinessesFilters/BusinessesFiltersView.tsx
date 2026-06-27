import { Button, Select } from '@/shared/ui';

import styles from './BusinessesFilters.module.css';
import type { BusinessFilterSelectConfig } from './types';

type BusinessesFiltersViewProps = {
  filterSelects: BusinessFilterSelectConfig[];
  isClearButtonDisabled: boolean;
  clearFilters: () => void;
};

export const BusinessesFiltersView = ({
  clearFilters,
  filterSelects,
  isClearButtonDisabled,
}: BusinessesFiltersViewProps) => (
  <div className={styles.filters}>
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
