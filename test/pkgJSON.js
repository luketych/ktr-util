import fs from 'fs'
import path from 'path'



/**
 * Returns the project name from the package.json file. If it's a scoped package, it returns the scope.
 * @param {*} pkgJSONobj 
 * @returns 
 */
function getProjectName(pkgJSONobj) {
    const head = pkgJSONobj.name.split('/')[0]

    let projectName
    if (head.includes('@')) projectName = head
    else projectName = pkgJSONobj.name

    return projectName
}


/**
 * Returns the scope name from the package.json file. Else returns an empty string.
 * @param {*} pkgJSONobj 
 * @returns 
 */
function getScopeName(pkgJSONobj) {
    const head = pkgJSONobj.name.split('/')[0]

    let projectName
    if (head.includes('@')) return head
    else return ''
}


/**
 * Returns the package.json file as an object. If it's not found, it will recursively search up the directory tree until it finds it.
 * Or it will return an empty object.
 * @param {*} dir 
 * @returns 
 */
async function loadPackageJSONasObj(dir) {
    if (dir === '/') throw new Error('Could not find package.json')

    let packageJSONpath

    if (dir.split('/').at(-1).includes('package.json')) packageJSONpath = dir
    else packageJSONpath = path.join(dir, 'package.json')

    try {
        const data = await fs.promises.readFile(packageJSONpath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // console.error('Failed to read or parse package.json:', err);
        // throw err;
        return await loadPackageJSONasObj(path.join(dir, '..'))
    }
}


export { getProjectName, getScopeName, loadPackageJSONasObj }