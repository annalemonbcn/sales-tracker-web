import { createContext, useContext, useState, type ReactNode } from 'react';

type DashboardSelectedBusinessContextValue = {
  selectedBusinessId: string | null;
  selectBusiness: (businessId: string) => void;
  clearSelectedBusiness: () => void;
  toggleSelectedBusiness: (businessId: string) => void;
};

const DashboardSelectedBusinessContext =
  createContext<DashboardSelectedBusinessContextValue | null>(null);

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

export const useDashboardSelectedBusiness = () => {
  const context = useContext(DashboardSelectedBusinessContext);

  if (!context) {
    throw new Error(
      'useDashboardSelectedBusiness must be used within DashboardSelectedBusinessProvider',
    );
  }

  return context;
};
