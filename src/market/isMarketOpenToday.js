import Holidays from 'date-holidays';

/**
 * List of stock market holidays.
 * @type {string[]}
 */
const stockMarketHolidayNames = [
  "Martin Luther King Jr. Day",
  "Washington's Birthday",
  "Good Friday",
  "Memorial Day",
  "Juneteenth",
  "Independence Day",
  "Labor Day",
  "Thanksgiving Day",
  "Christmas Day",
];

/**
 * U.S. holiday provider
 * @type {import('date-holidays')}
 */
const hdays = new Holidays('US');

/**
 * Determine if the market is open on a given date.
 * @param {string} [dtISO] - Optional ISO date string. Defaults to today.
 * @returns {boolean}
 */
export default function isMarketOpenToday(dtISO = new Date().toISOString()) {
  dtISO = new Date(dtISO).toISOString(); // normalize

  const [year] = dtISO.split('T');
  const dayOfWeek = new Date(dtISO).getUTCDay();

  // Weekends
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;

  const holidays = hdays.getHolidays(year).filter(h =>
    stockMarketHolidayNames.includes(h.name)
  );

  const targetDate = dtISO.split('T')[0] + ' 00:00:00';

  return !holidays.some(h => h.date === targetDate);
}