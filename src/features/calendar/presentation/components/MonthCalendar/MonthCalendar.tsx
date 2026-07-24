import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getYear,
  setMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Day,
  DayButton,
  DayPicker,
  type ClassNames,
  type DayButtonProps,
  type DayProps,
} from 'react-day-picker';

import { useFollowUps } from '@/features/follow-ups/application/useFollowUps';
import type { FollowUpFilters } from '@/features/follow-ups/domain/followUpFilters.model';
import type {
  FollowUpTask,
  FollowUpTaskType,
} from '@/features/follow-ups/domain/followUpTask.model';
import { FollowUpDetailsDrawer } from '@/features/follow-ups/presentation/components/FollowUpDetailsDrawer';
import { cn } from '@/shared/lib/cn';
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

const followUpTypeClassNameMap: Record<FollowUpTaskType, string> = {
  call: styles.call,
  dossier: styles.dossier,
  email: styles.email,
  instagram_message: styles.instagramMessage,
  meeting: styles.meeting,
  other: styles.other,
  proposal: styles.proposal,
  visit: styles.visit,
};

const getDateKey = (date: Date) => format(date, 'yyyy-MM-dd');

const groupFollowUpsByDate = (
  followUps: FollowUpTask[],
): Map<string, FollowUpTask[]> => {
  const groupedFollowUps = new Map<string, FollowUpTask[]>();

  followUps.forEach((followUp) => {
    const dueDate = new Date(followUp.dueDate);

    if (Number.isNaN(dueDate.getTime())) {
      return;
    }

    const dateKey = getDateKey(dueDate);
    const dateFollowUps = groupedFollowUps.get(dateKey) ?? [];
    dateFollowUps.push(followUp);
    groupedFollowUps.set(dateKey, dateFollowUps);
  });

  groupedFollowUps.forEach((dateFollowUps) => {
    dateFollowUps.sort(
      (firstFollowUp, secondFollowUp) =>
        new Date(firstFollowUp.dueDate).getTime() -
        new Date(secondFollowUp.dueDate).getTime(),
    );
  });

  return groupedFollowUps;
};

type CalendarDayButtonProps = DayButtonProps & {
  followUps: FollowUpTask[];
  onFollowUpClick: (
    followUp: FollowUpTask,
    event: ReactMouseEvent<HTMLSpanElement>,
  ) => void;
  onMoreClick: (event: ReactMouseEvent<HTMLSpanElement>) => void;
};

const CalendarDayButton = ({
  children,
  followUps,
  onFollowUpClick,
  onMoreClick,
  ...props
}: CalendarDayButtonProps) => {
  const visibleFollowUps =
    followUps.length > 2 ? followUps.slice(0, 1) : followUps;
  const hiddenFollowUpsCount = followUps.length - visibleFollowUps.length;

  return (
    <DayButton {...props}>
      <span className={styles.dayNumber}>{children}</span>

      {visibleFollowUps.length > 0 ? (
        <span className={styles.followUps}>
          {visibleFollowUps.map((followUp) => (
            <span
              className={cn(
                styles.followUp,
                followUpTypeClassNameMap[followUp.type],
              )}
              key={followUp.id}
              onClick={(event) => {
                onFollowUpClick(followUp, event);
              }}
            >
              <span className={styles.followUpTitle}>
                {format(new Date(followUp.dueDate), 'HH:mm')} {followUp.title}
              </span>
              <span className={styles.followUpBusiness}>
                {followUp.business.name}
              </span>
            </span>
          ))}

          {hiddenFollowUpsCount > 0 ? (
            <span className={styles.moreFollowUps} onClick={onMoreClick}>
              +{hiddenFollowUpsCount} more
            </span>
          ) : null}
        </span>
      ) : null}
    </DayButton>
  );
};

type CalendarDayCellProps = DayProps & {
  followUps: FollowUpTask[];
  isPopoverOpen: boolean;
  onFollowUpClick: (followUp: FollowUpTask) => void;
  onPopoverClose: () => void;
};

