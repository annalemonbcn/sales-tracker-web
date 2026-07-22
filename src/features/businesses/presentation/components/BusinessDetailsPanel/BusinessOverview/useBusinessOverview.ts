import {
  businessCategoryOptions,
  businessPriorityOptions,
  businessSourceOptions,
  businessStatusOptions,
} from '../../../lib/businessSelectOptions';
import { useAssigneeOptions } from '@/hooks';

export const useBusinessOverview = () => {
  const { assigneeOptions, isAssigneeSelectDisabled } = useAssigneeOptions();

  return {
    assigneeOptions,
    businessCategoryOptions,
    isAssigneeSelectDisabled,
    businessPriorityOptions,
    businessSourceOptions,
    businessStatusOptions,
  };
};
