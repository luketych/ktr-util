const DEFAULT_OPTIONS = {
  flattenDepth: Infinity, // Default to complete flattening
  keepParentKey: false, // This seems unused now, might remove later if confirmed
  separator: '__',
};

/**
 * Recursively flattens a nested object and optionally formats the keys.
 *
 * @param {Object} obj - The input object to flatten.
 * @param {Object} options
 * @param {number} [options.flattenDepth=Infinity] - Levels deep to flatten. Use Infinity for full flattening.
 * @param {string} [options.separator='__'] - Separator for combined keys.
 * @returns {Object}
 */
export default function flatten(obj, options = {}) {
  const {
    flattenDepth,
    // keepParentKey, // Removed as it's not used in the updated logic
    separator,
  } = { ...DEFAULT_OPTIONS, ...options };

  const result = {};

  function _flatten(currentObj, parentKey = '', currentLevel = 0) {
    for (const key in currentObj) {
      if (!Object.prototype.hasOwnProperty.call(currentObj, key)) continue;

      // Use the separator correctly when building the key
      const combinedKey = parentKey ? `${parentKey}${separator}${key}` : key;

      const value = currentObj[key];

      if (
        typeof value === 'object' &&
        value !== null &&
        !(value instanceof Array) && // Added check to not flatten arrays
        currentLevel < flattenDepth
      ) {
        _flatten(value, combinedKey, currentLevel + 1);
      } else {
        result[combinedKey] = value;
      }
    }
  }

  _flatten(obj);

  // Remove the final processing step as key construction is handled during recursion
  // const processed = Object.fromEntries(
  //   Object.entries(result).map(([key, value]) => {
  //     let newKey = key;
  //     if (flattenDepth !== 0) {
  //       newKey = key.replace(/\./g, separator); // This was incorrect logic
  //     }
  //     return [newKey, value];
  //   })
  // );

  return result; // Return the result directly
}