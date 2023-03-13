import moment, { Moment } from 'moment';

/**
 * Return list days between 2 date.
 */
function daysFromTo(a: Moment | Date, b: Moment | Date) {
  const days = [];

  // convert moment to time. moment().getTime()
  let localFrom = +a;
  const localTo = +b;

  for (
    ;
    localFrom <= localTo;
    localFrom = moment(localFrom).add(1, 'day').toDate().getTime()
  ) {
    days.push(moment(localFrom));
  }

  return days;
}

/**
 * Return list days in month
 */
function daysInMonth(_date: string | Date | Moment | number) {
  const date = moment(_date).toDate();

  const year = date.getFullYear();

  const month = date.getMonth();

  const days = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1, 0, 0, 0);

  const lastDay = new Date(year, month, days, 0, 0, 0);

  return daysFromTo(firstDay, lastDay);
}

/**
 * Get list days by month. Maybe has pre month, next month.
 */
export function getDaysByMonth(
  mDate: string | Date | Moment | number,
  firstDayOfWeek: number,
  showSixWeeks?: boolean,
) {
  const days = daysInMonth(mDate);

  let before: Moment[] = [];
  let after: Moment[] = [];
  // calculate first day of week(ex: firstDayOfWeek > 7)
  const fdow = (7 + firstDayOfWeek) % 7 || 7;

  // calculate last day of week by first day of week
  const ldow = (fdow + 6) % 7;

  const from = moment(days[0]);

  const daysBefore = from.day();

  if (from.day() !== fdow) {
    // subtract if current date not equals first day of week
    from.add(-(from.day() + 7 - fdow) % 7, 'day');
  }

  const to = moment(days[days.length - 1]);

  const day = to.day();

  if (day !== ldow) {
    // add if lasted date not equals last day of week
    to.add((ldow + 7 - day) % 7, 'day');
  }

  const daysForSixWeeks = (daysBefore + days.length) / 6 >= 6;

  // check size days pluss days before divide 6 enough or not 6 weeks
  if (showSixWeeks && !daysForSixWeeks) {
    to.add(7, 'day');
  }

  if (from.isBefore(moment(days[0]), 'days')) {
    before = daysFromTo(from, days[0]);
  }

  // eslint-disable-next-line no-constant-condition
  if ((to.isAfter(days[days.length - 1]), 'days')) {
    after = daysFromTo(days[days.length - 1], to);
  }

  return before.concat(
    days.slice(before.length > 0 ? 1 : 0, days.length - 1),
    after,
  );
}

/**
 * Get time ago like facebook. (ex: a day ago).
 */
export function getTimeDifference(date: Date | string): {
  count: number | null;
  tx: string;
} {
  const timeDifference = moment().diff(moment.utc(date).local(), 'seconds');

  const yearTime = 60 * 60 * 24 * 365;

  const monthTime = 60 * 60 * 24 * 30;

  const dayTime = 60 * 60 * 24;

  const hourTime = 60 * 60;

  const minutesTime = 60;

  const yearCalculator = Math.floor(timeDifference / yearTime);

  const monthCalculator = Math.floor(timeDifference / monthTime);

  const dayCalculator = Math.floor(timeDifference / dayTime);

  const hourCalculator = Math.floor(timeDifference / hourTime);

  const minutesCalculator = Math.floor(timeDifference / minutesTime);

  switch (true) {
    case yearCalculator > 1:
      return { count: yearCalculator, tx: 'txYearsAgo' };
    case yearCalculator > 0:
      return { count: yearCalculator, tx: 'txYearAgo' };

    case monthCalculator > 1:
      return { count: monthCalculator, tx: 'txMonthsAgo' };
    case monthCalculator > 0:
      return { count: monthCalculator, tx: 'txMonthAgo' };

    case dayCalculator > 1:
      return { count: dayCalculator, tx: 'txDaysAgo' };
    case dayCalculator > 0:
      return { count: dayCalculator, tx: 'txDayAgo' };

    case hourCalculator > 1:
      return { count: hourCalculator, tx: 'txHoursAgo' };
    case hourCalculator > 0:
      return { count: hourCalculator, tx: 'txHourAgo' };

    case minutesCalculator > 1:
      return { count: minutesCalculator, tx: 'txMinutesAgo' };
    case minutesCalculator > 0:
      return { count: minutesCalculator, tx: 'txMinuteAgo' };

    case timeDifference > 1:
      return { count: timeDifference, tx: 'txSecondsAgo' };

    default:
      return { count: null, tx: 'txFewSecondsAgo' };
  }
}

export const dayBetweenRange = ({
  endDate,
  startDate,
  format = 'DD/MM/YYYY',
}: {
  startDate?: string;
  endDate?: string;
  format?: string;
}) => {
  const mStartDate = moment(startDate, format);

  const mEndDate = moment(endDate, format);

  return mEndDate.diff(mStartDate, 'days') + 1;
};
