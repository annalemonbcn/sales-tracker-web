import {
  businessCategoryOptions,
  businessPriorityOptions,
  businessSourceOptions,
  businessStatusOptions,
} from '../../../lib/businessSelectOptions';
import { useBusinessAssigneeOptions } from '../../../hooks/useBusinessAssigneeOptions';

export const useBusinessOverview = () => {
  const { assigneeOptions, isAssigneeSelectDisabled } =
    useBusinessAssigneeOptions();

  return {
    assigneeOptions,
    businessCategoryOptions,
    isAssigneeSelectDisabled,
    businessPriorityOptions,
    businessSourceOptions,
    businessStatusOptions,
  };
};
