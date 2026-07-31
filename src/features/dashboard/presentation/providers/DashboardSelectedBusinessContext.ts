import { createContext, useContext } from 'react';

export type DashboardSelectedBusinessContextValue = {
  selectedBusinessId: string | null;
  selectBusiness: (businessId: string) => void;
  clearSelectedBusiness: () => void;
  toggleSelectedBusiness: (businessId: string) => void;
};

export const DashboardSelectedBusinessContext =
  createContext<DashboardSelectedBusinessContextValue | null>(null);

export const useDashboardSelectedBusiness = () => {
  const context = useContext(DashboardSelectedBusinessContext);

  if (!context) {
    throw new Error(
      'useDashboardSelectedBusiness must be used within DashboardSelectedBusinessProvider',
    );
  }

  return context;
};
