const DEFAULT_OPTIONS = {
    flattenDepth:1,
    keepParentKey:false
}

/**
 * Recursively flattens a nested object.
 *
 * @param {Object} obj - The input object to be flattened.

 * @param {string} [parentKey=''] - The current parent key in the recursive calls.
 * @param {number} [currentLevel=0] - The current recursion level.

 * @param {Object} [options]
 * @param {boolean} [options.keepParentKey=false] - Whether to include the parentKey in the newKey.
 * @param {number} [options.keyLevel=1] - Levels of keys to keep (0-based index).

 * @returns {Object} - The flattened object.
 */
export default function flatten(obj, { 
  parentKey='',
  currentLevel=0,
  options={ flattenDepth, keepParentKey }
}={}) {

  const result = {}

  const _options = Object.assign({}, DEFAULT_OPTIONS, options)

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = options.keepParentKey ? `${parentKey ? parentKey + '.' : ''}${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null && currentLevel < _options.flattenDepth) {
        // If the current property is a nested object, make a recursive call with an updated parentKey
        Object.assign(result, flatten(obj[key], { currentLevel: currentLevel+1, parentKey: newKey, options }));
      } else {
        // If it's a leaf (non-object), assign the value to the final flattened key in the result object
        result[newKey] = obj[key];
      }
    }
  }


  let newResult, newResultEntries 
  
  if (currentLevel >= 1) return result
  else {
      newResultEntries =  Object.entries(result).map(([key,value]) => {
          const newKey = key.replace(/\./g, "\\.") // escape dots so they doesn't conflict with dot notation

          return [newKey, value]
      })

      newResult = Object.fromEntries(newResultEntries)


      let test = newResult

      if (_options.flattenDepth == 0) {
        return newResult
      }
      else {
          
          // // get rid of the header keys
          newResultEntries = Object.entries(newResult).map(([key,value]) => {
              let newKey = key.split("\\.").slice(1).join(".")

              newKey = newKey.replace(/\./g, "\\.") // escape dots so they doesn't conflict with dot notation

              return [newKey, value]
          })

          newResult = Object.fromEntries(newResultEntries)


          return newResult
      }
  }
}