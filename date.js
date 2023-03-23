export { dateDiffInSeconds, datePlusMS, dateMinusMS, dateToDatetimeStr, getCurrentTime }


/** Returns the difference between two dates in seconds.
 *  @param {Date} d1
 *  @param {Date} d2
 *  @returns {number} seconds between date 1 & date 2 (d2-d1)
 *  https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
 */
function dateDiffInSeconds(d1, d2) {
    // const t1 = moment.utc(d1).unix()
    // const t2 = moment.utc(d2).unix()
    const t1 = d1.getTime()
    const t2 = d2.getTime()

    const secs = Math.floor((t2 - t1) / 1000)

    
    return secs
}


/**
 *  @param {Date}   date
 *  @param {number} numMS
 *  @returns {Date} 
 */
function datePlusMS(date, numMS) {
    return new Date(date.getTime() + numMS)
}


/**
 *  @param {Date}   date
 *  @param {number} numMS
 *  @returns {Date}
 */
function dateMinusMS(date, numMS) {
    return new Date(date.getTime() - numMS)
}


// @datetime, @timezone
// format  datetime to a string in the format of YYYY-MM-DD HH:mm:ss
function dateToDatetimeStr(dt, timezone='utc') {
    let fullDatetimeStr

    if (timezone && timezone.toLowerCase() === 'local') { // old way
        let year = '' + dt.getFullYear(),
            month = dt.getMonth() + 1
            month = month < 10 ? '0' + month : '' + month
        let day = dt.getDate()
            day = day < 10 ? '0' + day : '' + day
        let hours = dt.getHours()
            hours = hours < 10 ? '0' + hours : '' + hours
        let mins = dt.getMinutes()
            mins = mins < 10 ? '0' + mins : '' + mins
        let secs = dt.getSeconds()
            secs = secs < 10 ? '0' + secs : '' + secs

        fullDatetimeStr = `${year}-${month}-${day} ${hours}:${mins}:${secs}`
    } else 
    if (timezone && timezone.toLowerCase() === 'utc') { // new way
        let utcMonth = dt.getUTCMonth()
        let utcDate = dt.getUTCDate()

        let fullMonth = utcMonth.toString().length === 1 ? `0${utcMonth}` : utcMonth
        let fullDate = utcDate.toString().length === 1 ? `0${utcDate}` : utcDate
        
        let utcHours = dt.getUTCHours()
        let utcMins = dt.getUTCMinutes()
        let utcSecs = dt.getUTCSeconds()

        let fullHours = utcHours.toString().length === 1 ? `0${utcHours}` : utcHours
        let fullMins = utcMins.toString().length === 1 ? `0${utcMins}` : utcMins
        let fullSecs = utcSecs.toString().length === 1 ? `0${utcSecs}` : utcSecs

        fullDatetimeStr = `${dt.getUTCFullYear()}-${fullMonth}-${fullDate} ${fullHours}:${fullMins}:${fullSecs}`
    }

    return fullDatetimeStr
}


/**
 *  @returns {string}
 */
function getCurrentTime() {
    let today = new Date()
    return today.toISOString().split('T')[1].split('.')[0]
}