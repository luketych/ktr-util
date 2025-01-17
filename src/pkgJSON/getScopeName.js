import getPackageJSONasObj from "./getPackageJSONasObj.js"


/**
 * Returns the scope name from the package.json file. Else returns an empty string.
 * ie @ktr-srt
 * If pkgJSONobj is not provided, it will look in the given dirname, otherwise the cwd.
 * @param {object} pkgJSONobj 
 * @param {string} dirname
 * @returns 
 */
export default async function getScopeName({ pkgJSONobj, dirname }={}) {
    pkgJSONobj = pkgJSONobj || await getPackageJSONasObj(dirname)

    const head = pkgJSONobj.name.split('/')[0]

    let projectName
    if (head.includes('@')) return head
    else return ''
}