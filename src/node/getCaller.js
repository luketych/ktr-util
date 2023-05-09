function _getCaller() {
    const stack = new Error().stack;
    // Stack trace format : 
    // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    const callerLine = stack.split('\n')[3]; // "at getCaller (<anonymous>:7:15)"
    return callerLine;
}


export default function getCaller() {
  const callerStr = _getCaller()

  const callerFunction = callerStr.split(' at')[1].split('(')[0].trim()

  let callerFilePath
  const match = callerStr.match(/\((.*):(\d+):(\d+)\)/);
  if (match) {
    let filePath = match[1]; // file:///Users/luketych/Dev/_Projects/_ktr/_srt/workspace_github/@ktr-srt/project/packages-other/proxy_manager/src/getProxy.js
    let lineNum = match[2]; // 47
    let colNum = match[3]; // 20



    callerFilePath = `${filePath}:${lineNum}:${colNum}`  
  }


  return {
    callerFunction,
    callerFilePath
  }
}