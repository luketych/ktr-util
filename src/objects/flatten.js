/**
 * Processes the final flattened object to handle key formatting
 * @param {Object} resultObject - The flattened object to process
 * @param {number} numLevelsToFlatten - The original flatten depth setting
 * @returns {Object} Processed object with formatted keys
 */
function processKeys(resultObject, numLevelsToFlatten, separator="__") {
  if (numLevelsToFlatten === 0) {
    return resultObject;
  }

  // Replace dots with separator for final output
  const entries = Object.entries(resultObject).map(([key, value]) => {
    const newKey = key.split(".").join(separator);

    // if newKey contains dots, replace with escaped dots
    if (newKey.includes(".")) {
      const escapedKey = newKey.replace(/\./g, "\\.");
      return [escapedKey, value]
    }

    return [newKey, value];
  });

  return Object.fromEntries(entries);
}

/**
 * Recursively flattens a nested object by combining nested keys with a separator.
 *
 * @param {Object} obj - The input object to be flattened
 * @param {string} [parentKey=''] - Internal use. The current parent key during recursion
 * @param {number} [currentLevel=0] - Internal use. The current recursion depth level, starts at 0.
 * @param {number} numLevelsToFlatten - Required. Number of levels deep to flatten
 * @returns {Object} A new flattened object with combined key names
 * @throws {Error} If numLevelsToFlatten option is not provided
 * @example
 * flatten({a: {b: {c: 1}}}, {numLevelsToFlatten: 2}) 
 * // Returns {a_b_c: 1}
 */
export default function flatten(obj,
  { parentKey = '', currentLevel = 0, numLevelsToFlatten = 1, keepParentKey = false, separator = "__" } = {}
) {
  const resultObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (currentLevel < numLevelsToFlatten && typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(resultObject, flatten(obj[key], {
          currentLevel: currentLevel + 1,
          parentKey: newKey,
          numLevelsToFlatten,
          keepParentKey
        }));
      } else {
        resultObject[newKey] = obj[key];
      }
    }
  }

  // Only process keys at the top level of recursion
  return currentLevel >= 1 ? resultObject : processKeys(resultObject, numLevelsToFlatten, separator);
}