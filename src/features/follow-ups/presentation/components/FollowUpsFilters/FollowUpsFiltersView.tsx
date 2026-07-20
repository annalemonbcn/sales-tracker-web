import { Button, Select, type SelectOption } from '@/shared/ui';

import styles from './FollowUpsFilters.module.css';

type FollowUpFilterSelectConfig = {
  isDisabled: boolean;
  key: string;
  label: string;
  onChange: (value: string | null) => void;
  options: SelectOption[];
  placeholder: string;
  value: string | null;
};

type FollowUpsFiltersViewProps = {
  clearFilters: () => void;
  filterSelects: FollowUpFilterSelectConfig[];
  isClearButtonDisabled: boolean;
};

export const FollowUpsFiltersView = ({
  clearFilters,
  filterSelects,
  isClearButtonDisabled,
}: FollowUpsFiltersViewProps) => (
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
