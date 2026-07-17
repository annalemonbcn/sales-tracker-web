import { Drawer } from '@/shared/ui';
import { useBusinessDetails } from '@/features/businesses/application/useBusinessDetails';
import { ErrorState, LoadingState } from '@/shared/ui';

import { BusinessActivity } from '../BusinessDetailsPanel/BusinessActivity';
import { BusinessContactInformation } from '../BusinessDetailsPanel/BusinessContactInformation';
import { BusinessDetailsPanelHeader } from '../BusinessDetailsPanel/BusinessDetailsPanelHeader';
import { BusinessNextFollowUp } from '../BusinessDetailsPanel/BusinessNextFollowUp';
import { BusinessNotes } from '../BusinessDetailsPanel/BusinessNotes';
import { BusinessOverview } from '../BusinessDetailsPanel/BusinessOverview/BusinessOverview';

import styles from '../BusinessDetailsPanel/BusinessDetailsPanel.module.css';

type BusinessDetailsDrawerProps = {
  businessId: string;
  onClose: () => void;
};

export const BusinessDetailsDrawer = ({
  businessId,
  onClose,
}: BusinessDetailsDrawerProps) => {
  const { data: business, isError, isLoading } = useBusinessDetails(businessId);

  if (isLoading) {
    return (
      <Drawer ariaLabel="Close business details" onClose={onClose}>
        <Drawer.Header closeLabel="Close business details" onClick={onClose}>
          <h2 className={styles.title}>Business details</h2>
        </Drawer.Header>

        <Drawer.Body>
          <LoadingState message="Loading business details..." noBorder />
        </Drawer.Body>
      </Drawer>
    );
  }

  if (isError || !business) {
    return (
      <Drawer ariaLabel="Close business details" onClose={onClose}>
        <Drawer.Header closeLabel="Close business details" onClick={onClose}>
          <h2 className={styles.title}>Business details</h2>
        </Drawer.Header>

        <Drawer.Body>
          <ErrorState
            title="We couldn't load this business"
            message="Please try it again in a moment."
            noBorder
          />
        </Drawer.Body>
      </Drawer>
    );
  }

  return (
    <Drawer ariaLabel="Close business details" onClose={onClose}>
      <Drawer.Header closeLabel="Close business details" onClick={onClose}>
        <BusinessDetailsPanelHeader business={business} />
      </Drawer.Header>

      <Drawer.Body className={styles.content}>
        <BusinessOverview business={business} />

        <BusinessContactInformation business={business} />

        <BusinessNotes business={business} />

        <BusinessNextFollowUp business={business} />

        <BusinessActivity business={business} />
      </Drawer.Body>
    </Drawer>
  );
};
