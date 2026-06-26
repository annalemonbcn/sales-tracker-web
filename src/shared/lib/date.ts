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
