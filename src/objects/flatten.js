const DEFAULT_OPTIONS = {
  flattenDepth: 1,
  keepParentKey: false,
  separator: '__',
};

/**
 * Recursively flattens a nested object and optionally formats the keys.
 *
 * @param {Object} obj - The input object to flatten.
 * @param {Object} options
 * @param {number} [options.flattenDepth=1] - Levels deep to flatten.
 * @param {boolean} [options.keepParentKey=false] - Whether to include parent key.
 * @param {string} [options.separator='__'] - Separator for combined keys.
 * @returns {Object}
 */
export default function flatten(obj, options = {}) {
  const {
    flattenDepth,
    keepParentKey,
    separator,
  } = { ...DEFAULT_OPTIONS, ...options };

  const result = {};

  function _flatten(currentObj, parentKey = '', currentLevel = 0) {
    for (const key in currentObj) {
      if (!Object.prototype.hasOwnProperty.call(currentObj, key)) continue;

      const combinedKey = keepParentKey && parentKey
        ? `${parentKey}.${key}`
        : key;

      const value = currentObj[key];

      if (
        typeof value === 'object' &&
        value !== null &&
        currentLevel < flattenDepth
      ) {
        _flatten(value, combinedKey, currentLevel + 1);
      } else {
        result[combinedKey] = value;
      }
    }
  }

  _flatten(obj);

  // Final processing: escape dots and apply separator
  const processed = Object.fromEntries(
    Object.entries(result).map(([key, value]) => {
      let newKey = key;
      if (flattenDepth !== 0) {
        newKey = key.replace(/\./g, separator);
      }
      return [newKey, value];
    })
  );

  return processed;
}