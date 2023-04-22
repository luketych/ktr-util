import { omit } from 'lodash-es'


import getProjectName from './src/pkgJSON/getProjectName.js'
import getScopeName from './src/pkgJSON/getScopeName.js'
import loadPackageJSONasObj from './src/pkgJSON/loadPackageJSONasObj.js'
import sendMail from './src/mail/sendMail.js'


export { dateDiffInSeconds, datePlusMS, dateMinusMS, 
         dateToDatetimeStr, getCurrentTime } from './date.js'

export { getPkgDirname } from './dirname.js'

export { importAllEnvironmentVariables, importEnvironmentVariables } from './env.js'

export { getDirname, getFilename, getFilenameWithoutExt } from './file.js'

export { sendMail }

export { getInBetweenMarketOpenDates, getMarketStateObject, 
         getPreviousMarketOpenDT, getTimeslot,
         isMarketClosed, isMarketOpen, isMarketOpenToday  } from './marketState.js'

export { getProjectName, getScopeName, loadPackageJSONasObj }

export { changePropNames, filterForProps, filterOutProps } from './props.js'

export { getTestDir } from './test.js'

export { nyToUTC, utcToNY } from './src/timezone.js'