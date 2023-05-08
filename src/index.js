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



export { dateDiffInSeconds, datePlusMS, dateMinusMS, 
         dateToDatetimeStr, getCurrentTime }


// fs
export { checkPathExists, createDirsAndFiles, deleteDirsAndFiles, 
         getAbsPathOfDirName, getDirname, getFilename, getFilenameWithoutExt, 
         isPath, walkAndFindAll, walkAndFindOne }


// mail
export { sendMail }


// market
export { getInBetweenMarketOpenDates, getMarketStateObject, 
         getPreviousMarketOpenDT, getTimeslot,
         isMarketClosed, isMarketOpen, isMarketOpenToday }


// pkgJSON
export { getFullPackageName, getPackageName, getScopeName, getPackageJSONasObj }


// props
export { changePropNames, filterForProps, filterOutProps }


// test
export { getTestDir }


// timezone
export { nyToUTC, utcToNY }