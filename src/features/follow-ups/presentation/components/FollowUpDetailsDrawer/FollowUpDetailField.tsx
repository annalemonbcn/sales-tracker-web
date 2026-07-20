import { cn } from '@/shared/lib/cn';

import businessOverviewStyles from '@/features/businesses/presentation/components/BusinessDetailsPanel/BusinessOverview/BusinessOverview.module.css';

import styles from './FollowUpDetailsDrawer.module.css';

type FollowUpDetailFieldProps = {
  avatarUrl?: string;
  label: string;
  tooltip?: string;
  value: string;
};

export const FollowUpDetailField = ({
  avatarUrl,
  label,
  tooltip,
  value,
}: FollowUpDetailFieldProps) => (
  <div
    className={cn(
      businessOverviewStyles.field,
      tooltip && styles.tooltipWrapper,
    )}
    data-tooltip={tooltip}
    tabIndex={tooltip ? 0 : undefined}
  >
    <span className={businessOverviewStyles.label}>{label}</span>

    <div className={businessOverviewStyles.valueBox}>
      {avatarUrl ? (
        <img
          className={businessOverviewStyles.valueAvatar}
          src={avatarUrl}
          alt=""
        />
      ) : null}

      <span className={businessOverviewStyles.valueText}>{value}</span>
    </div>
  </div>
);
