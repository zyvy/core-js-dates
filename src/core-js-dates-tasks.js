/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  const mydate = Date.parse(date);
  return mydate.valueOf();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  return date.toLocaleTimeString();
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfWeek = new Date(date).getDay();
  return dayNames[dayOfWeek];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const dayOfWeek = date.getDay();
  const daysUntilNextFriday = dayOfWeek === 5 ? 7 : (5 - dayOfWeek + 7) % 7;
  const nextFriday = new Date(date);
  nextFriday.setDate(date.getDate() + daysUntilNextFriday);
  return nextFriday;
}
/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const tempDay = new Date(year, month, 1);
  tempDay.setDate(tempDay.getDate() - 1);
  return tempDay.getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const gap = new Date(dateEnd).valueOf() - new Date(dateStart).valueOf();
  return gap / (1000 * 60 * 60 * 24) + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const start = new Date(period.start);
  const end = new Date(period.end);
  const cur = new Date(date);
  return cur.valueOf() <= end.valueOf() && cur.valueOf() >= start.valueOf();
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const newDay = new Date(date);
  return `${newDay.getUTCMonth() + 1}/${newDay.getUTCDate()}/${newDay.getUTCFullYear()}, ${newDay.toLocaleTimeString('en-US', { timeZone: 'UTC' })}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const start = new Date(`${year}-${month}-1`);
  const end = new Date(`${year}-${month}-1`);
  end.setMonth(end.getMonth() + 1);
  let weekends = 0;
  while (start.getTime() < end.getTime()) {
    if (start.getDay() === 0 || start.getDay() === 6) {
      weekends += 1;
    }
    start.setDate(start.getDate() + 1);
  }
  return weekends;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const mydate = new Date(date);
  const myDateMonday = new Date(date);
  const myDateDelta = mydate.getDay() < 1 ? -6 : 1 - mydate.getDay();
  myDateMonday.setDate(mydate.getDate() + myDateDelta);
  const janFirstMonday = new Date(mydate.getFullYear(), 0, 1);
  const janFirstDelta =
    janFirstMonday.getDay() < 1 ? -6 : 1 - janFirstMonday.getDay();
  janFirstMonday.setDate(janFirstMonday.getDate() + janFirstDelta);
  const currentWeek =
    (myDateMonday.valueOf() - janFirstMonday.valueOf()) /
    (1000 * 60 * 60 * 24 * 7);

  return currentWeek + 1;
}
// onsole.log(getWeekNumberByDate(new Date(2019, 5, 23)))
/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const curDate = new Date(date);
  while (curDate.getTime()) {
    if (curDate.getDate() <= 13) {
      curDate.setDate(13);
    } else {
      curDate.setMonth(curDate.getMonth() + 1);
      curDate.setDate(13);
    }
    if (curDate.getDay() === 5) {
      return curDate;
    }
    curDate.setMonth(curDate.getMonth() + 1);
  }
  return curDate;
}
// onsole.log(getNextFridayThe13th(new Date(2024, 0, 13)))

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const curDate = new Date(date);
  const aprFirst = new Date(curDate.getFullYear(), 3, 1);
  const julFirst = new Date(curDate.getFullYear(), 6, 1);
  const octFirst = new Date(curDate.getFullYear(), 9, 1);

  switch (curDate.getTime()) {
    case curDate.valueOf() < aprFirst.valueOf():
      return 1;
    case curDate.valueOf() < julFirst.valueOf():
      return 2;
    case curDate.valueOf() < octFirst.valueOf():
      return 3;
    default:
      return 4;
  }
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const workArr = [];
  const startArr = period.start.split('-');
  const start = new Date(`${startArr[2]}-${startArr[1]}-${startArr[0]}`);
  const endArr = period.end.split('-');
  const end = new Date(`${endArr[2]}-${endArr[1]}-${endArr[0]}`);
  while (start.getFullYear()) {
    const formattedDate = `${String(start.getDate()).padStart(2, '0')}-${String(start.getMonth() + 1).padStart(2, '0')}-${start.getFullYear()}`;
    workArr.push(formattedDate);
    start.setDate(start.getDate() + countWorkDays + countOffDays);
    if (start.getTime() > end.getTime()) {
      break;
    }
  }
  return workArr;
}
// onsole.log(getWorkSchedule({ start: '01-01-2024', end: '15-01-2024' }, 1, 3));

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const mydate = new Date(date);
  const myyear = mydate.getFullYear();
  if (myyear % 4 === 0) {
    if (myyear % 100 > 0) {
      return true;
    }
    if (myyear % 400 === 0) {
      return true;
    }
  }
  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
