import { useState } from 'react';

import { BusinessNotesForm } from './BusinessNotesForm';
import { BusinessNotesView } from './BusinessNotesView';

import type { BusinessNotesProps } from './types';

export const BusinessNotes = ({ business }: BusinessNotesProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <BusinessNotesForm
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
    <BusinessNotesView
      business={business}
      onEdit={() => {
        setIsEditing(true);
      }}
    />
  );
};
