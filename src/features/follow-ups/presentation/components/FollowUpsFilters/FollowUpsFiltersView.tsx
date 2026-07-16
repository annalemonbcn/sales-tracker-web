import { Button, Select, type SelectOption } from '@/shared/ui';

import styles from './FollowUpsFilters.module.css';

type FollowUpFilterSelectConfig = {
  key: string;
  label: string;
  options: SelectOption[];
  value: string;
};

type FollowUpsFiltersViewProps = {
  filterSelects: FollowUpFilterSelectConfig[];
  isClearButtonDisabled: boolean;
  isDisabled: boolean;
  onClearFilters: () => void;
};

export const FollowUpsFiltersView = ({
  filterSelects,
  isClearButtonDisabled,
  isDisabled,
  onClearFilters,
}: FollowUpsFiltersViewProps) => (
  <div className={styles.filters}>
    {filterSelects.map((filter) => (
      <Select
        key={filter.key}
        isClearable={false}
        isDisabled={isDisabled}
        label={filter.label}
        options={filter.options}
        value={filter.value}
        onChange={() => {}}
      />
    ))}

    <Button
      disabled={isClearButtonDisabled || isDisabled}
      variant="secondary"
      onClick={onClearFilters}
    >
      Clear filters
    </Button>
  </div>
);
