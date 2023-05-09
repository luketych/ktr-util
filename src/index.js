import { omit } from 'lodash-es'

// @test

import changePropNames from './props/changePropNames.js'
import checkPathExists from './fs/checkPathExists.js'
import createDirsAndFiles from './fs/createDirsAndFiles.js'
import dateDiffInSeconds from './date/dateDiffInSeconds.js'
import dateMinusMS from './date/dateMinusMS.js'
import datePlusMS from './date/datePlusMS.js'
import dateToDatetimeStr from './date/dateToDatetimeStr.js'
import deleteDirsAndFiles from './fs/deleteDirsAndFiles.js'
import filterForProps from './props/filterForProps.js'
import filterOutProps from './props/filterOutProps.js'
import getAbsPathOfDirName from './fs/getAbsPathOfDirName.js'
import getCaller from './node/getCaller.js'
import getCurrentTime from './date/getCurrentTime.js'
import getDirname from './fs/getDirname.js'
import getFilename from './fs/getFilename.js'
import getFilenameWithoutExt from './fs/getFilenameWithoutExt.js'
import getFullPackageName from './pkgJSON/getFullPackageName.js'
import getInBetweenMarketOpenDates from './market/getInBetweenMarketOpenDates.js'
import getMarketStateObject from './market/getMarketStateObject.js'
import getPreviousMarketOpenDT from './market/getPreviousMarketOpenDT.js'
import getPackageName from './pkgJSON/getPackageName.js'
import getScopeName from './pkgJSON/getScopeName.js'
import getTestDir from './test/getTestDir.js'
import getTimeslot from './market/getTimeslot.js'
import isMarketClosed from './market/isMarketClosed.js'
import isMarketOpen from './market/isMarketOpen.js'
import isMarketOpenToday from './market/isMarketOpenToday.js'
import isPath from './fs/isPath.js'
import getPackageJSONasObj from './pkgJSON/getPackageJSONasObj.js'
import nyToUTC from './timezone/nyToUTC.js'
import sendMail from './mail/sendMail.js'
import utcToNY from './timezone/utcToNY.js'
import walkAndFindAll from './fs/walkAndFindAll.js'
import walkAndFindOne from './fs/walkAndFindOne.js'


export {changePropNames}
export {checkPathExists}
export {createDirsAndFiles}
export {dateDiffInSeconds}
export {dateMinusMS}
export {datePlusMS}
export {dateToDatetimeStr}
export {deleteDirsAndFiles}
export {filterForProps}
export {filterOutProps}
export {getAbsPathOfDirName}
export {getCaller}
export {getCurrentTime}
export {getDirname}
export {getFilename}
export {getFilenameWithoutExt}
export {getFullPackageName}
export {getInBetweenMarketOpenDates}
export {getMarketStateObject}
export {getPreviousMarketOpenDT}
export {getPackageName}
export {getScopeName}
export {getTestDir}
export {getTimeslot}
export {isMarketClosed}
export {isMarketOpen}
export {isMarketOpenToday}
export {isPath}
export {getPackageJSONasObj}
export {nyToUTC}
export {sendMail}
export {utcToNY}
export {walkAndFindAll}
export {walkAndFindOne}




// date
const date = { dateDiffInSeconds, datePlusMS, dateMinusMS, 
         dateToDatetimeStr, getCurrentTime }


// fs
const fs = { checkPathExists, createDirsAndFiles, deleteDirsAndFiles, 
         getAbsPathOfDirName, getDirname, getFilename, getFilenameWithoutExt, 
         isPath, walkAndFindAll, walkAndFindOne }


// mail
const mail = { sendMail }


// market
const market = { getInBetweenMarketOpenDates, getMarketStateObject, 
         getPreviousMarketOpenDT, getTimeslot,
         isMarketClosed, isMarketOpen, isMarketOpenToday }


// node
const node = { getCaller }


// pkgJSON
const pkgJSON = { getFullPackageName, getPackageName, getScopeName, getPackageJSONasObj }


// props
const props = { changePropNames, filterForProps, filterOutProps }


// test
const test = { getTestDir }


// timezone
const timezone = { nyToUTC, utcToNY }


export default { 
  date, 
  fs, 
  mail, 
  market, 
  node, 
  pkgJSON, 
  props, 
  test, 
  timezone 
}