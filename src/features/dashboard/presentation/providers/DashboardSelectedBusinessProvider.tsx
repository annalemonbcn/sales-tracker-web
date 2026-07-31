import { useState, type ReactNode } from 'react';

import { DashboardSelectedBusinessContext } from './DashboardSelectedBusinessContext';

type DashboardSelectedBusinessProviderProps = {
  children: ReactNode;
};

export const DashboardSelectedBusinessProvider = ({
  children,
}: DashboardSelectedBusinessProviderProps) => {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null,
  );

  const selectBusiness = (businessId: string) => {
    setSelectedBusinessId(businessId);
  };

  const clearSelectedBusiness = () => {
    setSelectedBusinessId(null);
  };

  const toggleSelectedBusiness = (businessId: string) => {
    setSelectedBusinessId((currentBusinessId) =>
      currentBusinessId === businessId ? null : businessId,
    );
  };

  return (
    <DashboardSelectedBusinessContext.Provider
      value={{
        selectedBusinessId,
        selectBusiness,
        clearSelectedBusiness,
        toggleSelectedBusiness,
      }}
    >
      {children}
    </DashboardSelectedBusinessContext.Provider>
  );
};
