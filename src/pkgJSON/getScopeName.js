/**
 * Returns the scope name from the package.json file. Else returns an empty string.
 * @param {*} pkgJSONobj 
 * @returns 
 */
export default function getScopeName(pkgJSONobj) {
    const head = pkgJSONobj.name.split('/')[0]

    let projectName
    if (head.includes('@')) return head
    else return ''
}