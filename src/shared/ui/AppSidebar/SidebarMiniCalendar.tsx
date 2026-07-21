import { format, isSameDay, startOfMonth } from 'date-fns';
import { type MouseEvent, useMemo, useState } from 'react';
import {
  DayPicker,
  type ClassNames,
  type DayEventHandler,
  type ModifiersClassNames,
} from 'react-day-picker';

import { useMonthlyFollowUps } from '@/features/follow-ups/application/useMonthlyFollowUps';
import type { FollowUpTask } from '@/features/follow-ups/domain/followUpTask.model';

import styles from './AppSidebar.module.css';
import { getCurrentUserId } from '@/auth/currentUser';

const dayPickerClassNames: Partial<ClassNames> = {
  button_next: styles.calendarNavButton,
  button_previous: styles.calendarNavButton,
  caption_label: styles.calendarTitle,
  chevron: styles.calendarChevron,
  day: styles.calendarDay,
  day_button: styles.calendarDayButton,
  disabled: styles.calendarDisabledDay,
  month_caption: styles.calendarCaption,
  month_grid: styles.calendarGrid,
  months: styles.calendarMonths,
  nav: styles.calendarNav,
  outside: styles.calendarOutsideDay,
  root: styles.calendarDayPicker,
  today: styles.calendarToday,
  weekday: styles.calendarWeekday,
};

const dayPickerModifiersClassNames: ModifiersClassNames = {
  doneFollowUp: styles.calendarDoneFollowUpDay,
  followUp: styles.calendarFollowUpDay,
  selectedFollowUp: styles.calendarSelectedFollowUpDay,
};

const mapDueDateToDate = (dueDate: string): Date | null => {
  const date = new Date(dueDate);

  return Number.isNaN(date.getTime()) ? null : date;
};

const getFollowUpsForDate = (
  followUps: FollowUpTask[],
  date: Date,
): FollowUpTask[] =>
  followUps.filter((followUp) => {
    const dueDate = mapDueDateToDate(followUp.dueDate);

    return dueDate ? isSameDay(dueDate, date) : false;
  });

const getFollowUpModifierDates = (followUps: FollowUpTask[]) => {
  const followUpDates: Date[] = [];
  const doneFollowUpDates: Date[] = [];

  followUps.forEach((followUp) => {
    const dueDate = mapDueDateToDate(followUp.dueDate);

    if (!dueDate) {
      return;
    }

    const followUpsForDay = getFollowUpsForDate(followUps, dueDate);
    const isDoneOnlyDay = followUpsForDay.every(
      (followUpForDay) => followUpForDay.status === 'done',
    );

    if (isDoneOnlyDay) {
      doneFollowUpDates.push(dueDate);
    } else {
      followUpDates.push(dueDate);
    }
  });

  return {
    doneFollowUpDates,
    followUpDates,
  };
};

type SidebarSelectedFollowUpsProps = {
  followUps: FollowUpTask[];
  selectedDate: Date;
};

const SidebarSelectedFollowUps = ({
  followUps,
  selectedDate,
}: SidebarSelectedFollowUpsProps) => (
  <div className={styles.calendarDetails}>
    <p className={styles.calendarDetailsTitle}>
      {format(selectedDate, 'MMM d')} follow-ups
    </p>

    <ul className={styles.calendarDetailsList}>
      {followUps.map((followUp) => {
        const dueDate = mapDueDateToDate(followUp.dueDate);

        return (
          <li className={styles.calendarDetailsItem} key={followUp.id}>
            <div className={styles.calendarDetailsItemHeader}>
              <span className={styles.calendarDetailsBusiness}>
                {followUp.business.name}
              </span>
              <span
                className={
                  followUp.status === 'done'
                    ? styles.calendarStatusDone
                    : styles.calendarStatusPending
                }
              >
                {followUp.status}
              </span>
            </div>

            <p className={styles.calendarDetailsMeta}>
              {dueDate ? format(dueDate, 'HH:mm') : 'No time'}
              {' - '}
              {followUp.business.priority} priority
            </p>

            {followUp.note ? (
              <p className={styles.calendarDetailsNote}>{followUp.note}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  </div>
);

export const SidebarMiniCalendar = () => {
  const today = useMemo(() => new Date(), []);

  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data: followUps = [] } = useMonthlyFollowUps({
    assignedToId: getCurrentUserId(),
    month: visibleMonth,
  });

  const { doneFollowUpDates, followUpDates } = useMemo(
    () => getFollowUpModifierDates(followUps),
    [followUps],
  );
  const selectedFollowUps = useMemo(
    () => (selectedDate ? getFollowUpsForDate(followUps, selectedDate) : []),
    [followUps, selectedDate],
  );
  const selectedFollowUpDates = useMemo(
    () => (selectedDate ? [selectedDate] : []),
    [selectedDate],
  );

  const handleDayClick: DayEventHandler<MouseEvent> = (date, modifiers) => {
    if (modifiers.followUp || modifiers.doneFollowUp) {
      setSelectedDate(date);
      return;
    }

    setSelectedDate(null);
  };

  return (
    <section className={styles.calendarCard} aria-label="Mini calendar">
      <DayPicker
        classNames={dayPickerClassNames}
        fixedWeeks
        modifiers={{
          doneFollowUp: doneFollowUpDates,
          followUp: followUpDates,
          selectedFollowUp: selectedFollowUpDates,
        }}
        modifiersClassNames={dayPickerModifiersClassNames}
        month={visibleMonth}
        navLayout="after"
        onDayClick={handleDayClick}
        onMonthChange={(month) => {
          setVisibleMonth(month);
          setSelectedDate(null);
        }}
        weekStartsOn={1}
        today={today}
      />

      {selectedDate && selectedFollowUps.length > 0 ? (
        <SidebarSelectedFollowUps
          followUps={selectedFollowUps}
          selectedDate={selectedDate}
        />
      ) : null}
    </section>
  );
};
