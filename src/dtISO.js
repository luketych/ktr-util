import chalk from 'chalk'

const leapYears = ['1904','1908','1912','1916','1920','1924','1928','1932','1936','1940','1944','1948','1952','1956','1960','1964','1968','1972','1976','1980','1984','1988','1992','1996','2000','2004','2008','2012','2016','2020','2024','2028','2032','2036','2040']


function smooth(year, month0, month1, day0, day1, hour0, hour1, min0, min1) {
    const mo = '' + month0 + month1

    console.log('`')


    if (month0 === 1 && month1 === 3) return smooth(year+1, 0, 1, 0, 1, 0, 0, 0, 0)
    else if (month1 === 10) return smooth(year, month0+1, 0, 0, 1, 0, 0, 0, 0)

    else if ((day0 === 3 && day1 === 2) && (mo === '01' || mo === '03' || mo === '05' || mo === '07' || mo === '08' || mo === '10' || mo === '12')) return smooth(year, month0, month1+1, 0, 1, 0, 0, 0, 0)
    else if ((day0 === 3 && day1 === 1) && (mo === '04' || mo === '06' || mo === '09' || mo === '11')) return smooth(year, month0, month1+1, 0, 1, 0, 0, 0, 0)
    else if ((day0 === 3 && day1 === 0) && (mo === '02') && leapYears.includes(year)) return smooth(year, month0, month1+1, 0, 1, 0, 0, 0, 0)
    else if ((day0 === 2 && day1 === 9) && (mo === '02') && !leapYears.includes(year)) return smooth(year, month0, month1+1, 0, 1, 0, 0, 0, 0)
    else if (day1 === 10) return smooth(year, month0, month1, day0+1, 0, 0, 0, 0, 0)

    else if (hour0 === 2 && hour1 === 4) return smooth(year, month0, month1, day0, day1+1, 0, 0, 0, 0)
    else if (hour1 === 10) return smooth(year, month0, month1, day0, day1, hour0+1, 0, 0, 0)

    else if (min0 === 6) return smooth(year, month0, month1, day0, day1, hour0, hour1+1, 0, 0)
    else if (min1 === 10) return smooth(year, month0, month1, day0, day1, hour0, hour1, min0+1, 0)

    else return '' + year + '-' + month0 + month1 + '-' + day0 + day1 + 'T' + hour0 + hour1 + ':' + min0 + min1 + ':00.000Z'
}

function incrementDTISO(dtISO) {
    dtISO = dtISO.split('.')[0]

    const year = parseInt( dtISO.split('T')[0].split('-')[0] )
    const month0 = parseInt( dtISO.split('T')[0].split('-')[1][0] )
    const month1 = parseInt( dtISO.split('T')[0].split('-')[1][1] )
    const day0 = parseInt( dtISO.split('T')[0].split('-')[2][0] )
    const day1 = parseInt( dtISO.split('T')[0].split('-')[2][1] )
    const hour0 = parseInt( dtISO.split('T')[1].split(':')[0][0] )
    const hour1 = parseInt( dtISO.split('T')[1].split(':')[0][1] )
    const min0 = parseInt( dtISO.split('T')[1].split(':')[1][0] )
    const min1 = parseInt( dtISO.split('T')[1].split(':')[1][1] )

    let res = smooth(year, month0, month1, day0, day1, hour0, hour1, min0, min1+1)
    
    return res
}

function incrementDTISO(dtISO) {
    const dt = new Date(dtISO)
    dt.setMinutes(dt.getMinutes() + 1)

    return dt.toISOString()
}

let dtISO, res

// let dtISO = '2020-01-01T23:59:00.000Z'
// let res = incrementDTISO(dtISO)
// console.log(chalk.blue(dtISO))
// console.log(chalk.green(res))

// dtISO = '2020-01-01T23:50:00.000Z'
// res = incrementDTISO(dtISO)
// console.log(chalk.blue(dtISO))
// console.log(chalk.green(res))

// dtISO = '2020-01-31T23:59:00.000Z'
// res = incrementDTISO(dtISO)
// console.log(chalk.blue(dtISO))
// console.log(chalk.green(res))

// dtISO = '2020-02-28T23:59:00.000Z'
// res = incrementDTISO(dtISO)
// console.log(chalk.blue(dtISO))
// console.log(chalk.green(res))

// dtISO = '2020-02-29T23:59:00.000Z'
// res = incrementDTISO(dtISO)
// console.log(chalk.blue(dtISO))
// console.log(chalk.green(res))

// dtISO = '2021-02-28T23:59:00.000Z'
// res = incrementDTISO(dtISO)
// console.log(chalk.blue(dtISO))
// console.log(chalk.green(res))


let startDTISO = '2020-01-01T00:00:00.000Z'

// call incrementDTISO() 1000 times
for (let i = 0; i < 1; i++) {
    //startDTISO = oldIncrementDTISO(startDTISO)
    startDTISO = incrementDTISO(startDTISO)
    //console.log(chalk.blue(startDTISO))
}