import {
  addMonths,
  format,
  getMonth,
  getYear,
  setMonth,
  startOfMonth,
} from 'date-fns';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  DayButton,
  DayPicker,
  type ClassNames,
  type DayButtonProps,
} from 'react-day-picker';

import { Button, IconButton } from '@/shared/ui';

import styles from './MonthCalendar.module.css';

const monthOptions = Array.from({ length: 12 }, (_, month) => ({
  label: format(new Date(2024, month, 1), 'MMMM'),
  value: month,
}));

const dayPickerClassNames: Partial<ClassNames> = {
  caption_label: styles.captionLabel,
  day: styles.day,
  day_button: styles.dayButton,
  month: styles.month,
  month_caption: styles.monthCaption,
  month_grid: styles.monthGrid,
  months: styles.months,
  outside: styles.outside,
  root: styles.dayPicker,
  today: styles.today,
  week: styles.week,
  weekday: styles.weekday,
  weekdays: styles.weekdays,
  weeks: styles.weeks,
};

const CalendarDayButton = ({ children, ...props }: DayButtonProps) => (
  <DayButton {...props}>
    <span className={styles.dayNumber}>{children}</span>
  </DayButton>
);

export const MonthCalendar = () => {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));

  const showToday = () => {
    setVisibleMonth(startOfMonth(today));
  };

  return (
    <section className={styles.calendarCard} aria-label="Monthly calendar">
      <div className={styles.toolbar}>
        <div className={styles.navigation}>
          <IconButton
            label="Previous month"
            onClick={() => {
              setVisibleMonth((month) => addMonths(month, -1));
            }}
            variant="secondary"
          >
            <ChevronLeft size={18} />
          </IconButton>

          <IconButton
            label="Next month"
            onClick={() => {
              setVisibleMonth((month) => addMonths(month, 1));
            }}
            variant="secondary"
          >
            <ChevronRight size={18} />
          </IconButton>

          <Button
            className={styles.todayButton}
            size="sm"
            variant="secondary"
            onClick={showToday}
          >
            Today
          </Button>
        </div>

        <h2>{format(visibleMonth, 'MMMM yyyy')}</h2>

        <label className={styles.monthSelect}>
          <span>Month</span>
          <select
            aria-label="Select month"
            value={getMonth(visibleMonth)}
            onChange={(event) => {
              setVisibleMonth((month) =>
                startOfMonth(setMonth(month, Number(event.target.value))),
              );
            }}
          >
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label} {getYear(visibleMonth)}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" size={16} />
        </label>
      </div>

      <DayPicker
        classNames={dayPickerClassNames}
        components={{ DayButton: CalendarDayButton }}
        hideNavigation
        mode="single"
        month={visibleMonth}
        onMonthChange={setVisibleMonth}
        onSelect={() => undefined}
        selected={undefined}
        showOutsideDays
        today={today}
        weekStartsOn={1}
      />
    </section>
  );
};
