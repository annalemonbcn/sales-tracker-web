import { FollowUpsFiltersView } from './FollowUpsFiltersView';

const statusOptions = [{ label: 'All', value: 'all' }];
const priorityOptions = [{ label: 'All', value: 'all' }];
const assigneeOptions = [{ label: 'All', value: 'all' }];
const businessOptions = [{ label: 'All', value: 'all' }];
const dueDateOptions = [{ label: 'Any time', value: 'any' }];

type FollowUpsFiltersProps = {
  isFollowUpsFetching: boolean;
};

export const FollowUpsFilters = ({
  isFollowUpsFetching,
}: FollowUpsFiltersProps) => (
  <FollowUpsFiltersView
    filterSelects={[
      {
        key: 'status',
        label: 'Status',
        options: statusOptions,
        value: 'all',
      },
      {
        key: 'priority',
        label: 'Priority',
        options: priorityOptions,
        value: 'all',
      },
      {
        key: 'assignedToId',
        label: 'Assignee',
        options: assigneeOptions,
        value: 'all',
      },
      {
        key: 'businessId',
        label: 'Linked business',
        options: businessOptions,
        value: 'all',
      },
      {
        key: 'dueDate',
        label: 'Due date',
        options: dueDateOptions,
        value: 'any',
      },
    ]}
    isClearButtonDisabled
    isDisabled={isFollowUpsFetching}
    onClearFilters={() => {}}
  />
);
