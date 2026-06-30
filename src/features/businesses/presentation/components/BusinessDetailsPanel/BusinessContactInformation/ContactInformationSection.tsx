import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import panelStyles from '../BusinessDetailsPanel.module.css';

type ContactInformationSectionProps = {
  children: ReactNode;
  action?: ReactNode;
};

export const ContactInformationSection = ({
  action,
  children,
}: ContactInformationSectionProps) => (
  <section className={cn(panelStyles.section, panelStyles.sectionCard)}>
    <div className={panelStyles.sectionHeader}>
      <h3 className={panelStyles.sectionTitle}>Contact information</h3>

      {action}
    </div>

    {children}
  </section>
);
