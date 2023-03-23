import { addMinutes } from 'date-fns'

export { nyToUTC, utcToNY }


/**
 * https://stackoverflow.com/questions/29265389/how-do-i-calculate-the-difference-of-2-time-zones-in-javascript
 * @param {Date} date 
 * @param {string} timeZone 
 * @returns {number} offset
 */
function _getTimeZoneOffset(date, timeZone) {
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

  iso = `${year}-${month}-${day}T${time}`
  
  // Include the milliseconds from the original timestamp
  // iso += '.' + date.getMilliseconds().toString().padStart(3, '0')


  // iso += 'Z'
  
  // Lie to the Date object constructor that it's a UTC time.
  const lie = new Date(iso)

  // Return the difference in timestamps, as minutes
  // Positive values are West of GMT, opposite of ISO 8601
  // this matches the output of `Date.getTimeZoneOffset`
  let ret = -(lie - date) / 60 / 1000
  ret = Math.round(ret)
  return ret
}


/**
 * @param {(Date|string)} dt 
 * @return {string} iso8601 string
 */
function nyToUTC(dt) {
  const localOffset = _getTimeZoneOffset(new Date(), 'America/New_York')

  if (typeof(dt) === 'string') {
    if (dt.includes('Z')) {
      throw new Error("Warning: nycToUTC() received a UTC dt string that contains 'Z'.")
    }

    const localDT = addMinutes(new Date(dt), localOffset)

    //const nydt = localDT.toLocaleString("en-US", {timeZone: "America/New_York"})

    const iso_str = localDT.toISOString()

    return iso_str
  }

  if (dt instanceof Date) {
    let newdt = addMinutes(dt, localOffset)

    return newdt.toISOString()
  }
}


/**
 * @param {(Date|string)} dt 
 * @return {string} iso8601 string
 */
function utcToNY(dt) {
  const offset =  _getTimeZoneOffset(new Date(), 'utc') - _getTimeZoneOffset(new Date(), 'America/New_York')


  if (typeof(dt) === 'string') {
    if (!dt.includes('Z')) {
      throw new Error("Warning: utcToNY() received a UTC dt string that is missing 'Z'.")
    }

    const localDT = addMinutes(new Date(dt), offset)

    const iso_str = localDT.toISOString()

    return iso_str
  }

  if (dt instanceof Date) {
    let newdt = addMinutes(dt, offset)

    return newdt.toISOString()
  }
}