import { useState } from 'react';

import { BusinessOverviewForm } from './BusinessOverviewForm';
import { BusinessOverviewView } from './BusinessOverviewView';
import type { BusinessOverviewProps } from './types';

export const BusinessOverview = ({ business }: BusinessOverviewProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <BusinessOverviewForm
        business={business}
        onCancel={() => {
          setIsEditing(false);
        }}
        onSuccess={() => {
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <BusinessOverviewView
      business={business}
      onEdit={() => {
        setIsEditing(true);
      }}
    />
  );
};
