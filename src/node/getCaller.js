function _getCaller() {
  const stack = new Error().stack;

  if (!stack) return 'unknown';

  const lines = stack.split('\n');

  // Try to get the 3rd or 4th line depending on engine (Node/V8 vs browser)
  const callerLine = lines[3] || lines[2] || 'unknown';

  return callerLine;
}

export default function getCaller() {
  const callerStr = _getCaller();

  // Extract function name
  let callerFunction = 'unknown';
  const funcMatch = callerStr.match(/at (.*?) \(/);
  if (funcMatch) {
    callerFunction = funcMatch[1].trim();
  }

  // Extract file path and position
  let callerFilePath = 'unknown';
  const pathMatch = callerStr.match(/\((.*):(\d+):(\d+)\)/);
  if (pathMatch) {
    const [, filePath, lineNum, colNum] = pathMatch;
    callerFilePath = `${filePath}:${lineNum}:${colNum}`;
  }

  return {
    callerFunction,
    callerFilePath,
  };
}