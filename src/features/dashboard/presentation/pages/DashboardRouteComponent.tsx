import { DashboardBusinessFiltersProvider } from '../providers/DashboardBusinessFiltersProvider';
import { DashboardSelectedBusinessProvider } from '../providers/DashboardSelectedBusinessProvider';
import { DashboardPage } from './DashboardPage';

export const DashboardRouteComponent = () => (
  <DashboardBusinessFiltersProvider>
    <DashboardSelectedBusinessProvider>
      <DashboardPage />
    </DashboardSelectedBusinessProvider>
  </DashboardBusinessFiltersProvider>
);
