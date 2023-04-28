import getPackageJSONasObj from "./getPackageJSONasObj.js"


/**
 * Returns the scope name from the package.json file. Else returns an empty string.
 * @param {*} pkgJSONobj 
 * @returns 
 */
export default async function getScopeName(pkgJSONobj) {
    pkgJSONobj = pkgJSONobj || await getPackageJSONasObj()

    const head = pkgJSONobj.name.split('/')[0]

    let projectName
    if (head.includes('@')) return head
    else return ''
}