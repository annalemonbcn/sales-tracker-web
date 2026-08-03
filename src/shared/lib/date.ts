// src/shared/lib/date.ts

import { format, isValid, parseISO } from 'date-fns';

const parseNullableDate = (date: string | null): Date | null => {
  if (!date) {
    return null;
  }

  const parsedDate = parseISO(date);

  return isValid(parsedDate) ? parsedDate : null;
};

export const formatNullableDate = (date: string | null): string => {
  const parsedDate = parseNullableDate(date);

  if (!parsedDate) {
    return '—';
  }

  return format(parsedDate, 'dd MMM yyyy');
};

export const formatNullableDateTime = (date: string | null): string => {
  const parsedDate = parseNullableDate(date);

  if (!parsedDate) {
    return '—';
  }

  return format(parsedDate, 'dd MMM yyyy, HH:mm');
};

const ISO_DATE_PATTERN =
  /\b\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?\b/g;

export const formatDatesInText = (text: string): string =>
  text.replace(ISO_DATE_PATTERN, (date) => {
    const parsedDate = parseNullableDate(date);

    if (!parsedDate) {
      return date;
    }

    return format(
      parsedDate,
      date.includes('T') ? 'dd MMM yyyy, HH:mm' : 'dd MMM yyyy',
    );
  });
