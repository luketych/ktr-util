/**
 *  @param {Object} obj
 *  @param {Object} propChngsObj
 *  @returns {Object} newObj
 */
function changePropNames(obj, propChngsObj) {
    let newObj = obj

    for (const [from, to] of Object.entries(propChngsObj)) {
        newObj[to] = newObj[from]
        delete newObj[from]
    }

    return newObj
}


/** Returns new object with only the specificied properties.
 *  @param {Object}   objectToFilter
 *  @param {String[]} allowProps
 *  @returns {Object}
 */
function filterForProps(objectToFilter, allowProps) {          
    const filteredObj = Object.keys(objectToFilter)
      .filter(key => allowProps.includes(key))
      .reduce((obj, key) => {
        obj[key] = objectToFilter[key]
        return obj
    }, {})
    
    return filteredObj
}


/** Returns new object without the specified properties.
 *  @param {Object}   objectToFilter
 *  @param {String[]} removeProps
 *  @returns {Object}   
 */
function filterOutProps(objectToFilter, removeProps) {          
    return omit(objectToFilter, removeProps)
}


export { changePropNames, filterForProps, filterOutProps }