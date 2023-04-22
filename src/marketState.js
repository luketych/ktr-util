import dateFns from 'date-fns'
import dateFnsTZ from 'date-fns-tz'
import Holidays from 'date-holidays'

import { getCurrentTime } from './date.js'
import { utcToNY } from './src/timezone.js'

const { addDays } = dateFns
const { formatInTimeZone: fmtInTZ } = dateFnsTZ

export { getInBetweenMarketOpenDates, getMarketStateObject, getPreviousMarketOpenDT, getTimeslot, isMarketOpen, isMarketClosed, isMarketOpenToday }


/**
 *  @type {string[]}
 */
const stockMarketHolidayNames = [
    "Martin Luther King Jr. Day", "Washington's Birthday", "Good Friday",
    "Memorial Day", "Juneteenth", "Independence Day", "Labor Day",
    "Thanksgiving Day", "Christmas Day",
]

/**
 *  @typedef {import('date-holidays').Holidays} Holidays
 *  @type    {Holidays}
 */
const hdays = new Holidays('US')




/** Given a dtfrom & dtto, return a list of ISO dt strings of the days in between where the market is open.
 * 
 * @param {string} dtfrom 
 * @param {string} dtto 
 * @returns {string[]} 
 */
function getInBetweenMarketOpenDates(dtfrom, dtto) {
    let checkDTs_ret = []

    dtto = dtto || dtfrom

    // start at 08:00:00 UTC (4:00:00 AM EST)
    const dtFrom = new Date(dtfrom)
    const dtTo = new Date(dtto)

    let dt = dtFrom
    while (dt <= dtTo) {
      if (isMarketOpenToday(dt.toISOString())) {
        checkDTs_ret.push(dt.toISOString().split('T')[0])
      }
      dt = addDays(dt, 1)
    }

    return checkDTs_ret
}


/**
 *  @param    {string}   dtISO
 *  @typedef  {object}   mktState
 *  @property {string}   state
 *  @property {string}   reason - if mkt is CLOSED: the reason for it being close
 *  @return {mktState} 
 */
function getMarketStateObject(dt = ( new Date() )) {
    const dtISO = dt.toISOString()
    const year = dtISO.split('T')[0].split('-')[0]

    const day = dt.getDay()

    if (day == 6 || day == 7) {
        return {
          state: 'CLOSED',
          reason: 'weekend'
        }
    }

    const usaHolidays = hdays.getHolidays(year)
    const holidays = stockMarketHolidayNames.map(holidayName => {
        return usaHolidays.map(holiday => holiday.name).indexOf(holidayName)
    }).filter(el => el !== -1).map(el => usaHolidays[el])


    const dt_str = dtISO.replace('T', ' ').split('.')[0]
    const dtNY_str = utcToNY(dtISO)

    let holidayDates = holidays.map(holiday => holiday.date)
    // replace H:M:S with 00:00:00
    if (holidayDates.includes(dt_str.split(' ')[0] + ' 00:00:00')) {
        return {
          state: 'CLOSED',
          reason: 'holiday'
        }
    }

    // get rid of seconds for the upcoming comparison
    const nyTime = dtNY_str.split('T')[1].split(':').slice(0,2).join(':')

    // * string comparison works here (https://stackoverflow.com/questions/19004950/how-to-compare-time-in-javascript)
    if (nyTime >= '04:00' && nyTime < '09:30') {
        return {
          state: 'CLOSED',
          reason: 'premarket'
        }
    }

    if (nyTime >= '09:30' && nyTime < '16:00') {
        return {
          state: 'OPEN',
          reason: ''
        }
    }

    if (nyTime >= '16:00' && nyTime < '20:00') {
        return {
          state: 'CLOSED',
          reason: 'afterhours'
        }
    }

    return {
      state: 'CLOSED',
      reason: ''
    }
}


/** Returns previous day where market is open. For example, if given a monday, it will return
 * the previous friday, unless a holiday. Then it will return the thursday.
 * 
 * @param {Date} dt 
 * @returns {Date} newDT
 */
function getPreviousMarketOpenDT(dt=new Date()) {

    let newDT = addDays(dt, -1)

    while (!isMarketOpenToday(newDT.toISOString())) {
      newDT = addDays(newDT, -1)
    }

    return newDT
}


/**
 * @param {string} dtISO
 * @return {string('premarket'|'regular'|'afterhours')}
 * @throws {Error} if dtISO does not fall within a timeslot.
 */
function getTimeslot(dtISO = ( new Date() ).toISOString()) {
    const time = dtISO.split('T')[1].split('Z')[0]
    const nyTime = utcToNY(dtISO).split('T')[1].split('Z')[0]
    
    const startOfDay = '04:00:00'
    const startOfOpen = '09:30:00'
    const endOfOpen = '216:00:00'
    const endOfDay = '20:00:00'

    if (nyTime >= startOfDay && nyTime <= startOfOpen) return 'premarket'
    else if (nyTime >= startOfOpen && nyTime <= endOfOpen) return 'rth'
    else if (nyTime >= endOfOpen && nyTime <= endOfDay) return 'afterhours'
    else throw new Error("Invalid time. dt does not fall within a timeslot.")
}


/**
 *  @param   {Date} dt
 *  @returns {boolean}
 */
function isMarketOpen(dt = ( new Date() ).toISOString()) {
    return !isMarketClosed(dt)
}

/**
 *  @param  {string}    dtISO
 *  @return {boolean}
 */
function isMarketClosed(dtISO = ( new Date() ).toISOString()) {
    const year = dtISO.split('T')[0].split('-')[0]
    const day = new Date(dtISO).getUTCDay()

    const dtNY_str = utcToNY(dtISO)

    if (day == 0 || day == 6) {
        return true
    }

    let usaHolidays = hdays.getHolidays(year)
    const holidays = stockMarketHolidayNames.map(holidayName => {
        return usaHolidays.map(holiday => holiday.name).indexOf(holidayName)
    }).filter(el => el !== -1).map(el => usaHolidays[el])

    // replace H:M:S with 00:00:00
    const dt_str = dtISO.split('T')[0] + ' 00:00:00'

    let holidayDates = holidays.map(holiday => holiday.date)
    if (holidayDates.includes(dt_str)) {
        return true
    }


    // get rid of seconds
    //const time = getCurrentTime().split(':').slice(0,2).join(':')
    const time = dtISO.split('T')[1].split(':').slice(0,2).join(':')
    const nyTime = dtNY_str.split('T')[1].split(':').slice(0,2).join(':')


    // * string comparison works here (https://stackoverflow.com/questions/19004950/how-to-compare-time-in-javascript)
    if (nyTime < '04:00') {
        return true
    }

    return false
}


/**
 *  @param   {string}    dtISO
 *  @returns {boolean}
 */
function isMarketOpenToday(dtISO = ( new Date()).toISOString()) {
    const year = dtISO.split('T')[0].split('-')[0]
    const day = new Date(dtISO).getUTCDay()

    if (day == 0 || day == 6) {
        return false
    }

    let usaHolidays = hdays.getHolidays(year)
    const holidays = stockMarketHolidayNames.map(holidayName => {
        return usaHolidays.map(holiday => holiday.name).indexOf(holidayName)
    }).filter(el => el !== -1).map(el => usaHolidays[el])

    // replace H:M:S with 00:00:00
    const dt_str = dtISO.split('T')[0] + ' 00:00:00'

    let holidayDates = holidays.map(holiday => holiday.date)
    if (holidayDates.includes(dt_str)) {
        return false
    }

    return true
}


getMarketStateObject()