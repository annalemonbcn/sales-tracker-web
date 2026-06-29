import { useState } from 'react';

import { BusinessContactInformationForm } from './BusinessContactInformationForm';
import { BusinessContactInformationView } from './BusinessContactInformationView';
import type { BusinessContactInformationProps } from './types';

export const BusinessContactInformation = ({
  business,
}: BusinessContactInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <BusinessContactInformationForm
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
    <BusinessContactInformationView
      business={business}
      onEdit={() => {
        setIsEditing(true);
      }}
    />
  );
};
