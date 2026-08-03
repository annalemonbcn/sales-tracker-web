import { Check } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

import styles from './Stepper.module.css';

export type StepperStep = {
  description?: string;
  label: string;
  isOptional?: boolean;
};

type StepperProps = {
  activeStep: number;
  steps: StepperStep[];
};

export const Stepper = ({ activeStep, steps }: StepperProps) => (
  <ol className={styles.stepper} aria-label="Progress">
    {steps.map((step, index) => {
      const isComplete = index < activeStep;
      const isCurrent = index === activeStep;

      return (
        <li
          className={cn(
            styles.step,
            isComplete && styles.complete,
            isCurrent && styles.current,
          )}
          key={step.label}
          aria-current={isCurrent ? 'step' : undefined}
        >
          <span className={styles.indicator} aria-hidden="true">
            {isComplete ? <Check size={15} strokeWidth={3} /> : index + 1}
          </span>

          <span className={styles.content}>
            <span className={styles.label}>
              {step.label}
              {step.isOptional ? (
                <span className={styles.optional}>Optional</span>
              ) : null}
            </span>
            {step.description ? (
              <span className={styles.description}>{step.description}</span>
            ) : null}
          </span>
        </li>
      );
    })}
  </ol>
);
