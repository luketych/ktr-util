import {getDirname, getFilename} from '../index.js'


export default function setupStackTrace() {
    
    let stackTrace = []

    return {
      push: function(importMetaURL, string) {
          if (!importMetaURL) throw new Error('importMetaURL is required')

          const dirname = getDirname(importMetaURL)
          const filename = getFilename(importMetaURL)

          if (string) stackTrace.push(dirname+'/'+filename+': ' + string)
          else stackTrace.push(dirname+'/'+filename)

          if (stackTrace.length > 25) stackTrace.shift()

          return stackTrace
      },
      clear: function() {
          stackTrace = []

          return stackTrace
      },
      get: function() {
          return stackTrace
      }
    }
}