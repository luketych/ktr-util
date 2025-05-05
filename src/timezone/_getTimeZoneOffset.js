// https://stackoverflow.com/questions/29265389/how-do-i-calculate-the-difference-of-2-time-zones-in-javascript

/**
 * Calculate the time zone offset between a given time zone and UTC.
 * Positive offset = behind UTC (e.g., New York = -300), Negative = ahead (e.g., Tokyo = +540)
 *
 * @param {Date} date - A Date object in UTC
 * @param {string} timeZone - An IANA time zone string (e.g., 'America/New_York')
 * @returns {number} Offset in minutes from UTC
 */
export default function _getTimeZoneOffset(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).formatToParts(date);

  const getPart = (type) => parts.find(p => p.type === type)?.value;

  const isoStr = `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}:${getPart('second')}`;

  const localDateInTz = new Date(isoStr);
  const offsetMinutes = Math.round((localDateInTz - date) / (60 * 1000));
  return -offsetMinutes; // Match Date.prototype.getTimezoneOffset (West of UTC = positive)
}



/** OLD CODE:

✅ Summary of Fixes
	•	Use toLocaleString('en-CA') only and strictly parse the expected format (YYYY-MM-DD, HH:MM:SS) or fallback cleanly.
	•	Avoid parsing strings manually where possible — instead, use Intl.DateTimeFormat with formatToParts().
	•	Don’t pretend a local time is UTC. Use the difference directly between:
  `new Date(date.toLocaleString('en-US', { timeZone }))`
    and the original Date.


  export default function _getTimeZoneOffset(date, timeZone) {
    // Abuse the Intl API to get a local ISO 8601 string for a given time zone.
    let iso = date.toLocaleString('en-CA', { timeZone, hour12: false })

    // if the hour is 24 change it to 00
    iso = iso.replace(' 24:', ' 00:')

    const year = iso.split('/').pop().split(', ')[0]
    let month = iso.split('/')[0]
    if (month.length === 1) month = '0' + month
    let day = iso.split('/')[1]
    if (day.length === 1) day = '0' + day
    const time = iso.split(', ').pop()

    iso = ${year}-${month}-${day}T${time}
    

    // Include the milliseconds from the original timestamp
    // iso += '.' + date.getMilliseconds().toString().padStart(3, '0')

    // iso += 'Z'
    
    // Lie to the Date object constructor that it's a UTC time.
    const lie = new Date(iso)

    // Return the difference in timestamps, as minutes
    // Positive values are West of GMT, opposite of ISO 8601
    // this matches the output of Date.getTimeZoneOffset
    let ret = -(lie - date) / 60 / 1000
    ret = Math.round(ret)
    return ret
  }

 */