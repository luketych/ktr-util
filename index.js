import { omit } from 'lodash-es'

export { dateDiffInSeconds, datePlusMS, dateMinusMS, 
         dateToDatetimeStr, getCurrentTime } from './date.js'

export { getPkgDirname } from './dirname.js'

export { importEnvironmentVariables } from './env.js'
export { sendMail } from './mail.js'

export { getInBetweenMarketOpenDates, getMarketStateObject, 
         getPreviousMarketOpenDT, getTimeslot,
         isMarketClosed, isMarketOpen, isMarketOpenToday  } from './marketState.js'

export { nyToUTC, utcToNY } from './timezone.js'

export { changePropNames, filterForProps, filterOutProps }


/**
 *  @param {Object} obj
 *  @param {Object} propChngsObj
 *  @returns {Object} newObj
 */
function changePropNames(obj, propChngsObj) {
    let newObj = obj

    for (const [from, to] of Object.entries(propChngsObj)) {
        newObj[to] = newObj[from]
        delete newObj[from]
    }

    return newObj
}


/** Returns new object with only the specificied properties.
 *  @param {Object}   objectToFilter
 *  @param {String[]} allowProps
 *  @returns {Object}
 */
function filterForProps(objectToFilter, allowProps) {          
    const filteredObj = Object.keys(objectToFilter)
      .filter(key => allowProps.includes(key))
      .reduce((obj, key) => {
        obj[key] = objectToFilter[key]
        return obj
    }, {})
    
    return filteredObj
}


/** Returns new object without the specified properties.
 *  @param {Object}   objectToFilter
 *  @param {String[]} removeProps
 *  @returns {Object}   
 */
function filterOutProps(objectToFilter, removeProps) {          
    return lodash.omit(objectToFilter, removeProps)
}