const CalendarDayCell = ({
  children,
  followUps,
  isPopoverOpen,
  onFollowUpClick,
  onPopoverClose,
  ...props
}: CalendarDayCellProps) => (
  <Day {...props}>
    {children}

    {isPopoverOpen ? (
      <div
        className={styles.followUpsPopover}
        role="dialog"
        aria-label={`${format(props.day.date, 'MMMM d')} follow-ups`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={styles.popoverHeader}>
          <strong>{format(props.day.date, 'MMM d')} follow-ups</strong>
          <button
            aria-label="Close follow-ups"
            type="button"
            onClick={onPopoverClose}
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.popoverList}>
          {followUps.map((followUp) => (
            <div
              className={cn(
                styles.popoverFollowUp,
                followUpTypeClassNameMap[followUp.type],
              )}
              key={followUp.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                onFollowUpClick(followUp);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onFollowUpClick(followUp);
                }
              }}
            >
              <strong>
                {format(new Date(followUp.dueDate), 'HH:mm')} {followUp.title}
              </strong>
              <span>{followUp.business.name}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null}
  </Day>
);

type MonthCalendarProps = {
  filters: FollowUpFilters;
};

export const MonthCalendar = ({ filters }: MonthCalendarProps) => {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [openPopoverDate, setOpenPopoverDate] = useState<string | null>(null);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUpTask | null>(
    null,
  );
  const apiFilters = useMemo(
    () => ({
      ...filters,
      dueAfter: startOfWeek(startOfMonth(visibleMonth), {
        weekStartsOn: 1,
      }).toISOString(),
      dueBefore: endOfWeek(endOfMonth(visibleMonth), {
        weekStartsOn: 1,
      }).toISOString(),
    }),
    [filters, visibleMonth],
  );
  const { data: followUps = [] } = useFollowUps(apiFilters);
  const followUpsByDate = useMemo(
    () => groupFollowUpsByDate(followUps),
    [followUps],
  );

  const renderDayButton = (props: DayButtonProps) => (
    <CalendarDayButton
      {...props}
      followUps={followUpsByDate.get(getDateKey(props.day.date)) ?? []}
      onFollowUpClick={(followUp, event) => {
        event.stopPropagation();
        setSelectedFollowUp(followUp);
        setOpenPopoverDate(null);
      }}
      onMoreClick={(event) => {
        event.stopPropagation();
        setOpenPopoverDate(getDateKey(props.day.date));
      }}
    />
  );
  const renderDay = (props: DayProps) => {
    const dateKey = getDateKey(props.day.date);

    return (
      <CalendarDayCell
        {...props}
        followUps={followUpsByDate.get(dateKey) ?? []}
        isPopoverOpen={openPopoverDate === dateKey}
        onFollowUpClick={(followUp) => {
          setSelectedFollowUp(followUp);
          setOpenPopoverDate(null);
        }}
        onPopoverClose={() => {
          setOpenPopoverDate(null);
        }}
      />
    );
  };

  useEffect(() => {
    if (!openPopoverDate) {
      return;
    }

    const closePopover = () => {
      setOpenPopoverDate(null);
    };
    const closePopoverOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    };

    document.addEventListener('click', closePopover);
    document.addEventListener('keydown', closePopoverOnEscape);

    return () => {
      document.removeEventListener('click', closePopover);
      document.removeEventListener('keydown', closePopoverOnEscape);
    };
  }, [openPopoverDate]);

  const showToday = () => {
    setVisibleMonth(startOfMonth(today));
  };

  return (
    <>
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
          components={{ Day: renderDay, DayButton: renderDayButton }}
          hideNavigation
          mode="single"
          month={visibleMonth}
          onDayClick={(day, modifiers) => {
            if (modifiers.outside) {
              setVisibleMonth(startOfMonth(day));
              setOpenPopoverDate(null);
            }
          }}
          onMonthChange={setVisibleMonth}
          onSelect={() => undefined}
          selected={undefined}
          showOutsideDays
          today={today}
          weekStartsOn={1}
        />
      </section>

      {selectedFollowUp ? (
        <FollowUpDetailsDrawer
          followUp={selectedFollowUp}
          onClose={() => {
            setSelectedFollowUp(null);
          }}
        />
      ) : null}
    </>
  );
};
