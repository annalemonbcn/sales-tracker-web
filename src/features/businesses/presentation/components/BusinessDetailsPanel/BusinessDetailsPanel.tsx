import { X } from 'lucide-react';

import { useBusinessDetails } from '@/features/businesses/application/useBusinessDetails';
import { useDashboardSelectedBusiness } from '@/features/dashboard/presentation/providers/DashboardSelectedBusinessProvider';
import { ErrorState, IconButton, LoadingState } from '@/shared/ui';

import styles from './BusinessDetailsPanel.module.css';
import { cn } from '@/shared/lib/cn';
import { BusinessDetailsPanelHeader } from './BusinessDetailsPanelHeader';
import { BusinessContactInformation } from './BusinessContactInformation';
import { BusinessNotes } from './BusinessNotes';
import { BusinessNextFollowUp } from './BusinessNextFollowUp';
import { BusinessActivity } from './BusinessActivity';

type BusinessDetailsPanelProps = {
  businessId: string;
  className?: string;
};

export const BusinessDetailsPanel = ({
  businessId,
  className,
}: BusinessDetailsPanelProps) => {
  const { clearSelectedBusiness } = useDashboardSelectedBusiness();

  const { data: business, isError, isLoading } = useBusinessDetails(businessId);

  if (isLoading) {
    return (
      <aside className={cn(styles.panel, className)}>
        <PanelHeader title="Business details" onClose={clearSelectedBusiness} />
        <LoadingState message="Loading business details..." noBorder />
      </aside>
    );
  }

  if (isError || !business) {
    return (
      <aside className={cn(styles.panel, className)}>
        <PanelHeader title="Business details" onClose={clearSelectedBusiness} />
        <ErrorState
          title="We couldn't load this business"
          message="Please try it again in a moment."
          noBorder
        />
      </aside>
    );
  }

  return (
    <aside className={cn(styles.panel, className)}>
      <BusinessDetailsPanelHeader
        business={business}
        onClose={clearSelectedBusiness}
      />

      <div className={styles.content}>
        <BusinessContactInformation business={business} />

        <BusinessNotes business={business} />

        <BusinessNextFollowUp business={business} />

        <BusinessActivity business={business} />
      </div>
    </aside>
  );
};

type PanelHeaderProps = {
  title: string;
  onClose: () => void;
};

const PanelHeader = ({ title, onClose }: PanelHeaderProps) => (
  <div className={styles.header}>
    <h2 className={styles.title}>{title}</h2>

    <IconButton label="Close business details" onClick={onClose}>
      <X size={18} />
    </IconButton>
  </div>
);
