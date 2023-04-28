import getPackageJSONasObj from "./getPackageJSONasObj.js"


/**
 * Returns the pacakge name from the package.json file.
 * If it's scoped, it returns the tail. ie @ktr-srt/util => util
 * @param {} pkgJSONobj 
 * @returns 
 */
export default async function getPackageName(pkgJSONobj) {
    pkgJSONobj = pkgJSONobj || await getPackageJSONasObj()

    const nameArr = pkgJSONobj.name.split('/')

    if (nameArr.length === 1) return nameArr[0]

    const head = nameArr[0]
    const tail = nameArr.at(-1)

    return tail
}