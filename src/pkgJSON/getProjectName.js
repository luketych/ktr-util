/**
 * Returns the project name from the package.json file. If it's a scoped package, it returns the scope.
 * @param {*} pkgJSONobj 
 * @returns 
 */
export default function getProjectName(pkgJSONobj) {
    const head = pkgJSONobj.name.split('/')[0]

    let projectName
    if (head.includes('@')) projectName = head
    else projectName = pkgJSONobj.name

    return projectName
}